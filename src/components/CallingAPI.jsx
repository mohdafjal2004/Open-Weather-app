import React, { useEffect, useState } from "react";
import axios from "axios";

const CallingAPI = () => {
  const [value, setvalue] = useState([]);

  const API_KEY = "e38adcdee2dddf0bda006344056f8cdd";
  useEffect(async () => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${API_KEY}`
    );
    setvalue(response.data);
  }, []);

  return <h3>{value}</h3>;
};
export default CallingAPI;
