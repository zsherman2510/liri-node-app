console.log("js running");

require("dotenv").config();

console.log("back here");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);

var getArtistNames = function(artist) {
  return artist.name;
};
var fetchSpotify = function(songName) {
  spotify.search(
    {
      type: "track",
      query: songName
    },
    function(err, data) {
      if (err) {
        console.log("Error occurred:" + err);
        return;
      }

      var songs = data.tracks.items;
      songs.forEach(function(song, i) {
        console.log(i);
        console.log("artist(s):" + song.artists.map(getArtistNames));
        console.log("song name:" + song.name);
        console.log("preview song:" + song.preview_url);
        console.log("album:" + song.album.name);
        console.log("----------------------------");
      });
    }
  );
};

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

var commandThis = function(argOne, argTwo) {
  commands(argOne, argTwo);
  console.log(process.argv);
};

commandThis(process.argv[2], process.argv.slice(3).join(" "));
