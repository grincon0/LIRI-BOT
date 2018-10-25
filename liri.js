const env = require("dotenv").config();
//const spotKey = new Spotify(keys.spotify);

//const Spotify = require('node-spotify-api');
const axios = require('axios');
/*
const spotify = new Spotify({
    id: spotKey.keys.spotify.id,
    secret: spotKey.keys.spotify.secret,
});
*/
let userInput1 = process.argv[2];
let userInput2 = process.argv[3];


const getSongInfo = (name) => {
    spotify.search({ type: 'track', query: name }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
    });
}


const getMovieInfo = (name) => {
    axios.get(`http://www.omdbapi.com/?t=${name}&plot=short&apikey=trilogy`)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

const getBandInfo = (name) => {
    axios.get(`https://rest.bandsintown.com/artists/${name}/events?app_id=codingbootcamp`)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}



switch (userInput1) {
    case 'spotify-this-song':
        getSongInfo(userInput2);
        break;
    case 'movie-this':
        getMovieInfo(userInput2);
        break;
    case 'concert-this':
        getBandInfo(userInput2);
        break;
    default:
        break;
}