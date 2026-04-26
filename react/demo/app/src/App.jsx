import "./App.css";
import { useState, useEffect } from "react";
import Pet from "./components/Pet";
import { Section } from "./components/Sections";
import { AdoptionForm } from "./components/AdoptionForm";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const endpoint = "https://paws-api.jdog.dev/pets";

    fetch(endpoint)
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData));
  }, []);

  const [petsMarkedAsInterested, setPetsMarkedAsInterested] = useState({});

  const updateInterest = (id, isInterested) => {
    // In the object of pets interested, mark the one with ID x, as the value isInterested
    petsMarkedAsInterested[id] = isInterested;

    // We make a copy of the object so react can track it
    setPetsMarkedAsInterested({ ...petsMarkedAsInterested });
  };

  const count = Object.values(petsMarkedAsInterested).filter(Boolean).length;

  // Render function: Returned JSX renders.
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
        <span className="favourites-count">♥ Interested in {count} pets</span>
      </header>

      <div className="hero">
        <h1>Find your new best friend</h1>
        <p>Give a loving home to a pet who needs one</p>
      </div>

      <Section title="Available for adoption">
        <div className="card-grid">
          {data.length === 0 && <p> No pets</p>}
          {data.map((petDetails) => (
            <Pet
              key={petDetails.id}
              details={petDetails}
              isInterested={petsMarkedAsInterested[petDetails.id]}
              updateInterest={updateInterest}
            />
          ))}
        </div>
      </Section>

      <Section title="Want to adopt?">
        <AdoptionForm />
      </Section>
    </>
  );
}

export default App;
