require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

let process1 = process.argv[2]

let searchs = function(activity, search){
    if(activity === "concert-this"){
        concert_this(search);
    }
    else if(activity === "spotify-this-song"){
        spotify(search);
    }
    else if(activity === "movie-this"){
        movieFunction(search);
    }
    else if(activity === "do-what-it-says"){
        dowWhatItSays();
    }
    else{
        console.log("-----------------------------------------------");
        console.log("What you chose is not a defined function");
        console.log("My functions are:");
        console.log("'concert-this' *band name*");
        console.log("'spotify-this-song' *song name*");
        console.log("'movie-this' *Movie name*");
        console.log("'do-what-it-says'");
        console.log("-----------------------------------------------");
    }
}

let concert_this = function(concertname) {

}

let spotify = function(song){

}

let movieFunction = function(movie){

}

let dowWhatItSays = function(){

}