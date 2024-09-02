import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useState, useEffect } from 'react';


function StackedBar() {
    const [bar, setBar] = useState('');
    const loadBar = async () => {
      const response = await fetch('/barproxy/bar');
      const bar = await response.json();
      setBar(bar);
    }
    
    useEffect(() => {
      loadBar();
    }, []);

    return (
      <ProgressBar>
        <ProgressBar label="carbs" striped variant="success" max={bar.max} now={bar.carbs} key={1} />
        <ProgressBar label="fats" variant="warning" max={bar.max} now={bar.fats} key={2} />
        <ProgressBar label="proteins" striped variant="danger" max={bar.max} now={bar.proteins} key={3} />
      </ProgressBar>
    );
  }
  
  export default StackedBar;