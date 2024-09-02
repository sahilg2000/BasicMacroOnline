import React from 'react';
import {Link } from 'react-router-dom';

function Navigation() {
    return (
        <nav className="NavBar">
            <Link to="/">Home</Link>
            <br/>
            <Link to="/create-macro">Create</Link>
            <br/>
            <br/>
        </nav>
    );
  }
  

export default Navigation;