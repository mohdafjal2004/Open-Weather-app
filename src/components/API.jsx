import axios from "axios";
import { useEffect, useState } from "react";
import dayIcon from "../assets/clear-day.svg";
import nightIcon from "../assets/clear-night.svg";

const API = () => {
  const [api, setApi] = useState([]);

  const [city, setCity] = useState("");

  const fetch = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e38adcdee2dddf0bda006344056f8cdd`
      )
      .then((response) => setApi(response.data))
      .catch((err) => console.log(err));
  };

  const handleInput = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(e);
  };

  const farenheitToCelsius = (fahrenheit) => {
    const celsius = fahrenheit - 273;
    return celsius.toFixed(2);
  };

  //Before rendering the temerature we convert it into celsius
  const tempfareneheit = api && api.main && api.main.temp; //first we get the temp in farenheit
  const tempcelsius = farenheitToCelsius(tempfareneheit);

  const isDay = api && api.weather && api.weather[0].icon.includes("d");
  const iconCode = api && api.weather && api.weather[0].icon;
  console.log(iconCode)

  return (
    
    <div >
      <form onSubmit={handleSubmit}>
        <input type="text" value={city} onChange={handleInput} />
        <br />
        {api.length == 0 ? (
          "Enter City Name to get data"
        ) : (
          <div>
            <h1>
              City Name: {api.name}, {api.sys && api.sys.country}
            </h1>
            <img
              src={`https://openweathermap.org/img/wn/${iconCode}.png`}
              alt="Weather Icon" height={100}
            />

            <h2>Feels like : {tempcelsius}°C</h2>

            <h2>Main : {api.weather[0].main}</h2>
            <h2>Description : {api.weather[0].description}</h2>

            <img src={isDay ? dayIcon : nightIcon} height={50} />

            <h2>Pressure : {api && api.main && api.main.pressure} hPa</h2>
            <h2>Humidity : {api && api.main && api.main.humidity} %</h2>

            <h2>Wind : {api.wind && api.wind.speed} km/hr</h2>
          </div>
        )}

<br />
        <button type="submit">Get City Data</button>
      </form>
    </div>
  );
};

export default API;
