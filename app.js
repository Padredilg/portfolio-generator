const fs = require('fs');
const inquirer = require('inquirer');
//module.exports assignment in the page-template file will be reassigned to this generate page const
const generatePage = require('./src/page-template.js');

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?',
      validate: nameInput => {
        if(nameInput){
          return true;
        }
        else{
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your Github Username',
      validate: nameInput => {
        if(nameInput){
          return true;
        }
        else{
          console.log('Please enter your Github Username!');
          return false;//I guess in the validate property, returning false makes you repeat the question, true continues
        }
      }
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an "About" section?',
      default: true
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
      when: ({confirmAbout}) => {//apparently the order in which when is placed does not matter
        if(confirmAbout){
          return true;
        }
        else{
          return false;
        }
      }
    }
  ]);
};

const promptProject = portfolioData => {

  if(!portfolioData.projects){
    portfolioData.projects =[];
  }

  console.log(`
=================
Add a New Project
=================
`);

  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project?',
      validate: nameInput => {
        if(nameInput){
          return true;
        }
        else{
          console.log("Please enter your project's name!");
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (Required)',
      validate: nameInput => {
        if(nameInput){
          return true;
        }
        else{
          console.log("Please enter your project's description!");
          return false;
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the GitHub link to your project. (Required)',
      validate: nameInput => {
        if(nameInput){
          return true;
        }
        else{
          console.log("Please enter the link for your project!");
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
  ]).then(projectData => {
    portfolioData.projects.push(projectData);
    
    if(projectData.confirmAddProject){
      return promptProject(portfolioData);
    }
    else{
      return portfolioData
    }
  });
};

//so when promptProjects is called, then the user fill in info for first project.
//the info is pushed in to the portfolioData.projects.
//then, if confirmAddProjects is true, the function is called again, 
//and so we dont leave the initial return inquirer.prompt yet, instead, we go inside another rabbit hole that will
//keep pushing/append new info to portfolioData.projects until confirmAddProject is false.
//when false, all rabbit holes will be finished and we will finally be returned from inquirer.prompt and head
//to next step, where the object is passed to projectAnswers.

//whenever we give then a param, the param receives an object from the function that it is attached to
promptUser()
  .then(promptProject)
  .then(portfolioData => {
    const pageHTML = generatePage(portfolioData);

    fs.writeFile('./index.html', pageHTML, err => {//stops if error, otherwise notifies success in terminal
      if (err) throw new Error(err);

      console.log('Page created! Check out index.html in this directory to see it!');
    });
  });