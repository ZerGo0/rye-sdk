#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildSchema, getNamedType } = require('graphql');

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
  // Keep as camelCase
  return fieldName;
}

// Function to get the return type fragment name for a field
function getReturnTypeFragmentName(field) {
  const returnType = getNamedType(field.type);
  return returnType.name + 'Fragment';
}

// Function to generate a placeholder value for a type

// Function to generate an operation file for a field
function generateOperationFile(fieldName, field, operationType) {
  const operationName = fieldToOperationName(fieldName, operationType);
  const constantName = fieldToConstantName(fieldName, operationType);

  // Generate parameters for the operation
  const params =
    field.args.length > 0
      ? `(${field.args.map((arg) => `$${arg.name}: ${arg.type.toString()}`).join(', ')})`
      : '';

  // Generate arguments for the field
  const args =
    field.args.length > 0
      ? `(${field.args.map((arg) => `${arg.name}: $${arg.name}`).join(', ')})`
      : '';

  // Get the return type
  const returnTypeFragment = getReturnTypeFragmentName(field);

  // Generate the operation content
  const operationContent = `import { graphql } from '../graphql';

export const ${constantName} = graphql(\`
  ${operationType} ${operationName}${params} {
    ${fieldName}${args} {
      __typename
      ...${returnTypeFragment}
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
        const { fileName, content } = generateOperationFile(fieldName, field, 'query');

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
        const { fileName, content } = generateOperationFile(fieldName, field, 'mutation');

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
