import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GameContext } from '../context/GameContext';

const Header = () => {
  const { setDifficulty, resetGame, difficulty } = useContext(GameContext);
  const navigate = useNavigate();

  const handleDifficultyChange = (level) => {
    setDifficulty(level);
    resetGame(); 
    navigate(`/game/${level}`);
  };

  const handleReset = () => {
    const currentDifficulty = difficulty;
    handleDifficultyChange('reset');
    setTimeout(() => {
      handleDifficultyChange(currentDifficulty); 
    }, 0);
  };

  return (
    <header className="header">
      <div className="left-buttons">
        <Link to="/" className="btn btn-link">Home</Link>
        <button onClick={() => handleDifficultyChange('easy')} className="btn">Easy</button>
        <button onClick={() => handleDifficultyChange('medium')} className="btn">Medium</button>
        <button onClick={() => handleDifficultyChange('hard')} className="btn">Hard</button>
      </div>
      <div className="right-buttons">
        <Link to="/rules" className="btn btn-link">Rules</Link>
        <button onClick={handleReset} className="btn btn-reset">Reset</button>
      </div>
    </header>
  );
};

export default Header;
