import axios from "axios";
import { useEffect, useState } from "react";
import dayIcon from "../assets/clear-day.svg";
import nightIcon from "../assets/clear-night.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/API.css";
import img from '../assets/strart.svg'

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
    <div
      className={`container-fluid px-1 px-md-4 py-5 mx-auto ${
        isDay ? "bg-d" : "bg-n"
      }`}
    >
      <form onSubmit={handleSubmit} className="card">
        <input
          type="text"
          value={city}
          onChange={handleInput}
          className="search"
          placeholder="Enter your City, State/Country or Pin code"
        />
        <br />
        {api.length == 0 ? (
          <div>
            <img src={img} alt="" height={130} />

            <div>
              Enter your city name to get the latest weather information
            </div>
          </div>
        ) : (
          <div>
            <div>
              <h2 className="ml-auto mr-4 mt-3 mb-0">
                {api.name}, {api.sys && api.sys.country}
              </h2>

              <img src={isDay ? dayIcon : nightIcon} height={50} />
            </div>

            <div className="icontemp">
              <div className="icon">
                <img
                  className="icon1"
                  src={`https://openweathermap.org/img/wn/${iconCode}.png`}
                  alt="Weather Icon"
                  height={100}
                />

                <h3 className="icon3">{api.weather[0].main}</h3>
              </div>

              <div>
                <h1 className="temp">{tempcelsius}°C</h1>
              </div>
            </div>
            <div className="info">
              <h5 className="infodeep">
                Description {api.weather[0].description}
              </h5>

              <h5 className="infodeep">
                <span>Pressure </span>
                <span>{api && api.main && api.main.pressure}</span> hPa
              </h5>
              <h5 className="infodeep">
                <span>Humidity</span>
                <span> {api && api.main && api.main.humidity} %</span>
              </h5>

              <h5 className="infodeep">
                <span>Wind</span>
                <span>{api.wind && api.wind.speed}</span> km/hr
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
  );
};

export default API;
