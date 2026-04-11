import "./App.css";
import Cat from "./components/Cat";
import Dog from "./components/Dog";
import Rabbit from "./components/Rabbit";
import Frog from "./components/Frog";

function App() {
  return (
    <>
      <header className="app-header">
        <span className="logo">🐾 Paws</span>
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
          <Frog />
        </div>
      </div>
    </>
  );
}

export default App;
