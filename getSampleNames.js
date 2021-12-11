const fs = require('fs');
const getSampleNames = fs.readdirSync('./c-scale')
const sampleNames = "['" + getSampleNames.join("', '") + "']";

console.log(sampleNames);
