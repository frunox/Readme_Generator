const fs = require("fs");
const util = require("util");
const axios = require("axios");
const inquirer = require("inquirer");
const appendFileAsync = util.promisify(fs.appendFile);
var avatar = "";
var email = "";

// create an array holding the questions to be asked of the user
const questions = [
  {
    type: "prompt",
    name: "username",
    message: "Enter your GitHub username"
  },
  {
    type: "prompt",
    name: "projectName",
    message: "Enter your GitHub project name"
  }
];

// code to check if question and response code works
// inquirer.prompt(questions).then(answers => {
//   console.log("\nCheck answers:");
//   console.log(JSON.stringify(answers, null, "  "));
// });

// start API call
inquirer.prompt(questions).then(async function ({ username, projectName }) {
  // create variable holding the URL for the API containing the ${ username }
  const queryURL = `https://api.github.com/users/${username}`;

  await axios
    .get(queryURL) //use queryURL defined above
    .then(function (res) {
      //run function with the response as an argument
      // console.log(res);
      avatar = res.data.avatar_url;
      email = res.data.email;
    });
  // console.log(username);
  // console.log(projectName);
  await appendFileAsync("README.md", "# " + projectName + `\n` + "\n")
    .then(function () {
      console.log("append Project Name");
    })
  // .catch(function (err) {
  //   console.log(err);
  // });
  await appendFileAsync("README.md", "## Project Description" + `\n` + `\n`)
    .then(async function () {
      console.log("append project description header");
      enterText();
      // inquirer
      //   .prompt([
      //     {
      //       type: "confirm",
      //       message: "Do you want to enter a project description now?",
      //       name: "choice"
      //     }
      //   ])
      //   .then(async function ({ choice }) {
      //     console.log(`${choice}`)
      //     if (choice) {
      //       console.log(`Choice is true`)
      //       inquirer
      //         .prompt([
      //           {
      //             type: "input",
      //             message: "Enter the project description",
      //             name: "projectDesc"
      //           }
      //         ])
      //         .then(async function ({ projectDesc }) {
      //           console.log("enter description:  " + projectDesc)
      //           await appendFileAsync("README.md", projectDesc + `\n`);
      //         })
      //   } else {
      //     console.log("No description text added");
      //   }
      // });
    })
  await appendFileAsync("README.md", "## Table of Contents" + `\n` + `\n`)
    .then(function () {
      console.log("append TOC header");
    })
  await appendFileAsync("README.md", "## Table of Contents" + `\n` + `\n`)
    .then(function () {
      console.log("append TOC header");
    })
  await appendFileAsync("README.md", "## Installation" + `\n` + `\n`)
    .then(function () {
      console.log("append Installation header");
    })
  await appendFileAsync("README.md", "## Usage" + `\n` + `\n`)
    .then(function () {
      console.log("append Usage header");
    })
  await appendFileAsync("README.md", "## License" + `\n` + `\n`)
    .then(function () {
      console.log("append License header");
    })
  await appendFileAsync("README.md", "## Contributing" + `\n` + `\n`)
    .then(function () {
      console.log("append Contributing header");
    })
  await appendFileAsync("README.md", "## Tests" + `\n` + `\n`)
    .then(function () {
      console.log("append Tests header");
    })
  await appendFileAsync("README.md", "## Questions" + `\n` + `\n`)
    .then(function () {
      console.log("append Questions header");
    })
  await appendFileAsync('README.md', `![](https://img.shields.io/badge/Project-Creator-brightgreen)  ${username}  ${email}` + `\n`)
    .then(async function () {
      console.log("append image");
    })
  await appendFileAsync('README.md', `![](${avatar})`)
    .then(async function () {
      console.log("append image");
    })
    .catch(function (err) {
      console.log(err);
    });
});

async function enterText() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter text here (return to skip)",
        name: "text"
      }
    ])
    .then(async function ({ text }) {
      console.log("text entered")
      await appendFileAsync("README.md", text + `\n`);
    })
}