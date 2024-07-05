import React, { useState } from 'react';
import axios from 'axios';
import WeatherForm from './WeatherForm';
import WeatherInfo from './WeatherInfo';
import Footer from './Footer';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async (location) => {
    try {
      const API_KEY = 'b2ca1f0cba8b4bfca8151843240507';
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching the weather data', error);
    }
  };

  return (
    <div className="app-container">
      <div className="App">
        <h1>Weather App</h1>
        <WeatherForm onSubmit={fetchWeather} />
        <WeatherInfo weatherData={weatherData} />
      </div>
      <Footer />
    </div>
  );
};

export default App;
