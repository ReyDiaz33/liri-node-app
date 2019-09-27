
// Create a variable to access the keys.js file (which is in the same root directory) to access the api keys that are required
//Creating variables for the required packages (node-spotify-api, axios, fs for read/write, and moment to convert to event date for bandsInTown API)
var keys = require("./keys");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
var striptags = require("striptags");

// Variables for the arguments to be entered by the user in Liri
var appCommand = process.argv[2];
//console.log("appCommand: " + appCommand);
// Use the slice method to account for user's search starting with index 3 position forth because search could have spaces
var userSearch = process.argv.slice(3).join(" ");
//console.log("userSearch: " + userSearch);

//Using switch statement to execute the code appropriate to the appCommand that is inputed from the user
function liriRun(appCommand, userSearch) {
    switch (appCommand) {
        case "spotifyThis":
            getSpotify(userSearch);
            break;

        case "concertThis":
            getBandsInTown(userSearch);
            break;

        case "movieThis":
            getOMDB(userSearch);
            break;

        case "randomThis":
            getRandom();
            break;
        // If appCommand is left blank, return a default message to user
        default:
            console.log("Please enter one of the following commands: 'concertThis', 'spotifyThis', 'movieThis', 'randomThis' in order to continue");
    }
};

//----------Function to search Spotify API
function getSpotify(songName) {
    // Variables for the secret ids for spotify
    var spotify = new Spotify(keys.spotify);
    //console.log("Spotify key: " + spotify);

    if (!songName) {
        songName = "The Sign";
    };
    //console.log("SongName if not a song name: " + songName);

    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        //console.log("Data for searched song: " + data.tracks.items[0]);
        // adding a line break for clarity of when search results begin
        console.log(
        `
        ============================================================
        Artist(s) Name: ${data.tracks.items[0].album.artists[0].name},
        Song Name: ${data.tracks.items[0].name},
        Song Preview Link: ${data.tracks.items[0].href},
        Album: ${data.tracks.items[0].album.name}`);

        // Append text into log.txt file
        var logSong = 
        `
        ======Begin Spotify Log Entry====== 
        Artist: ${data.tracks.items[0].album.artists[0].name},
        Song Name: ${data.tracks.items[0].name},
        Preview Link: ${data.tracks.items[0].href}, 
        Album Name: ${data.tracks.items[0].album.name} 
        ======End Spotify Log Entry======`;

        fs.appendFile("log.txt", logSong, function (err) {
            if (err) throw err;
        });
        //logResults(data)
    });
};

//---------Function to search Bands In Town API
function getBandsInTown(artist) {

    var artist = userSearch;
    var bandQueryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    axios.get(bandQueryURL).then(
        function (response) {
            // console.log(response.data);
            // adding a line break for clarity of when search results begin
            console.log(
            `
            =============================
            Artist: ${response.data[0].lineup} 
            Venue: ${response.data[0].venue.name}
            Venue Location: ${response.data[0].venue.city}
            Date of event: ${moment(response.data[0].datetime).format("MM-DD-YYYY")}
            
            `);

            // Append text into log.txt file
            var logConcert = 
            `======Begin Concert Log Entry======
            Name of the musician: ${response.data[0].lineup} 
            Name of the venue: ${response.data[0].venue.name}
            Venue Location: ${response.data[0].venue.city}
            Date of event: ${moment(response.data[0].datetime).format("MM-DD-YYYY")}
            ======End Concert Log Entry======`;

            fs.appendFile("log.txt", logConcert, function (err) {
                if (err) throw err;
            });
            //logResults(response)
        });
};

//---------Function to search OMDB API
function getOMDB(movie) {
    //console.log("Movie: " + movie);
    //If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    if (!movie) {
        movie = userSearch;
    }
    var movieQueryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    //console.log(movieQueryUrl);

    axios.request(movieQueryUrl).then(
        function (response) {
            // console.log(response.data);
            // adding a line break for clarity of when search results begin
            console.log(
            `
        =============================
        Movie Title: ${response.data.Title}
        Year released: ${response.data.Year}
        IMDB rating: ${response.data.imdbRating}
        Rotten Tomatoes rating: ${response.data.Ratings[1].Value}
        Country where produced: ${response.data.Country}
        Language: ${response.data.Language}
        Actors: ${response.data.Actors}
        Plot: 
        ${response.data.Plot}

            `);

            //logResults(response);
            var logMovie = 
            `
        ======Begin Movie Log Entry======
        Movie Title: ${response.data.Title}
        Year released: ${response.data.Year}
        IMDB rating: ${response.data.imdbRating}
        Rotten Tomatoes rating: ${response.data.Ratings[1].Value}
        Country where produced: ${response.data.Country}
        Language: ${response.data.Language}
        Actors: ${response.data.Actors}
        Plot: 
        ${response.data.Plot}
            ======End Movie Log Entry======`;

            fs.appendFile("log.txt", logMovie, function (err) {
                if (err) throw err;
            });
        });
};

// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
// FUNCTION RANDOM
function getRandom() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);

        } else {
            console.log(data);

            var randomData = data.split(",");
            liriRun(randomData[0], randomData[1]);
        }
      

    });
};

// FUNCTION to log results from the other funtions
function logResults(data) {
    fs.appendFile("log.txt", data, function (err) {
        if (err) throw err;
    });
};


liriRun(striptags(appCommand, userSearch));