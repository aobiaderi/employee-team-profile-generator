const {Manager} = require("./lib/Manager");
const {Engineer} = require("./lib/Engineer");
const {Intern} = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const employees = [];

// Function to prompt user for manager's information
function promptManager() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "What is the team manager's name?",
    },
    {
      type: 'input',
      name: 'id',
      message: "What is the team manager's employee ID?",
    },
    {
      type: 'input',
      name: 'email',
      message: "What is the team manager's email address?",
    },
    {
      type: 'input',
      name: 'officeNumber',
      message: "What is the team manager's office number?",
    },

]).then(function(answer) {
    let manager = new Manager(answer.name, answer.id, answer.email, answer.officeNumber)

    employees.push(manager);
      // Call promptNextAction function to continue the program
    promptNextAction(); 

    })
}; // end of function 
promptManager(); // Call promptManager function to start the program

// Function to prompt user for next action
function promptNextAction() {
    return inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do next?',
        choices: ['Add an engineer', 'Add an intern', 'Finish building the team'],
      },
    ]).then(val => {
       if (val.action === "Add an engineer") {
        promptEngineer()
      } else if (val.action === "Add an intern") {
        promptIntern();
      } else if (val.action === "Finish building the team") {
        generateHTML(outputPath, render(employees));
      };
    }); 
  }; // end of function 
// Function to prompt user for engineer's information
function promptEngineer() {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: "What is the engineer's name?",
      },
      {
        type: 'input',
        name: 'id',
        message: "What is the engineer's employee ID?",
      },
      {
        type: 'input',
        name: 'email',
        message: "What is the engineer's email address?",
      },
      {
        type: 'input',
        name: 'github',
        message: "What is the engineer's GitHub username?",
      },
    ]).then(function(answer) {
      let engineer = new Engineer(answer.name, answer.id, answer.email, answer.github)
      employees.push(engineer);
  
      promptNextAction();
    })
  }; // end of function
  
  // Function to prompt user for intern's information
function promptIntern() {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: "What is the intern's name?",
      },
      {
        type: 'input',
        name: 'id',
        message: "What is the intern's employee ID?",
      },
      {
        type: 'input',
        name: 'email',
        message: "What is the intern's email address?",
      },
      {
        type: 'input',
        name: 'school',
        message: "What is the intern's school?",
      },
    ]).then(function(answer) {
      let intern = new Intern(answer.name, answer.id, answer.email, answer.school)
      employees.push(intern);
  
      promptNextAction()
    })
  }; // end of function 

  function generateHTML(fileName, data) {
    fs.writeFile(fileName, data, "utf8", function (err) {
      if (err) {
        throw err;
      }
      console.log("You have successfully written your Employee Summary");
    });
  };
