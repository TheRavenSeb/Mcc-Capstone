/*

name: Caleb Thomas
date: 9/29/26
updated: 9/29/26
class: Senior Capstone Project
file: ./routes/base.js
========================================================
the routes files for basic routes for the website coming out of the base url
========================================================
*/

const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

router.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact' });
});





// Auth pages
router.get('/login', (req, res) => {
    res.render('auth/login', { title: 'Login' });
});
router.get('/register', (req, res) => {
    res.render('auth/register', { title: 'Register' });
});








module.exports = router;