#!/usr/bin/env node

import {execSync} from 'child_process';
import path from 'path';
import {fileURLToPath} from 'url';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import colors from 'colors';

async function main() {
  try {
    if (process.argv.length === 2) {
      console.error(colors.cyan('Usage: create-express-app <project-name>'));
      process.exit(1);
    }

    const state = {
      args: [],
      projectName: '',
      type: 'cjs',
      currentDir: process.cwd(),
      projectDir: '',
      templateDir: '',
    };

    init(state);

    const projectName = state.projectName;

    if (!projectName || state.args.length !== 1) {
      console.error(colors.cyan('Usage: create-express-app <project-name>'));
      process.exit(1);
    }

    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'moduleType',
        message: 'Choose type',
        choices: ['CommonJS', 'ES6'],
      },
    ]);

    if (fs.existsSync(state.projectDir)) {
      console.log(
        colors.red.bold(`Project directory "${projectName}" already exists.`)
      );
      process.exit(1);
    }

    fs.mkdirSync(state.projectDir, {recursive: true});

    createTemplate(state);

    process.exit(0);
  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  }
}

main();

function init(state) {
  const args = process.argv.slice(2);
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  state.args = args;
  state.projectName = args[0];
  state.projectDir = path.resolve(state.currentDir, state.projectName);
  state.templateDir = path.join(__dirname, '..', 'templates');
}

function createTemplate(state) {
  try {
    fs.mkdirSync(state.projectDir, {recursive: true});

    fs.copySync(state.templateDir, state.projectDir, {recursive: true});

    fs.rename(
      `${state.projectDir}/gitignore`,
      `${state.projectDir}/.gitignore`
    );
    fs.rename(`${state.projectDir}/env`, `${state.projectDir}/.env`);

    console.log(
      `Project directory "${state.projectName}" created successfully.`
    );
  } catch (err) {
    console.error('Error creating project:', err);
    process.exit(1);
  }
}

function updateTemplateType() {
  fs.writeFileSync(`${state.templateDir}/controllers/auth.js`, appJSContent);
}

//const args = process.argv.slice(2);

//for (let i = 0; i < args.length; i++) {
//  if (args[i] === '-cjs') {
//    console.log('CommonJS seçeneği bulundu.');
//  } else if (args[i] === 'es6') {
//    console.log('CommonJS seçeneği bulundu.');
//  } else if (args[i].split('-')[0] === '-') {
//  } else {
//    state.args.push(args[i]);
//  }
//}
