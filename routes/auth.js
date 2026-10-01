/*

name: Caleb Thomas
date: 9/28/26
updated: 9/29/26
class: Senior Capstone Project
file: ./routes/auth.js
========================================================
the routs files for authentication and authorization for the website
========================================================
*/

//import required modules

const express = require('express');
const router = express.Router();
const jwtHandler = require('../functions/jwtHandler');
const bkfd2Password = require("pbkdf2-password");
const User = require('../schemas/user');

const hasher = bkfd2Password(); // Create a hasher instance


/**
 * @route POST /login
 * @description Login a user
 * @access Public
 */
router.post('/login', (req, res) => {
    const { username, password } = req.body;
     User.findOne({ Username: username }).then(user => {

    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    hasher({ password, salt: user.Salt }, (err, pass, salt, hash) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (hash === user.Hash) {
            const token = jwtHandler.generateToken(user); // Generate a JWT token for the user
             res.cookie('token', token, { expires: new Date(Date.now() + 900000), httpOnly: true });
            res.status(201).json({ message: 'User logged in successfully', token });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });
});


});
/**
 * @route POST /register
 * @description Register a new user
 * @access Public
 */
router.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Check if the user already exists
     User.findOne({ username: username }).then(existingUser => {
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }
})
    .catch(err => {
        return res.status(500).json({ error: 'Internal server error' });
    });

    // Hash the password
    hasher({ password }, (err, pass, salt, hash) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }

        // Create a new user
        const newUser = new User({
            Username: username,
            Email: email,
            Salt: salt,
            Hash: hash
        });

        // Save the new user to the database
        newUser.save().then((err) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error' });
            }

            // Generate a JWT token for the new user
            const token = jwtHandler.generateToken(username);

            //add to cookie and redirect to home page
            res.cookie('token', token, { expires: new Date(Date.now() + 900000), httpOnly: true });
            res.status(201).json({ message: 'User registered successfully', token });
        
    })
    });
});

/**
 * @route GET /logout
 * @description Logout a user
 * @access Public
 */
router.get('/logout', (req, res) => {
    res.send('Logout route');
});


router.get("/profile", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]; // Get the token from the Authorization header
    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }
    const decoded = jwtHandler.verifyToken(token, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Invalid token" });
        }
        const user = User.find(u => u.username === decoded.userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ username: user.username, email: user.email, dateJoined: user.dateJoined });
    });
});

module.exports = router;