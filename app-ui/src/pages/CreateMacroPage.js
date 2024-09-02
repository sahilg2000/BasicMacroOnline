import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileDownload } from "react-icons/fa";


function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

export const CreateMacroPage = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [weight, setWeight] = useState('');
    const [carbs, setCarbs] = useState('');
    const [fats, setFats] = useState('');
    const [proteins, setProteins] = useState('');

    const addMacro = async () => {
        const newMacro = { name, weight, carbs, fats, proteins };
        const response = await fetch('/macros', {
            method: 'POST',
            body: JSON.stringify(newMacro),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully added the macro; nicely done!");
        } else {
            alert(`Failed to add macro, status code = ${response.status}`);
        }
        await timeout(440); 
        navigate("/");
    };

    return (
        <div>
            <h1>Load a Macro</h1>
            <a href="/saved-macros">
                <FaFileDownload class="loadicon" size={70} color="rgb(125, 349, 2)"/>
            </a>
            <br></br>
            <br></br>
            <p>Hit the Load icon to choose a saved Macro</p>
            <br></br>
            
            
        
            <h1>Create a Macro</h1>
            <label class="name">Food name:</label>
            <input
                type="text"
                placeholder="Enter name here"
                value={name}
                onChange={e => setName(e.target.value)} />
            <label class="weight">Amount:</label> 
            <input
                type="number"
                placeholder="Enter weight here"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <label class="carbs">Carbs:</label>
            <input
                type="number"
                placeholder="Enter carbs here"
                value={carbs}
                onChange={e => setCarbs(e.target.value)} />
            <label class="fats">Fats:</label>
            <input
                type="number"
                placeholder="Enter fats here"
                value={fats}
                onChange={e => setFats(e.target.value)} />
            <label class="proteins">Proteins:</label>
            <input
                type="number"
                placeholder="Enter proteins here"
                value={proteins}
                onChange={e => setProteins(e.target.value)} />

            <button
                onClick={addMacro}
            >Add</button>
        </div>
    );
}

export default CreateMacroPage;