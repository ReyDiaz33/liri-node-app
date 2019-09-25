// REQUIRE .env File to link to liri.js
require("dotenv").config();

// REQUIRE request to activate api keys in liri.js utilizing const because it wont change
const keys = require("./keys");

// REQUIRE fs File System utilizing const because it will never change
const fs = require("fs");

// REQUIRE request
let request = require("request");

// REQUIRE moment
const moment = require("moment");

// INITILIZE SPOTIFY
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

// OMDB and BANDS-In-Town API's
let omdb = (keys.omdb);
let bandsInTown = (keys.bandsInTown)

// User Command and Input
let userInput = process.argv[2];
let userQuery = process.argv.slice(3).join(" ");

// functions
function userCommand(userInput, userQuery) {
    userCommand(userInput, userQuery);
    function concertThis() {
    // switch based on user's command
    switch(userInput) {
        case "concert-this":
            concertThis();
            break;
        case "spotify-this":
            spotifyThisSong();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-this":
            doThis(userQuery);
            break;
        default:
            console.log("Invalid Entry");
            break;
    }
}
};

function spotifyThisSong() { 

};

function movieThis() {

};

function doThis() {

};




// var spotify = new Spotify(keys.spotify);

// Make it so liri.js can take in one of the following commands:
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says
