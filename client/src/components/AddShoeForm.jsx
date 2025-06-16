import { useState } from "react";
import "./AddShoeForm.css";

export default function AddShoeForm({ onAdd, onBack }) {
  const [shoe, setShoe] = useState({
    name: "",
    brand: "",
    model: "",
    first_use: "",
    races_used: 0,
    image_url: "",
    vote: 0,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!shoe.name) errs.name = "Name is required";
    if (!shoe.brand) errs.brand = "Brand is required";
    if (!shoe.model) errs.model = "Model is required";
    if (shoe.vote < 0 || shoe.vote > 10) errs.vote = "Vote must be 0-10";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShoe((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onAdd(shoe);
    setShoe({
      name: "",
      brand: "",
      model: "",
      first_use: "",
      races_used: 0,
      image_url: "",
      vote: 0,
    });
    setErrors({});
  };

  return (
    <div className="add-shoe-form-wrapper">
      <button
        className="btn-home-icon"
        onClick={onBack}
        aria-label="Back to Home"
        type="button"
      >
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

      <form className="add-shoe-form" onSubmit={handleSubmit}>
        <h2>Add new running shoes</h2>

        <label>
          Name*:
          <input name="name" value={shoe.name} onChange={handleChange} />
          {errors.name && <span className="error">{errors.name}</span>}
        </label>

        <label>
          Brand*:
          <input name="brand" value={shoe.brand} onChange={handleChange} />
          {errors.brand && <span className="error">{errors.brand}</span>}
        </label>

        <label>
          Model*:
          <input name="model" value={shoe.model} onChange={handleChange} />
          {errors.model && <span className="error">{errors.model}</span>}
        </label>

        <label>
          First Use:
          <input
            type="date"
            name="first_use"
            value={shoe.first_use}
            onChange={handleChange}
          />
        </label>

        <label>
          Races Used:
          <input
            type="number"
            name="races_used"
            value={shoe.races_used}
            onChange={handleChange}
          />
        </label>

        <label>
          Image URL:
          <input name="image_url" value={shoe.image_url} onChange={handleChange} />
        </label>

        <label>
          Vote (0-10):
          <input
            type="number"
            name="vote"
            min="0"
            max="10"
            value={shoe.vote}
            onChange={handleChange}
          />
          {errors.vote && <span className="error">{errors.vote}</span>}
        </label>

        <button type="submit">Add Shoe</button>
      </form>
    </div>
  );
}
