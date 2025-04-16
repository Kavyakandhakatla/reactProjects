// AI difficulty levels
export const DIFFICULTY = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
  IMPOSSIBLE: 'impossible'
};

// Easy: Random moves
function getRandomMove(gameBoard) {
  const availableMoves = [];
  
  gameBoard.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === null) {
        availableMoves.push({ row: rowIndex, col: colIndex });
      }
    });
  });
  
  if (availableMoves.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  return availableMoves[randomIndex];
}

// Medium: Block opponent's winning moves or make random moves
function getMediumMove(gameBoard, aiSymbol) {
  const opponentSymbol = aiSymbol === 'X' ? 'O' : 'X';
  
  // Check if AI can win in the next move
  const winningMove = findWinningMove(gameBoard, aiSymbol);
  if (winningMove) return winningMove;
  
  // Check if opponent can win in the next move and block it
  const blockingMove = findWinningMove(gameBoard, opponentSymbol);
  if (blockingMove) return blockingMove;
  
  // Otherwise make a random move
  return getRandomMove(gameBoard);
}

// Hard: Use strategy with blocking and prioritizing center and corners
function getHardMove(gameBoard, aiSymbol) {
  const opponentSymbol = aiSymbol === 'X' ? 'O' : 'X';
  
  // Check if AI can win in the next move
  const winningMove = findWinningMove(gameBoard, aiSymbol);
  if (winningMove) return winningMove;
  
  // Check if opponent can win in the next move and block it
  const blockingMove = findWinningMove(gameBoard, opponentSymbol);
  if (blockingMove) return blockingMove;
  
  // Take center if available
  if (gameBoard[1][1] === null) {
    return { row: 1, col: 1 };
  }
  
  // Take corners if available
  const corners = [
    { row: 0, col: 0 },
    { row: 0, col: 2 },
    { row: 2, col: 0 },
    { row: 2, col: 2 }
  ];
  
  const availableCorners = corners.filter(
    corner => gameBoard[corner.row][corner.col] === null
  );
  
  if (availableCorners.length > 0) {
    const randomCornerIndex = Math.floor(Math.random() * availableCorners.length);
    return availableCorners[randomCornerIndex];
  }
  
  // Otherwise make a random move
  return getRandomMove(gameBoard);
}

// Impossible: Minimax algorithm for perfect play
function getImpossibleMove(gameBoard, aiSymbol) {
  const opponentSymbol = aiSymbol === 'X' ? 'O' : 'X';
  
  // Helper function to check if the board is full
  function isBoardFull(board) {
    return board.every(row => row.every(cell => cell !== null));
  }
  
  // Helper function to check if a player has won
  function checkWinner(board, symbol) {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === symbol && board[i][1] === symbol && board[i][2] === symbol) {
        return true;
      }
    }
    
    // Check columns
    for (let i = 0; i < 3; i++) {
      if (board[0][i] === symbol && board[1][i] === symbol && board[2][i] === symbol) {
        return true;
      }
    }
    
    // Check diagonals
    if (board[0][0] === symbol && board[1][1] === symbol && board[2][2] === symbol) {
      return true;
    }
    if (board[0][2] === symbol && board[1][1] === symbol && board[2][0] === symbol) {
      return true;
    }
    
    return false;
  }
  
  // Minimax algorithm
  function minimax(board, depth, isMaximizing) {
    // Terminal states
    if (checkWinner(board, aiSymbol)) {
      return 10 - depth;
    }
    if (checkWinner(board, opponentSymbol)) {
      return depth - 10;
    }
    if (isBoardFull(board)) {
      return 0;
    }
    
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === null) {
            board[i][j] = aiSymbol;
            const score = minimax(board, depth + 1, false);
            board[i][j] = null;
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === null) {
            board[i][j] = opponentSymbol;
            const score = minimax(board, depth + 1, true);
            board[i][j] = null;
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  }
  
  let bestScore = -Infinity;
  let bestMove = null;
  
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (gameBoard[i][j] === null) {
        gameBoard[i][j] = aiSymbol;
        const score = minimax(gameBoard, 0, false);
        gameBoard[i][j] = null;
        
        if (score > bestScore) {
          bestScore = score;
          bestMove = { row: i, col: j };
        }
      }
    }
  }
  
  return bestMove;
}

// Helper function to find a winning move for a player
function findWinningMove(gameBoard, playerSymbol) {
  // Check rows
  for (let i = 0; i < 3; i++) {
    const row = gameBoard[i];
    const emptyCellInRow = row.findIndex(cell => cell === null);
    
    if (emptyCellInRow !== -1 && 
        row.filter(cell => cell === playerSymbol).length === 2 && 
        row.filter(cell => cell === null).length === 1) {
      return { row: i, col: emptyCellInRow };
    }
  }
  
  // Check columns
  for (let j = 0; j < 3; j++) {
    const column = [gameBoard[0][j], gameBoard[1][j], gameBoard[2][j]];
    const emptyCellInColumn = column.findIndex(cell => cell === null);
    
    if (emptyCellInColumn !== -1 && 
        column.filter(cell => cell === playerSymbol).length === 2 && 
        column.filter(cell => cell === null).length === 1) {
      return { row: emptyCellInColumn, col: j };
    }
  }
  
  // Check diagonals
  const diagonal1 = [gameBoard[0][0], gameBoard[1][1], gameBoard[2][2]];
  const emptyCellInDiagonal1 = diagonal1.findIndex(cell => cell === null);
  
  if (emptyCellInDiagonal1 !== -1 && 
      diagonal1.filter(cell => cell === playerSymbol).length === 2 && 
      diagonal1.filter(cell => cell === null).length === 1) {
    return { row: emptyCellInDiagonal1, col: emptyCellInDiagonal1 };
  }
  
  const diagonal2 = [gameBoard[0][2], gameBoard[1][1], gameBoard[2][0]];
  const emptyCellInDiagonal2 = diagonal2.findIndex(cell => cell === null);
  
  if (emptyCellInDiagonal2 !== -1 && 
      diagonal2.filter(cell => cell === playerSymbol).length === 2 && 
      diagonal2.filter(cell => cell === null).length === 1) {
    const row = emptyCellInDiagonal2;
    const col = 2 - emptyCellInDiagonal2;
    return { row, col };
  }
  
  return null;
}

// Main function to get AI move based on difficulty
export function getAIMove(gameBoard, aiSymbol, difficulty) {
  switch (difficulty) {
    case DIFFICULTY.EASY:
      return getRandomMove(gameBoard);
    case DIFFICULTY.MEDIUM:
      return getMediumMove(gameBoard, aiSymbol);
    case DIFFICULTY.HARD:
      return getHardMove(gameBoard, aiSymbol);
    case DIFFICULTY.IMPOSSIBLE:
      return getImpossibleMove(gameBoard, aiSymbol);
    default:
      return getRandomMove(gameBoard);
  }
}
