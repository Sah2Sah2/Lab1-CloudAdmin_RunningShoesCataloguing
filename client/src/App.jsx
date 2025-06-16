import { useState, useEffect } from "react";
import AddShoeForm from "./components/AddShoeForm";
import ShoesList from "./components/ShoesList";

export default function App() {
  const [shoes, setShoes] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    fetch(`${API_URL}/api/shoes`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Error fetching shoes: ${res.status}`);
        const text = await res.text();
        return text ? JSON.parse(text) : []; // handle empty response
      })
      .then((data) => setShoes(data))
      .catch((err) => {
        console.error(err);
      });
  }, [API_URL]);

  const addShoe = (newShoe) => {
    const shoeToSend = {
      name: newShoe.name,
      brand: newShoe.brand,
      model: newShoe.model,
      first_use: newShoe.first_use,
      races_used: newShoe.races_used,
      image_url: newShoe.image_url,  
      vote: newShoe.vote,            
    };

    fetch(`${API_URL}/api/shoes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(shoeToSend),
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Error ${res.status}: ${text || "No response body"}`);
        }
        const text = await res.text();
        return text ? JSON.parse(text) : null; // handle empty response
      })
      .then((createdShoe) => {
        if (createdShoe) setShoes((prev) => [...prev, createdShoe]);
      })
      .catch((err) => {
        console.error("Failed to add shoe:", err);
        alert("Failed to add shoe, check console for details.");
      });
  };

  return (
    <div>
      <h1>Running Shoes Tracker</h1>
      <AddShoeForm onAdd={addShoe} />
      <ShoesList shoes={shoes} />
    </div>
  );
}
