// src/components/FoxGallery.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FoxGallery = () => {
  const [foxes, setFoxes] = useState([]);

  useEffect(() => {
    axios.get('https://randomfox.ca/floof/')
      .then(response => {
        setFoxes([...foxes, response.data.image]);
      })
      .catch(error => console.error(error));
  }, []);

  const fetchFox = () => {
    axios.get('https://randomfox.ca/floof/')
      .then(response => {
        setFoxes([...foxes, response.data.image]);
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Fox Gallery</h2>
      <button onClick={fetchFox}>Add Fox</button>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {foxes.map((fox, index) => (
          <img key={index} src={fox} alt="Fox" style={{ width: '200px', margin: '10px' }} />
        ))}
      </div>
    </div>
  );
};

export default FoxGallery;