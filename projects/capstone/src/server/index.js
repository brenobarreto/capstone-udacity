const dotenv = require('dotenv');
dotenv.config();

const fetch = require("node-fetch");

var path = require('path')
const express = require('express')
const bodyParser = require('body-parser');
var cors = require('cors');

var aylien = require("aylien_textapi");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors());

app.use(express.static('dist'))

// console.log(__dirname)

let sentiment = {};

// set aylien API credentias
var textapi = new aylien({
    application_id: process.env.AYLIEN_API_ID,
    application_key: process.env.AYLIEN_API_KEY
  });

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('/dist/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(3000, function () {
    console.log('Listening on port 3000...')
})


// Function Get Sentiment
const getSentiment = async (tweet) => {
    return new Promise((resolve, reject) => {
        fetch(`https://api.aylien.com/api/v1/sentiment?text=${tweet}&mode=tweet`, {
        method: 'POST',
        headers: {
            'X-AYLIEN-TextAPI-Application-ID': process.env.AYLIEN_API_ID,
            'X-AYLIEN-TextAPI-Application-Key': process.env.AYLIEN_API_KEY
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


app.post('/getSentiment', (req, res) => {
    console.log(req.body);
    let tweet = req.body.value;
    getSentiment(tweet).then( data => { return res.json(data) } );
})