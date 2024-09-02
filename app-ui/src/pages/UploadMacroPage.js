import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const UploadMacroPage = ({macroToUpload}) => {
    const navigate = useNavigate();
    
    const [name, setName] = useState(macroToUpload.name);
    const [weight, setWeight] = useState('');
    const [carbs, setCarbs] = useState(macroToUpload.carbs);
    const [fats, setFats] = useState(macroToUpload.fats);
    const [proteins, setProteins] = useState(macroToUpload.proteins);


    const uploadMacro = async () => {
        const response = await fetch(`/macros`, {
            method: 'POST',
            body: JSON.stringify({ name: name, weight: weight, carbs: carbs, fats: fats, proteins: proteins  }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
             alert("Successfully uploaded the macro!");
        } else {
             alert(`Failed to upload the macro, status code = ${response.status}`);
        }     
        navigate("/");
    };

    return (
        <div>
            <h1>Upload Macro?</h1>
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
                placeholder="Enter weight here"
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
                onClick={uploadMacro}
            >Upload</button>
        </div>
    );
}

export default UploadMacroPage;