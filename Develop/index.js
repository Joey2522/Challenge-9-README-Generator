// External packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

// Internal modules
const api = require('./utils/api.js');
const generateMarkdown = require('./utils/generateMarkdown.js');


// Array of questions for user input
const questions = [
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of your project?',
            default: 'Project Title',
        },
        {
            type: 'input',
            name: 'repo',
            message: 'What is the name of your GitHub repo?',
            default: 'The repo name goes here.',
        },
        {
            Type: 'input',
            name: 'description',
            message: 'Write your project description.',
        },
        {
            type: 'input',
            name: 'motivation',
            message: 'What was your motivation to develop this project? Skip if n/a.',
            default: 'Not Applicable',
        },
        {
            type: 'input',
            name: 'problem',
            message: 'What problem does this project solve? Skip if n/a.',
            default: 'Not Applicable',
        },
        {
            type: 'input',
            name: 'learn',
            message: 'What did you learn? Skip if n/a.',
            default: 'Not Applicable',
        },
        {
            type: 'input',
            name: 'installation',
            message: 'If applicable what steps are required to install your project? Skip if n/a.',
            default: 'Not Applicable',
        },
        {
            type: 'input',
            name: 'instructions',
            message: 'Provide instructions and/or examples for use. Skip if n/a.',
            default: 'Not Applicable',
        },
        {
            type: 'input',
            name: 'collaborators',
            message: 'List all collaborators. Skip if n/a.',
            default: 'Not Applicable',
        },
        {
            type: 'input',
            name: 'username',
            message: 'What is your GitHub username?. (no need for the @ symbol)',
        },
        {
            type: 'list',
            message: 'Choose your license.',
            name: 'license',
            choices: ['MIT License', 'Apache License 2.0', 'GNU General Public License (GPL) v3', 'Mozilla Public License 2.0', 'BSD 3-Clause License'],     
        },        
    ];

    
// Function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
          return console.log(err);
        }
      
        console.log("Good work! Your exREADME.md file has been generated")
    });
};

const writeFileAsync = util.promisify(writeToFile);


// The function to initialize app
    async function init() { 
        try {
            const userResponses = await inquirer.prompt(questions);
            console.log("Your respones: ", userResponses);
            console.log("Thank you for your responses! Fetching your GitHub data next...");

            const userInfo = await api.getUser(userResponses);
            console.log("Your GitHub user info: ", userInfo);

            console.log("Generating your exREADME next...")
            const markdown = generateMarkdown(userResponses, userInfo);
            console.log(markdown);

            await writeFileAsync('exREADME.md', markdown);

        } catch (error) {
            console.log(error);
        }
    };  

// Function call to initialize app
    init();