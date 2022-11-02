'use strict';
const axios = require('axios');

let cache = {};

// TODO need to create a key - for datato store
//TODO if the things AND is in a valid timeframe ...send that data
// TODO if the the thing DO NOT esist - call API & cache the returned data

async function getMvies(req, res, next) {
  let cityName = req.query.searchQuery;
  try {
    let key = queryFromFrontEnd + 'photo';

    //-------IF data exists and is in a valid timeframe(cache[key].timestamp) ... send that data
    if (cache[key] && (Date.now() - cache[key].stamp < 1000 * 30)) {
      console.log('cache was hit , img present');
      res.status(200).send(cache[key].data);

    } else {
      console.log('cache missed -- no img present');
      let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE}&query=${cityName}&language=en-US&page=1&include_adult=false`;
      let movieData = await axios.get(movieURL);

      let dataSend = movieData.data.results.map(movie => new Movies(movie));
      // ADD API return to CACHE
      cache[key] = {
        data:dataSend,
        timestamp: Date.now(),
      };

      res.status(200).send(dataSend);

    }

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

module.exports = getMvies;
