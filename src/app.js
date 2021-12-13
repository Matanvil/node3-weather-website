const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define path for Express config of the handlebars views directory
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Matan Vilensky",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Matan Vilensky",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "this is the help message",
    title: "Help",
    name: "Matan Vilensky",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      errorMessage: "Please provide a valid address",
    });
  }
  geocode(address, (error, { latitude, longitude, locationName } = {}) => {
    if (error) {
      return res.send({
        errorMessage: error,
      });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          errorMessage: error,
        });
      }
      res.send({
        forecast: forecastData,
        location: locationName,
        address: address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      errorMessage: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404-page", {
    title: "404 - page not found",
    errorMessage: "Help article not found",
    name: "Matan Vilensky",
  });
});

app.get("*", (req, res) => {
  res.render("404-page", {
    title: "404 - page not found",
    errorMessage: "Page not found",
    name: "Matan Vilensky",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
