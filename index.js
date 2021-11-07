const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned IP:", ip);

// });

// fetchCoordsByIP("68.151.201.192", (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   } else {
//     console.log("It worked! Returned coordinates:" , data);
//   }
// });

// fetchISSFlyOverTimes({latitude: 53.655, longitude: -113.3784},  (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   } 
//   console.log("It worked! Returned data:", data);
// })

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  printPassTimes(passTimes);
})



const printPassTimes = (data) => {
  for (const flyBy of data) {
    const date = new Date(flyBy.risetime * 1000);
    const duration  = flyBy.duration;
    console.log(`Next pass at ${date} for ${duration} seconds!`);
  }
}