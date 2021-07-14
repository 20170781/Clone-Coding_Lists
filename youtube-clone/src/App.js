import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    console.log("effect");
  }, []);
  return <div className="App"></div>;
}

export default App;
