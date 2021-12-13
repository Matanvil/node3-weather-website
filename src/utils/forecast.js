const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=6e8fc609845c1adbd2e44b9835461823&query=" +
    latitude +
    "," +
    longitude +
    "";

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const data = body.current;
      callback(
        undefined,
        data.weather_descriptions[0] +
          ". It is currently " +
          data.temperature +
          "°C outside. It feels like " +
          data.feelslike +
          "°C outside"
      );
    }
  });
};

module.exports = forecast;
