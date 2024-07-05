import React, { useEffect } from 'react';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiFog, WiThunderstorm, WiCloud, WiDayCloudy, WiDayFog, WiDayShowers } from 'react-icons/wi';

const WeatherInfo = ({ weatherData }) => {
  useEffect(() => {
    if (weatherData) {
      document.body.className = getBackgroundClassName(weatherData.current.condition.text);
    }
  }, [weatherData]);

  if (!weatherData) {
    return null;
  }

  const { location, current } = weatherData;

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Sunny':
        return <WiDaySunny size={64} color="#f39c12" />;
      case 'Cloudy':
        return <WiCloudy size={64} color="#7f8c8d" />;
      case 'Rain':
      case 'Patchy rain possible':
        return <WiRain size={64} color="#3498db" />;
      case 'Snow':
        return <WiSnow size={64} color="#ecf0f1" />;
      case 'Fog':
        return <WiFog size={64} color="#95a5a6" />;
      case 'Thunderstorm':
        return <WiThunderstorm size={64} color="#9b59b6" />;
      case 'Partly cloudy':
        return <WiDayCloudy size={64} color="#f39c12" />;
      case 'Overcast':
        return <WiCloud size={64} color="#7f8c8d" />;
      case 'Mist':
        return <WiDayFog size={64} color="#95a5a6" />;
      case 'Showers':
        return <WiDayShowers size={64} color="#3498db" />;
      default:
        return <WiCloud size={64} color="#7f8c8d" />;
    }
  };

  const getBackgroundClassName = (condition) => {
    switch (condition) {
      case 'Sunny':
        return 'sunny-background';
      case 'Cloudy':
        return 'cloudy-background';
      case 'Rain':
      case 'Patchy rain possible':
        return 'rainy-background';
      case 'Snow':
        return 'snowy-background';
      case 'Fog':
        return 'foggy-background';
      case 'Thunderstorm':
        return 'thunderstorm-background';
      case 'Partly cloudy':
        return 'partly-cloudy-background';
      case 'Overcast':
        return 'overcast-background';
      case 'Mist':
        return 'mist-background';
      case 'Showers':
        return 'showers-background';
      default:
        return 'default-background';
    }
  };

  return (
    <div className="weather-info">
      <h2 className="location">
        Weather in {location.name}, {location.country}
      </h2>
      <div className="weather-details">
        <div className="weather-icon">
          {getWeatherIcon(current.condition.text)}
        </div>
        <div className="weather-stats">
          <p className="temperature">Temperature: {current.temp_c}°C</p>
          <p className="condition">Condition: {current.condition.text}</p>
          <p className="feels-like">Feels like: {current.feelslike_c}°C</p>
          <p className="humidity">Humidity: {current.humidity}%</p>
          <p className="wind">Wind: {current.wind_kph} kph</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
