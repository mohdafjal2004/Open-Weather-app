import axios from "axios";
import { useEffect, useState } from "react";
import dayIcon from "../assets/clear-day.svg";
import nightIcon from "../assets/clear-night.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/API.css";
import img from "../assets/strart.svg";

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
  console.log(iconCode);

  return (
    <div className="API__body">
      <div className={`API_container ${isDay ? "bg-d" : "bg-n"}`}>
        <form onSubmit={handleSubmit} className="card">
          <span className="headline">Weather App</span>
          <input
            type="text"
            value={city}
            onChange={handleInput}
            className="search"
            placeholder="Enter your City, State/Country or Pin code"
          />
          <br />
          {api.length == 0 ? (
            <div className="start_details">
              <img src={img} alt="" className="start_icon" />

              <div>
                Enter your city name to get the latest weather information
              </div>
            </div>
          ) : (
            <div>
              <div className="city_details">
                <h2 className="city_name">
                  {api.name}, {api.sys && api.sys.country}
                </h2>

                <img src={isDay ? dayIcon : nightIcon} className="day_night" />
              </div>

              <div className="weather__temp">
                <div className="weather_main">
                  <img
                    className="weather_icon"
                    src={`https://openweathermap.org/img/wn/${iconCode}.png`}
                    alt="Weather Icon"
                  />

                  <h3 className="main">{api.weather[0].main}</h3>
                </div>
                <h1 className="temp">{tempcelsius}°C</h1>
              </div>
              <div className="info">
                <h5 className="infodeep">
                  <span className="info_head">Description </span>
                  <span className="info_details">
                    {api.weather[0].description}
                  </span>
                </h5>

                <h5 className="infodeep">
                  <span className="info_head">Pressure </span>
                  <span className="info_details">
                    {api && api.main && api.main.pressure} hPa
                  </span>
                </h5>
                <h5 className="infodeep">
                  <span className="info_head">Humidity</span>
                  <span className="info_details">
                    {" "}
                    {api && api.main && api.main.humidity} %
                  </span>
                </h5>

                <h5 className="infodeep">
                  <span className="info_head">Wind</span>
                  <span className="info_details">
                    {api.wind && api.wind.speed} km/hr
                  </span>
                </h5>
              </div>
            </div>
          )}

          <br />
          <button type="submit" className="btn">
            Get City Data
          </button>
        </form>
      </div>
    </div>
  );
};

export default API;
