// requiring axios npm module
const axios = require('axios');

/**
 * MAPBOX
 * Forward Geocoding
 * source: https://docs.mapbox.com/api/search/geocoding/#forward-geocoding
 * syntax: GET: https://api.mapbox.com/geocoding/v5/{endpoint}/{search_text}.json
 *
 * const mapboxGetUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYnZkaXpvbiIsImEiOiJja201aHN1MjAwZWszMm5vZjJxYTR2YjhyIn0.ZJTKnKZ-qRXjE-wM_t39og&limit=1`
 */

// function to get the geocode of a location
const geocode = (address, callback) => {
  const mapboxToken = `pk.eyJ1IjoiYnZkaXpvbiIsImEiOiJja201aHN1MjAwZWszMm5vZjJxYTR2YjhyIn0.ZJTKnKZ-qRXjE-wM_t39og`;

  const mapboxGetUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${mapboxToken}&limit=1`;

  axios
    .get(mapboxGetUrl)
    .then((response) => {
      if (response.data.features.length === 0) {
        // handles search with zero return values
        callback("Can't find  that location. Try another search.", undefined);
      } else {
        // handles successful fetch, passing the long and lat values
        callback(undefined, {
          latitude: response.data.features[0].center[1],
          longitude: response.data.features[0].center[0],
          location: response.data.features[0].place_name,
        });
      }
    })
    .catch((error) => {
      // handles network error connection
      callback(`Can't connect to fetch data. ${error}`, undefined);
    });
};

module.exports = geocode;
