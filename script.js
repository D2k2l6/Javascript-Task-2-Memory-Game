document.addEventListener("DOMContentLoaded", () => {
  const gameBoard = document.querySelector(".game-board");
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const cardValues = [...letters, ...letters].sort(() => Math.random() - 0.5);

  let flippedCards = [];
  let matchedPairs = 0;

  cardValues.forEach((value) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = value;
    card.innerText = value; 
    card.style.color = "transparent";
    gameBoard.appendChild(card);

    card.addEventListener("click", () => {
      if (card.classList.contains("flipped") || card.classList.contains("matched") || flippedCards.length === 2) {
        return;
      }

      // Flip the card
      card.classList.add("flipped");
      card.style.color = "black";
      flippedCards.push(card);

      // Check for a match
      if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;
        if (card1.dataset.value === card2.dataset.value) {
          card1.classList.add("matched");
          card2.classList.add("matched");
          matchedPairs++;
          flippedCards = [];

          // Check for win condition
          if (matchedPairs === letters.length) {
            setTimeout(() => alert("You win!"), 500);
          }
        } else {
          // Flip cards back after 1 second
          setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.style.color = "transparent";
            card2.style.color = "transparent";
            flippedCards = [];
          }, 1000);
        }
      }
    });
  });
});