const GAME_DURATION = 60;
const TOTAL_PAIR_COUNT = 6;

//"click to play" overlay dismiss handler
$("#start-game").click(function () {
    $("#start-game").removeClass("visible");
});
const cards = document.querySelectorAll(".card");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let flipCount = 0;
let noOfPairsFound = 0;
var gameComplete = false;
//countdown timer
function initTimer() {
    var timeLeft = GAME_DURATION;
    var downloadTimer = setInterval(function () {
        if (timeLeft <= 0) {
            displayGameOver();
            clearInterval(downloadTimer);
            document.getElementById("time-remaining").innerHTML = "Finished";
        } else {
            document.getElementById("time-remaining").innerHTML = timeLeft + "s";
        }
        //timer stops when games is completed within the 60s
        if(gameComplete === false){ 
            timeLeft -= 1;
        }
    }, 1000);
}

function displayGameOver() {
    window.alert("Gameover");
    console.log("Gameover");
}
function flipcard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add("flip");
    incrementflipCounter();
    if (!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    //second click
    secondCard = this;
    checkForMatch();
}
//flipcount
function incrementflipCounter() {
    flipCount += 1;
    document.getElementById("flips").innerHTML = flipCount;
}
function checkForMatch() {
    //cards match?
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        match();
    } else {
        flipBack();
    }
}
function match() {
    //matched
    firstCard.removeEventListener("click", flipcard);
    firstCard.classList.add("spin");
    secondCard.removeEventListener("click", flipcard);
    secondCard.classList.add("spin");
    noOfPairsFound++;
    if (noOfPairsFound === TOTAL_PAIR_COUNT) {
        console.log("Congratulations");
        window.alert("Congratulations");
        gameComplete = true;
    }
    

    resetBoard();
}
function flipBack() {
    //no match
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
    }, 1000);
}
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}
function resetGame() {
    // resetBoard();
    // flipCount = 0
    // shuffle();
    location.reload();
}

(function shuffle() {
    cards.forEach((card) => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();
cards.forEach((card) => card.addEventListener("click", flipcard));
initTimer();
