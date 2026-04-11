import "./Pet.css";

function Rabbit() {
  return (
    <div className="pet-card">
      <img src="./rabbit.png" alt="A rabbit" />
      <h2>Thumper</h2>
      <p className="pet-info">Holland Lop · 1 year old</p>
      <p className="pet-desc">Fluffy, fast, and surprisingly opinionated.</p>
      <button>See more</button>
    </div>
  );
}

export default Rabbit;
