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
const path = require('path');
const fs = require('fs');
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


// Routes for writup viewing

router.get('/writeups', (req, res) => {
    res.render('writeups/writeups', { title: 'Writeups' });
});

router.get('/writeups/:id', (req, res) => {
    const writeupId = req.params.id;
    const writeupFile = path.join(__dirname, '..', 'docs/writeups', `${writeupId}.md`);
    if (fs.existsSync(writeupFile)) {
        res.render('writeups/writeup', { title: `Writeup ${writeupId}`, writeupFile: `${req.get('host')}/docs/writeups/${writeupId}.md` });
    } else {
        res.status(404).send('Writeup not found');
    }

   
});











// Auth pages
router.get('/login', (req, res) => {
    res.render('auth/login', { title: 'Login' });
});
router.get('/register', (req, res) => {
    res.render('auth/register', { title: 'Register' });
});








module.exports = router;