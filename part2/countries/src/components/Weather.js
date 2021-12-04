import axios from "axios";
import { useEffect, useState } from "react";

export const Weather = ({ capital, countryCode }) => {
  console.log("Weather-component, Capital", capital);
  console.log("Weather-component, countryCode", countryCode);
  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
  const apiURL = "http://api.openweathermap.org/data/2.5/weather";
  const iconBaseURL = "http://openweathermap.org/img/wn";

  const [weatherData, setWeatherData] = useState();

  const getWeatherData = () => {};

  useEffect(
    () =>
      axios
        .get(
          `${apiURL}?q=${capital},${countryCode}&units=metric&APPID=${apiKey}`
        )
        .then((r) => setWeatherData(r.data)),
    []
  );

  console.log("WeatherData", weatherData);
  console.log("WeatherData typeof", typeof weatherData);

  typeof weatherData.main === undefined ? (
    <p>No weather data.</p>
  ) : (
    <>
      <h3>Weather in {capital}</h3>
      <p>
        Temperature: {weatherData.main.temp} °C <br />
        <img src={`${iconBaseURL}/${weatherData.icon}.png`} alt="" />
        {"Weather-Icon-placeholder"} <br />
        Wind: {"wind data"}
      </p>
    </>
  );

  // return <p>No data.</p>;
};
