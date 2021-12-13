#!/usr/bin/env node
const fs = require('fs');
const inquirer = require('inquirer');
const child_process = require('child_process');

const QUESTIONS = [
    {
        name: "project-name",
        type: "input",
        message: "Project name:",
        validate: function (input) {
            if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
            else
                return "Project name may only include letters, numbers, underscores and hashes."
        },
    },
    {
        name: "author",
        type: "input",
        message: "Author:",
    },
    {
        name: "license",
        type: "input",
        message: "License:",
        default: 'ISC'
    },
    {
        name: "bot-prefix",
        type: "input",
        message: "Bot prefix:",
        default: '?'
    },
];

const CURR_DIR = process.cwd();

inquirer.prompt(QUESTIONS).then((answers) => {
    const projectChoice = "create-discord-client";
    const projectName = answers["project-name"];
    const license = answers["license"];
    const author = answers["author"];
    const botToken = 'BotTokenHere';
    const botPrefix = answers["bot-prefix"];
    const templatePath = `${__dirname}/templates/${projectChoice}`

    const packageJson = `
    {
        "name": "${projectName}",
        "version": "1.0.0",
        "main": "index.js",
        "scripts": {
            "start": "node index.js",
            "lint": "eslint ."
        },
        "keywords": [
            "discord.js",
            "bot",
            "create-discord-client"
        ],
        "author": "${author}",
        "license": "${license}",
        "dependencies": {
            "chalk": "^5.0.0",
            "discord.js": "^13.3.1",
            "fs": "^0.0.1-security",
            "dotenv": "^10.0.0",
            "eslint": "^8.4.1",
            "glob": "^7.2.0",
            "quick.db": "^7.1.3"
        }
    }
    `;

    fs.mkdirSync(`${CURR_DIR}/${projectName}`);

    createDirectoryContents(templatePath, projectName);
    const content = `BOT_TOKEN=${botToken}\nPREFIX=${botPrefix}`;
    const envPath = `${CURR_DIR}/${projectName}/.env`;
    fs.writeFileSync(envPath, content, "utf8");
    const packagePath = `${CURR_DIR}/${projectName}/package.json`;
    fs.writeFileSync(packagePath, packageJson, "utf8");
    console.log("Installing dependencies...");
    child_process.execSync(`cd ${projectName} && npm install`, { stdio: 'inherit' });

    const success = `
        Success! Created ${projectName} at ${CURR_DIR}/${projectName}
    `;

    const info = `
        Inside that directory you can also run:
        - npm start: Runs the bot
        - npm run lint: Runs eslint
    `;

    const start = `
        To start:
            - cd into ${projectName}
            - Add your bot token in the \`.env\` file
            - run \`npm start\`
    `;

    console.log(success);
    console.log(info);
    console.log(start);
});

/**
 * defining the createDirectoryContents
 * 
 * @param {string<any>} templatePath 
 * @param {string<any>} newProjectpath 
 */
function createDirectoryContents(templatePath, newProjectpath) {
    const filesToCreate = fs.readdirSync(templatePath);
    filesToCreate.forEach((file) => {
        const origFilePath = `${templatePath}/${file}`;

        /* get stats about the current file */
        const stats = fs.statSync(origFilePath);

        if (stats.isFile()) {
            const contents = fs.readFileSync(origFilePath, "utf8");

            if (file === ".npmignore") file = ".gitignore";
            const writePath = `${CURR_DIR}/${newProjectpath}/${file}`;
            fs.writeFileSync(writePath, contents, "utf8");
        } else if (stats.isDirectory()) {
            fs.mkdirSync(`${CURR_DIR}/${newProjectpath}/${file}`);
            /* recursive call */
            createDirectoryContents(
                `${templatePath}/${file}`,
                `${newProjectpath}/${file}`
            );
        }
    });
}