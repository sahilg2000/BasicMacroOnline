import React from 'react';
import { Link } from 'react-router-dom';
import SavedMacroList from '../components/SavedMacroList';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SavedMacroPage( {setSavedMacroToUpload, setSavedMacroToEdit} ) {
    const [macros, setSavedMacros] = useState([]);
    const navigate = useNavigate();

    const loadMacros = async () => {
        const response = await fetch('/proxy/savedmacros', {method:'GET',headers:{Accept: 'application/json','Content-Type': 'application/json'}});
        const macros = await response.json();
        setSavedMacros(macros);
    }

    const onUpload = async macroToUpload => {
        console.log("Uploading----");
        console.log(`${macroToUpload}`);
        setSavedMacroToUpload(macroToUpload);
        navigate("/upload-macro");
    }	

    const onEdit = async savedMacroToEdit => {
        setSavedMacroToEdit(savedMacroToEdit);
        navigate("/edit-saved-macro");
    }

    useEffect(() => {
        loadMacros();
    }, []);

    return (
        <>
            <Link class='Link' to="/create-macro">Upload a new macro (to cloud)</Link>
            <br></br>
            <br></br>
            <h2>
            <br></br>
            <br></br>
            
                List of Macros to Load to your plan
            </h2>
            <h5>Add macros with the link above.</h5>
            <h5>Use the pencil icon to edit and trash bin icon to delete.</h5>
            <SavedMacroList macros={macros} 
            onUpload={onUpload} 
            onEdit={onEdit}></SavedMacroList>
            
        </>
    );
}

export default SavedMacroPage;