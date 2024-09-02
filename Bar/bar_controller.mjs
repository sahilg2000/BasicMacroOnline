import 'dotenv/config';
import * as bar from './bar_model.mjs';
import express from 'express';

const PORT = process.env.PORT;

const app = express();


app.use(express.json());

/**
 * Retrive the bar corresponding to the ID provided in the URL.
 */
app.get('/bar', (req, res) => {
    bar.findBarbyId('65777799548c39de46a1186a')
        .then(bar => { 
            if (bar !== null) {
                res.status(200).json(bar);
            } else {
                res.status(404).json({ Error: "Not found" });
            }         
         })
        .catch(error => {
            res.status(400).json({ Error: "Request failed" });
        });
});

/**
 * Update the bar whose id is provided in the path parameter and set
 * its carbs, fats, and proteins to the values provided in the body.
 */
app.put('/bar', (req, res) => {
    bar.updateBar({_id: '65777799548c39de46a1186a'}, { carbs: req.body.carbs, fats: req.body.fats, proteins: req.body.proteins, max: req.body.max } )
    .then(numUpdated => {
        if (numUpdated === 1) {
            res.status(200).json({ _id: req.params._id, carbs: req.body.carbs, fats: req.body.fats, proteins: req.body.proteins, max: req.body.max })
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