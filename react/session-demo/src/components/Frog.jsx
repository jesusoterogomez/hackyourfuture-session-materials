import "./Pet.css";

function Frog() {
  return (
    <div className="pet-card">
      <img src="./frog.png" alt="A frog" />
      <h2>Ribbit</h2>
      <p className="pet-info">Tree Frog · 1 year old</p>
      <p className="pet-desc">Chill, green, and jumps when least expected.</p>

      <button>See less</button>

      <div className="pet-extra">
        <p>
          <strong>Adoption fee:</strong> 180kr
        </p>
        <p>
          <strong>Available:</strong> Yes
        </p>
        <p>
          <strong>Good with kids:</strong> Yes
        </p>
      </div>

      <button className="pet-favourite active">♥ I'm interested</button>
    </div>
  );
}

export default Frog;
