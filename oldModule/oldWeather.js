'use strict';
const axios = require('axios');

async function getWeather(request, response, next){
  let lat = request.query.lat;
  let lon = request.query.lon;
  let weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&units=I&key=${process.env.REACT_APP_WEATHER}`;

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
}
class Forecast {
  constructor(cityObj) {
    this.weather = cityObj.weather.description;
    this.date = cityObj.valid_date;
  }
}

module.exports=getWeather;
