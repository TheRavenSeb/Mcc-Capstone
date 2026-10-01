/*

name: Caleb Thomas
date: 9/22/26
updated: 9/29/26
class: Senior Capstone Project
file: app.js
========================================================
Main app start file to run the website via express.js 
========================================================
*/


const path = require('path');
require('dotenv').config();

// importing express and middleware
const express = require('express');

const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

//import database modules

const Mongo = require('./functions/mongoHandler.js');
const mongoose = require('mongoose');


//import route modules
const importRoutes = require('./functions/routeImporter.js');
const routeFolderPath = path.join(__dirname, 'routes'); // Path to the routes folder

Mongo(); // intialize mongo connection

const app = express(); //init app for express

const PORT = process.env.PORT || 3000; //set port to env variable or 3000

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 1000, // Limit each IP to 20 requests per window
  message: "Too many requests, please try again later.",
  standardHeaders: true, // Return rate limit info in RateLimit-* headers
  legacyHeaders: false, // Disable X-RateLimit-* headers
});
// express stuff

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use(express.urlencoded({ extended: true })); // To parse form data
app.use(bodyParser.json());
app.use(cookieParser());
app.use(limiter) // Apply rate limiting to all routes
importRoutes(app, routeFolderPath); // Import all routes








// start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





