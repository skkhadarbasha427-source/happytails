import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const BreedSelector = ({ category, animalType, selectedBreed, onChange }) => {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category && animalType) {
      fetchBreeds();
    }
  }, [category, animalType]);

  const fetchBreeds = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/breeds?category=${category}&animalType=${animalType}`);
      setBreeds(response.data.data);
    } catch (error) {
      console.error('Error fetching breeds:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!category || !animalType) return null;

  return (
    <div className="breed-selector">
      <label>Breed (Optional)</label>
      <select
        value={selectedBreed || ''}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading}
      >
        <option value="">Select a breed</option>
        {breeds.map((breed) => (
          <option key={breed._id} value={breed._id}>
            {breed.name} - {breed.size}
          </option>
        ))}
      </select>
      {loading && <p>Loading breeds...</p>}
    </div>
  );
};

export default BreedSelector;
