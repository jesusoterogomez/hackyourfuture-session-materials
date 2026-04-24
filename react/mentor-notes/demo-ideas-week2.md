# Demo notes — Paws pet adoption app

The app has 4 hardcoded pet components (`Cat`, `Dog`, `Rabbit`, `Frog`) plus a static header counter. `Frog` is already showing the full "end state" visually (expanded details, interested button) — use it as a preview before you start coding.

---

## 1. Props — replace the four components with one

**The problem:** `Cat`, `Dog`, `Rabbit`, `Frog` are four files doing the same thing with different data baked in. Show them side by side, point out they're identical in shape.

**What to do:** Create `src/components/PetCard.jsx`, then replace each animal component one by one.

```jsx
function PetCard({ name, breed, age, description, image }) {
  return (
    <div className="pet-card">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p className="pet-info">{breed} · {age}</p>
      <p className="pet-desc">{description}</p>
      <button>See more</button>
    </div>
  );
}
```

In `App.jsx`, replace e.g. `<Cat />` with:

```jsx
<PetCard
  name="Whiskers"
  breed="Domestic Cat"
  age="2 years"
  image="./cat.png"
  description="Loves sunny spots, sleeping, and ignoring you."
/>
```

Do one, confirm it looks the same, then do the rest.

---

## 2. Lists + .map() — move data into an array

**What to do:** Once all four are using `PetCard`, move the data into an array at the top of `App.jsx` and replace the four `<PetCard />` calls with a single `.map()`.

```jsx
const pets = [
  { id: 1, name: 'Whiskers', breed: 'Domestic Cat', age: '2 years', image: './cat.png', description: 'Loves sunny spots, sleeping, and ignoring you.' },
  { id: 2, name: 'Biscuit', breed: 'Golden Retriever', age: '3 years', image: './dog.png', description: 'Enthusiastic, loyal, and obsessed with tennis balls.' },
  { id: 3, name: 'Thumper', breed: 'Holland Lop', age: '1 year', image: './rabbit.png', description: 'Fluffy, fast, and surprisingly opinionated.' },
  { id: 4, name: 'Ribbit', breed: 'Tree Frog', age: '1 year', image: './frog.png', description: 'Chill, green, and jumps when least expected.' },
];

// replace the four <PetCard /> calls with:
{pets.map((pet) => (
  <PetCard key={pet.id} {...pet} />
))}
```

Point out: adding a fifth pet is now one object in the array, not a new file.

---

## 3. State — make "See more" work

**Current state:** `Frog` already shows what the expanded card looks like (`.pet-extra` div, "See less" button). Use it as a reference, then add state to `PetCard`.

**What to do:** Add `useState` to `PetCard` to toggle the expanded section.

```jsx
import { useState } from 'react';

const [expanded, setExpanded] = useState(false);
```

Replace the static button with:

```jsx
<button onClick={() => setExpanded((prev) => !prev)}>
  {expanded ? 'See less' : 'See more'}
</button>
```

Add the conditional section below it:

```jsx
{expanded && (
  <div className="pet-extra">
    <p><strong>Adoption fee:</strong> 180kr</p>
    <p><strong>Available:</strong> Yes</p>
    <p><strong>Good with kids:</strong> Yes</p>
  </div>
)}
```

Click a card — only that one expands. Each card has its own independent state.

---

## 4. Lifting state — wire up "I'm interested"

**Current state:** The header already has `<span className="favourites-count">♥ Interested in 0 pets</span>` as a static placeholder. `Frog` already has the `pet-favourite active` button rendered statically. All CSS is ready (`.pet-favourite`, `.pet-favourite.active`, `.favourites-count`).

**The problem to pose:** If the "I'm interested" state lives inside `PetCard`, how does the header know how many pets are selected?

**What to do in `App.jsx`:**

```jsx
const [interested, setInterested] = useState([]);

function toggleInterest(id) {
  setInterested((prev) =>
    prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
  );
}
```

Pass down to `PetCard` via the `.map()`:

```jsx
<PetCard
  key={pet.id}
  {...pet}
  isInterested={interested.includes(pet.id)}
  onToggleInterest={toggleInterest}
/>
```

Update the header counter (replace the static span):

```jsx
<span className="favourites-count">
  ♥ Interested in {interested.length} pets
</span>
```

In `PetCard`, add the button:

```jsx
<button
  className={`pet-favourite${isInterested ? ' active' : ''}`}
  onClick={() => onToggleInterest(id)}
>
  {isInterested ? '♥ I\'m interested' : '♡ I\'m interested'}
</button>
```

---

## 5. Children prop — extract a Section wrapper

**What to do:** Extract the pets section wrapper into a reusable `Section` component.

```jsx
function Section({ title, children }) {
  return (
    <section className="pets-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
```

In `App.jsx`, replace `<div className="pets-section">` with:

```jsx
<Section title="Available for adoption">
  <div className="card-grid">
    {pets.map((pet) => (
      <PetCard key={pet.id} {...pet} />
    ))}
  </div>
</Section>
```

Point out: `Section` owns the layout, the parent decides what goes inside. You could add a second `<Section title="Recently adopted">` with no extra CSS needed.
