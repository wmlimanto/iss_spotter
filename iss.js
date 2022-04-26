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
      const msg = `Status Code ${response.statusCode} when fetching IP. Reponse: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // fetch ip address
    const data = JSON.parse(body);
    callback(null, data.ip);
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
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Reponse: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    const coordinates = {latitude: data['latitude'], longitude: data['longitude']};
    callback(null, coordinates);
  })
};

module.exports = { fetchMyIP, fetchCoordsByIP };