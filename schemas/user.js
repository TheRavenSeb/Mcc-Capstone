/*

name: Caleb Thomas
date: 9/22/26
class: Senior Capstone Project
file: user.js
========================================================
mongoDB schema for user account data  
========================================================
*/
const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  Username: { type: String, required: true, unique: true },
  Hash: { type: String, required: true },
  Salt: { type: String, required: true },
  Email: { type: String, required: true, unique: true }, 
  DateJoined: { type: Date, default: Date.now },


});
module.exports = mongoose.model('User', schema);