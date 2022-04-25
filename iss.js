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
}

module.exports = { fetchMyIP };