//requires file system
const fs = require('fs');
//creates array with all file names in c-scale directory

const cScale = [
    fs.readdirSync('./c-scale/C1'), fs.readdirSync('./c-scale/D1'),  fs.readdirSync('./c-scale/E1'), fs.readdirSync('./c-scale/F1'),
    fs.readdirSync('./c-scale/G1'), fs.readdirSync('./c-scale/A1'), fs.readdirSync('./c-scale/B1'), fs.readdirSync('./c-scale/C2')
]
 

//cals to get files out of pentatonic 
const getC1 = fs.readdirSync('./c-pentatonic/C1')   
const getD1 = fs.readdirSync('./c-pentatonic/D1')
const getE1 = fs.readdirSync('./c-pentatonic/E1')
const getG1 = fs.readdirSync('./c-pentatonic/G1')
const getA1= fs.readdirSync('./c-pentatonic/A1')
const getC2 = fs.readdirSync('./c-pentatonic/C2') 


//returns a string in format of array with all the names of files within the folder passed in so this can be copied and hard coded into app
//note I had to put each file path into the require function within the array as I am unable to use variables within the require method so I can only use static strings
//as an argument
const sampleNames = (sampleArray, filePath) =>  "\n[" +  "require('./"+filePath+"/"+  sampleArray.join("'), require('./"+filePath+"/") + "')]\n";

//logs the array like string of file names to console
//console.log('\n\n\nC Scale\n');
//console.log(sampleNames(getCScale));

/*
console.log('\n\n\nPentatonic\n');
console.log(sampleNames(getCPentatonic));
*/
const notes = ['C1', 'D1', 'E1', 'F1', 'G1', 'A1', 'B1', 'C2'];
for(let i = 0; i < cScale.length; i++) {
    console.log(sampleNames(cScale[i], "c-scale/" + notes[i]) + '\n\n\n');

}

//console.log(sampleNames(getC1, 'c-pentatonic/C1'));
//console.log(sampleNames(getD1, 'c-pentatonic/D1'));
//console.log(sampleNames(getE1, 'c-pentatonic/E1'));
//console.log(sampleNames(getG1, 'c-pentatonic/G1'));
//console.log(sampleNames(getA1, 'c-pentatonic/A1'));
//console.log(sampleNames(getC2, 'c-pentatonic/C2'));

//Note: I have had to do this way as there seemed to be no way to get the names of files in a directory using expo-file-system and I am unable to use Node Js 
//within my app as react native converts to native code