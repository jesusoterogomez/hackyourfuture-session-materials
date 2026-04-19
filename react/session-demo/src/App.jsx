import "./App.css";
import { useState } from "react";
import Pet from "./components/Pet";
import { Section } from "./components/Sections";

function App() {
  const pets = [
    {
      id: 1,
      image: "./cat.png",
      name: "Stepan",
      breed: "Domestic Cat",
      description: "Loves sunny spots, sleeping, and ignoring you.",
      age: 2,
      fee: 180,
      available: true,
      goodWithKids: true,
    },
    {
      id: 2,
      image: "./dog.png",
      name: "Bailey",
      breed: "Golden Retriever",
      description: "Enthusiastic, loyal, and obsessed with tennis balls.",
      age: 3,
      fee: 250,
      available: true,
      goodWithKids: true,
    },
    {
      id: 3,
      image: "./rabbit.png",
      name: "Oolong",
      breed: "Holland Lop",
      description: "Fluffy, fast, and surprisingly opinionated.",
      age: 1,
      fee: 100,
    },
    {
      id: 4,
      image: "./frog.png",
      name: "Ribbit",
      breed: "Tree Frog",
      description: "Chill, green, and jumps when least expected.",
      age: 1,
      fee: 180,
    },
  ];

  // Format:
  // {
  //   1: false,
  //   2: true,
  //   3: false,
  // }

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
          {pets.map((petDetails) => (
            <Pet
              key={petDetails.id}
              details={petDetails}
              isInterested={petsMarkedAsInterested[petDetails.id]}
              updateInterest={updateInterest}
            />
          ))}
        </div>
      </Section>
    </>
  );
}

export default App;
