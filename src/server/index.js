const dotenv = require('dotenv');
dotenv.config();

const fetch = require("node-fetch");

var path = require('path')
const express = require('express')
const bodyParser = require('body-parser');
var cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors());

app.use(express.static('dist'))

let coordinates = {};

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('/dist/index.html'))
})

// Server
app.listen(3000, function () {
    console.log('Listening on port 3000...')
})

/*------------------------------------------------------*/
/*------------------------------------------------------*/

// Get Coordinates Function - Geonames API
const getCoordinates = async (city) => {
    return new Promise((resolve, reject) => {
        fetch(`http://api.geonames.org/searchJSON?name_equals=${city}&username=${process.env.GEONAMES_USERNAME}`)
        .then((res) => {
            if (res.status != 200) {
              console.log("Looks like there's been a problem fetching the coordinates.");
              return reject();
            }
            res.json().then((data) => {
                coordinates.lat = data.geonames[0].lat;
                coordinates.lng = data.geonames[0].lng;
                resolve(coordinates);
            });
        });
    });
}

/*------------------------------------------------------*/
/*------------------------------------------------------*/

// Get Current Weather Function - Weatherbit API
const getCurrentWeather = async (coordinates) => {
    return new Promise((resolve, reject) => {
        fetch(`https://api.weatherbit.io/v2.0/current?lat=${coordinates.lat}&lon=${coordinates.lng}&key=${process.env.WEATHERBIT_API_KEY}`, {
        method: 'POST'
        }).then((res) => {
            if (res.status != 200) {
              console.log("Looks like there's been a problem fetching the weather.");
              return reject();
            }
            res.json().then((data) => {
                let currentWeather = "";
                currentWeather = data.data[0].weather.description;
                console.log(currentWeather);
                resolve(currentWeather);
            });
        });
    });
}

/*------------------------------------------------------*/
/*------------------------------------------------------*/

// Get Future Weather Function - Weatherbit API
const getFutureWeather = async (coordinates, date) => {
    return new Promise((resolve, reject) => {
        fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${coordinates.lat}&lon=${coordinates.lng}&key=${process.env.WEATHERBIT_API_KEY}`, {
        method: 'POST'
        }).then((res) => {
            if (res.status != 200) {
              console.log("Looks like there's been a problem fetching the weather.");
              return reject();
            }
            res.json().then((data) => {
                let futureWeather = "";
                futureWeather = data.data[0].weather.description;
                console.log(futureWeather);
                resolve(futureWeather);
            });
        });
    });
}

/*------------------------------------------------------*/
/*------------------------------------------------------*/

// Coordinates and Weather Wrapper
app.post('/getData', (req, res) => {
    console.log(req.body);
    
    let city = req.body.city;
    let date = req.body.date;
 
    getCoordinates(city).then( data => { 
        let coord = {};
        coord.lat = data.lat;
        coord.lng = data.lng;
        console.log(coord);
        return coord;
    }).then( (coord) => {
        if (date == date){
            getCurrentWeather(coord).then( data => { 
                return res.json(data) 
            } );
        } else {
            getFutureWeather(coord, date).then( data => { 
                return res.json(data) 
            } );
        }
    });

})

/*------------------------------------------------------*/
/*------------------------------------------------------*/