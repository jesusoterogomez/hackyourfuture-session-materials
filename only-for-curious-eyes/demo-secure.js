const app = express();

let game = {}; // stores cardId → image mapping

app.get("/game", (req, res) => {
  // The cards we have
  const cards = ["cat", "dog", "bird", "fish"];
  
  // Create pairs and shuffle
  const pairs = [...cards, ...cards];
  pairs.sort(() => Math.random() - 0.5);
  
  // Assign random IDs, store the answer
  game = {};
  const response = pairs.map((card, position) => {
    const cardId = Math.random().toString(36).slice(2, 8);
    game[cardId] = card + ".png";
    return { position, cardId };
  });
  
  res.json(response);
});

app.get("/card/:id", (req, res) => {
  const image = game[req.params.id];
  if (!image) return res.status(404).json({ error: "Not found" });
  res.json({ image });
});

app.listen(3000, () => console.log("http://localhost:3000"));