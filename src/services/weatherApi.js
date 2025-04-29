import axios from 'axios';

const API_KEY = 'a018706237faa039da909a994bc5bbcc'; // Replace with your real API Key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const fetchWeather = async (city, unit = 'metric') => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: unit,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error fetching weather';
  }
};

export const fetchForecast = async (city, unit = 'metric') => {
  try {
    const response = await axios.get(FORECAST_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: unit,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error fetching forecast';
  }
};