const board = document.getElementById('board');
const squares = Array.from(document.querySelectorAll('.square'));
const message = document.getElementById('message');
const resetButton = document.getElementById('reset-button');

const playerX = 'X';
const playerO = 'O';
let currentPlayer = playerX;
let gameOver = false;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleTurn(cell) {
  if (gameOver || squares[cell].textContent !== '') {
    return;
  }
  squares[cell].textContent = currentPlayer;
  checkWinner();
  if (!gameOver) {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
    message.textContent = `Current Player: ${currentPlayer}`;
  }
}

function checkWinner() {
  let isTie = true;

  winningConditions.forEach((condition) => {
    const cell1 = squares[condition[0]];
    const cell2 = squares[condition[1]];
    const cell3 = squares[condition[2]];

    // Check for winner (X or O)
    if (cell1.textContent === currentPlayer && cell2.textContent === currentPlayer && cell3.textContent === currentPlayer) {
      message.textContent = `Winner: ${currentPlayer}`;
      gameOver = true;
      return; // Exit the loop if a winner is found
    }

    // Check if any square is empty (not a tie)
    isTie = isTie && (cell1.textContent !== '' && cell2.textContent !== '' && cell3.textContent !== '');
  });

  // Check for tie
  if (isTie && !gameOver) {
    message.textContent = `It's a Tie!`;
    gameOver = true;
  }
}

function resetGame() {
  squares.forEach((square) => (square.textContent = ''));
  currentPlayer = playerX;
  gameOver = false;
  message.textContent = `Current Player: ${currentPlayer}`;
}

resetButton.addEventListener('click', resetGame);

squares.forEach((square) => square.addEventListener('click', () => handleTurn(square.dataset.cell)));
