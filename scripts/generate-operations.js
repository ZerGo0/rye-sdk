#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildSchema, getNamedType, isObjectType } = require('graphql');
const { camelCase } = require('change-case-all');

// Function to convert field name to operation name
function fieldToOperationName(fieldName, operationType) {
  // Convert first character to uppercase
  const operationName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
  return operationName;
}

// Function to convert field name to constant name
function fieldToConstantName(fieldName, operationType) {
  // Convert camelCase to UPPER_SNAKE_CASE
  const constantName =
    fieldName
      .replace(/([A-Z]+)/g, '_$1')
      .toUpperCase()
      .replace(/^_/, '') + (operationType === 'query' ? '_QUERY' : '_MUTATION');
  return constantName;
}

// Function to convert field name to file name
function fieldToFileName(fieldName) {
  // First convert to camelCase using the library
  let result = camelCase(fieldName);

  // Generic acronym handling: Find any sequence of uppercase letters and convert to Title case
  // This regex finds sequences of uppercase letters that:
  // 1. Are at the end of the string, or
  // 2. Are followed by a lowercase letter (indicating the start of a new word)
  return result.replace(/([A-Z]+)([a-z]|$)/g, function (match, acronym, nextChar) {
    // Convert the acronym to Title case (first letter uppercase, rest lowercase)
    const titleCaseAcronym = acronym.charAt(0).toUpperCase() + acronym.slice(1).toLowerCase();
    return titleCaseAcronym + nextChar;
  });
}

// Function to get the return type fragment name for a field
function getReturnTypeFragmentName(field) {
  const returnType = getNamedType(field.type);
  return returnType.name + 'Fragment';
}

// Function to find required arguments in nested fields
function findNestedRequiredArgs(field, schema, visitedTypes = new Set(), depth = 0) {
  if (!field) return [];

  const requiredArgs = [];
  try {
    const returnType = getNamedType(field.type);

    // Avoid circular references
    if (visitedTypes.has(returnType.name)) {
      return requiredArgs;
    }

    visitedTypes.add(returnType.name);

    // Only process object types
    if (!isObjectType(returnType)) {
      return requiredArgs;
    }

    // Get fields of the return type
    let fields;
    try {
      fields = returnType.getFields();
    } catch (err) {
      console.warn(`Warning: Could not get fields for type ${returnType.name} - ${err.message}`);
      return requiredArgs;
    }

    // Limit recursion depth to avoid potential issues
    const maxDepth = 3;
    if (depth >= maxDepth) {
      return requiredArgs;
    }

    // Check each field for required arguments
    for (const fieldName in fields) {
      try {
        const nestedField = fields[fieldName];

        // Check if this field has required arguments
        if (nestedField.args && nestedField.args.length > 0) {
          const fieldRequiredArgs = nestedField.args.filter(
            (arg) => arg.type && arg.type.toString().includes('!') && !arg.defaultValue,
          );

          if (fieldRequiredArgs.length > 0) {
            // Filter out the 'key' argument - it's not actually needed in the schema
            const filteredArgs = fieldRequiredArgs.filter((arg) => arg.name !== 'key');

            if (filteredArgs.length > 0) {
              requiredArgs.push({
                fieldName,
                parentType: returnType.name,
                args: filteredArgs,
              });
            }
          }
        }

        // Recursively check nested fields
        if (nestedField && nestedField.type && isObjectType(getNamedType(nestedField.type))) {
          const deeperArgs = findNestedRequiredArgs(
            nestedField,
            schema,
            new Set(visitedTypes),
            depth + 1,
          );
          if (deeperArgs.length > 0) {
            requiredArgs.push(...deeperArgs);
          }
        }
      } catch (err) {
        console.warn(`Warning: Could not process field ${fieldName} - ${err.message}`);
      }
    }
  } catch (err) {
    console.warn(`Warning: Error in findNestedRequiredArgs - ${err.message}`);
  }

  return requiredArgs;
}

// Function to generate an operation file for a field
function generateOperationFile(fieldName, field, operationType, schema) {
  const operationName = fieldToOperationName(fieldName, operationType);
  const constantName = fieldToConstantName(fieldName, operationType);

  // Find any nested fields with required arguments
  const nestedRequiredArgs = findNestedRequiredArgs(field, schema);

  // Create a map to deduplicate arguments by name
  const allArgs = new Map();

  // Add top-level arguments
  field.args.forEach((arg) => {
    allArgs.set(arg.name, arg);
  });

  // Add nested required arguments with unique names
  // Note: If there are name conflicts, we could generate unique names
  nestedRequiredArgs.forEach(({ args }) => {
    args.forEach((arg) => {
      // Skip the 'key' argument - it's not needed
      if (arg.name !== 'key' && !allArgs.has(arg.name)) {
        allArgs.set(arg.name, arg);
      }
    });
  });

  // Convert the arguments map to array
  const combinedArgs = Array.from(allArgs.values());

  // Generate parameters for the operation
  const params =
    combinedArgs.length > 0
      ? `(${combinedArgs.map((arg) => `$${arg.name}: ${arg.type.toString()}`).join(', ')})`
      : '';

  // Generate arguments for the field
  const args =
    field.args.length > 0
      ? `(${field.args.map((arg) => `${arg.name}: $${arg.name}`).join(', ')})`
      : '';

  // Get the return type
  const returnTypeFragment = getReturnTypeFragmentName(field);

  // Generate the selection set, including passing arguments to nested fields
  let selectionSet = `      __typename
      ...${returnTypeFragment}`;

  // For cases where we need to include nested fields with required arguments
  if (nestedRequiredArgs.length > 0) {
    // Build a dynamic selection set that includes required nested fields
    selectionSet = `      __typename`;

    // Get important nested fields that need arguments
    const importantNestedFields = nestedRequiredArgs.filter((item) => {
      // Check if any args are both required and don't have default values
      // Skip fields with the 'key' argument
      return item.args.some(
        (arg) => arg.name !== 'key' && arg.type.toString().includes('!') && !arg.defaultValue,
      );
    });

    if (importantNestedFields.length > 0) {
      // Build an explicit selection for each field with required args
      importantNestedFields.forEach((nestedField) => {
        try {
          const argsString = nestedField.args
            .filter(
              (arg) => arg.name !== 'key' && arg.type.toString().includes('!') && !arg.defaultValue,
            )
            .map((arg) => `${arg.name}: $${arg.name}`)
            .join(', ');

          // Get the return type for this nested field and its fragment
          // Make sure the field exists before accessing it
          const typeFields = getNamedType(field.type).getFields();
          if (typeFields && typeFields[nestedField.fieldName]) {
            const returnType = getNamedType(typeFields[nestedField.fieldName].type);
            if (returnType) {
              const nestedFragmentName = returnType.name + 'Fragment';

              selectionSet += `
      ${nestedField.fieldName}(${argsString}) {
        ...${nestedFragmentName}
      }`;
            }
          }
        } catch (err) {
          console.warn(
            `Warning: Could not process nested field ${nestedField.fieldName} - ${err.message}`,
          );
        }
      });
    }

    // If we didn't add any nested field selections, fall back to the return type fragment
    if (selectionSet.trim() === '__typename') {
      selectionSet += `
      ...${returnTypeFragment}`;
    }
  }

  // Generate the operation content
  const operationContent = `import { graphql } from '../graphql';

export const ${constantName} = graphql(\`
  ${operationType} ${operationName}${params} {
    ${fieldName}${args} {
${selectionSet}
    }
  }
\`);
`;

  return {
    fileName: fieldToFileName(fieldName),
    content: operationContent,
  };
}

async function main() {
  try {
    // Read the schema
    const schemaPath = path.join(__dirname, '..', 'src', 'graphql', 'schema.graphql');
    const schemaString = fs.readFileSync(schemaPath, 'utf8');

    // Build the schema
    const schema = buildSchema(schemaString);

    // Get query and mutation types
    const queryType = schema.getQueryType();
    const mutationType = schema.getMutationType();

    // Create the output directory if it doesn't exist
    const outputDir = path.join(__dirname, '..', 'src', 'gql');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Generate operation files for all queries
    let generatedCount = 0;
    if (queryType) {
      const queryFields = queryType.getFields();
      for (const fieldName in queryFields) {
        const field = queryFields[fieldName];
        const { fileName, content } = generateOperationFile(fieldName, field, 'query', schema);

        const filePath = path.join(outputDir, `${fileName}.ts`);
        fs.writeFileSync(filePath, content);
        generatedCount++;
      }
    }

    // Generate operation files for all mutations
    if (mutationType) {
      const mutationFields = mutationType.getFields();
      for (const fieldName in mutationFields) {
        const field = mutationFields[fieldName];
        const { fileName, content } = generateOperationFile(fieldName, field, 'mutation', schema);

        const filePath = path.join(outputDir, `${fileName}.ts`);
        fs.writeFileSync(filePath, content);
        generatedCount++;
      }
    }

    console.log(
      `Generated ${generatedCount} operation files in ${outputDir} based on ALL queries and mutations in the schema`,
    );
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Execute the main function
main();
