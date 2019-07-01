require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var spotify = new spotify(keys.spotify);

var commands = function(caseData, functionData) {
  switch (caseData) {
    case "concert-this":
      console.log("concert this");
      fetchBands(functionData);
      break;
    case "spotify-this-song":
      console.log("spotify-this-song");
      fetchSpotify(functionData);
      break;
    case "movie-this":
      console.log("movie this");
      fetchMovies(functionData);
      break;
    case "do-what-it-says":
      console.log("do what it says");
      customCmd(functionData);
      break;
    default:
      console.log("Liri doesnt know that");
  }
};
