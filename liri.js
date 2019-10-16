//Declare all packages

require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var axios = require("axios");
var moment = require('moment');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];

// skip node.exe
process.argv.shift();
// skip name of js file
process.argv.shift();
// skip command

process.argv.shift();

//join all words into a string after index of 2
var subject = process.argv.join(" ");

//check to see what the command is
if (command == "concert-this") {
    searchArtist();
}

else if (command == "spotify-this-song") {
    searchSong();
}

else if (command == "movie-this") {

    //if user didn't type in any movie, search for movie called Mr.Nobody
    if (subject == "") {
        console.log("You should watch Mr.Nobody!");
        subject = "Mr.Nobody";
        searchMovie();
    }
    else {
        searchMovie();
    }
}

else if (command == "do-what-it-says") {
    random();
}

//function used to search for artist in bands in town 
function searchArtist() {
    var artist = subject;
    axios
        .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            //console.log(response.data);
            for (var i = 0; i < response.data.length; i++) {
                var artistResult = "Venue Name: " + response.data[i].venue.name + "\nLocation: " + response.data[i].venue.city + ", " + response.data[i].venue.country + "\nEvent Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY") + "\n-----------------------------------------------------------------------------------";
                console.log(artistResult);
                logText(artistResult);
            }
        })
}

//function used to search for song in spotify
function searchSong() {
    var song = subject;
    spotify.search({ type: 'track', query: song, limit: 5 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        //console.log(data.tracks); 
        for (var index = 0; index < data.tracks.items.length; index++) {

            var songResult = "Artist Name: " + data.tracks.items[index].album.artists[0].name + "\nTrack Name: " + data.tracks.items[index].name + "\nAlbum Name: " + data.tracks.items[index].album.name + "\nPreview URL: " + data.tracks.items[index].preview_url + "\n---------------------------------------------------------------------------------------------------------------------";
            console.log(songResult);
            logText(songResult);
        }
    });
}

//function used to search for a movie in OMDB
function searchMovie() {
    var movie = subject;
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    //console.log(queryUrl);

    axios
        .get(queryUrl).then(function (response) {

            var movieResult = "Title: " + response.data.Title + "\nYear: " + response.data.Year + "\nIMDB Rating: " + response.data.imdbRating + "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\nCountry: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors + "\n-----------------------------------------------------------------------------------";
            console.log(movieResult);
            logText(movieResult);
        })


}
function random() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // Then split it by commas (to make it more readable)
        var dataArr1 = data.split(",");
        command = dataArr1[0];
        subject = dataArr1[1];
        
        console.log("command: " + command);
        console.log("subject: " + subject);
        searchSong();   
      });    
}

//function used to log results in .txt file
function logText(result) {
    fs.appendFile("log.txt", result, function (err) {

        console.log("Added to log.txt File!");

        if (err) {
            console.log(err);
        }
    });
}