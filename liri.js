//executes env config
require("dotenv").config();

//inits packages
const Spotify = require('node-spotify-api');
const axios = require('axios');
const fs = require('fs');
const moment = require('moment');

//imports API key directed from key.js and
let key = require("./keys.js");

//get arguments that will be used by the app to recieve data through the APIs
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

const doFromTxt = () => {
    fs.readFile("random.txt", "utf8", function(error, data){
        getSongInfo(data);
    })
}

const getSongInfo = (name) => {
    let spotify = new Spotify(key.spotify);
    spotify.search({ type: 'track', query: name }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(`Song Name : ${name.toUpperCase()}\nAlbum : ${data.tracks.items[0].album.name}\nArtist : ${data.tracks.items[0].album.artists[0].name}\nURL : ${data.tracks.items[0].album.external_urls.spotify}`);
    });
}


const getMovieInfo = (name) => {

    if(!name){
        name = "Mr.Nobody";
    }
    axios.get(`http://www.omdbapi.com/?t=${name}&plot=short&apikey=trilogy`)
        .then(function (response) {
            console.log(`${response.data.Title}\n${response.data.Year}\n${response.data.Rated}\n${response.data.Country}\n${response.data.Language}\n${response.data.Plot}\n${response.data.Actors}\n${response.data.Ratings[1].Value}\n${response.data.imdbRating}\n`);
        })
        .catch(function (error) {
            console.log(error);
        });
}

const getConcertInfo = (name) => {
    axios.get(`https://rest.bandsintown.com/artists/${name}/events?app_id=codingbootcamp`)
        .then(function (response) {
            if(!response.data.length){
                console.log(`No upcoming concerts for ${name}`);
            }else{
                let source = response.data;
                for(let i =0; i < source.length; i++){
                    console.log(`\nLocation : ${source[i].venue.city},${source[i].venue.country}\nVenue : ${source[i].venue.name}\nDate : ${moment(source[i].datetime).format("MM/DD/YYYY")} \n`);
                }
            }
        }).catch(function (error) {
            console.log(error);
        });
}


//initializes on execution

switch (userInput1) {
    case 'spotify-this-song':
        getSongInfo(userInput2);
        break;
    case 'movie-this':
        getMovieInfo(userInput2);
        break;
    case 'concert-this':
        getConcertInfo(userInput2);
        break;
    case 'do-what-it-says':
        doFromTxt();
        break;
    default:
        break;
}