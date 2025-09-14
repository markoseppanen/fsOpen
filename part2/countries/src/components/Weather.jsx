import { useEffect, useState } from "react";

export const Weather = ({ capital, countryCode }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const apiURL = "http://api.openweathermap.org/data/2.5/weather";

    fetch(`${apiURL}?q=${capital},${countryCode}&units=metric&APPID=${apiKey}`)
      .then((response) => response.json())

      .then((data) => {
        if (data.cod !== 200) {
          setError(data.message || "Failed to fetch weather");
          setWeatherData(null);
        } else {
          setWeatherData(data);
          setError(null);
        }
      })

      .catch((err) => {
        console.error("Error fetching weather data:", err);
        setError("Network error");
        setWeatherData(null);
      });
  }, [capital, countryCode]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!weatherData) {
    return <p>Loading weather data...</p>;
  }

  const iconBaseURL = "http://openweathermap.org/img/wn";

  return (
    <>
      <h2>Weather in {capital}</h2>
      <p>
        Temperature: {weatherData.main.temp} °C <br />
        <img
          src={`${iconBaseURL}/${weatherData.weather[0].icon}@2x.png`}
          alt={weatherData.weather[0].description}
          title={weatherData.weather[0].description}
        />
        <br />
        Wind: {weatherData.wind.speed} m/s
      </p>
    </>
  );
};
