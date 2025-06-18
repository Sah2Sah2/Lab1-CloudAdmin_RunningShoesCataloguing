import React, { useState, useEffect } from "react";
import "./EditShoeModal.css";

export default function EditShoeModal({ shoe, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: shoe.name || "",
    brand: shoe.brand || "",
    model: shoe.model || "",
    first_use: shoe.first_use || "",
    races_used: shoe.races_used || 0,
    image_url: shoe.image_url || "",
    vote: shoe.vote || 0,
  });

  useEffect(() => {
    setFormData({
      name: shoe.name || "",
      brand: shoe.brand || "",
      model: shoe.model || "",
      first_use: shoe.first_use || "",
      races_used: shoe.races_used || 0,
      image_url: shoe.image_url || "",
      vote: shoe.vote || 0,
    });
  }, [shoe]);

  // Helper to format date for input type="date"
  function formatDateForInput(dateString) {
    if (!dateString) return "";
    return dateString.split("T")[0]; // Extract YYYY-MM-DD
  }

  function handleChange(e) {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "races_used" || name === "vote") {
      newValue = Number(value);
      // Prevent NaN if empty
      if (isNaN(newValue)) newValue = 0;
    } else {
      newValue = value || "";
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await onSave(formData);
      onClose();
    } catch (err) {
      alert("Failed to save shoe. Please try again.");
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Shoe</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name (required)
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Brand (required)
            <input
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Model (required)
            <input
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            First Use
            <input
              type="date"
              name="first_use"
              value={formatDateForInput(formData.first_use)}
              onChange={handleChange}
            />
          </label>
          <label>
            Races Used
            <input
              type="number"
              min="0"
              name="races_used"
              value={formData.races_used}
              onChange={handleChange}
            />
          </label>
          <label>
            Image URL
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
            />
          </label>
          <label>
            Vote (0-10)
            <input
              type="number"
              min="0"
              max="10"
              name="vote"
              value={formData.vote}
              onChange={handleChange}
            />
          </label>

          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
