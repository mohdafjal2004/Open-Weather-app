import React, { useEffect, useState } from "react";
import axios from "axios";

const CallingAPI = () => {
  const [value, setValue] = useState([]);

  const [id, setId] = useState(1);

  const handleClick = () => {
    // Method 2 : Which is more optimized to get next user data and to go from last element to first element when we don't know the number of elements in API URL
    return setId((id % 10) + 1);
  };

  const getUser = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)

      .then((response) => setValue(response.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getUser();
  }, [id]);

  return (
    <div>
      {/* 𝗙𝗼𝗿 𝗿𝗲𝗻𝗱𝗲𝗿𝗶𝗻𝗴 𝗮𝗹𝗹 𝗲𝗹𝗲𝗺𝗲𝗻𝘁𝘀 𝗼𝗳 𝗮𝗿𝗿𝗮𝘆 */}
      {/* <div>
        {value.map((user) => {
          return <div key={user.id}>{user.name}</div>;
        })}
      </div> */}

      {/* 𝗙𝗼𝗿 𝗿𝗲𝗻𝗱𝗲𝗿𝗶𝗻𝗴 𝗼𝗻𝗲 𝗲𝗹𝗲𝗺𝗲𝗻𝘁 𝗮𝘁 𝗮 𝘁𝗶𝗺𝗲 */}
      <h1>{value && value.name}</h1>
      <h1>{value.address && value.address.street}</h1>
      <h1>{value.address && value.address.geo && value.address.geo.lat}</h1>
      <button onClick={handleClick}>Next User</button>
    </div>
  );
};
export default CallingAPI;
