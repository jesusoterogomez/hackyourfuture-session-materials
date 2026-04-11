import "./Pet.css";

function Frog() {
  return (
    <div className="pet-card">
      <img src="./frog.png" alt="A frog" />
      <h2>Ribbit</h2>
      <p className="pet-info">Tree Frog · 1 year old</p>
      <p className="pet-desc">Chill, green, and jumps when least expected.</p>
      <button>See more</button>
    </div>
  );
}

export default Frog;
