import "./Pet.css";

function Rabbit() {
  return (
    <div className="pet-card">
      <img src="https://placehold.co/200x200" alt="A rabbit" />
      <h2>Thumper</h2>
      <p>Holland Lop · 1 year old</p>
      <button>See more</button>
    </div>
  );
}

export default Rabbit;
