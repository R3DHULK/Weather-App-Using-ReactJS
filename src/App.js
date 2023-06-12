import React, { useState } from 'react';
import './WeatherApp.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = 'aba6ff9d6de967d5eac6fd79114693cc'; // Replace with your own API key

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const fetchWeatherData = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === 200) {
          setWeatherData(data);
          setError('');
        } else {
          setWeatherData(null);
          setError('City not found. Please try again.');
        }
      })
      .catch((error) => {
        console.log(error);
        setWeatherData(null);
        setError('An error occurred. Please try again later.');
      });
  };

  return (
    <div className="weather-app">
      <h2>Weather App</h2>
      <div className="search-container">
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter a city"
        />
        <button onClick={fetchWeatherData}>Search</button>
      </div>
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <div className="weather-container">
          <h3>{weatherData.name}</h3>
          <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
          <p>Weather: {weatherData.weather[0].main}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
