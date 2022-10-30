'use strict';
const axios = require('axios');



async function getMvies(req, res, next){
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
}
class Movies {
  constructor(movieObj) {
    this.title = movieObj.title;
    this.overview = movieObj.overview;
  }
}

module.exports=getMvies;
