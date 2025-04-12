// Get references to DOM elements
const canvas = document.getElementById('puzzleCanvas');
const ctx = canvas.getContext('2d');
const answerInput = document.getElementById('userAnswer');
const submitBtn = document.getElementById('submitAnswer');
const resultMessage = document.getElementById('resultMessage');

const gridSize = 3;
const cellSize = canvas.width / gridSize;
let grid = [];
let targetPos = null;
let targetLetter = null;

// Helper function: returns a random uppercase letter A-Z
function randomLetter() {
  const code = Math.floor(Math.random() * 26) + 65;
  return String.fromCharCode(code);
}

// Initialize the grid with random letters
function generateGrid() {
  grid = [];
  for (let row = 0; row < gridSize; row++) {
    let rowArr = [];
    for (let col = 0; col < gridSize; col++) {
      rowArr.push(randomLetter());
    }
    grid.push(rowArr);
  }
}

// Draw the grid on the canvas; if highlight is true, draw a neon border around the target cell
function drawGrid(highlightTarget = false) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = "bold 32px Courier New";
  
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const x = col * cellSize;
      const y = row * cellSize;
      
      // Draw cell background
      ctx.fillStyle = "#111";
      ctx.fillRect(x, y, cellSize, cellSize);
      
      // Draw cell border
      ctx.strokeStyle = "#00ffff";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, cellSize, cellSize);
      
      // If this is the target cell and highlighting is on, draw an extra glowing border
      if (highlightTarget && targetPos.row === row && targetPos.col === col) {
        ctx.strokeStyle = "#ff00ff";
        ctx.lineWidth = 4;
        ctx.strokeRect(x + 3, y + 3, cellSize - 6, cellSize - 6);
      }
      
      // Draw the letter with a subtle glitch effect (random slight offset)
      const glitchX = x + cellSize / 2 + (Math.random() - 0.5) * 2;
      const glitchY = y + cellSize / 2 + (Math.random() - 0.5) * 2;
      ctx.fillStyle = "#f0f0f0";
      ctx.fillText(grid[row][col], glitchX, glitchY);
    }
  }
}

// Shuffle the letters in the grid randomly (while keeping grid shape intact)
function scrambleGrid() {
  // Flatten the grid
  let flatGrid = grid.flat();
  // Shuffle the flat array
  for (let i = flatGrid.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [flatGrid[i], flatGrid[j]] = [flatGrid[j], flatGrid[i]];
  }
  // Rebuild grid from shuffled letters
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      grid[row][col] = flatGrid[row * gridSize + col];
    }
  }
}

// Setup the puzzle by generating the grid and selecting the target cell
function setupPuzzle() {
  generateGrid();
  // Select a random target cell
  targetPos = {
    row: Math.floor(Math.random() * gridSize),
    col: Math.floor(Math.random() * gridSize)
  };
  targetLetter = grid[targetPos.row][targetPos.col];
  // Draw the grid with highlighted target cell
  drawGrid(true);
  
  // After 3 seconds, scramble the grid and redraw without highlight
  setTimeout(() => {
    scrambleGrid();
    drawGrid(false);
  }, 3000);
}

// Check the user's answer against the target letter
function checkAnswer() {
  const userResponse = answerInput.value.toUpperCase();
  if (userResponse === targetLetter) {
    resultMessage.textContent = "Access Granted: Correct Code!";
    resultMessage.style.color = "#00ff00";
  } else {
    resultMessage.textContent = "Access Denied: Incorrect Code.";
    resultMessage.style.color = "#ff0000";
  }
}

// Event listener for the submit button
submitBtn.addEventListener('click', () => {
  checkAnswer();
});

// Initialize the puzzle when the page loads
setupPuzzle();
