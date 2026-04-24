import "./Pet.css";
import { useState } from "react";

function Pet({ details, updateInterest, isInterested }) {
  const { name, breed, description, image, fee, available, goodWithKids } =
    details;

  const [showMore, setShowMore] = useState(false);

  return (
    <div className="pet-card">
      <img src={image} />
      <h2>{name}</h2>
      <p className="pet-info">{breed} · 2 years old</p>
      <p className="pet-desc">{description}</p>

      <button onClick={() => setShowMore(!showMore)}>
        {showMore ? "See less" : "See more"}
      </button>

      {showMore && (
        <>
          <div className="pet-extra">
            <p>
              <strong>Adoption fee:</strong> {fee}kr
            </p>
            <p>
              <strong>Available:</strong> {available ? "Yes" : "No"}
            </p>
            <p>
              <strong>Good with kids:</strong> {goodWithKids ? "Yes" : "No"}
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

export default Pet;
