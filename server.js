'use strict';

//console.log('Yes our first server');




// requires

const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
const cors = require('cors');

// once express is in we need to use it
// app === server

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;

// ENDPOINTS

app.get('/weather', (request, response, next) => {
  try {
    let cityName = request.query.cityName;
    let city = data.find(city => city.city_name === cityName);
    let weatherPush = city.data.map(day => new Forecast(day));
    console.log(city);
    response.status(200).send(weatherPush);
  } catch (error) {
    next(error);
  }
});

class Forecast {
  constructor(forcast) {
    this.date = forcast.datetime;
    this.descr = forcast.weather.description``;
  }
}

app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});


//error handleing

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

//serverstart

app.listen(PORT, () => console.log(`we are up and running on port ${PORT}`));
