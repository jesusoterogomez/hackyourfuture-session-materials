// Card data - unique cards with id and emoji
const cards = [
  { id: 1, emoji: "🐱" },
  { id: 2, emoji: "🐶" },
  { id: 3, emoji: "🐸" },
  { id: 4, emoji: "🦊" },
  { id: 5, emoji: "🐯" },
  { id: 6, emoji: "🦁" },
  { id: 7, emoji: "🐮" },
  { id: 8, emoji: "🐷" },
];

// Duplicate and shuffle
const pairs = [...cards, ...cards];
pairs.sort(() => Math.random() - 0.5);

// Game state
const gameState = {
  flippedCards: [],
  matchedIds: [],
};

// Create the grid
const grid = document.getElementById("grid");

// Add the cards to the grid
pairs.forEach((cardData) => {
  const card = document.createElement("div");
  card.classList.add("card");

  // Save the card data to the card element
  card.dataset.id = cardData.id;
  card.dataset.emoji = cardData.emoji;

  // Add a click event listener to the card
  card.addEventListener("click", flipCard);

  // Add the card to the grid
  grid.appendChild(card);
});

function flipCard(event) {
  const card = event.target;
  const id = Number(card.dataset.id);

  // Ignore if already matched
  if (gameState.matchedIds.includes(id)) {
    return;
  }

  // Ignore if this card is already flipped
  if (gameState.flippedCards.includes(card)) {
    return;
  }

  // Ignore if two cards already flipped
  if (gameState.flippedCards.length === 2) {
    return;
  }

  // Flip the card
  card.classList.add("flipped");
  card.textContent = card.dataset.emoji;
  gameState.flippedCards.push(card);

  // Check for match when two cards are flipped
  if (gameState.flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = gameState.flippedCards;
  const id1 = Number(card1.dataset.id);
  const id2 = Number(card2.dataset.id);

  if (id1 === id2) {
    // Match!
    card1.classList.add("matched");
    card2.classList.add("matched");
    gameState.matchedIds.push(id1);
    gameState.flippedCards = [];

    // Check for win
    if (gameState.matchedIds.length === cards.length) {
      setTimeout(() => {
        alert("You won!");
      }, 50);
    }
  } else {
    // No match - flash red, then flip back
    card1.classList.add("no-match");
    card2.classList.add("no-match");

    setTimeout(() => {
      card1.classList.remove("flipped", "no-match");
      card2.classList.remove("flipped", "no-match");
      card1.textContent = "";
      card2.textContent = "";
      gameState.flippedCards = [];
    }, 1000);
  }
}
