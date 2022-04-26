// refactor iss.js using promises instead of callbacks

const request = require('request-promise-native');

// requests user's ip address
// returns promise of a request for ip data, returned as JSON string
const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

// requests lat long coordinates using the provided ip address
// returns promise of a request for lat long
const fetchCoordsByIP = function(body) {
  const data = JSON.parse(body);
  const ip = data.ip;
  return request(`https://api.freegeoip.app/json/${ip}`);
};

// requests iss data using provided lat long coordinates
// returns promise of request for fly over data, returned as JSON string
const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  const url = `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

// chain all three functions above
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };