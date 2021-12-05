import axios from "axios";
import { useEffect, useState } from "react";

export const Weather = ({ capital, countryCode }) => {
  console.log("Weather-component, Capital", capital);
  console.log("Weather-component, countryCode", countryCode);

  const iconBaseURL = "http://openweathermap.org/img/wn";

  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
    const apiURL = "http://api.openweathermap.org/data/2.5/weather";
    return axios
      .get(`${apiURL}?q=${capital},${countryCode}&units=metric&APPID=${apiKey}`)
      .then((r) => setWeatherData(r.data));
  }, [capital, countryCode]);

  if (weatherData === null) {
    return <p>No weather data.</p>;
  } else {
    return (
      <>
        <h3>Weather in {capital}</h3>
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
  }
};
