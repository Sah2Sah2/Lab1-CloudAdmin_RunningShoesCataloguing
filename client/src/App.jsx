import { useState, useEffect } from "react";
import AddShoeForm from "./components/AddShoeForm";
import ShoesList from "./components/ShoesList";

export default function App() {
  const [shoes, setShoes] = useState([]);

  useEffect(() => {
    fetch("/api/shoes") 
      .then((res) => res.json())
      .then((data) => setShoes(data))
      .catch(console.error);
  }, []);

  const addShoe = (newShoe) => {
    fetch("/api/shoes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newShoe),
    })
      .then((res) => res.json())
      .then((createdShoe) => setShoes((prev) => [...prev, createdShoe]))
      .catch(console.error);
  };

  return (
    <div>
      <h1>Running Shoes Tracker</h1>
      <AddShoeForm onAdd={addShoe} />
      <ShoesList shoes={shoes} />
    </div>
  );
}
