let request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *    A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   -An error, if any (nullable)
 *   The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request("https://api.ipify.org?format=json",(error, response, body) =>{
    if (error) {
      return callback(error,null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(error(msg), null);
      return;
    } else {
        
      const data = JSON.parse(body)['ip'];
      console.log(data);
      callback(null, data);
    }
  });
};


const fetchCoordsByIp = function(ip, callback) {

  request(`https://ipvigilante.com/${ip}`, (error, response, body)=>{
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`;
      callback(msg, null);
      return;
    }
      
    const { latitude, longitude } = JSON.parse(body).data;
    

    callback(null, { latitude, longitude });

    return;
  }

    
  );
};


  
  
module.exports = { fetchMyIP, fetchCoordsByIp };