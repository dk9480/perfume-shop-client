import React, { useState, useEffect } from "react";
import axios from "axios";
import PerfumeList from "./components/PerfumeList";
import AddPerfume from "./components/AddPerfume";
import './App.css';
import Navbar from "./components/Navbar";


function App() {
  const [perfumes, setPerfumes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/perfumes").then((response) => {
      setPerfumes(response.data);
    });
  }, []);

  const handleAddPerfume = (newPerfume) => {
    setPerfumes([...perfumes, newPerfume]);
  };

  return (
    <div className="App">
      <Navbar />
      {/* <h1>Perfume Shop</h1> */}
      <AddPerfume onAdd={handleAddPerfume} />
      <PerfumeList perfumes={perfumes} setPerfumes={setPerfumes} />
    </div>
  );
}

export default App;
