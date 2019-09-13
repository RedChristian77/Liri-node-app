require("dotenv").config();
let axios = require("axios");
var keys = require("./keys.js");
let Spotify = require("node-spotify-api");
let fs = require("fs");

var spotify = new Spotify(keys.spotify);

let process1 = process.argv[2];
let process2 = process.argv[3];

let searchs = function(activity, search){
    let saveSearch = "\n" +activity + "," + search + ",";
    fs.appendFile("random.txt",saveSearch,function(err){
        if(err){
            console.log(err);
        }
    })

    if(activity === "concert-this"){
        concert_this(search);
    }
    else if(activity === "spotify-this-song"){
        spotify_song(search);
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
    let artist = concertname;
    console.log("Loading your Request");
    console.log("---------------------");
    axios("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function(response){
        console.log("Venue: " + response.data[0].venue.name);
        console.log("Location: " + response.data[0].venue.city + "," + response.data[0].venue.country);
    }).catch(function (error){
        console.log("Their was an error with your request");
    })
}

let spotify_song = function(song){
    spotify.search({ type: 'track', query: song}, function(err,data){
        if(err){
            return console.log("Error occurred:" + err);
        }
        console.log("---------------------------------------------------------------");
        let artistsString = "";
        data.tracks.items[0].artists.forEach(element => {
            artistsString += element.name + ", ";
        });
        console.log("Artist(s): " + artistsString);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Link Preview: " + data.tracks.items[0].external_urls.spotify);
        console.log("From Album: " + data.tracks.items[0].album.name)
        console.log("--------------------------------------------------------------------------")
    })
}

let movieFunction = function(movie){
    let movieName = movie.replace(/\s+/g, "+");
    axios("http://www.omdbapi.com/?apikey=trilogy&t="+movie).then(function(response){
        console.log("-------------------------------------------------------------------------------");
        console.log("Title: " + response.data.Title);
        console.log("Release Year: " + response.data.Year);
        console.log("IMBD Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Score: " + response.data.Ratings[1].Value);
        console.log("Country Produced: " + response.data.Country);
        console.log("Language : " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
        console.log("--------------------------------------------------------------------------------");
    })
}

let dowWhatItSays = function(){
    fs.readFile("random.txt", "utf8", function(error,data) {
        if(error){
            return console.log(error)
        }
        let dataInfo = data.split(",");
        searchs(dataInfo[0],dataInfo[1]);
    })

}

searchs(process1,process2);