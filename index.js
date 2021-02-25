const fs = require('fs');
const _ = require('lodash')
const inputMainPath = './inputFile';
const outputMainPath = './outputFile';
const files = fs.readdirSync(inputMainPath);

const getResults = (fileInfo) => {

}



files.forEach(file => {
  const fileInfo = _.compact(fs.readFileSync(`${inputMainPath}/${file}`).toString().split('\n'));

  let resMass = getResults(fileInfo);

  let resStr =  resMass.join('\n');
  fs.writeFileSync(`${outputMainPath}/${file}`,resStr);
});
