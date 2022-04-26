// require and run our main fetch function

const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned IP:' , ip);
});

fetchCoordsByIP('64.46.25.126', (error, coordinates) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned coordinates:' , coordinates);
});

fetchISSFlyOverTimes({ latitude: '49.26818', longitude: '-123.10179'}, (error, passTimes) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned flyover times:' , passTimes);
});


// call nextISSTimesForMyLocation func 
nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    console.log("it didn't work!" , error);
    return;
  }
  console.log(passTimes);
});

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    console.log("it didn't work!" , error);
    return;
  }
  printPassTimes(passTimes);
});

module.exports = { printPassTimes };