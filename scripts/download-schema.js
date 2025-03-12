#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { loadSchema } = require('@graphql-tools/load');
const { UrlLoader } = require('@graphql-tools/url-loader');
const { printSchema } = require('graphql');

async function main() {
  try {
    const schemaUrl = 'https://graphql.api.rye.com/v1/query';
    const outputDir = path.join(__dirname, '..', 'src', 'graphql');
    const schemaJsonPath = path.join(outputDir, 'schema.json');
    const schemaGraphqlPath = path.join(outputDir, 'schema.graphql');

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log(`Downloading GraphQL schema from ${schemaUrl}...`);

    const schema = await loadSchema(schemaUrl, {
      loaders: [new UrlLoader()],
    });

    const schemaJson = JSON.stringify(schema, null, 2);
    fs.writeFileSync(schemaJsonPath, schemaJson);
    console.log(`Schema JSON successfully saved to ${schemaJsonPath}`);

    const schemaGraphql = printSchema(schema);
    fs.writeFileSync(schemaGraphqlPath, schemaGraphql);
    console.log(`Schema GraphQL successfully saved to ${schemaGraphqlPath}`);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
