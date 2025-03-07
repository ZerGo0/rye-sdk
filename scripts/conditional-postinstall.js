#!/usr/bin/env node

// This script checks if we're being installed as a dependency
// If we're in our own project, run codegen
// If we're being installed as a dependency, skip codegen

const path = require('path');
const { execSync } = require('child_process');

// Check if we're being installed as a dependency
const isInstalledAsDependency = process.env.INIT_CWD !== process.env.PWD;

if (!isInstalledAsDependency) {
  console.log('Running in development mode, executing codegen...');
  try {
    execSync('npm run codegen', { stdio: 'inherit' });
  } catch (error) {
    console.error('Failed to run codegen:', error);
    process.exit(1);
  }
} else {
  console.log('Being installed as a dependency, skipping codegen.');
}
