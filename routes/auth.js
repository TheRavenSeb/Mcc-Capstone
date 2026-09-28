/*

name: Caleb Thomas
date: 9/28/26
updated: 9/28/26
class: Senior Capstone Project
file: ./routes/auth.js
========================================================
the routs files for authentication and authorization for the website
========================================================
*/

const express = require('express');
const router = express.Router();


router.get('/login', (req, res) => {
    res.send('Login route');
});

router.get('/register', (req, res) => {
    res.send('Register route');
});
router.get('/logout', (req, res) => {
    res.send('Logout route');
});

module.exports = router;