import "./App.css";
import Cat from "./week1/Cat";
import Dog from "./week1/Dog";
import Rabbit from "./week1/Rabbit";

function App() {
  return (
    <>
      <header className="app-header">
        <h1>Paw & Co.</h1>
        <p>Find your new best friend</p>
      </header>

      <main>
        <section id="week1-simple">
          <h2>Pets available for adoption</h2>
          <div className="card-grid">
            <Cat />
            <Dog />
            <Rabbit name="Thumper" />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
