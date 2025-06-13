export default function ShoesList({ shoes }) {
  if (!shoes.length) return <p>No running shoes added yet.</p>;

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      {shoes.map((shoe) => (
        <div key={shoe.id} style={{ border: "1px solid #ddd", marginBottom: 10, padding: 10 }}>
          <h3>{shoe.name}</h3>
          <p><strong>Brand:</strong> {shoe.brand}</p>
          <p><strong>Model:</strong> {shoe.model}</p>
          <p><strong>First Use:</strong> {shoe.first_use}</p>
          <p><strong>Races Used:</strong> {shoe.races_used}</p>
          <p><strong>Vote:</strong> {shoe.vote}/10</p>
          {shoe.image_url && <img src={shoe.image_url} alt={shoe.name} style={{ maxWidth: "100%" }} />}
        </div>
      ))}
    </div>
  );
}
