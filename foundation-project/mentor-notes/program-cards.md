# Cards from Database Approach

## Database Schema

```sql
CREATE TABLE cards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  image_url TEXT
)
```

## Seed Data

```sql
INSERT INTO cards (name, image_url) VALUES ('cat', '/images/cat.png');
INSERT INTO cards (name, image_url) VALUES ('dog', '/images/dog.png');
INSERT INTO cards (name, image_url) VALUES ('bird', '/images/bird.png');
INSERT INTO cards (name, image_url) VALUES ('fish', '/images/fish.png');
```

## Backend

```javascript
app.get("/cards", async (req, res) => {
  const cards = await db.all("SELECT * FROM cards");
  res.json(cards);
});
```

## API Response

```json
[
  { "id": 1, "name": "cat", "image_url": "/images/cat.png" },
  { "id": 2, "name": "dog", "image_url": "/images/dog.png" },
  { "id": 3, "name": "bird", "image_url": "/images/bird.png" },
  { "id": 4, "name": "fish", "image_url": "/images/fish.png" }
]
```

## Frontend Changes

```javascript
// Before (hardcoded)
const cards = [
  { id: 1, name: "cat", image: "/images/cat.png" },
  ...
];

// After (fetched)
const response = await fetch("http://localhost:3000/cards");
const cards = await response.json();

// Then duplicate + shuffle as before
const pairs = [...cards, ...cards];
pairs.sort(() => Math.random() - 0.5);
```
