// src/components/FoxGallery.js
import React, { useState, useCallback } from 'react';
import axios from 'axios';
import './FoxGallery.css';

const FoxGallery = () => {
  const [foxes, setFoxes] = useState([]);

  const fetchFox = useCallback(() => {
    axios.get('https://randomfox.ca/floof/')
      .then(response => {
        setFoxes(prevFoxes => [...prevFoxes, response.data.image]);
      })
      .catch(error => console.error(error));
  }, []); // Empty dependency array ensures this function is stable

  return (
    <div>
      <div className="container">
        <h2>Fox Gallery</h2>
        <button onClick={fetchFox}>Add Fox</button>
      </div>
      <div className="fox-gallery-container">
        <div className="fox-gallery-wrapper">
          <div className="fox-gallery">
            {foxes.map((fox, index) => (
              <img key={index} src={fox} alt="Fox" className="fox-image" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


export default FoxGallery;