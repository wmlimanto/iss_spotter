// contain logic for fetching data from each API endpoint

const request = require('request');

 const fetchMyIP = function(callback) { 
  const url = 'https://api.ipify.org?format=json';

  request(url, (error, response, body) => {
    // error if invalid domain, user offline, etc
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // fetch ip address
    const data = JSON.parse(body);
    const ip = data.ip;
    callback(null, ip);
  })
};

const fetchCoordsByIP = function(ip, callback) {
  const url = `https://api.freegeoip.app/json/${ip}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    const coordinates = {latitude: data['latitude'], longitude: data['longitude']};
    callback(null, coordinates);
  })
};

const fetchISSFlyOverTimes = function(coordinates, callback) {
  const url = `https://iss-pass.herokuapp.com/json/?lat=${coordinates.latitude}&lon=${coordinates.longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS pass times: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    const passTimes = data.response;
    callback(null, passTimes);
  })
}

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };