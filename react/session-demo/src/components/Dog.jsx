import "./Pet.css";

function Dog() {
  return (
    <div className="pet-card">
      <img src="./dog.png" alt="A dog" />
      <h2>Biscuit</h2>
      <p className="pet-info">Golden Retriever · 3 years</p>
      <p className="pet-desc">
        Enthusiastic, loyal, and obsessed with tennis balls.
      </p>
      <button>See more</button>
    </div>
  );
}

export default Dog;
