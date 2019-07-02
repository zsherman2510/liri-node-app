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

var fetchBands = function(bandName) {
  var queryURL =
    "https://rest.bandsintown.com/artists/" +
    bandName +
    "/events?app_id=codingbootcamp";
  axios.get(queryURL).then(function(res) {
    var concerts = res.data;

    if (!concerts.length) {
      console.log("No results found for" + bandName);
      return;
    }
    console.log("Upcoming Events for " + bandName + ":");

    concerts.forEach((concert, i) => {
      console.log(i);
      console.log(
        "Location:" + " " + concert.venue.city + "," + concert.venue.region ||
          concert.venue.country
      );
      console.log("Venue:" + " " + concert.venue.name);
      console.log(
        "Date: " + " " + moment(concert.datetime).format("MM/DD/YYYY")
      );

      // concert.venue.country +
      //   "at" +
      //   concert.venue.name +
      //
    });
  });
};

var fetchMovies = function(movie) {
  if (movie === "") {
    movie = "Mr. Nobody";
  }
  console.log(movie);

  var movieURL = "http://www.omdbapi.com/?t=" + movie + "&apikey=fe946c01";

  axios
    .get(movieURL)
    .then(function(res) {
      var movieData = res.data;

      console.log("Title:" + " " + movieData.Title);
      console.log("Year of Release:" + " " + movieData.Released);
      console.log("IMDB Rating:" + " " + movieData.imdbRating);
      console.log("Rotten Tomatoes:" + " " + movieData.Title);
      console.log("Country:" + " " + movieData.Country);
      console.log("Language:" + " " + movieData.Language);
      console.log("Plot:" + " " + movieData.Plot);
      console.log("Actors:" + " " + movieData.Actors);
    })
    .catch(function(err) {
      console.log(err);
    });
};

var customCmd = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);

    var dataArr = data.split(",");

    if (dataArr.length === 2) {
      commands(dataArr[0], dataArr[1]);
    } else if (dataArr.length === 1) {
      commands(dataArr[0]);
    }
  });
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
};

commandThis(process.argv[2], process.argv.slice(3).join(" "));
