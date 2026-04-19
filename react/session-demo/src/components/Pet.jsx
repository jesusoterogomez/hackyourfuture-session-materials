import "./Pet.css";
import { useState } from "react";

function Cat({ details, updateInterest, isInterested }) {
  const { name, breed } = details;

  const [showMore, setShowMore] = useState(false);

  return (
    <div className="pet-card">
      <img src="./cat.png" alt="A cat" />
      <h2>{name}</h2>
      <p className="pet-info">{breed} · 2 years old</p>
      <p className="pet-desc">Loves sunny spots, sleeping, and ignoring you.</p>

      <button onClick={() => setShowMore(!showMore)}>
        {showMore ? "See less" : "See more"}
      </button>

      {showMore && (
        <>
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

          <button
            className="pet-favourite active"
            onClick={() => updateInterest(details.id, !isInterested)}
          >
            {isInterested && "♥"} I'm interested
          </button>
        </>
      )}
    </div>
  );
}

export default Cat;
