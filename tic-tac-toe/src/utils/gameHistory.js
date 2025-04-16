// Local storage key for game history
const GAME_HISTORY_KEY = 'tic-tac-toe-game-history';
const SETTINGS_KEY = 'tic-tac-toe-settings';

// Save game result to history
export function saveGameResult(result) {
  const history = getGameHistory();
  history.push({
    ...result,
    timestamp: new Date().toISOString()
  });
  
  // Keep only the last 50 games
  if (history.length > 50) {
    history.shift();
  }
  
  localStorage.setItem(GAME_HISTORY_KEY, JSON.stringify(history));
}

// Get game history from local storage
export function getGameHistory() {
  const historyString = localStorage.getItem(GAME_HISTORY_KEY);
  return historyString ? JSON.parse(historyString) : [];
}

// Clear game history
export function clearGameHistory() {
  localStorage.removeItem(GAME_HISTORY_KEY);
}

// Get player statistics
export function getPlayerStats() {
  const history = getGameHistory();
  
  // Initialize stats
  const stats = {
    totalGames: history.length,
    wins: 0,
    losses: 0,
    draws: 0,
    winRate: 0,
    vsComputer: {
      totalGames: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      winRate: 0
    },
    vsFriend: {
      totalGames: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      winRate: 0
    }
  };
  
  // Calculate stats
  history.forEach(game => {
    if (game.winner === 'Player 1') {
      stats.wins++;
    } else if (game.winner === 'Player 2' || game.winner === 'Computer') {
      stats.losses++;
    } else {
      stats.draws++;
    }
    
    if (game.gameMode === 'vsComputer') {
      stats.vsComputer.totalGames++;
      
      if (game.winner === 'Player 1') {
        stats.vsComputer.wins++;
      } else if (game.winner === 'Computer') {
        stats.vsComputer.losses++;
      } else {
        stats.vsComputer.draws++;
      }
    } else {
      stats.vsFriend.totalGames++;
      
      if (game.winner === 'Player 1') {
        stats.vsFriend.wins++;
      } else if (game.winner === 'Player 2') {
        stats.vsFriend.losses++;
      } else {
        stats.vsFriend.draws++;
      }
    }
  });
  
  // Calculate win rates
  if (stats.totalGames > 0) {
    stats.winRate = (stats.wins / stats.totalGames) * 100;
  }
  
  if (stats.vsComputer.totalGames > 0) {
    stats.vsComputer.winRate = (stats.vsComputer.wins / stats.vsComputer.totalGames) * 100;
  }
  
  if (stats.vsFriend.totalGames > 0) {
    stats.vsFriend.winRate = (stats.vsFriend.wins / stats.vsFriend.totalGames) * 100;
  }
  
  return stats;
}

// Save game settings
export function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

// Get game settings
export function getSettings() {
  const settingsString = localStorage.getItem(SETTINGS_KEY);
  const defaultSettings = {
    theme: 'classic',
    soundEnabled: true,
    difficulty: 'medium',
    playerNames: {
      player1: 'Player 1',
      player2: 'Player 2'
    }
  };
  
  return settingsString ? { ...defaultSettings, ...JSON.parse(settingsString) } : defaultSettings;
}
