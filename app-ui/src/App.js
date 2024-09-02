import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateMacroPage from './pages/CreateMacroPage';
import SavedMacroPage from './pages/SavedMacrosPage';
import EditMacroPage from './pages/EditMacroPage';
import SaveMacroPage from './pages/UploadMacroPage';
import EditSavedMacroPage from './pages/EditSavedMacroPage';
import Navigation from './components/Navigation';
import { useState } from 'react';

function App() {

  const [macroToEdit, setMacroToEdit] = useState();
  const [savedMacroToEdit, setSavedMacroToEdit] = useState();
  const [macroToUpload, setSavedMacroToUpload] = useState();
  
  return (
    <>
    <header className='HeaderText'>
      <h1>
        Food Macro Data Storage app. 
        <br></br>
        React, REST, and MongoDB.
      </h1>
    </header>
    <div className="App">
      <Router>
      <Navigation/>
      <div className="App-header">
		      <Routes>
            <Route path="/" element={<HomePage setMacroToEdit={setMacroToEdit} />}/>
            <Route path="/create-macro" element={<CreateMacroPage />}/>
            <Route path="/saved-macros" element={<SavedMacroPage setSavedMacroToEdit={setSavedMacroToEdit} setSavedMacroToUpload={setSavedMacroToUpload}/>}/>
            <Route path="/edit-macro" element={ <EditMacroPage macroToEdit={macroToEdit} />}/>
            <Route path="/edit-saved-macro" element={ <EditSavedMacroPage savedMacroToEdit={savedMacroToEdit} />}/>
            <Route path="/upload-macro" element={ <SaveMacroPage macroToUpload={macroToUpload} />}/>
		      </Routes>
        </div>
      </Router>
    </div>
    <footer>
      Please report bugs at gaikwads@oregonstate.edu
      <br></br>
      © 2023 Sahil Gaikwad
    </footer>
    </>
  );
}

export default App;