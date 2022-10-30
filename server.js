'use strict';

//console.log('Yes our first server');




// requires

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const getMvies = require('./modules/movies');
const getWeather = require('./oldModule/oldWeather');
// const weather = require('./modules/weather');

// once express is in we need to use it
// app === server

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;

// ENDPOINTS

app.get('/weather', getWeather);

//app.get('/weather', weatherHandler);

app.get('/movies', getMvies);

// function weatherHandler(request, response) {
//   const { lat, lon } = request.query;
//   weather(lat, lon)
//     .then(summaries => response.send(summaries))
//     .catch((error) => {
//       console.error(error);
//       response.status(200).send('Sorry. Something went wrong!')
//     });
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
