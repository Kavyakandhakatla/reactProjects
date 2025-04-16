import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver.jsx";
import GameModeSelection from "./components/GameModeSelection";
import SettingsPanel from "./components/SettingsPanel";
import StatsPanel from "./components/StatsPanel";

import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import { getAIMove } from "./utils/aiPlayer";
import { saveGameResult, getSettings } from "./utils/gameHistory";
import { applyTheme } from "./utils/themes";
import { playClickSound, playWinSound, playDrawSound } from "./utils/sounds";


const initialGameBoard=[
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns){
  let currentPlayer= 'X';
  if(gameTurns.length>0 && gameTurns[0].player==='X'){
    currentPlayer='O';
  }

  return currentPlayer;
}

function deriveGameBoard(gameTurns){

  let gameBoard=[...initialGameBoard.map(array=>[...array])];

    for(const turn of gameTurns){
        const {square, player} = turn;
        const {row, col}= square;

        gameBoard[row][col]= player;
    }
    return gameBoard;
}

function deriveWinner(gameBoard, players){
  let winner;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol=gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol=gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol=gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol===thirdSquareSymbol){
      winner=players[firstSquareSymbol];
    }

  }
  return winner;
}

function App() {
  // Game state
  const [gameTurns, setGameTurns] = useState([]);
  const [gameMode, setGameMode] = useState(null); // 'vsComputer' or 'vsFriend'
  const [difficulty, setDifficulty] = useState('medium');
  const [players, setPlayers] = useState({
    X: 'Player 1',
    O: 'Player 2'
  });
  const [settings, setSettings] = useState(getSettings());

  // Sound effects are imported from utils/sounds.js

  // Derived state
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  // Apply theme from settings
  useEffect(() => {
    applyTheme(settings.theme);
  }, [settings]);

  // AI move effect
  useEffect(() => {
    // Make AI move if it's computer's turn
    if (gameMode === 'vsComputer' && activePlayer === 'O' && !winner && !hasDraw) {
      const timer = setTimeout(() => {
        const aiMove = getAIMove(gameBoard, 'O', difficulty);
        if (aiMove) {
          handleSelectSquare(aiMove.row, aiMove.col);
        }
      }, 700); // Delay to make it feel more natural

      return () => clearTimeout(timer);
    }
  }, [gameMode, activePlayer, gameBoard, winner, hasDraw]);

  // Save game result when game ends
  useEffect(() => {
    if (winner || hasDraw) {
      if (settings.soundEnabled) {
        winner ? playWinSound() : playDrawSound();
      }

      // Save game result
      if (gameMode) {
        saveGameResult({
          gameMode,
          winner: winner || 'Draw',
          date: new Date(),
          difficulty: gameMode === 'vsComputer' ? difficulty : null,
          turns: gameTurns.length
        });

        // Dispatch event to update stats
        window.dispatchEvent(new Event('game-history-updated'));
      }
    }
  }, [winner, hasDraw]);

  function handleStartGame(mode, selectedDifficulty = 'medium') {
    setGameMode(mode);
    setDifficulty(selectedDifficulty);
    setGameTurns([]);
    setPlayers({
      X: 'Player 1',
      O: mode === 'vsComputer' ? 'Computer' : 'Player 2'
    });
  }

  function handleSelectSquare(rowIndex, colIndex) {
    if (settings.soundEnabled) {
      playClickSound();
    }

    setGameTurns(prevTurns => {
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: activePlayer },
        ...prevTurns
      ];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header>
        <motion.img
          src="./src/assets/images/logo.svg"
          alt="Tic Tac Toe Logo"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        />
        <motion.h1
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          Tic Tac Toe
        </motion.h1>
      </header>

      <SettingsPanel />

      {!gameMode ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <GameModeSelection onStartGame={handleStartGame} />
          <StatsPanel />
        </motion.div>
      ) : (
        <>
          <motion.div
            id="game-container"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ol id="players" className="highlight-player">
              <Player
                initialName={players.X}
                symbol="X"
                isActive={activePlayer === 'X'}
                onChangeName={handlePlayerNameChange}
              />
              <Player
                initialName={players.O}
                symbol="O"
                isActive={activePlayer === 'O'}
                onChangeName={handlePlayerNameChange}
              />
            </ol>

            {(winner || hasDraw) && (
              <GameOver winner={winner} onRestart={handleRestart} />
            )}

            <GameBoard
              onSelectSquare={handleSelectSquare}
              board={gameBoard}
            />

            <motion.div
              className="game-controls"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <motion.button
                className="back-button"
                onClick={() => setGameMode(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back to Menu
              </motion.button>
            </motion.div>
          </motion.div>

          <Log turns={gameTurns} />
        </>
      )}
    </motion.main>
  )
}

export default App
