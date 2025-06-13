import { useState } from "react";

export default function AddShoeForm({ onAdd }) {
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

    // Call onAdd with shoe data
    onAdd(shoe);

    // Reset form
    setShoe({
      name: "",
      brand: "",
      model: "",
      first_use: "",
      races_used: 0,
      image_url: "",
      vote: 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
      <div>
        <label>Name*:</label>
        <input name="name" value={shoe.name} onChange={handleChange} />
        {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
      </div>
      <div>
        <label>Brand*:</label>
        <input name="brand" value={shoe.brand} onChange={handleChange} />
        {errors.brand && <div style={{ color: "red" }}>{errors.brand}</div>}
      </div>
      <div>
        <label>Model*:</label>
        <input name="model" value={shoe.model} onChange={handleChange} />
        {errors.model && <div style={{ color: "red" }}>{errors.model}</div>}
      </div>
      <div>
        <label>First Use:</label>
        <input type="date" name="first_use" value={shoe.first_use} onChange={handleChange} />
      </div>
      <div>
        <label>Races Used:</label>
        <input type="number" name="races_used" value={shoe.races_used} onChange={handleChange} />
      </div>
      <div>
        <label>Image URL:</label>
        <input name="image_url" value={shoe.image_url} onChange={handleChange} />
      </div>
      <div>
        <label>Vote (0-10):</label>
        <input
          type="number"
          name="vote"
          min="0"
          max="10"
          value={shoe.vote}
          onChange={handleChange}
        />
        {errors.vote && <div style={{ color: "red" }}>{errors.vote}</div>}
      </div>
      <button type="submit">Add Shoe</button>
    </form>
  );
}
