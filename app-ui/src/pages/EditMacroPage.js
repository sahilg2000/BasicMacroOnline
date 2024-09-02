import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}


export const EditMacroPage = ({macroToEdit}) => {
    const navigate = useNavigate();
    
    const [name, setName] = useState(macroToEdit.name);
    const [weight, setWeight] = useState(macroToEdit.weight);
    const [carbs, setCarbs] = useState(macroToEdit.carbs);
    const [fats, setFats] = useState(macroToEdit.fats);
    const [proteins, setProteins] = useState(macroToEdit.proteins);
    

    const editMacro = async () => {
        const response = await fetch(`/macros/${macroToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify({ name: name, weight: weight, carbs: carbs, fats: fats, proteins: proteins  }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200){
             alert("Successfully edited the macro!");
        } else {
             alert(`Failed to edit macro, status code = ${response.status}`);
        }     
        await timeout(440); 
        navigate("/");
    };

    return (
        <div>
            <h1>Edit Macro</h1>
            <label class="name">Food name:</label>
            <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)} />
            <label class="weight">Amount:</label>
            <input
                id="weight"
                type="number"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <label class="carbs">Carbs:</label>
            <input
                id="carbs"
                type="number"
                value={carbs}
                onChange={e => setCarbs(e.target.value)} />
            <label class="fats">Fats:</label>
            <input
                id="fats"
                type="number"
                value={fats}
                onChange={e => setFats(e.target.value)} />
            <label class="proteins">Proteins:</label>
            <input
                id="proteins"
                type="number"
                value={proteins}
                onChange={e => setProteins(e.target.value)} />

            <button
                onClick={editMacro}
            >Save</button>
        </div>
    );
}

export default EditMacroPage;