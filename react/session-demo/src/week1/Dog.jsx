import "./Pet.css";

function Dog() {
  return (
    <div className="pet-card">
      <img src="https://placehold.co/200x200" alt="A dog" />
      <h2>Biscuit</h2>
      <p>Golden Retriever · 3 years old</p>
      <button>See more</button>
    </div>
  );
}

export default Dog;
