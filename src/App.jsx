import { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard'; // remove if unused
import { fetchWeather, fetchForecast } from './services/weatherApi';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (city) => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchWeather(city);
      const forecastData = await fetchForecast(city);
      setWeather(data);
      setForecast(forecastData.list);
    } catch (errMsg) {
      setError(errMsg.toString());
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  const getDayName = (dateString) =>
    new Date(dateString).toLocaleDateString(undefined, { weekday: 'long' });

  const isToday = (dateString) => {
    const today = new Date().toDateString();
    const date = new Date(dateString).toDateString();
    return today === date;
  };

  const noonForecast = forecast.filter((item) =>
    item.dt_txt.includes('12:00:00')
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-6xl">

        {/* Left Side */}
        <div className="w-full md:w-1/4 p-6 bg-white flex flex-col justify-start space-y-4">
          <h1 className="text-2xl font-bold text-center">Weather App</h1>
          <SearchBar onSearch={handleSearch} />
          {loading && (
            <div className="flex justify-center items-center mt-4">
              <div className="w-10 h-10 border-4 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {weather && (
            <div className="mt-6 text-center space-y-2">
              <p className="text-4xl font-bold">{Math.round(weather.main.temp)}°C</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt={weather.weather[0].description}
                className="mx-auto"
              />
              <p className="capitalize">{weather.weather[0].description}</p>
              <p className="text-sm text-gray-600">
                {new Date().toLocaleDateString(undefined, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p className="text-lg font-semibold mt-4">{weather.name}, {weather.sys.country}</p>
            </div>
          )}
        </div>

        {/* Right Side */}
        <div className="w-full md:w-3/4 p-6 bg-gray-50 flex flex-col justify-center items-center overflow-y-auto">
          {!weather ? (
            <div className="text-center text-gray-500">
              <p className="text-xl">Search a city to view the weather forecast</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-6 w-full">
                <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center">
                  <img src="https://openweathermap.org/img/wn/50d.png" alt="wind" className="w-10 h-10 mb-2" />
                  <p className="text-sm text-gray-600">Wind</p>
                  <p className="font-bold">{weather.wind.speed} m/s</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center">
                  <img src="https://openweathermap.org/img/wn/09d.png" alt="humidity" className="w-10 h-10 mb-2" />
                  <p className="text-sm text-gray-600">Humidity</p>
                  <p className="font-bold">{weather.main.humidity} %</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center">
                  <img src="https://openweathermap.org/img/wn/01d.png" alt="sunrise" className="w-10 h-10 mb-2" />
                  <p className="text-sm text-gray-600">Sunrise</p>
                  <p className="font-bold">
                    {new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center">
                  <img src="https://openweathermap.org/img/wn/01n.png" alt="sunset" className="w-10 h-10 mb-2" />
                  <p className="text-sm text-gray-600">Sunset</p>
                  <p className="font-bold">
                    {new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>

              {noonForecast.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full">
                  {noonForecast.map((item) => (
                    <div
                      key={item.dt}
                      className={`p-4 text-center rounded-lg shadow-md ${
                        isToday(item.dt_txt)
                          ? 'bg-yellow-100 border-2 border-yellow-400'
                          : 'bg-white'
                      }`}
                    >
                      <p className="font-bold">{getDayName(item.dt_txt)}</p>
                      <img
                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                        alt={item.weather[0].description}
                        className="mx-auto"
                      />
                      <p>{Math.round(item.main.temp)} °C</p>
                      <p className="capitalize text-sm">{item.weather[0].description}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
