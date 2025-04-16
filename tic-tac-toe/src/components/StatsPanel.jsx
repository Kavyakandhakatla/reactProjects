import { useEffect, useState } from 'react';
import { getPlayerStats } from '../utils/gameHistory';

export default function StatsPanel() {
  const [stats, setStats] = useState(getPlayerStats());
  
  useEffect(() => {
    // Update stats when component mounts
    setStats(getPlayerStats());
    
    // Add event listener to update stats when game history changes
    window.addEventListener('game-history-updated', () => {
      setStats(getPlayerStats());
    });
    
    return () => {
      window.removeEventListener('game-history-updated', () => {
        setStats(getPlayerStats());
      });
    };
  }, []);
  
  return (
    <div className="stats-panel">
      <h3>Game Statistics</h3>
      
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-value">{stats.totalGames}</div>
          <div className="stat-label">Total Games</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value">{stats.wins}</div>
          <div className="stat-label">Wins</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value">{stats.draws}</div>
          <div className="stat-label">Draws</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value">{stats.losses}</div>
          <div className="stat-label">Losses</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value">{stats.winRate.toFixed(1)}%</div>
          <div className="stat-label">Win Rate</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value">{stats.vsComputer.wins}</div>
          <div className="stat-label">vs Computer Wins</div>
        </div>
      </div>
    </div>
  );
}
