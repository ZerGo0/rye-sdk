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

// Map to track interface implementations
const interfaceImplementations = new Map();

// Map to track field types across interface implementations
const interfaceFieldTypes = new Map();

// Function to generate a fragment for a type
function generateFragment(typeName, fields) {
  return `export const ${typeName}Fragment = graphql(\`
  fragment ${typeName}Fragment on ${typeName} {
    __typename
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

// Function to generate a fragment for an interface type
function generateInterfaceFragment(typeName, fields, implementingTypes, hasConflictingFields) {
  // For interfaces without conflicts, include fields and spread fragments
  return `export const ${typeName}Fragment = graphql(\`
  fragment ${typeName}Fragment on ${typeName} {
    __typename
${fields.map((field) => `    ${field}`).join('\n')}
    ${implementingTypes
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
function getTypeFields(type, schema) {
  if (!type.getFields) {
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
        // Check if this field has conflicts in interface implementations
        if (isObjectType(type) && type.getInterfaces && type.getInterfaces().length > 0) {
          // For each interface this type implements
          for (const iface of type.getInterfaces()) {
            // Check if this field is part of the interface or has the same name as a field in another implementation
            const fieldKey = `${iface.name}.${fieldName}`;
            if (interfaceFieldTypes.has(fieldKey) && interfaceFieldTypes.get(fieldKey).size > 1) {
              // This field has conflicts, use an alias
              console.log(
                `Using alias for field ${fieldName} in type ${type.name} due to interface conflict`,
              );
              return `${fieldName}_${type.name}: ${fieldName}`;
            }
          }
        }
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
        if (processedTypes.has(namedType.name)) {
          return `${fieldName} {
      __typename
    }`;
        }

        // Mark this type as processed to avoid circular references
        processedTypes.add(namedType.name);

        // Get nested fields
        const nestedFields = getTypeFields(namedType, schema);

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

// Function to analyze field compatibility across implementing types
function analyzeFieldCompatibility(interfaceType, implementingTypes, schema) {
  if (!interfaceType.getFields) {
    return { safeFields: [], conflictingFields: [] };
  }

  const interfaceFields = interfaceType.getFields();
  const fieldCompatibility = {};

  // Initialize with all interface fields
  for (const fieldName in interfaceFields) {
    fieldCompatibility[fieldName] = {
      compatible: true,
      types: new Set([getNamedType(interfaceFields[fieldName].type).name]),
    };
  }

  // Check each implementing type to ensure field types match
  for (const typeName of implementingTypes) {
    const type = schema.getType(typeName);
    if (!type || !type.getFields) continue;

    const typeFields = type.getFields();
    for (const fieldName in interfaceFields) {
      if (!typeFields[fieldName]) {
        // Field is missing in this implementation
        fieldCompatibility[fieldName].compatible = false;
        continue;
      }

      const implementingFieldType = getNamedType(typeFields[fieldName].type).name;
      fieldCompatibility[fieldName].types.add(implementingFieldType);

      // If we have more than one type for this field, it's not compatible
      if (fieldCompatibility[fieldName].types.size > 1) {
        fieldCompatibility[fieldName].compatible = false;
      }
    }
  }

  // Separate fields into safe and conflicting
  const safeFields = [];
  const conflictingFields = [];

  for (const fieldName in fieldCompatibility) {
    if (fieldCompatibility[fieldName].compatible) {
      safeFields.push(fieldName);
    } else {
      conflictingFields.push(fieldName);
    }
  }

  return { safeFields, conflictingFields };
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

    // First pass: identify all types that will have fragments and collect interface implementations
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

        // If it's an object type, check if it implements any interfaces
        if (isObjectType(type) && type.getInterfaces) {
          const interfaces = type.getInterfaces();
          for (const iface of interfaces) {
            if (!interfaceImplementations.has(iface.name)) {
              interfaceImplementations.set(iface.name, []);
            }
            interfaceImplementations.get(iface.name).push(typeName);
          }
        }
      }
    }

    // Second pass: analyze field types across interface implementations
    for (const interfaceName in typeMap) {
      const interfaceType = typeMap[interfaceName];

      // Skip non-interfaces
      if (!isInterfaceType(interfaceType)) {
        continue;
      }

      const implementingTypes = interfaceImplementations.get(interfaceName) || [];
      if (implementingTypes.length <= 1) {
        continue; // No conflicts possible with 0 or 1 implementation
      }

      console.log(
        `Analyzing interface ${interfaceName} with ${implementingTypes.length} implementations: ${implementingTypes.join(', ')}`,
      );

      // Get fields from the interface
      const interfaceFields = interfaceType.getFields ? interfaceType.getFields() : {};

      // For each field in the interface
      for (const fieldName in interfaceFields) {
        const fieldKey = `${interfaceName}.${fieldName}`;
        interfaceFieldTypes.set(fieldKey, new Map());

        // Check this field across all implementing types
        for (const typeName of implementingTypes) {
          const type = schema.getType(typeName);
          if (!type || !type.getFields) continue;

          const typeFields = type.getFields();
          if (typeFields[fieldName]) {
            const fieldTypeStr = typeFields[fieldName].type.toString();

            // Add this type to the map for this field
            if (!interfaceFieldTypes.get(fieldKey).has(fieldTypeStr)) {
              interfaceFieldTypes.get(fieldKey).set(fieldTypeStr, []);
            }
            interfaceFieldTypes.get(fieldKey).get(fieldTypeStr).push(typeName);
          }
        }

        // Log conflicts
        if (interfaceFieldTypes.get(fieldKey).size > 1) {
          console.log(
            `Interface field conflict: ${fieldKey} has different types across implementations:`,
          );
          for (const [fieldType, types] of interfaceFieldTypes.get(fieldKey).entries()) {
            console.log(`  ${fieldType}: ${types.join(', ')}`);
          }
        }
      }

      // Also check for fields that are in the implementing types but not in the interface
      // These can also cause conflicts if they have the same name but different types
      const allImplementingFields = new Map();

      // Collect all fields from implementing types
      for (const typeName of implementingTypes) {
        const type = schema.getType(typeName);
        if (!type || !type.getFields) continue;

        const typeFields = type.getFields();
        for (const fieldName in typeFields) {
          // Skip fields that are already in the interface
          if (interfaceFields[fieldName]) continue;

          const fieldTypeStr = typeFields[fieldName].type.toString();
          const fieldKey = fieldName;

          if (!allImplementingFields.has(fieldKey)) {
            allImplementingFields.set(fieldKey, new Map());
          }

          if (!allImplementingFields.get(fieldKey).has(fieldTypeStr)) {
            allImplementingFields.get(fieldKey).set(fieldTypeStr, []);
          }

          allImplementingFields.get(fieldKey).get(fieldTypeStr).push(typeName);
        }
      }

      // Check for conflicts in implementing type fields
      for (const [fieldName, fieldTypes] of allImplementingFields.entries()) {
        if (fieldTypes.size > 1) {
          console.log(
            `Field conflict in implementations of ${interfaceName}: ${fieldName} has different types:`,
          );
          for (const [fieldType, types] of fieldTypes.entries()) {
            console.log(`  ${fieldType}: ${types.join(', ')}`);
          }

          // Add this field to the list of conflicting fields
          const fieldKey = `${interfaceName}.${fieldName}`;
          interfaceFieldTypes.set(fieldKey, fieldTypes);
        }
      }
    }

    // Also check for conflicts in union types
    for (const typeName in typeMap) {
      const type = typeMap[typeName];

      if (!isUnionType(type)) {
        continue;
      }

      const possibleTypes = type.getTypes ? type.getTypes() : [];
      if (possibleTypes.length <= 1) {
        continue; // No conflicts possible with 0 or 1 possible type
      }

      // Create a map to track fields across union members
      const unionFieldTypes = new Map();

      // For each possible type in the union
      for (const possibleType of possibleTypes) {
        if (!possibleType.getFields) continue;

        const typeFields = possibleType.getFields();
        // Check each field
        for (const fieldName in typeFields) {
          const fieldType = typeFields[fieldName].type.toString();

          if (!unionFieldTypes.has(fieldName)) {
            unionFieldTypes.set(fieldName, new Map());
          }

          const fieldMap = unionFieldTypes.get(fieldName);
          if (!fieldMap.has(fieldType)) {
            fieldMap.set(fieldType, []);
          }

          fieldMap.get(fieldType).push(possibleType.name);
        }
      }

      // Check for fields with multiple types across union members
      for (const [fieldName, fieldTypes] of unionFieldTypes.entries()) {
        if (fieldTypes.size > 1) {
          console.log(
            `Field conflict in union ${typeName}: ${fieldName} has different types across members`,
          );
        }
      }
    }

    // Start building the fragments file
    let fragmentsContent = `import { graphql } from '../graphql';\n\n`;

    // Keep track of how many fragments we generate
    let generatedCount = 0;

    // Process each type - first process simple types, then complex types, then interfaces, then union types
    // This ensures that when we reference a fragment, it's already defined
    const simpleTypes = [];
    const complexTypes = [];
    const unionTypes = [];
    const interfaceTypes = [];

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

      // Categorize types
      if (isUnionType(type)) {
        unionTypes.push(typeName);
      } else if (isInterfaceType(type)) {
        interfaceTypes.push(typeName);
      } else if (!type.getFields || Object.keys(type.getFields()).length <= 3) {
        simpleTypes.push(typeName);
      } else {
        complexTypes.push(typeName);
      }
    }

    // Process simple types first
    for (const typeName of simpleTypes) {
      const type = typeMap[typeName];
      processedTypes.clear();

      // Get fields for the type
      const fields = getTypeFields(type, schema);

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
      const fields = getTypeFields(type, schema);

      // Skip if no fields (all had required arguments)
      if (fields.length === 0) {
        fragmentsContent += generateFragment(typeName, ['__typename']);
      } else {
        // Generate the fragment
        fragmentsContent += generateFragment(typeName, fields);
      }
      generatedCount++;
    }

    // Process interface types
    for (const typeName of interfaceTypes) {
      const type = typeMap[typeName];
      processedTypes.clear();

      // Get implementing types for this interface
      const implementingTypes = interfaceImplementations.get(typeName) || [];

      // Analyze field compatibility across implementing types
      const { safeFields, conflictingFields } = analyzeFieldCompatibility(
        type,
        implementingTypes,
        schema,
      );

      // For interfaces, only include fields that are compatible across all implementations
      const interfaceFields = [];

      // Only include scalar and enum fields to avoid nested conflicts
      for (const fieldName of safeFields) {
        const field = type.getFields()[fieldName];
        const namedType = getNamedType(field.type);

        if (isScalarType(namedType) || isEnumType(namedType)) {
          interfaceFields.push(fieldName);
        }
      }

      // Check if this interface has conflicting fields
      const hasConflictingFields = conflictingFields.length > 0;
      if (hasConflictingFields) {
        console.log(`Conflicting fields for ${typeName}: ${conflictingFields.join(', ')}`);
      }

      // Generate the fragment with safe fields
      // If there are conflicting fields, don't use spread fragments
      fragmentsContent += generateInterfaceFragment(typeName, interfaceFields, implementingTypes);
      generatedCount++;
    }

    // Process union types last, after all their possible types have fragments
    for (const typeName of unionTypes) {
      const type = typeMap[typeName];

      // Get possible types for the union
      const possibleTypes = type.getTypes ? type.getTypes().map((t) => t.name) : [];

      // Generate the union fragment
      fragmentsContent += generateUnionFragment(typeName, possibleTypes);
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
