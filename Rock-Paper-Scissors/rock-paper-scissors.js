let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  tie: 0,
};

let isPlaying = false;
let intervalId;

function autoplay() {
  if (isPlaying === false) {
    intervalId = setInterval(function () {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isPlaying = true;
  } else {
    clearInterval(intervalId);
    isPlaying = false;
  }
}

updateScoreElement();

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.tie}`;
}

// FUNCTION FOR THE GAME

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = "";
  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "loss";
    } else if (computerMove === "paper") {
      result = "win";
    } else result = "tie";
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "win";
    } else if (computerMove === "paper") {
      result = "tie";
    } else result = "loss";
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "tie";
    } else if (computerMove === "paper") {
      result = "loss";
    } else result = "win";
  }

  // SCORE UPDATION

  if (result === "win") {
    score.wins += 1;
  } else if (result === "loss") score.losses += 1;
  else score.tie += 1;

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = `You ${result}`;

  document.querySelector(".js-moves").innerHTML = `You
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`;
}

// FUNCTION TO PICK COMPUTER'S MOVE

function pickComputerMove() {
  let computerMove;
  let randomNumber = Math.random();

  if (randomNumber >= 0 && randomNumber < 1 / 3) computerMove = "rock";
  else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3)
    computerMove = "paper";
  else computerMove = "scissors";

  return computerMove;
}
