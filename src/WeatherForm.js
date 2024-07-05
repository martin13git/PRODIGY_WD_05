import React, { useState, useEffect } from 'react';

const WeatherForm = ({ onSubmit }) => {
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (location.trim() !== '') {
      fetchSuggestions(location);
    } else {
      setSuggestions([]);
    }
  }, [location]);

  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=b2ca1f0cba8b4bfca8151843240507&q=${query}`);
      if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
      }
      const data = await response.json();
      const suggestedLocations = data.map(item => item.name);
      setSuggestions(suggestedLocations);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(location);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setLocation(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSuggestionClick = (suggestion) => {
    setLocation(suggestion);
    setShowSuggestions(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
      <input
        type="text"
        value={location}
        onChange={handleInputChange}
        placeholder="Enter location"
        style={{
          padding: '10px',
          fontSize: '16px',
          border: '2px solid #4A90E2',
          borderRadius: '5px',
          marginRight: '10px',
          flex: '1'
        }}
      />
      {showSuggestions && (
        <ul className="suggestions" style={{ position: 'absolute', top: '100%', left: 0, zIndex: 1, width: '60%', backgroundColor: '#fffc', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', borderRadius: '0 0 5px 5px', padding: 0, margin: 0 }}>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)} style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #ccc', listStyleType: 'none', transition: 'background-color 0.3s ease' }}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', border: 'none', borderRadius: '5px', backgroundColor: '#4A90E2', color: '#fff', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>
        Get Weather
      </button>
    </form>
  );
};

export default WeatherForm;
