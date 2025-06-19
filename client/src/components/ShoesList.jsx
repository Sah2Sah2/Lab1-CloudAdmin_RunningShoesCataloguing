import { useState } from "react";
import EditShoeModal from "./EditShoeModal";
import "./ShoesList.css";

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date)) return "";
  return date.toLocaleDateString("sv-SE");
}

export default function ShoesList({ shoes, onDelete, onEdit }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  if (!shoes.length) return <p>No running shoes added yet.</p>;

  // Pagination
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const shoesToShow = shoes.slice(startIndex, endIndex);

  const totalPages = Math.ceil(shoes.length / pageSize);

  return (
    <div>
      <div className="shoe-list">
        {shoesToShow.map((shoe) => (
          <ShoeCard
            key={shoe.id}
            shoe={shoe}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className="pagination-btn"
          >
            &lt; {/* < */}
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className="pagination-btn"
          >
            &gt; {/* > */}
          </button>
        </div>
      )}
    </div>
  );
}

function ShoeCard({ shoe, onDelete, onEdit }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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

  async function handleSave(updatedData) {
    try {
      await onEdit(shoe.id, updatedData);
      setIsEditing(false);
    } catch (error) {
      alert("Failed to save changes. Please try again.");
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
          <button
            className="toggle-btn"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            disabled={isEditing}
          >
            {isExpanded ? "Hide Details ▲" : "Show Details ▼"}
          </button>
          <button
            className="delete-btn"
            onClick={handleDelete}
            disabled={isDeleting || isEditing}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="shoe-details">
          <p>
            <strong>Model:</strong> {shoe.model}
          </p>
          <p>
            <strong>First Use:</strong> {formatDate(shoe.first_use)}
          </p>
          <p>
            <strong>Races Used:</strong> {shoe.races_used}
          </p>
          <p>
            <strong>Vote:</strong> {shoe.vote}/10
          </p>
          {shoe.image_url && (
            <img
              src={shoe.image_url}
              alt={shoe.name || "Running shoe image"}
              className="shoe-image"
            />
          )}

          <button
            className="edit-btn"
            onClick={() => setIsEditing(true)}
            disabled={isDeleting}
          >
            ✏️ Edit
          </button>

          {isEditing && (
            <EditShoeModal
              shoe={shoe}
              onClose={() => setIsEditing(false)}
              onSave={(updatedData) => handleSave(updatedData)}
            />
          )}
        </div>
      )}
    </div>
  );
}
