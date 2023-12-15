/** 
Author:    Build Rise Shine with Nyros (BRS) 
Created:   2023
Library / Component: Script file
Description: Tic Tac Toe game logic
(c) Copyright by BRS with Nyros. 
**/

// Init player names and Elements
let playerOneName;
let playerTwoName;
let playerOneNameInput = document.getElementById("playerOne");
let playerTwoNameInput = document.getElementById("playerTwo");
let gameBoardContainer = document.getElementById("tic-tac-toe");
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("game-board");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
let circleTurn;
const PLAYER_ONE_CLASS = "x";
const PLAYER_TWO_CLASS = "circle";
const WIN_POSSIBILITY_ARR = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Default theme
let chathams_blue = "#1A4B84";

// check player names and show the game board if true
const gameStartListener = () => {
  if (playerOneNameInput.value === "") {
    alert("Please enter player 1 name");
    playerOneNameInput.focus();
    return;
  }
  if (playerTwoNameInput.value === "") {
    alert("Please enter player 2 name");
    playerTwoNameInput.focus();
    return;
  }
  playerOneName = playerOneNameInput.value;
  playerTwoName = playerTwoNameInput.value;
  gameBoardContainer.style.display = "flex";
  gameStartButton.style.display = "none"
};

// Init the event listener
const gameStartButton = document.getElementById("startGame");
gameStartButton.addEventListener("click", gameStartListener);

startGame();

restartButton.addEventListener("click", startGame);

// Start or Reset Game setup Logic
function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(PLAYER_ONE_CLASS);
    cell.classList.remove(PLAYER_TWO_CLASS);
    cell.removeEventListener("click", handleBoardCellClick);
    cell.addEventListener("click", handleBoardCellClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
  playerOneNameInput.value = "";
  playerTwoNameInput.value = "";
  gameBoardContainer.style.display = "none"; 
  gameStartButton.style.display = "block"
} 

// handle click function
function handleBoardCellClick(e) {
  const cell = e.target;
  console.log(e.target); 
  const currentClass = circleTurn ? PLAYER_TWO_CLASS : PLAYER_ONE_CLASS; // 'x' or 'circle' class
  placeIcon(cell, currentClass);
  if (checkWinStatus(currentClass)) {
    gameEndStatus(false);
  } else if (gameDrawStatus()) {
    gameEndStatus(true);
  } else {
    swapIcons();
    setBoardHoverClass();
  }
}

// Game End Logic
function gameEndStatus(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw!";
  } else {
    winningMessageTextElement.innerText = `${
      circleTurn ? playerTwoName : playerOneName
    } is winner!`;
  }
  winningMessageElement.classList.add("show");
}

// Game Draw Logic
function gameDrawStatus() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(PLAYER_ONE_CLASS) ||
      cell.classList.contains(PLAYER_TWO_CLASS)
    );
  });
}

// placing the icon
function placeIcon(cell, currentClass) {
  cell.classList.add(currentClass);
}

// swap the turns
function swapIcons() {
  circleTurn = !circleTurn;
}

// set/remove class
function setBoardHoverClass() {
  board.classList.remove(PLAYER_ONE_CLASS);
  board.classList.remove(PLAYER_TWO_CLASS);
  if (circleTurn) {
    board.classList.add(PLAYER_TWO_CLASS);
  } else {
    board.classList.add(PLAYER_ONE_CLASS);
  }
}

// Win Logic
function checkWinStatus(currentClass) {
  return WIN_POSSIBILITY_ARR.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

// Change Theme
function setTheme(theme) {
  document.documentElement.style.setProperty("--primary-color", theme);
  localStorage.setItem("movie-theme", theme);
}
setTheme(localStorage.getItem("movie-theme") || chathams_blue);
