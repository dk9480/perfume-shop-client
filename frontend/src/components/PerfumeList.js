import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PerfumeList.css"; // Import the CSS file

const PerfumeList = ({ setPerfumes }) => {
  const [perfumes, setLocalPerfumes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); //  Added for search

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/perfumes")
      .then((response) => {
        setLocalPerfumes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching perfumes:", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/perfumes/${id}`)
      .then(() => {
        const updatedPerfumes = perfumes.filter((perfume) => perfume._id !== id);
        setLocalPerfumes(updatedPerfumes);
        setPerfumes(updatedPerfumes);
      })
      .catch((error) => console.error("Error deleting perfume:", error));
  };

  //  Filter perfumes based on search term
  const filteredPerfumes = perfumes.filter((perfume) =>
    perfume.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="perfume-container">
      <h2>Available Perfumes</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by perfume name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="perfume-list">
        {filteredPerfumes.map((perfume) => (
          <div key={perfume._id} className="perfume-card">
            <h3>{perfume.name}</h3>
            <p>{perfume.description}</p>
            <p className="price">${perfume.price}</p>
            <button onClick={() => handleDelete(perfume._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerfumeList;
