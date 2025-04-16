import { useState } from 'react';
import { DIFFICULTY } from '../utils/aiPlayer';

export default function GameModeSelection({ onStartGame }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState(DIFFICULTY.MEDIUM);
  
  const handleVsComputerClick = () => {
    onStartGame('vsComputer', selectedDifficulty);
  };
  
  const handleVsFriendClick = () => {
    onStartGame('vsFriend');
  };
  
  return (
    <div className="game-mode-selection">
      <h2>Choose Game Mode</h2>
      
      <div className="mode-buttons">
        <div className="mode-button" onClick={handleVsFriendClick}>
          <img src="./src/assets/images/avatar-2.svg" alt="Play with Friend" />
          <h3>vs Friend</h3>
        </div>
        
        <div className="mode-button" onClick={handleVsComputerClick}>
          <img src="./src/assets/images/robot.svg" alt="Play with Computer" />
          <h3>vs Computer</h3>
          
          <div className="difficulty-selection">
            <h3>Difficulty</h3>
            <div className="difficulty-buttons">
              {Object.values(DIFFICULTY).map(difficulty => (
                <button
                  key={difficulty}
                  className={`difficulty-button ${selectedDifficulty === difficulty ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedDifficulty(difficulty);
                  }}
                >
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
