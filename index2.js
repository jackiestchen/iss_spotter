const {nextISSTimesForMyLocation} = require('./iss_promised');


const printPassTimes = (data) => {
  for (const flyBy of data) {
    const date = new Date(flyBy.risetime * 1000);
    const duration  = flyBy.duration;
    console.log(`Next pass at ${date} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error);
  })