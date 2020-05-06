# Travel Planner

This project is part of the Front-End Development Udacity nanodegree.
Author: Breno Barreto

## Features

This is a Travel Planner. The user informs a city where they want to travel and the date when they want to travel. The website then calls the Geonames API to get the coordinates of the place informed by the user. 

Using these coordinates, the website calls another API (Weatherbit) to get the current weather in that city or the weather forecast, in case the date is more than 7 days after the current date.

The website also calls the Pixabay API to get an image of the city informed by the user.

## JS Files

Two of the most important JavaScript files in this projec are the '/src/client/js/formHandler.js', which handles the user submit on the client side, and the '/src/server/index.js', which lives on the server side and contains the calls to all the external APIs. 

## Tools and technologies

This project was built with:
- **HTML** and **Sass**
- **Asynchronous JavaScript** to call the APIs
- **Express** for dealing with routes
- **Webpack** as the building tool 
- **Service Workers** to allow offline access
- **Github** as the version control tool
- **Babel** to allow using ES6 syntax

It also uses Express modules that allow some important functionalities, such as:
- **body-parser** to parse JSON and URL-encoded request bodies
- **CORS** to allow cross-origin requests
- **node-fetch** to allow using fetch on server side