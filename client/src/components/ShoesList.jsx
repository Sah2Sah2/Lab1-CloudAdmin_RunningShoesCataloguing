import { useState } from "react";
import "./ShoesList.css";

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("sv-SE");
}

export default function ShoesList({ shoes, onDelete }) {
  if (!shoes.length) return <p>No running shoes added yet.</p>;

  return (
    <div className="shoe-list">
      {shoes.map((shoe) => (
        <ShoeCard key={shoe.id} shoe={shoe} onDelete={onDelete} />
      ))}
    </div>
  );
}

function ShoeCard({ shoe, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this shoe?")) return;

    setIsDeleting(true);
    try {
      await onDelete(shoe.id);
    } catch (error) {
      alert("Failed to delete shoe. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="shoe-card">
      <div className="shoe-header">
        <div className="shoe-name-brand">
          <h3>{shoe.name}</h3>
          <p className="shoe-brand">{shoe.brand}</p>
        </div>

        <div className="button-group">
          <button className="toggle-btn" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "Hide Details ▲" : "Show Details ▼"}
          </button>
          <button
            className="delete-btn"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="shoe-details">
          <p><strong>Model:</strong> {shoe.model}</p>
          <p><strong>First Use:</strong> {formatDate(shoe.first_use)}</p>
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

