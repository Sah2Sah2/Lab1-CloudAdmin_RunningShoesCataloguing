
import "./HomePage.css";

export default function HomePage({ onSelect }) {
  return (
    <div className="homepage-container">
      <h2>Keep your favorite running shoes organized, 
        <br/> monitor their performance, 
        <br/> and find the perfect pair for every run.</h2>
      <div className="homepage-buttons">
        <button onClick={() => onSelect("view")}>View Shoes</button>
        <button onClick={() => onSelect("add")}>Add Shoes</button>
      </div>

      <p className="tagline">✨ Ready for your next run? Let's find your perfect match! ✨ </p>

    </div>
  );
}
