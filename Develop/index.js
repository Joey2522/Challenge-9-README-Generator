// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

// TODO: Create an array of questions for user input
// const questions = [];
inquirer
    .prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of your app?',
        },
        {
            Type: 'input',
            name: 'description',
            message: 'Write your app description.',
        },
        {
            type: 'input',
            name: 'motivation',
            message: 'What was your motivation to make this app?',
        },
        {
            type: 'input',
            name: 'problem',
            message: 'What problem does this app solve?',
        },
        {
            type: 'input',
            name: 'learn',
            message: 'What did you learn?',
        },
        {
            type: 'input',
            name: 'installation',
            message: 'What steps are required to install your project?',
        },
        {
            type: 'input',
            name: 'instructions',
            message: 'Provide instructions and examples for use.',
        },
        {
            type: 'input',
            name: 'collaborators',
            message: 'List all collaborators.',
        },
    ])
    .then((data) => {
        const fileName = `${data.title.toLowerCase().split(' ').join('')}.json`;

        fs.writeFile(fileName, JSON.stringify(date, null, '\t'), (err) =>
        err ? console.log(err) : console.log('Success!'));
    });

// TODO: Create a function to write README file
// function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
// function init() {}

// Function call to initialize app
// init();
