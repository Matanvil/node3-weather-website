const request = require("postman-request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoibWF0YW52aWwiLCJhIjoiY2t3eGJjNWF3MGJnYTJubnI1a3E2ZTN2dSJ9.GhBOjRb8YIneY0K94Tjg6g&limit=1";

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to geoCoding service", undefined);
    } else if (body.features.length === 0) {
      callback(
        "Unable to find the location specified, please try another search",
        undefined
      );
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        locationName: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
