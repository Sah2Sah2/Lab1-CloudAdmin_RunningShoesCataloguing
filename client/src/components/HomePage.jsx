
import "./HomePage.css";

export default function HomePage({ onSelect }) {
  return (
    <div className="homepage-container">
      <h2>Welcome to Running Shoes Tracker</h2>
      <div className="homepage-buttons">
        <button onClick={() => onSelect("view")}>View Shoes</button>
        <button onClick={() => onSelect("add")}>Add Shoe</button>
      </div>
    </div>
  );
}
