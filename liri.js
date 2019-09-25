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





// var spotify = new Spotify(keys.spotify);

// Make it so liri.js can take in one of the following commands:
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says
