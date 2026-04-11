import "./App.css";
import Cat from "./week1/Cat";
import Dog from "./week1/Dog";
import Rabbit from "./week1/Rabbit";

function App() {
  return (
    <>
      <header className="app-header">
        <span className="logo">🐾 Paw & Co.</span>
        <nav>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Pets</a>
          <a href="#">Contact</a>
        </nav>
      </header>

      <div className="hero">
        <h1>Find your new best friend</h1>
        <p>Give a loving home to a pet who needs one</p>
      </div>

      <div className="pets-section">
        <h2>Available for adoption</h2>
        <div className="card-grid">
          <Cat />
          <Dog />
          <Rabbit />
        </div>
      </div>
    </>
  );
}

export default App;
