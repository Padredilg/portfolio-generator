//we want to use fs methods
const fs = require('fs');
//module.exports assignment in the page-template file will be reassigned to this generate page const
const generatePage = require('./src/page-template.js');

//two inputs are being expected starting at index 2 --> node app ____ ____
const profileDataArgs = process.argv.slice(2);

//get the two inputs
const [name, github] = profileDataArgs;

//use the inputs in the template literal and write that to index.html
fs.writeFile('./index.html', generatePage(name, github), err => {//stops if error, otherwise notifies success in terminal
  if (err) throw new Error(err);

  console.log('Portfolio complete! Check out index.html to see the output!');
});