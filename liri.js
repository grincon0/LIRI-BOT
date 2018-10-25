require("dotenv").config();
const Spotify = require('node-spotify-api');
const axios = require('axios');
const fs = require('fs');


let key = require("./keys.js");
let userInput1 = process.argv[2];
let userInput2 = process.argv[3];

const log = (data) => {
    
        fs.appendFile("log.txt", `\r\n\r\n${data}`, function(err){
            if(err){
                console.log(err);
            }else{
                console.log('Log has been updated!');
            }
            
        });
        
}

const getSongInfo = (name) => {
    let spotify = new Spotify(key.spotify);
    spotify.search({ type: 'track', query: name }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(` Song Name : ${name.toUpperCase()}\n Album : ${data.tracks.items[0].album.name}\n Artist : ${data.tracks.items[0].album.artists[0].name}
        URL : ${data.tracks.items[0].album.external_urls.spotify}`);
    });
}


const getMovieInfo = (name) => {
    axios.get(`http://www.omdbapi.com/?t=${name}&plot=short&apikey=trilogy`)
        .then(function (response) {
            console.log(`${response.data.Title}\n${response.data.Year}\n${response.data.Rated}\n${response.data.Country}\n${response.data.Language}\n${response.data.Plot}\n${response.data.Actors}\n${response.data.Ratings[1].Value}\n${response.data.imdbRating}\n`);
        })
        .catch(function (error) {
            console.log(error);
        });
}

const getBandInfo = (name) => {
    axios.get(`https://rest.bandsintown.com/artists/${name}/events?app_id=codingbootcamp`)
        .then(function (response) {
            console.log(response)
        }).catch(function (error) {
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