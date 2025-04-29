function WeatherCard({ weather }) {
  if (!weather) return null;

  const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString();

  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center max-w-sm w-full">
      <h2 className="text-2xl font-bold mb-1">{weather.name}, {weather.sys.country}</h2>
      <p className="text-lg mb-1">{weather.main.temp} °C</p>
      <p className="capitalize mb-4">{weather.weather[0].description}</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
        className="mx-auto mb-4"
      />
      <div className="text-sm text-left space-y-1">
        <p><strong>Wind:</strong> {weather.wind.speed} m/s</p>
        <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
        <p><strong>Sunrise:</strong> {sunrise}</p>
        <p><strong>Sunset:</strong> {sunset}</p>
      </div>
    </div>
  );
}

export default WeatherCard;