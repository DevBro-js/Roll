"use strict";

const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const diceLogo = document.querySelector(".dice");
const diceContainer = document.querySelector(".dice-img");
const currentPlayerScore1 = document.querySelector(".current-score__player-0");
const currentPlayerScore2 = document.querySelector(".current-score__player-1");
const overallScorePlayer1 = document.querySelector(".overall-score-0");
const overallScorePlayer2 = document.querySelector(".overall-score-1");
const overallScoreContainers = document.querySelectorAll(".overall");
const btnPlayGame = document.querySelector(".btn--play-game");
const player1Username = document.getElementById("player-1__name");
const player2Username = document.getElementById("player-2__name");
const usernameContainer = document.querySelector(".username__container");
const showPlayer1Username = document.querySelector(".player-1-username");
const showPlayer2Username = document.querySelector(".player-2-username");
const player1Container = document.querySelector(".player--0");
const player2Container = document.querySelector(".player--1");
const sections = document.querySelectorAll(".player");
const gameBtn = document.querySelectorAll(".btn--game");
const goal = document.getElementById("player-score");
const newGame = document.querySelector(".btn--new-game");

let currentScore = 0;
let activePlayer = 0;
let overallScore, randomDice, scoreTarget;
overallScore = [0, 0];

currentPlayerScore1.textContent = currentPlayerScore2.textContent = 0;
overallScorePlayer1.textContent = overallScorePlayer2.textContent = 0;

diceContainer.classList.add("hidden");

btnPlayGame.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    player1Username.value === "" ||
    player2Username.value === "" ||
    +(goal.value === "")
  ) {
    alert("Please provide a username to continue");
    // console.log(goal.value);
  } else {
    scoreTarget = +goal.value;
    usernameContainer.classList.add("fade");
    showPlayer1Username.textContent = player1Username.value
      .toLowerCase()
      .split(" ")
      .map((user) => user.toUpperCase())
      .join(" ");

    showPlayer2Username.textContent = player2Username.value
      .toLowerCase()
      .split(" ")
      .map((user) => user.toUpperCase())
      .join(" ");
  }
});

rollBtn.addEventListener("click", function (e) {
  e.preventDefault();
  randomDice = Math.trunc(Math.random() * 5 + 1);
  diceContainer.classList.remove("hidden");
  diceLogo.src = `/img/dice-${randomDice}.jpg`;
  overallScoreContainers.forEach((con) => con.classList.add("animation-fade"));
  window.addEventListener("beforeunload", function (e) {
    e.preventDefault();
    e.returnValue = "message";
  });

  if (randomDice !== 1) {
    currentScore += randomDice;
    document.querySelector(
      `.current-score__player-${activePlayer}`
    ).textContent = currentScore;
  } else {
    currentScore = 0;
    player1Container.classList.toggle("active");
    player2Container.classList.toggle("active");
    document.querySelector(
      `.current-score__player-${activePlayer}`
    ).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
  }
});

holdBtn.addEventListener("click", function (e) {
  e.preventDefault();

  currentScore;
  overallScore[`${activePlayer}`] =
    currentScore + overallScore[`${activePlayer}`];
  overallScore;
  document.querySelector(`.overall-score-${activePlayer}`).textContent =
    overallScore[`${activePlayer}`];

  if (overallScore[`${activePlayer}`] >= scoreTarget) {
    diceContainer.classList.add("hidden");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("active");
    document.querySelector(`.player--${activePlayer}`).classList.add("winner");
    overallScoreContainers.forEach((con) =>
      con.classList.remove("animation-fade")
    );
    confetti();

    gameBtn.forEach((btn) => {
      if (btn.classList.contains("hidden")) {
        btn.classList.remove("hidden");
      } else {
        btn.classList.add("hidden");
      }
    });
  }

  currentScore = 0;
  player1Container.classList.toggle("active");
  player2Container.classList.toggle("active");
  document.querySelector(`.current-score__player-${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
});

newGame.addEventListener("click", function (e) {
  e.preventDefault();

  randomDice = Math.trunc(Math.random() * 5 + 1);
  currentPlayerScore1.textContent = currentPlayerScore2.textContent = 0;
  overallScorePlayer1.textContent = overallScorePlayer2.textContent = 0;
  activePlayer = 0;
  overallScore = [0, 0];
  sections.forEach((sect) => {
    if (sect.classList.contains("winner")) {
      sect.classList.remove("winner");
    }

    sect.classList.remove("active");
  });

  player1Container.classList.add("active");

  currentScore = 0;
  gameBtn.forEach((btn) => {
    if (btn.classList.contains("hidden")) {
      btn.classList.remove("hidden");
    } else {
      btn.classList.add("hidden");
    }
  });
});
