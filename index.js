const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);

const promptUser =()=>
inquirer
    .prompt([{
            type: 'input',
            message: 'What is the name of your project? ',
            name: 'name',
        },
        {
            type: 'input',
            message: 'Input a description of your project:',
            name: 'description',
        },
        {
            type: 'input',
            message: 'Input instructions for installation: ',
            name: 'instructions',
        },
        {
            type: 'input',
            message: 'Input instructions for use: ',
            name: 'use',
        },
        {
            type: 'input',
            message: 'Input instructions for future contributions: ',
            name: 'futureUse',
        },
        {
            type: 'input',
            message: 'Input instructions for testing: ',
            name: 'testing',
        },
        {
            type: 'input',
            message: 'What is your Github Username?',
            name: 'username',
        },
        {
            type: 'input',
            message: 'What is your email?',
            name: 'email',
        },
        {
            type: 'list',
            message: 'What is this project licensed under?',
            name: 'license',
            choices: ['MIT','Mozilla Public License 2.0','Open Software License 3.0','ISC',]
        },

    ]);


const generateReadMe = (response) =>
`# ${response.name}
---
## Table of Contents
* [Description](#description)
* [License](#license)
* [Installation](#installation)
* [Use](#use)
* [Contributions](#contributions)
* [Testing](#testing)
* [Questions](#questions)
## Description
    ${response.description}
## License
    [Full License Here](opensource.org/licenses/${response.license}).
## Installation
    ${response.instructions}
## Use
    ${response.use}
## Contributions
    ${response.futureUse}
## Testing
    ${response.testing}
## Questions
    Contact the following with any additional questions:
    - Git Hub Profile: https://github.com/${response.username}
    - Email: ${response.email}`;

    promptUser()
    .then((response)=> writeFileAsync('README.md', generateReadMe(response)))
    .then(() => console.log('Successfully wrote to README.md'))
  .catch((err) => console.error(err));