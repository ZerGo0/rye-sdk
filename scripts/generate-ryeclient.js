#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

let graphqlExportedTypes = null;

// Function to convert operation file name to method name
function fileNameToMethodName(fileName) {
  // Convert first character to lowercase
  return fileName.charAt(0).toLowerCase() + fileName.slice(1);
}

// Function to convert operation file name to parameter type name from graphql.ts
function fileNameToParamsTypeName(fileName, operationType) {
  // For queries, use QueryXxxArgs format
  // For mutations, use MutationXxxArgs format
  const typeName = fileName.charAt(0).toUpperCase() + fileName.slice(1);
  const paramsTypeName =
    operationType === 'OPERATION.MUTATION'
      ? `${typeName}MutationVariables`
      : `${typeName}QueryVariables`;
  const paramsTypeNameLowerCase = paramsTypeName.toLowerCase();

  if (!graphqlExportedTypes) {
    graphqlExportedTypes = new Map();

    const graphqlFile = path.join(__dirname, '..', 'src', 'graphql', 'graphql.ts');
    const graphqlContent = fs.readFileSync(graphqlFile, 'utf8');
    // export type QueryExperimentalAffiliateMerchantsConnectionArgs = {
    const exportedTypes = graphqlContent.matchAll(/^export type (\w+) \=/gm);
    if (!exportedTypes || exportedTypes.length === 0) {
      console.error('Could not find exported types in graphql.ts');
      return paramsTypeName;
    }

    for (const type of exportedTypes) {
      const lowerCaseType = type[1].toLowerCase();
      graphqlExportedTypes.set(lowerCaseType, type[1]);
    }

    console.log('initializing graphqlExportedTypes', graphqlExportedTypes.size);
  }

  if (graphqlExportedTypes.has(paramsTypeNameLowerCase)) {
    return graphqlExportedTypes.get(paramsTypeNameLowerCase);
  } else {
    console.warn(`Could not find exported type for ${paramsTypeName}`);
    return paramsTypeName;
  }
}

// Function to extract operation type (query or mutation) from a file
function extractOperationType(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('mutation ')) {
    return 'OPERATION.MUTATION';
  }
  return 'OPERATION.QUERY';
}

// Function to extract operation name from a file
function extractOperationName(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/export const (\w+) = graphql/);
  if (match && match[1]) {
    return match[1];
  }
  return null;
}

// Function to extract GraphQL operation result type from a file
function extractResultType(filePath) {
  const fileName = path.basename(filePath, '.ts');

  // Handle case sensitivity in type names
  // Convert camelCase to PascalCase and ensure "ID" is "Id"
  let typeName = fileName
    .replace(/([a-z])([A-Z])/g, '$1_$2') // Insert underscore before capital letters
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');

  // Special case for ID -> Id
  typeName = typeName.replace(/ID/g, 'Id');

  const content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('mutation ')) {
    return `${typeName}Mutation`;
  }
  return `${typeName}Query`;
}

// Function to extract input parameters from GraphQL operation
function extractInputParameters(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Extract variables from the GraphQL operation
  const variablesMatch = content.match(/\(\$([^)]+)\)/);
  if (!variablesMatch) return [];

  const variablesString = variablesMatch[1];
  return variablesString.split(',').map((variable) => {
    const [name, type] = variable
      .trim()
      .split(':')
      .map((s) => s.trim());

    // Keep the original GraphQL type for reference
    const originalType = type;

    // Extract the base type name (without ! or [])
    let baseType = originalType;
    let isArray = false;

    // Handle array types [Type!]!
    if (baseType.startsWith('[') && baseType.endsWith(']')) {
      isArray = true;
      baseType = baseType.slice(1, -1);
    }

    // Remove non-null operator (!)
    baseType = baseType.replace(/!/g, '');

    return {
      name: name.replace('$', ''),
      type: baseType,
      isArray,
      originalType, // Keep the original type for reference
    };
  });
}

// Function to extract input types from parameters and ensure correct casing
function extractInputTypes(parameters) {
  const inputTypes = new Set();

  parameters.forEach((param) => {
    const originalType = param.originalType;

    // Extract input type names (e.g., CartCreateInput from CartCreateInput!)
    if (
      originalType &&
      !originalType.includes('String') &&
      !originalType.includes('ID') &&
      !originalType.includes('Int') &&
      !originalType.includes('Float') &&
      !originalType.includes('Boolean')
    ) {
      // Handle array types [Type!]! -> Type
      if (originalType.startsWith('[') && originalType.endsWith(']')) {
        const innerType = originalType.slice(1, -1).replace(/!/g, '');
        // Ensure PascalCase for input types
        const pascalCaseType = innerType.charAt(0).toUpperCase() + innerType.slice(1);
        inputTypes.add(pascalCaseType);
      } else {
        // Regular types Type! -> Type
        const cleanType = originalType.replace(/!/g, '');
        // Ensure PascalCase for input types
        const pascalCaseType = cleanType.charAt(0).toUpperCase() + cleanType.slice(1);
        inputTypes.add(pascalCaseType);
      }
    }
  });

  return Array.from(inputTypes);
}

// Function to generate the RyeClient class
function generateRyeClient(operationFiles) {
  let interfaceDefinition = [`interface IRyeClient {`];

  operationFiles.forEach((file) => {
    const fileName = path.basename(file, '.ts');
    const methodName = fileNameToMethodName(fileName);
    const operationType = extractOperationType(file);
    const paramsTypeName = fileNameToParamsTypeName(fileName, operationType);
    const resultType = extractResultType(file);

    interfaceDefinition.push(`  ${methodName}(`);
    interfaceDefinition.push(`    params: ${paramsTypeName},`);
    interfaceDefinition.push(
      `  ): Promise<OperationResultSource<OperationResult<${resultType}, ${paramsTypeName}>>>;`,
    );
    interfaceDefinition.push('');
  });

  interfaceDefinition.push('}');

  // Generate RyeClient options interface
  const optionsInterface = [
    `interface RyeClientOptions {`,
    `  authHeader: string;`,
    `  /** @default {ENVIRONMENT.PRODUCTION} */`,
    `  environment?: ENVIRONMENT;`,
    `  shopperIp: string;`,
    `}`,
  ];

  // Generate RyeClient class
  let classDefinition = [
    `class RyeClient implements IRyeClient {`,
    `  private authHeader: string | null;`,
    `  private shopperIp: string | null;`,
    `  private environment: ENVIRONMENT;`,
    `  private ryeClient: Client;`,
    ``,
    `  /**`,
    `   * @deprecated This signature is deprecated. Please use the alternate constructor signature that takes a {@link RyeClientOptions} bag.`,
    `   */`,
    `  constructor(authHeader: string, shopperIp: string, environment?: ENVIRONMENT);`,
    `  constructor(options: RyeClientOptions);`,
    `  constructor(`,
    `    // eslint-disable-next-line @typescript-eslint/no-explicit-any`,
    `    ...args: any[]`,
    `  ) {`,
    `    if (args.length === 1) {`,
    `      const options = args[0];`,
    `      this.authHeader = options.authHeader;`,
    `      this.shopperIp = options.shopperIp;`,
    `      this.environment = options.environment || DEFAULT_ENVIRONMENT;`,
    `    } else {`,
    `      const [authHeader, shopperIp, environment] = args;`,
    `      this.authHeader = authHeader;`,
    `      this.shopperIp = shopperIp;`,
    `      this.environment = environment || DEFAULT_ENVIRONMENT;`,
    `    }`,
    ``,
    `    this.ryeClient = this.initializeClient();`,
    `  }`,
    ``,
    `  /**`,
    `   * Initialize the client with the specified authentication header and shopper IP.`,
    `   * @returns A new instance of the Client class.`,
    `   */`,
    `  private initializeClient() {`,
    `    return initializeClient(this.authHeader!, this.shopperIp!, this.environment);`,
    `  }`,
  ];

  // Generate method implementations
  operationFiles.forEach((file) => {
    const fileName = path.basename(file, '.ts');
    const methodName = fileNameToMethodName(fileName);
    const operationType = extractOperationType(file);
    const paramsTypeName = fileNameToParamsTypeName(fileName, operationType);
    const resultType = extractResultType(file);
    const operationName = extractOperationName(file);

    // Generate JSDoc comment
    const comment = [
      ``,
      `  /**`,
      `   * ${methodName} operation.`,
      `   * @param params - The params for the ${methodName} operation.`,
      `   * @returns A promise that resolves to the operation result.`,
      `   */`,
    ];

    // Generate method implementation
    // Handle the case where operationName might be null
    let methodImpl;
    if (operationName) {
      methodImpl = [
        `  ${methodName} = async (`,
        `    params: ${paramsTypeName},`,
        `  ): Promise<OperationResultSource<OperationResult<${resultType}, ${paramsTypeName}>>> => {`,
        `    return await apiRequest(this.ryeClient, ${operationName}, params${operationType !== 'OPERATION.QUERY' ? ', ' + operationType : ''});`,
        `  };`,
      ];
    } else {
      // If operation name is null, log a warning and create a stub implementation
      console.warn(
        `Warning: Could not extract operation name from ${fileName}. Creating stub implementation.`,
      );
      methodImpl = [
        `  ${methodName} = async (`,
        `    params: ${paramsTypeName},`,
        `  ): Promise<OperationResultSource<OperationResult<${resultType}, ${paramsTypeName}>>> => {`,
        `    console.error('Operation not implemented:', '${methodName}', params);`,
        `    throw new Error(\`Operation not implemented: ${methodName} with params \${JSON.stringify(params)}\`);`,
        `  };`,
      ];
    }

    classDefinition = classDefinition.concat(comment, methodImpl);
  });

  // Close the class definition
  classDefinition.push('}');

  // Export the class
  const exports = [``, `export { RyeClient };`, ``];

  // Combine all parts
  return [
    '// PLEASE AUTO IMPORT USING VSCODE "Add all missing imports" FEATURE!',
    '',
    ...interfaceDefinition,
    '',
    ...optionsInterface,
    '',
    ...classDefinition,
    '',
    ...exports,
  ].join('\n');
}

async function main() {
  try {
    // Get all operation files
    const gqlDir = path.join(__dirname, '..', 'src', 'gql');
    const files = fs
      .readdirSync(gqlDir)
      .filter((file) => file.endsWith('.ts') && file !== 'generated-fragments.ts')
      .map((file) => path.join(gqlDir, file));

    // Generate the RyeClient class
    const ryeClientContent = generateRyeClient(files);

    // Write the RyeClient class to a file
    const outputPath = path.join(__dirname, '..', 'src', 'ryeClient.ts');
    fs.writeFileSync(outputPath, ryeClientContent);

    console.log(`Generated RyeClient class in ${outputPath}`);

    // Format the file with prettier if available
    try {
      execSync(`npx prettier --write ${outputPath}`);
      console.log('Formatted the generated file with prettier');
    } catch (error) {
      console.warn('Could not format the file with prettier:', error.message);
    }

    // Run ESLint to fix any remaining issues
    try {
      execSync(`npx eslint ${outputPath} --fix`);
      console.log('Fixed linting issues with ESLint');
    } catch (error) {
      console.warn('Could not fix linting issues with ESLint:', error.message);
    }

    for (let i = 0; i < 5; i++) {
      console.log(
        'PLEASE FIX THE IMPORTS ISSUE IN "src/ryeClient.ts" (VSCODE "Add all missing imports")',
      );
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Execute the main function
main();
