import { useState } from "react";

import "./App.css";
import CallingAPI from "./components/CallingAPI";

function App() {
  return (
    <div className="App">
      <h2>Heldlo</h2>
      <CallingAPI />
    </div>
  );
}

export default App;
