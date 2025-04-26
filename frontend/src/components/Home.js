import { useEffect, useState } from "react";

function Home() {
    const [perfumes, setPerfumes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/perfumes")
            .then((res) => res.json())
            .then((data) => setPerfumes(data))
            .catch((err) => console.error("Error fetching perfumes:", err));
    }, []);

    return (
        <div>
            <h2>Available Perfumes</h2>
            {perfumes.length === 0 ? (
                <p>No perfumes available.</p>
            ) : (
                <ul>
                    {perfumes.map((perfume) => (
                        <li key={perfume._id}>
                            <strong>{perfume.name}</strong> - {perfume.description} ($ {perfume.price})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Home;
