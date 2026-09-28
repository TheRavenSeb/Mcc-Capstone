/*
name: Caleb Thomas
date: 9/22/26
class: Senior Capstone Project
file: mongoHandler.js
========================================================
A module for handling connection to mongoDb  
========================================================
*/

const mongoose = require('mongoose');
// env variables
require('dotenv').config();

async function Mongo(){
const mongoUrl = process.env.MongoURI;


//conenct to database
mongoose.connect(mongoUrl, {
}).then(() => {
    console.log('[Mongo] Connected to MongoDB');
}).catch((err) => {
    console.error('[Mongo] Error connecting to MongoDB:', err);
});}

module.exports = Mongo;
