#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const {
  buildSchema,
  isObjectType,
  isInterfaceType,
  isUnionType,
  isScalarType,
  isEnumType,
  getNamedType,
} = require('graphql');

// Set to track processed types to avoid circular references
const processedTypes = new Set();

// Set to track types that have fragments
const fragmentTypes = new Set();

// Function to generate a fragment for a type
function generateFragment(typeName, fields) {
  return `export const ${typeName}Fragment = graphql(\`
  fragment ${typeName}Fragment on ${typeName} {
${fields.map((field) => `    ${field}`).join('\n')}
  }
\`);
`;
}

// Function to generate a fragment for a union type
function generateUnionFragment(typeName, possibleTypes) {
  return `export const ${typeName}Fragment = graphql(\`
  fragment ${typeName}Fragment on ${typeName} {
    __typename
    ${possibleTypes
      .map(
        (type) => `... on ${type} {
      ...${type}Fragment
    }`,
      )
      .join('\n    ')}
  }
\`);
`;
}

// Function to get fields for a type
function getTypeFields(type, schema, depth = 0, maxDepth = 99) {
  if (!type.getFields) {
    return [];
  }

  // Prevent infinite recursion
  if (depth > maxDepth) {
    return [];
  }

  const fields = type.getFields();
  return Object.keys(fields)
    .map((fieldName) => {
      const field = fields[fieldName];
      const fieldType = field.type;

      // Check if field has required arguments
      const hasRequiredArgs =
        field.args &&
        field.args.some((arg) => arg.type.toString().includes('!') && !arg.defaultValue);

      // Skip fields with required arguments in fragments
      if (hasRequiredArgs) {
        return null;
      }

      // Get the named type (unwrap non-null and list types)
      const namedType = getNamedType(fieldType);

      // If it's a scalar or enum, just return the field name
      if (isScalarType(namedType) || isEnumType(namedType)) {
        return fieldName;
      }

      // For object, interface, or union types
      if (isObjectType(namedType) || isInterfaceType(namedType) || isUnionType(namedType)) {
        // If this type has a fragment, reference it
        if (fragmentTypes.has(namedType.name)) {
          return `${fieldName} {
      ...${namedType.name}Fragment
    }`;
        }

        // If we've already processed this type or we're at max depth, just use __typename
        if (processedTypes.has(namedType.name) || depth === maxDepth) {
          return `${fieldName} {
      __typename
    }`;
        }

        // Mark this type as processed to avoid circular references
        processedTypes.add(namedType.name);

        // Get nested fields
        const nestedFields = getTypeFields(namedType, schema, depth + 1, maxDepth);

        // Remove this type from processed set after we're done with it
        processedTypes.delete(namedType.name);

        if (nestedFields.length === 0) {
          return `${fieldName} {
      __typename
    }`;
        }

        return `${fieldName} {
      ${nestedFields
        .filter((f) => f !== null)
        .map((f) => `  ${f}`)
        .join('\n      ')}
    }`;
      }

      // Default case
      return `${fieldName} {
      __typename
    }`;
    })
    .filter((field) => field !== null); // Filter out null fields (those with required args)
}

async function main() {
  try {
    // Read the schema
    const schemaPath = path.join(__dirname, '..', 'src', 'graphql', 'schema.graphql');
    const schemaString = fs.readFileSync(schemaPath, 'utf8');

    // Build the schema
    const schema = buildSchema(schemaString);

    // Get all types from the schema
    const typeMap = schema.getTypeMap();

    // First pass: identify all types that will have fragments
    for (const typeName in typeMap) {
      const type = typeMap[typeName];
      if (
        !typeName.startsWith('__') &&
        typeName !== 'Query' &&
        typeName !== 'Mutation' &&
        typeName !== 'Subscription' &&
        (isObjectType(type) || isInterfaceType(type) || isUnionType(type))
      ) {
        fragmentTypes.add(typeName);
      }
    }

    // Start building the fragments file
    let fragmentsContent = `import { graphql } from '../graphql';\n\n`;

    // Keep track of how many fragments we generate
    let generatedCount = 0;

    // Process each type - first process simple types, then complex types
    // This ensures that when we reference a fragment, it's already defined
    const simpleTypes = [];
    const complexTypes = [];

    for (const typeName in typeMap) {
      const type = typeMap[typeName];

      // Skip built-in types and input types
      if (
        typeName.startsWith('__') ||
        typeName === 'Query' ||
        typeName === 'Mutation' ||
        typeName === 'Subscription' ||
        (!isObjectType(type) && !isInterfaceType(type) && !isUnionType(type))
      ) {
        continue;
      }

      // Categorize types as simple or complex
      if (isUnionType(type) || !type.getFields || Object.keys(type.getFields()).length <= 3) {
        simpleTypes.push(typeName);
      } else {
        complexTypes.push(typeName);
      }
    }

    // Process simple types first
    for (const typeName of simpleTypes) {
      const type = typeMap[typeName];
      processedTypes.clear();

      // For union types, use the special union fragment generator
      if (isUnionType(type)) {
        const possibleTypes = type.getTypes ? type.getTypes().map((t) => t.name) : [];
        fragmentsContent += generateUnionFragment(typeName, possibleTypes);
        generatedCount++;
        continue;
      }

      // Get fields for the type
      const fields = getTypeFields(type, schema, 0, 2);

      // Skip if no fields (all had required arguments)
      if (fields.length === 0) {
        fragmentsContent += generateFragment(typeName, ['__typename']);
      } else {
        // Generate the fragment
        fragmentsContent += generateFragment(typeName, fields);
      }
      generatedCount++;
    }

    // Then process complex types
    for (const typeName of complexTypes) {
      const type = typeMap[typeName];
      processedTypes.clear();

      // Get fields for the type
      const fields = getTypeFields(type, schema, 0, 2);

      // Skip if no fields (all had required arguments)
      if (fields.length === 0) {
        fragmentsContent += generateFragment(typeName, ['__typename']);
      } else {
        // Generate the fragment
        fragmentsContent += generateFragment(typeName, fields);
      }
      generatedCount++;
    }

    // Write the fragments to a file
    const outputPath = path.join(__dirname, '..', 'src', 'gql', 'generated-fragments.ts');
    fs.writeFileSync(outputPath, fragmentsContent);

    console.log(`Generated ${generatedCount} fragments in ${outputPath}`);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Execute the main function
main();
