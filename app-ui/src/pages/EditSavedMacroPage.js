import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const EditSavedMacroPage = ({savedMacroToEdit}) => {
    const navigate = useNavigate();
    
    const [name, setName] = useState(savedMacroToEdit.name);
    const [carbs, setCarbs] = useState(savedMacroToEdit.carbs);
    const [fats, setFats] = useState(savedMacroToEdit.fats);
    const [proteins, setProteins] = useState(savedMacroToEdit.proteins);
    

    const editMacro = async () => {
        const response = await fetch(`/proxy/savedmacros/${savedMacroToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify({ name: name, carbs: carbs, fats: fats, proteins: proteins }),
            headers:{Accept: 'application/json','Content-Type': 'application/json'},
        });
        if(response.status === 200){
             alert("Successfully edited the saved macro!");
        } else {
             alert(`Failed to edit the saved macro, status code = ${response.status}`);
        }     
        navigate("/saved-macros");
    };

    return (
        <div>
            <h1>Edit Saved Macro</h1>
            <label class="name">Food name:</label>
            <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)} />
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

export default EditSavedMacroPage;