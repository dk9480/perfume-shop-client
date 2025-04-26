import React, { useState } from "react";
import axios from "axios";
import "./AddPerfume.css"; // Import the CSS file

const AddPerfume = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !price) {
      alert("Please fill in all fields");
      return;
    }

    const newPerfume = { name, description, price: parseFloat(price) };

    axios
      .post("http://localhost:5000/api/perfumes", newPerfume)
      .then((response) => {
        onAdd(response.data); // Update the list
        setName("");
        setDescription("");
        setPrice("");
      })
      .catch((error) => {
        console.error("Error adding perfume:", error);
      });
  };

  return (
    <div className="add-perfume-container">
      <h2>Add New Perfume</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Perfume Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Add Perfume</button>
      </form>
    </div>
  );
};

export default AddPerfume;
