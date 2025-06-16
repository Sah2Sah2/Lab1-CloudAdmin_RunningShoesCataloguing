import { useState } from "react";
import "./ShoesList.css";

export default function ShoesList({ shoes }) {
  if (!shoes.length) return <p>No running shoes added yet.</p>;

  return (
    <div className="shoe-list">
      {shoes.map((shoe) => (
        <ShoeCard key={shoe.id} shoe={shoe} />
      ))}
    </div>
  );
}

function ShoeCard({ shoe }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="shoe-card">
      <div className="shoe-header">
        <div className="shoe-name-brand">
          <h3>{shoe.name}</h3>
          <p className="shoe-brand">{shoe.brand}</p>
        </div>
        <button className="toggle-btn" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Hide Details ▲" : "Show Details ▼"}
        </button>
      </div>

      {isExpanded && (
        <div className="shoe-details">
          <p><strong>Model:</strong> {shoe.model}</p>
          <p><strong>First Use:</strong> {shoe.first_use}</p>
          <p><strong>Races Used:</strong> {shoe.races_used}</p>
          <p><strong>Vote:</strong> {shoe.vote}/10</p>
          {shoe.image_url && (
            <img
              src={shoe.image_url}
              alt={shoe.name}
              className="shoe-image"
            />
          )}
        </div>
      )}
    </div>
  );
}
