const request = require("request");
process.env.TZ = "America/Edmonton";

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  let ip = null;
  let URL = "https://api.ipify.org?format=json";
  request(URL, (error, response, body) => {
    if (error) {
      callback(error, ip);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), ip);
      return;
    }

    const data = JSON.parse(body);
    if (!data) {
      callback(Error('Error: Empty IP'), ip);
      return;
    } else {
      ip = data.ip;
      callback(null, ip);
      return;
    }

  });
};

const fetchCoordsByIP = (ip, callback) => {
  const apiKey = "bfe1fdb0-3f69-11ec-a151-b7e11cf3e89a";
  const URL = `https://api.freegeoip.app/json/${ip}?apikey=${apiKey}`;
  request(URL, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      // console.log(body);
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {

      let data = JSON.parse(body);
      const {
        latitude,
        longitude
      } = data;
      callback(null, {
        latitude,
        longitude
      });
    }
  });

};

const fetchISSFlyOverTimes = (coords, callback) => {
  const URL = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(URL, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS pass time. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    let data = JSON.parse(body);
    callback(null, data.response);
  });

};

const nextISSTimesForMyLocation = (callback) => {

  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    } else {
      fetchCoordsByIP(ip, (error, coords) => {
        if (error) {
          callback(error, null);
          return;
        } else {
          fetchISSFlyOverTimes(coords, (error, data) => {
            if (error) {
              callback(error, null);
              return;
            } else {
              callback(null, data);
            }
          });
        }
      });
    }
  });

};




module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};