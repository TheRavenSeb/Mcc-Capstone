/*

name: Caleb Thomas
date: 9/22/26
class: Senior Capstone Project
file: formula.js
========================================================
mongoDB schema for formula data  
========================================================
*/
const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  Name: { type: String, required: true, unique: true },
  Variables: { type: [String], required: true },
  Formula: { type: String, required: true },
  Description: { type: String, required: true },
  Tags: { type: [String], required: true },
  contributor: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  //Constances: { type: Map, of: Number, required: false }, //may use this later to store constants for formulas, but not needed for now

});
module.exports = mongoose.model('Formula', schema);


