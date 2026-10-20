/*

name: Caleb Thomas
date: 9/28/26
updated: 9/29/26
class: Senior Capstone Project
file: jwtHandler.js
========================================================
a module to handle jwt creation and verification for the website authentication system
========================================================
*/
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET; // Replace with your actual
//will return a jwt token for the user to use for authentication


/**
 * Generates a JWT token for the given user.
 * @param {Object} user 
 * @param {String} expires = "1h"
 * @returns {String} The generated JWT token.
 */
function generateToken(user, expires = '1h') {
    const token = jwt.sign(
    { userId: user.Username },
    secretKey,
    { expiresIn: expires }
  );

  return token;
}

/**
 * Verifies a JWT token.
 * @param {JwtToken} token 
 * @returns {Object|undefined} The decoded token if valid, otherwise undefined.
 */
function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (err) {
        console.error('Error verifying token:', err);
        return undefined;
    }

}

module.exports = {
    generateToken,
    verifyToken
};


