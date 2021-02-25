const fs = require('fs');
const _ = require('lodash')
const inputMainPath = './inputFile';
const outputMainPath = './outputFile';
const files = fs.readdirSync(inputMainPath);


const getResults = (fileInfo) => {
  const [ drivingTime, crossNumbers, streetNumbers, carNumbers, score ] = fileInfo[0].split(' ');

  const streetArrays = fileInfo.slice(1, Number(streetNumbers)+1);

  console.log('streetArrays', streetArrays);

  const perObj = {};


  streetArrays.forEach(item => {
    const arr = item.split(' ');
    perObj[arr[2]] = arr[1];
  });

  let streetObj = {};

  const cars = fileInfo.slice(-Number(carNumbers));
  // console.log(cars);

  const streetsData = {};

  cars.forEach(item => {
    let arr = item.split(' ');
    let arrs = arr.slice(1, arr.length-1);
    arrs.forEach(per => {
      if (!streetObj.hasOwnProperty(per)) {
        streetObj[per] = 1;
      } else {
        streetObj[per]++;
      }
    })
  });

  let resMas = {};

  // function randomInteger(min, max) {
  //     let rand = min - 0.5 + Math.random() * (max - min + 1);
  //     return Math.round(rand);
  // }

  for (let key in streetObj) {
    if (streetObj.hasOwnProperty(key)) {
      if (!resMas.hasOwnProperty(perObj[key])) {
        resMas[perObj[key]] = [1, `${key} 1`]; // найкращий рез 1
      } else {
        resMas[perObj[key]][0]++;
        resMas[perObj[key]].push(`${key} 1`); // найкращий рез 1

      }
    }
  }

  const count = Object.keys(resMas).length;

  const resFinal = [count];

  for (let key in resMas) {
    if (resMas.hasOwnProperty(key)) {
      resFinal.push(key);
      resFinal.push(resMas[key][0]);
      let arr = resMas[key].slice(1, resMas[key].length);
      arr.forEach(item => {
        resFinal.push(item);
      })

    }
  }

  return resFinal;
};



files.forEach(file => {
  const fileInfo = _.compact(fs.readFileSync(`${inputMainPath}/${file}`).toString().split('\n'));

  let resMass = getResults(fileInfo);

  let resStr = resMass.join('\n');
  fs.writeFileSync(`${outputMainPath}/${file}`,resStr);
});
