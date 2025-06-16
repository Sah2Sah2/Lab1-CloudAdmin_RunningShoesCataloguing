import { useState, useEffect } from "react";
import AddShoeForm from "./components/AddShoeForm";
import ShoesList from "./components/ShoesList";
import HomePage from "./components/HomePage";

export default function App() {
  const [page, setPage] = useState("home");
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    if (page !== "view") return; // fetch shoes only when on "view" page

    async function fetchShoes() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/api/shoes`);
        if (!res.ok) throw new Error(`Error fetching shoes: ${res.status}`);
        const text = await res.text();
        const data = text ? JSON.parse(text) : [];
        setShoes(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load shoes. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchShoes();
  }, [API_URL, page]);

  const addShoe = async (newShoe) => {
    if (!newShoe.name || !newShoe.brand) {
      alert("Please provide at least a name and a brand for the shoe.");
      return;
    }

    const shoeToSend = {
      name: newShoe.name,
      brand: newShoe.brand,
      model: newShoe.model,
      first_use: newShoe.first_use,
      races_used: newShoe.races_used,
      image_url: newShoe.image_url,
      vote: newShoe.vote,
    };

    try {
      const res = await fetch(`${API_URL}/api/shoes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shoeToSend),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Error ${res.status}: ${text || "No response body"}`);
      }
      const text = await res.text();
      const createdShoe = text ? JSON.parse(text) : null;
      if (createdShoe) {
        setShoes((prev) => [...prev, createdShoe]);
      }
      setPage("view");
    } catch (err) {
      console.error("Failed to add shoe:", err);
      alert("Failed to add shoe. Please check the console for details.");
    }
  };

  return (
    <div className="app-container">
      <h1>Running Shoes Tracker</h1>

      {page === "view" && (
        <button
          className="btn-home-icon"
          onClick={() => setPage("home")}
          aria-label="Back to Home"
          style={{ position: "absolute", top: 10, right: 10 }}
        >
          {/* SVG home icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M3 9L12 2l9 7v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4H9v4a2 2 0 0 1-2 2H3z" />
          </svg>
        </button>
      )}

      {page === "home" && <HomePage onSelect={setPage} />}

      {page === "view" && (
        <>
          {loading && <p>Loading shoes...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {!loading && !error && <ShoesList shoes={shoes} />}
        </>
      )}

      {page === "add" && <AddShoeForm onAdd={addShoe} onBack={() => setPage("home")} />}
    </div>
  );
}
