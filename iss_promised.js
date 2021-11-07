const request = require('request-promise-native');
process.env.TZ = "America/Edmonton";


const fetchMyIP = function(callback) {

  let URL = "https://api.ipify.org?format=json";
  return request(URL);

};

const fetchCoordsByIP = function(body) {
  let ip = JSON.parse(body).ip;
  const apiKey = "bfe1fdb0-3f69-11ec-a151-b7e11cf3e89a";
  const URL = `https://api.freegeoip.app/json/${ip}?apikey=${apiKey}`;
  return request(URL);
};

const fetchISSFlyOverTimes = function(body) {
  const {latitude, longitude} = JSON.parse(body);
  const URL = `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(URL);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const {response} = JSON.parse(data);
      return response;
    });
};

module.exports = {nextISSTimesForMyLocation};