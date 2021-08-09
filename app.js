//This function creates an array with whatever is written after node app.js
//slice returns a copied array with elements from the (start, to end-1);
const profileDataArgs = process.argv.slice(2, process.argv.length);

//this is an arrow function. profileDataArr has no parentheses because its the only parameter. 
//Function will be executed on a call.
const printProfileData = profileDataArr => {
    //whatever the code after the arrow is, it will be executed for each element in the profileDataArr
    //if the function after the arrow is a single line, it does not need {}
    //The element at the iteration is passed to profileItem. 
    profileDataArr.forEach(profileItem => console.log(profileItem));
}

printProfileData(profileDataArgs);