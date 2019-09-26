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



// ---------------------------------------------------------------------------------------------------
// functions
function userCommand(userInput, userQuery) {
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

};
userCommand(userInput, userQuery);
// ------------------------------------------------------------------------------------------------------------------------

function concertThis() {
    var bandsInTown = "codingbootcamp";

    console.log(`\n - - - - -\n\nSearching For...${userQuery}'s next show...`);
    request("https://rest.bandsintown.com/artists/" + userQuery + "events?app_id=" + bandsInTown)
    if (!error && Response.statusCode === 200){
        for (i = 0; i < 1; i++){
            console.log(
                `FOUND IT! Is this hat you were looking for...
                Artist: ${userBand[i].lineup[0]},
                Venue: ${userBand[i].venue.name},
                Location: ${userBand[i].venue.latitude},
                Venue City: ${userBand[i].venue.city},${userBand[i].venue.country}
                `)
            let concertDate = moment(userBand[i].datetime).format("MM/DD/YYYY hh:00 A");
            console.log(`Date and Time: ${concertDate}\n\n- - - - - -`);
        }
        } else { 
            console.log("NOT FOUND!")
        }
};
concertThis();
// ------------------------------------------------------------------------------------------------------------------------

function spotifyThisSong() { 
console.log(`\n- - - - - - \n\nSearching for...${userQuery}`);

if (!userQuery) { userQuery = "the sign ace of base"};

spotify.search({ type: "track", query: userQuery, limit: 1 }, function(error, data){
    if (error){
        return console.log("Error!" + error);

    }
        let spotifyArr = data.tracks.items;

        for (i = 0; i < spotifyArr.length; i++) {
            console.log(
                `FOUND IT!
                Artist: ${data.tracks.items[i].album.artist[0].name}
                Song: ${data.tracks.items[i].name},
                Spotify Link: ${data.tracks.items[i].external_urls.spotify},
                Album: ${data.tracks.items[i]}

                `
            );
        }
})
};
spotifyThisSong();
// ------------------------------------------------------------------------------------------------------------------------

function movieThis() {
    var omdbURL = "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";

};
movieThis();
// ------------------------------------------------------------------------------------------------------------------------

function doThis() {
// reads from the txt file
};
doThis();
// ------------------------------------------------------------------------------------------------------------------------




