#!/usr/bin/env node

const {execSync} = require('child_process');
const path = require('path');
const fs = require('fs-extra');
const colors = require('colors');

const args = process.argv.slice(2);
const projectName = args[0];

if (!projectName || args.length !== 1) {
  console.error(colors.cyan('Usage: create-express-app <project-name>'));
  process.exit(1);
}

const currentDir = process.cwd();
const projectDir = path.resolve(currentDir, projectName);

if (fs.existsSync(projectDir)) {
  console.log(
    colors.red.bold(`Project directory "${projectName}" already exists.`)
  );
  process.exit(1);
}

fs.mkdirSync(projectDir, {recursive: true});

var templateDir = path.join(__dirname, '..', 'templates');

try {
  fs.mkdirSync(projectDir, {recursive: true});

  var templateDir = path.join(__dirname, '..', 'templates');
  fs.copySync(templateDir, projectDir, {recursive: true});

  fs.rename(`${projectDir}/gitignore`, `${projectDir}/.gitignore`);
  fs.rename(`${projectDir}/env`, `${projectDir}/.env`);

  console.log(`Project directory "${projectName}" created successfully.`);
} catch (err) {
  console.error('Error creating project:', err);
  process.exit(1);
}

//const templateDir = path.resolve(__dirname, 'template');
//fs.cpSync(templateDir, projectDir, {recursive: true});

process.exit(0);
