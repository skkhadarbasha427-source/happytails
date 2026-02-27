import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import './Breeds.css';

const Breeds = () => {
  const [breeds, setBreeds] = useState([]);
  const [filteredBreeds, setFilteredBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAnimalType, setSelectedAnimalType] = useState('All');

  useEffect(() => {
    fetchBreeds();
  }, []);

  useEffect(() => {
    filterBreeds();
  }, [selectedCategory, selectedAnimalType, breeds]);

  const fetchBreeds = async () => {
    try {
      const response = await api.get('/breeds');
      setBreeds(response.data.data);
      setFilteredBreeds(response.data.data);
    } catch (error) {
      console.error('Error fetching breeds:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSeedDatabase = async () => {
    if (!window.confirm('This will reset all breed data. Continue?')) return;
    
    setLoading(true);
    try {
      await api.post('/breeds/seed');
      alert('Database seeded successfully!');
      fetchBreeds();
    } catch (error) {
      console.error('Error seeding database:', error);
      alert('Failed to seed database');
    } finally {
      setLoading(false);
    }
  };

  const filterBreeds = () => {
    let filtered = breeds;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(b => b.category === selectedCategory);
    }

    if (selectedAnimalType !== 'All') {
      filtered = filtered.filter(b => b.animalType === selectedAnimalType);
    }

    setFilteredBreeds(filtered);
  };

  const animalTypes = [...new Set(breeds.map(b => b.animalType))];

  if (loading) return <div className="loading">Loading breeds...</div>;

  return (
    <div className="breeds-page">
      <h1>Pet Breeds Guide</h1>
      <p className="subtitle">Learn about popular pet breeds in India</p>

      <div className="filters">
        <div className="filter-group">
          <label>Category:</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Animal">Animals</option>
            <option value="Bird">Birds</option>
            <option value="Aquatic">Aquatic</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Type:</label>
          <select value={selectedAnimalType} onChange={(e) => setSelectedAnimalType(e.target.value)}>
            <option value="All">All Types</option>
            {animalTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {breeds.length === 0 && (
          <button 
            onClick={handleSeedDatabase} 
            className="btn btn-primary"
            style={{ marginLeft: '10px' }}
          >
            Seed Database
          </button>
        )}
      </div>

      <div className="breeds-grid">
        {filteredBreeds.map((breed) => (
          <div key={breed._id} className="breed-card">
            {breed.imageUrl && (
              <img src={breed.imageUrl} alt={breed.name} className="breed-image" />
            )}
            <div className="breed-info">
              <h3>{breed.name}</h3>
              <p className="breed-type">{breed.animalType} • {breed.size}</p>
              <p className="breed-description">{breed.description}</p>
              {breed.temperament && (
                <p className="breed-temperament">
                  <strong>Temperament:</strong> {breed.temperament}
                </p>
              )}
              <div className="breed-climate">
                {breed.suitableForIndianClimate ? (
                  <span className="climate-badge suitable">✓ Suitable for Indian Climate</span>
                ) : (
                  <span className="climate-badge not-suitable">⚠ Needs AC/Climate Control</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBreeds.length === 0 && (
        <p className="no-results">No breeds found matching your filters.</p>
      )}
    </div>
  );
};

export default Breeds;
