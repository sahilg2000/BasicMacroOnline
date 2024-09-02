import React from 'react';
import { Link } from 'react-router-dom';
import MacroList from '../components/MacroList';
import StackedBar from '../components/Bar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}


function HomePage( {setMacroToEdit} ) {
    const [macros, setMacros] = useState([]);
    const [max, setMax] = useState([]);
    const navigate = useNavigate();

    const loadMacros = async () => {
        const response = await fetch('/macros');
        const macros = await response.json();
        let totalCarbs = 0;
        let totalFats = 0;
        let totalProteins = 0;
        
        for(let i = 0; i < macros.length; i++) {
            let macroData = macros[i];
            totalCarbs += (macroData.carbs * 4) * (macroData.weight / 100);
            totalFats += (macroData.fats * 9) * (macroData.weight / 100);
            totalProteins += (macroData.proteins * 4) * (macroData.weight / 100);

            console.log(totalCarbs, totalFats, totalProteins);
        }
        console.log(totalCarbs, totalFats, totalProteins);
        const barResponse = await fetch('/barproxy/bar');
        const barData = await barResponse.json();
        console.log(barData);
        let barMax = barData.max;
        const bar = await fetch(`/barproxy/bar`, {
            method: 'PUT',
            body: JSON.stringify({ carbs: totalCarbs, fats: totalFats, proteins: totalProteins, max: barMax }),
            headers: {
                'Content-Type': 'application/json',
            },
          });        
        setMacros(macros);
    }

    const changeMax = async () => {
        const barResponse = await fetch('/barproxy/bar');
        const barData = await barResponse.json();
        const newBar = { carbs: barData.carbs, fats: barData.fats, proteins: barData.proteins, max: max }
        const bar = await fetch(`/barproxy/bar`, {
            method: 'PUT',
            body: JSON.stringify(newBar),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        await timeout(500); 
        window.location.reload();
    }

    const onDelete = async id => {
        const response = await fetch(`/macros/${id}`, { method: 'DELETE' });
        if (response.status === 204) {
        const getResponse = await fetch('/macros');
        const macros = await getResponse.json();
        setMacros(macros);
        } else {
        console.error(`Failed to delete macro with id = ${id}, status code = ${response.status}`)
        }
        await timeout(500); 
        window.location.reload();
    }	

    const onEdit = async macroToEdit => {
        console.log(`${macroToEdit}`);
        setMacroToEdit(macroToEdit);
        navigate("/edit-macro");
    }

    useEffect(() => {
        loadMacros();
    }, []);

    return (
        <>
            <StackedBar></StackedBar>
            
            <label class="name"><br></br><br></br>Update your calorie requirement:</label>
            <input
                type="text"
                placeholder="New Calorie Max"
                value={max}
                onChange={e => setMax(e.target.value)} />
            <button
                id="changemax"
                onClick={changeMax}
            >Update</button>

            <Link class='Link' to="/create-macro">Create a new macro</Link>
            <h2>
                <br></br>
                List of Macros
            </h2>
            <h5>Add macros with the link above.</h5>
            <h5>Use the pencil icon to edit and trash bin icon to delete.</h5>
            <MacroList macros={macros} 
            onDelete={onDelete} 
            onEdit={onEdit}></MacroList>
            
        </>
    );
}

export default HomePage;