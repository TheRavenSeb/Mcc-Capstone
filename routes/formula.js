/*

name: Caleb Thomas
date: 10/20/26
updated: 10/20/26
class: Senior Capstone Project
file: ./routes/formulas.js
========================================================
the routes files for formula routes for the website coming out of the base url
========================================================
*/

const express = require('express');
const router = express.Router();
const Formula = require('../schemas/formula'); // Import the Formula model


 function isAuthenticated(req, res, next) {
    if (req.cookies && req.cookies.token) {
        // Here you would typically verify the token and check if it's valid
        // For simplicity, we'll just check if the token exists
        return next();
    } else {
        res.redirect('/login'); // Redirect to login if not authenticated
    }
}
router.get('/search/:id', (req, res) => {

    const formulaId = req.params.id;
    Formula.findById(formulaId).then(formula => {
        if (!formula) {
            return res.status(404).send('Formula not found');
        }
        res.render('formulas/formula', { title: 'Formula Details', formula: formula });
    });

});

router.get('/all-formulas', (req, res) => {
    res.render('formulas/allFormulas', { title: 'All Formulas' });
});

router.get('/all-data', async (req, res) => {
    try {
        const formulas = await Formula.find().sort({ createdAt: -1 }).lean();
        res.json({ formulas });
    } catch (error) {
        console.error('Error loading formulas:', error);
        res.status(500).json({ error: 'Unable to load formulas' });
    }
});

router.get('/create',isAuthenticated, (req, res) => {
    res.render('formulas/formulaCreate', { title: 'Formula creation' });
});

router.post('/create', (req, res) => {
    const { Name, Variables, Formula: formulaString, Description, Tags, Contributor, Constances } = req.body;

    const newFormula = new Formula({
        Name,
        Variables: (Variables || '').split(',').map(v => v.trim()).filter(Boolean),
        Formula: formulaString,
        Description,
        Tags: (Tags || '').split(',').map(t => t.trim()).filter(Boolean),
        Contributor: (Contributor || '').split(',').map(c => c.trim()).filter(Boolean),
        Constances: Constances ? JSON.parse(Constances) : {}
    });

    newFormula.save()
        .then(() => {

            console.log('Formula saved successfully');
            // Redirect to the formala page by its id
            res.redirect(`/formula/search/${newFormula._id}`);
        })
        .catch((error) => {
            console.error('Error saving formula:', error);
            res.status(500).send('Error saving formula');
        });

});

router.get('/formula/:filter', (req, res) => {
    const filter = req.params.filter;
    

    Formula.find({ Tags: filter }).then(formulas => {
        if (!formulas || formulas.length === 0) {
            return res.status(404).json({ error: 'No formulas found for the given filter' });
        }

    return res.json({ message: `Filter formulas by: ${filter}`, formulas: formulas}); // Replace with actual filtered formulas
});

});
router.get('/all', (req, res) => {
    res.render('formulas/allFormulas', { title: 'All Formulas' });
});














module.exports = router;