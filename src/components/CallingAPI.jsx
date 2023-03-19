import React, { useEffect, useState } from "react";
import axios from "axios";

const CallingAPI = () => {
  const [value, setValue] = useState([]);

  const [dataNested, setDataNested] = useState({});
  const { address } = dataNested;
  console.log(address);
  const [id, setId] = useState(1);

  const handleClick = () => {
    const MAX_USERS = 10;

    //Method 1 : To 𝗴𝗲𝘁 𝗻𝗲𝘅𝘁 𝘂𝘀𝗲𝗿 𝗱𝗮𝘁𝗮 and to go from last element to first element 𝘄𝗵𝗲𝗻 𝘄𝗲 𝗸𝗻𝗼𝘄 number of elements in API URL
    if (id == MAX_USERS) {
      setId(1);
    } else {
      setId(id + 1);
    }

    // Method 2 : Which is more optimized and can get next user data and to go from from last element to last element when we don't know the number of elements in API URL
    //  return setId((id % 10) + 1);
  };

  const getUser = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)

      .then((response) => setValue(response.data))
      .then((response) => setDataNested(response.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getUser();
  }, [id]);

  return (
    <div>
      {/* <div>
        {value.map((user) => {
          return <div key={user.id}>{user.name}</div>;
        })}
      </div> */}
      <h1>{value.name}</h1>
      <h1>{dataNested.address.street}</h1>
      <button onClick={handleClick}>Next User</button>
    </div>
  );
};
export default CallingAPI;
