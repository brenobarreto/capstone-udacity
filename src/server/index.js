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

const today = new Date();
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
                resolve(currentWeather);
            });
        });
    });
}

/*------------------------------------------------------*/
/*------------------------------------------------------*/

// Get Future Weather Function - Weatherbit API
const getFutureWeather = async (coordinates, diffInDays) => {
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

                futureWeather = data.data[diffInDays].weather.description;
                resolve(futureWeather);
            });
        });
    });
}

/*------------------------------------------------------*/
/*------------------------------------------------------*/


// Get Image - Pixabay API
const getCityImage = async (city) => {
    return new Promise((resolve, reject) => {
        fetch(`https://pixabay.com/api/?q=${city}&key=${process.env.PIXABAY_API_KEY}`, {
        method: 'GET'
        }).then((res) => {
            if (res.status != 200) {
              console.log("Looks like there's been a problem fetching the image.");
              return reject();
            }
            res.json().then((data) => {
                let imageURL;
                imageURL = data.hits[0].webformatURL;
                resolve(imageURL);
            });
        });
    });
}

/*------------------------------------------------------*/
/*------------------------------------------------------*/


// Coordinates and Weather Wrapper
app.post('/getData', (req, res) => {
    let city = req.body.city;
    let date = req.body.date;
 
    getCoordinates(city).then( data => { 
        let coord = {};
        coord.lat = data.lat;
        coord.lng = data.lng;
        return coord;
    }).then( (coord) => {

        const futureDate = new Date(date);
        const diffInTime = futureDate.getTime() - today.getTime();
        const diffInDays = Math.round(diffInTime / (1000 * 3600 * 24));

        if (diffInDays >= 0 && diffInDays <= 7){
            getCurrentWeather(coord).then( data => { 
                return res.json({'weather': data, 'current': true}) 
            } );
        } else if (diffInDays > 7 && diffInDays < 16){
            getFutureWeather(coord, diffInDays).then( data => { 
                return res.json({'weather': data, 'current': false}) 
            } );
        } else if (diffInDays < 0) {
            return res.json({'weather': "Please, inform a future date.", 'current': false});
        } else {
            return res.json({'weather': "There's no weather information for this date", 'current': false});
        }
    });

})

app.get('/getImage', (req, res) => {
    let city = req.query.city;
    getCityImage(city)
    .then( data => {
        return res.json(data);
    })
})

/*------------------------------------------------------*/
/*------------------------------------------------------*/