/*

name: Caleb Thomas
date: 9/28/26
updated:9/29/26
class: Senior Capstone Project
file: routeImporter.js
========================================================
a module to import all the routes for the website
========================================================
*/

//import required modules
const fs = require('fs');
const path = require('path');

async function importRoutes(app, routeFolderPath) {

    // Read all files in the route folder
    const routeFiles = fs.readdirSync(routeFolderPath);

    for (const file of routeFiles) {
        const fileName = path.basename(file, '.js');
        var routePathName = `/${fileName}`; // Create a route path based on the file name
        if (fileName === 'base') {
            // If the file is named 'base.js', set the route path to '/'
            routePathName = '/';
        }
        // Import the route module
        const routeModule = require(path.join(routeFolderPath, file));
        app.use(routePathName, routeModule); // Use the route module with the app
        console.log(`[RouteImporter] Imported route: ${routePathName} from ${file}`);
    }
}

module.exports = importRoutes;
