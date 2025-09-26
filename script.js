let board = ["", "", "", "", "", "", "", "", ""];
let player = null;
let gameOver = false;

const playerX = document.querySelector("#playerX");
const playerO = document.querySelector("#playerO");
const statusQ = document.querySelector("#statusQ");
const cells = document.querySelectorAll(".cell");
const resetButton = document.querySelector("#reset");

function checkBoard(cellIndex) {
  return board[cellIndex] === "";
}

function switchPlayer() {
    if (player === "X") {
    player = "O";
    } else {
    player = "X";
    }
}

function checkWinner() {
  const win = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let combo of win) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      [a, b, c].forEach(i => cells[i].classList.add("winner"));
      return true;
    }
  }
  return false;
}

function isDraw() {
  return board.every(cell => cell !== "");
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameOver = false;
  player = null;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winner");
  });
  statusQ.textContent = "Select a player to start";
}

function makeMove(cellIndex) {
    statusQ.textContent = "Select a player to start";
    if (!player) {
      alert("Please select a player to start.");
      return;
    }
    if (gameOver || !checkBoard(cellIndex)) return;
  
    board[cellIndex] = player;
    cells[cellIndex].textContent = player;
  
    if (checkWinner()) {
      statusQ.textContent = `Player ${player} wins!`;
      gameOver = true;
      return;
    }
  
    if (isDraw()) {
      statusQ.textContent = "It's a draw!";
      gameOver = true;
      return;
    }
  
    switchPlayer();
    statusQ.textContent = `Player ${player}'s turn`;
}

playerX.addEventListener("click", () => {
  player = "X";
  statusQ.textContent = `Player ${player}'s turn`;
});

playerO.addEventListener("click", () => {
  player = "O";
  statusQ.textContent = `Player ${player}'s turn`;
});

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    makeMove(index);
  });
});

resetButton.addEventListener("click", () => {
  resetGame();
  console.log("Game reset");
});