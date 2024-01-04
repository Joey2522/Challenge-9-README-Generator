// // TODO: Include packages needed for this application
// const inquirer = require('inquirer');
// const fs = require('fs');
// const util = require('util');

// // TODO: Create an array of questions for user input
// // const questions = [];
// inquirer
//     .prompt([
//         {
//             type: 'input',
//             name: 'title',
//             message: 'What is the title of your project?',
//             default: 'Project Title',
//             validate: function (answer) {
//                 if (answer.length < 1) {
//                     return console.log("A valid project title is required.");
//                 }
//                 return true;
//             }
//         },
//         {
//             type: 'input',
//             name: 'repo',
//             message: 'What is the name of your GitHub repo?',
//             default: 'readme-generator',
//         },
//         {
//             Type: 'input',
//             name: 'description',
//             message: 'Write your project description.',
//         },
//         {
//             type: 'input',
//             name: 'motivation',
//             message: 'What was your motivation to develop this project?',
//         },
//         {
//             type: 'input',
//             name: 'problem',
//             message: 'What problem does this porject solve?',
//         },
//         {
//             type: 'input',
//             name: 'learn',
//             message: 'What did you learn?',
//         },
//         {
//             type: 'input',
//             name: 'installation',
//             message: 'What steps are required to install your project?',
//         },
//         {
//             type: 'input',
//             name: 'instructions',
//             message: 'Provide instructions and examples for use.',
//         },
//         {
//             type: 'input',
//             name: 'collaborators',
//             message: 'List all collaborators.',
//         },
//         {
//             type: 'input',
//             name: 'username',
//             message: 'What is your GitHub username?.',
//         },
//         {
//             type: 'list',
//             message: 'Choose your license.',
//             name: 'license',
//             choices: ['MIT License', 'Apache License 2.0', 'GNU General Public License (GPL) v3', 'Mozilla Public License 2.0', 'BSD 3-Clause License'],     
//         },        
//     ])
    
//     // TODO: Create a function to write README file
//     // function writeToFile(fileName, data) {}   
    
//     .then((data) => {
//         // const fileName = `${data.title.toLowerCase().split(' ').join('')}.json`;

//         // fs.writeFile(fileName, JSON.stringify(data, null, '\t'), (err) =>
//         //     err ? console.log(err) : console.log('Success!')
//         // );
//         const fileName = `README.md`;

//         fs.writeFile(fileName, JSON.stringify(data, null, '\t'), (err) =>
//             err ? console.log(err) : console.log('Success! Your README.md file has been generated.')
//         );
//     });



// // TODO: Create a function to initialize app
// // function init() {}

// // Function call to initialize app
// // init();

// External packages
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

// Internal modules
const api = require('./utils/api.js');
const generateMarkdown = require('./utils/generateMarkdown.js');

// Inquirer prompts for userResponses
const questions = [
    {
        type: 'input',
        message: "What is your GitHub username? (No @ needed)",
        name: 'username',
        default: 'connietran-dev',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid GitHub username is required.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "What is the name of your GitHub repo?",
        name: 'repo',
        default: 'readme-generator',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid GitHub repo is required for a badge.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "What is the title of your project?",
        name: 'title',
        default: 'Project Title',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid project title is required.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "Write a description of your project.",
        name: 'description',
        default: 'Project Description',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid project description is required.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "If applicable, describe the steps required to install your project for the Installation section.",
        name: 'installation'
    },
    {
        type: 'input',
        message: "Provide instructions and examples of your project in use for the Usage section.",
        name: 'usage'
    },
    {
        type: 'input',
        message: "If applicable, provide guidelines on how other developers can contribute to your project.",
        name: 'contributing'
    },
    {
        type: 'input',
        message: "If applicable, provide any tests written for your application and provide examples on how to run them.",
        name: 'tests'
    },
    {
        type: 'list',
        message: "Choose a license for your project.",
        choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense'],
        name: 'license'
    }
];

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
          return console.log(err);
        }
      
        console.log("Success! Your README.md file has been generated")
    });
}

const writeFileAsync = util.promisify(writeToFile);


// Main function
async function init() {
    try {

        // Prompt Inquirer questions
        const userResponses = await inquirer.prompt(questions);
        console.log("Your responses: ", userResponses);
        console.log("Thank you for your responses! Fetching your GitHub data next...");
    
        // Call GitHub api for user info
        const userInfo = await api.getUser(userResponses);
        console.log("Your GitHub user info: ", userInfo);
    
        // Pass Inquirer userResponses and GitHub userInfo to generateMarkdown
        console.log("Generating your README next...")
        const markdown = generateMarkdown(userResponses, userInfo);
        console.log(markdown);
    
        // Write markdown to file
        await writeFileAsync('ExampleREADME.md', markdown);

    } catch (error) {
        console.log(error);
    }
};

init();