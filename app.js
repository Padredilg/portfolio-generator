// //we want to use fs methods
// const fs = require('fs');
const inquirer = require('inquirer');
// //module.exports assignment in the page-template file will be reassigned to this generate page const
// const generatePage = require('./src/page-template.js');

// //use the inputs in the template literal and write that to index.html
// fs.writeFile('./index.html', generatePage(name, github), err => {//stops if error, otherwise notifies success in terminal
//   if (err) throw new Error(err);

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });
inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?'
    }
  ])
  .then(answers => console.log(answers));