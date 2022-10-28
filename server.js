'use strict';

//console.log('Yes our first server');




// requires

const express = require('express');
require('dotenv').config();
// let data = require('./data/weather.json');
const cors = require('cors');
const axios = require('axios');

// once express is in we need to use it
// app === server

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;

// ENDPOINTS

app.get('/weather', async (request, response, next) => {
  console.log(request);
  // todo get info from frontend lat and long

  let lat = request.query.lat;
  let lon = request.query.lon;
  let weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=38.25&lon=78.00&units=I&key=${process.env.REACT_APP_WEATHER}`;

  //todo make axios call to weather api and movie and get back data
  try {
    let weatherResults = await axios.get(weatherURL);
    console.log(weatherResults);
    console.log('!!!!!',weatherResults.data);
    let dataSend = weatherResults.data.data.map(day => new Forecast(day));
    console.log('the data i want to send', dataSend);
    response.status(200).send(dataSend);
    //todo groom that data (using a class) to send back to the front ent
  } catch (error) {
    next(error);
  }
});

class Forecast {
  constructor(cityObj) {
    this.weather = cityObj.weather.decription;
    this.date = cityObj.valid_date;
    //this.key = cityObj._id;
  }
}

app.get('/movies', async (req, res, next) => {
  let cityName = req.query.searchQuery;
  let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE}&query=${cityName}&language=en-US&page=1&include_adult=false`;

  try {
    let movieData = await axios.get(movieURL);
    let dataSend = movieData.data.results.map(movie => new Movies(movie));
    console.log(dataSend);
    res.status(200).send(dataSend);
  } catch (error) {
    next(error);
  }
});

class Movies {
  constructor(movieObj) {
    this.title = movieObj.title;
    this.overview = movieObj.overview;
  }
}
//   let lat = request.query.lat;
//   let lon = request.query.lon;
//   try {
//     let city = data.find(city => city.city_name === searchQuery);
//     let groomedData = city.data.map(day => new Forecast(day));
//     console.log(city);
//     response.status(200).send(groomedData);
//   } catch (error) {
//     next(error);
//   }
// });

// class Forecast {
//   constructor(forcast) {
//     this.date = forcast.datetime;
//     this.descr = forcast.weather.description;
//   }
// }

app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});


//error handleing

app.use((error, request, response) => {
  response.status(500).send(error.message);
});

//serverstart

app.listen(PORT, () => console.log(`we are up and running on port ${PORT}`));
