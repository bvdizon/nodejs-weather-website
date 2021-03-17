// requiring axios npm module
const axios = require('axios');

/**
 *
 * WEATHERSTACK
 * source: https://weatherstack.com/
 *
 */

const forecast = (latitude, longitude, callback) => {
  const weatherstackUrl = `http://api.weatherstack.com/current?access_key=ea9f4f22b1a00ddda0af08bd13b16eb9&query=${latitude},${longitude}`;

  axios
    .get(weatherstackUrl)
    .then((response) => {
      // check if error property exists in the response.data object
      if (response.data.error) {
        callback('Please enter valid coordinates, and try again', undefined);
      } else {
        callback(undefined, response.data);
      }
    })
    .catch((error) => {
      // handles network error connection
      callback(`Can't connect to weather service data. ${error}`, undefined);
    });
};

module.exports = forecast;
