import "./Pet.css";

function Cat() {
  return (
    <div className="pet-card">
      <img src="./cat.png" alt="A cat" />
      <h2>Whiskers</h2>
      <p>Domestic Cat · 2 years old</p>
      <button>See more</button>
    </div>
  );
}

export default Cat;
