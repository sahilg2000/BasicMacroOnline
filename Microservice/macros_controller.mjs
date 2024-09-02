import 'dotenv/config';
import * as macros from './macros_model.mjs';
import express from 'express';

const PORT = process.env.PORT;

const app = express();

/**
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {

    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

/**
* @param {string} unit
* Return true if the unit is "kgs" or "lbs"
*/
function isUnitValid(unit) {
    if (unit === "kgs" || unit === "lbs"){
        return true
    }
    else{
        return false
    }
}

/**
* @param {string} num
* Return true if the number is greater than 0
*/
function isNumAboveZero(num) {
    if (num > 0){
        return true
    }
    else{
        return false
    }
}

/**
* @param {string} str
* Return true if the number is greater than 0
*/
function isNotEmpty(str) {
    if (str.length > 0){
        return true
    }
    else{
        return false
    }
}

app.use(express.json());

/**
 * Create a new macro with the carbs, proteins, and fats provided in the body
 */
app.post('/savedmacros', (req, res) => {
    macros.createMacro(req.body.name, req.body.carbs, req.body.fats, req.body.proteins)
        .then(macro => {
            res.status(201).json(macro);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: "Invalid request" });
        });
});


/**
 * Retrive the macro corresponding to the ID provided in the URL.
 */
app.get('/savedmacros/:_id', (req, res) => {
    const macroId = req.params._id;
    macros.findMacrobyId(macroId)
        .then(macro => { 
            if (macro !== null) {
                res.status(200).json(macro);
            } else {
                res.status(404).json({ Error: "Not found" });
            }         
         })
        .catch(error => {
            res.status(400).json({ Error: "Request failed" });
        });
});

/**
 * Retrieve macros. 
 * If the query parameters include a name, then only the macros for that name are returned.
 * Otherwise, all macros are returned.
 */
app.get('/savedmacros', (req, res) => {
    let filter = {};
    
    if(req.query.name !== undefined){
        filter = { year: req.query.name };
    }
    macros.findMacros(filter, '', 0)
        .then(macros => {
            res.setHeader('Allow-Origin', '*');
            res.status(200).send(macros);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: "Request failed" });
        });});
        
/**
 * Update the macros whose id is provided in the path parameter and set
 * its name, carbs, fats, and proteins to the values provided in the body.
 */
app.put('/savedmacros/:_id', (req, res) => {
    macros.updateMacros({_id: req.params._id}, {name: req.body.name, carbs: req.body.carbs, fats: req.body.fats, proteins: req.body.proteins } )
    .then(numUpdated => {
        if (numUpdated === 1) {
            res.status(200).json({ _id: req.params._id, name: req.body.name, carbs: req.body.carbs, fats: req.body.fats, proteins: req.body.proteins })
        } else {
            res.status(404).json({ Error: "Not found" });
        }
    })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: "Request failed" });
    });   
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});