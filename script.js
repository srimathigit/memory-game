document.addEventListener("DOMContentLoaded", () => {
    const cardArray = [
        { name: "AI", img: "img1.png" },
        { name: "AI", img: "img1.png" },
        { name: "ML", img: "img2.png" },
        { name: "ML", img: "img2.png" },
        { name: "Cloud", img: "img3.png" },
        { name: "Cloud", img: "img3.png" },
        { name: "Data", img: "img4.png" },
        { name: "Data", img: "img4.png" },
        { name: "Python", img: "img5.png" },
        { name: "Python", img: "img5.png" },
        { name: "DevOps", img: "img6.png" },
        { name: "DevOps", img: "img6.png" }
    ];

    const gameBoard = document.querySelector(".grid");
    const startButton = document.getElementById("start-game");
    let chosenCards = [];
    let chosenCardIds = [];
    let matchedCards = [];
    let isGameActive = false;

    function createBoard() {
        gameBoard.innerHTML = ""; // Clear previous game
        cardArray.sort(() => 0.5 - Math.random()); // Shuffle cards
        matchedCards = []; // Reset matched cards

        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement("div");
            card.classList.add("card");
            card.setAttribute("data-id", i);
            card.addEventListener("click", flipCard);
            gameBoard.appendChild(card);
        }
    }

    function flipCard() {
        if (!isGameActive) return; // Prevent flipping if the game hasn't started
        let cardId = this.getAttribute("data-id");

        // Prevent clicking the same card twice or flipping already matched cards
        if (chosenCardIds.includes(cardId) || matchedCards.includes(cardId)) return;

        // Show the image
        this.style.backgroundImage = `url(${cardArray[cardId].img})`;
        this.style.backgroundSize = "cover";

        chosenCards.push(cardArray[cardId].name);
        chosenCardIds.push(cardId);

        if (chosenCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }

    function checkMatch() {
        const cards = document.querySelectorAll(".card");
        const [id1, id2] = chosenCardIds;

        if (chosenCards[0] === chosenCards[1]) {
            // Matched - Keep them visible
            matchedCards.push(id1, id2);
        } else {
            // Not a match - Hide them again
            setTimeout(() => {
                cards[id1].style.backgroundImage = "none";
                cards[id2].style.backgroundImage = "none";
            }, 500);
        }

        chosenCards = [];
        chosenCardIds = [];

        if (matchedCards.length === cardArray.length) {
            setTimeout(() => {
                alert("Congratulations! You matched all pairs.");
                restartGame();
            }, 500);
        }
    }

    function restartGame() {
    isGameActive = false;
    window.location.reload(); // Reload the page to return to the first page
}

    startButton.addEventListener("click", () => {
        isGameActive = true;
        createBoard();
    });
});