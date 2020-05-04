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

// console.log(__dirname)

let sentiment = {};

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('/dist/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(3000, function () {
    console.log('Listening on port 3000...')
})

/*------------------------------------------------------*/
/*------------------------------------------------------*/

// Get Coordinates Function
const getCoordinates = async (city) => {
    return new Promise((resolve, reject) => {
        fetch(`https://api.aylien.com/api/v1/sentiment?text=${city}&mode=tweet`)
        .then((res) => {
            if (res.status != 200) {
              console.log("Looks like there's been a problem.");
              return reject();
            }
            res.json().then((data) => {
                sentiment.polarity = data.polarity;
                sentiment.subjectivity = data.subjectivity;
                console.log(sentiment);
                resolve(sentiment);
            });
        });
    });
}

// Get Coordinates Call
app.post('/getCoordinates', (req, res) => {
    console.log(req.body);
    let city = req.body.value;
    getCoordinates(city).then( data => { return res.json(data) } );
})

/*------------------------------------------------------*/
/*------------------------------------------------------*/

// Get Weather Function
const getWeather = async (coordinates) => {
    return new Promise((resolve, reject) => {
        fetch(`https://api.aylien.com/api/v1/sentiment?text=${coordinates}&mode=tweet`, {
        method: 'POST',
        headers: {
            'key': process.env.WEATHERBIT_API_KEY
        }
        }).then((res) => {
            if (res.status != 200) {
              console.log("Looks like there's been a problem.");
              return reject();
            }
            res.json().then((data) => {
                sentiment.polarity = data.polarity;
                sentiment.subjectivity = data.subjectivity;
                console.log(sentiment);
                resolve(sentiment);
            });
        });
    });
}

// Get Weather Call
app.post('/getData', (req, res) => {
    console.log(req.body);
    
    let city = req.body.city;
    getCoordinates(city).then( data => { return res.json(data) } );
    
    let coordinates = req.body.coord;
    getWeather(coordinates).then( data => { return res.json(data) } );
})

/*------------------------------------------------------*/
/*------------------------------------------------------*/