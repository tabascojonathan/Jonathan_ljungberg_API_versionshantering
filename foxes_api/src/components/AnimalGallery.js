// src/components/AnimalGallery.js
import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import anime from 'animejs';
import './AnimalGallery.css';

const AnimalGallery = () => {
  const [animals, setAnimals] = useState([]);
  const [animalType, setAnimalType] = useState('fox');

  const handleAnimalTypeChange = (event) => {
    setAnimalType(event.target.value);
  };

  const fetchAnimal = useCallback(() => {
    let apiUrl;
    switch (animalType) {
      case 'dog':
        apiUrl = 'https://dog.ceo/api/breeds/image/random';
        break;
      case 'cat':
        apiUrl = 'https://api.thecatapi.com/v1/images/search';
        break;
      default:
        apiUrl = 'https://randomfox.ca/floof/';
    }

    axios.get(apiUrl)
      .then(response => {
        const imageUrl = animalType === 'cat' ? response.data[0].url : response.data.message || response.data.image;
        setAnimals(prevAnimals => [...prevAnimals, imageUrl]);
      })
      .catch(error => console.error(error));
  }, [animalType]);

  useEffect(() => {
    if (animals.length > 0) {
      anime({
        targets: '.animal-image',
        opacity: [0, 1],
        scale: [0.5, 1],
        duration: 800,
        easing: 'easeInOutQuad',
        delay: anime.stagger(100)
      });
    }
  }, [animals]);

  const shakeButton = () => {
    anime({
      targets: '.shake-button',
      translateX: [
        { value: -10, duration: 100 },
        { value: 10, duration: 100 },
        { value: -10, duration: 100 },
        { value: 10, duration: 100 },
        { value: 0, duration: 100 }
      ],
      easing: 'easeInOutQuad'
    });
  };

  useEffect(() => {
    shakeButton();
  }, []);


  return (
    <div>
      <div className="container">
        <h2>Animal Gallery</h2>
        <div>
          <label>
            <input
              type="radio"
              name="animal"
              value="fox"
              checked={animalType === 'fox'}
              onChange={handleAnimalTypeChange}
            />
            Fox
          </label>
          <label>
            <input
              type="radio"
              name="animal"
              value="dog"
              checked={animalType === 'dog'}
              onChange={handleAnimalTypeChange}
            />
            Dog
          </label>
          <label>
            <input
              type="radio"
              name="animal"
              value="cat"
              checked={animalType === 'cat'}
              onChange={handleAnimalTypeChange}
            />
            Cat
          </label>
        </div>
        <button className="shake-button" onClick={fetchAnimal}>Add Animal</button>
      </div>
      <div className="animal-gallery-container">
        <div className="animal-gallery-wrapper">
          <div className="animal-gallery">
            {animals.map((animal, index) => (
              <img key={index} src={animal} alt="Animal" className="animal-image" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalGallery;