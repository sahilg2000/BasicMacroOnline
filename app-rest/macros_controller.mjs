import 'dotenv/config';
import * as macros from './macros_model.mjs';
import express from 'express';
import proxy from 'express-http-proxy';

const PORT = process.env.PORT;

const app = express();
app.use('/proxy', proxy('http://localhost:5000/'));
app.use('/barproxy', proxy('http://localhost:6000/'));


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

/**
* @param {object} req_body
* Return true if the request body input is valid
*/
function isValid(req_body){
    if (isNumAboveZero(req_body.weight) 
    && isNotEmpty(req_body.name)){
        return true;
    } else {
        return false;
    };
}

app.use(express.json());

/**
 * Create a new macro with the carbs, proteins, and fats provided in the body
 */
app.post('/macros', (req, res) => {
    if (isValid(req.body) === true){
        macros.createMacro(req.body.name, req.body.weight, req.body.carbs, req.body.fats, req.body.proteins)
            .then(macro => {
                res.status(201).json(macro);
            })
            .catch(error => {
                console.error(error);
                res.status(400).json({ Error: "Invalid request" });
            });
    } else {
        console.error(`number validity, weight: ${isNumAboveZero(req.body.weight)}, carbs: ${isNumAboveZero(req.body.carbs)}, fats: ${isNumAboveZero(req.body.fats)}, proteins: ${isNumAboveZero(req.body.proteins)}  `);
        res.status(400).json({ Error: "Invalid request" });
    }
});


/**
 * Retrive the macro corresponding to the ID provided in the URL.
 */
app.get('/macros/:_id', (req, res) => {
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
app.get('/macros', (req, res) => {
    let filter = {};

    
    if(req.query.name !== undefined){
        filter = { year: req.query.name };
    }
    if(req.query.weight !== undefined){
        filter = { year: req.query.weight };
    }
    if(req.query.carbs !== undefined){
        filter = { year: req.query.carbs };
    }
    if(req.query.fats !== undefined){
        filter = { year: req.query.fats };
    }
    if(req.query.proteins !== undefined){
        filter = { year: req.query.proteins };
    }
    macros.findMacros(filter, '', 0)
        .then(macros => {
            res.status(200).send(macros);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: "Request failed" });
        });});
        
/**
 * Update the macros whose id is provided in the path parameter and set
 * its name, weight, carbs, fats, and proteins to the values provided in the body.
 */
app.put('/macros/:_id', (req, res) => {
    if (isValid(req.body) === true){
        macros.updateMacros({_id: req.params._id}, {name: req.body.name, weight: req.body.weight, carbs: req.body.carbs, fats: req.body.fats, proteins: req.body.proteins } )
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.status(200).json({ _id: req.params._id, name: req.body.name, weight: req.body.weight, carbs: req.body.carbs, fats: req.body.fats, proteins: req.body.proteins })
            } else {
                res.status(404).json({ Error: "Not found" });
            }
        })
            .catch(error => {
                console.error(error);
                res.status(400).json({ Error: "Request failed" });
        });
    }else{
        console.error(`number validity, weight: ${isNumAboveZero(req.body.weight)}, carbs: ${isNumAboveZero(req.body.carbs)}, fats: ${isNumAboveZero(req.body.fats)}, proteins: ${isNumAboveZero(req.body.proteins)}  `);
        res.status(400).json({ Error: "Invalid request" });
    };
        
    } );

/**
 * Delete the macro whose id is provided in the query parameters
 */
app.delete('/macros/:_id', (req, res) => {
    macros.deleteMacroById(req.params._id)
    .then(deletedCount => {
        if (deletedCount === 1) {
            res.status(204).send();
        } else {
            res.status(404).json({ Error: "Not found" });
        }
    })
    .catch(error => {
        console.error(error);
        res.send({ error: "Request failed" });
    });});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});