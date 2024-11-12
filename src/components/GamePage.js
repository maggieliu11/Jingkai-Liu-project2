import React, { useContext, useEffect, useState } from 'react';
import { GameContext } from '../context/GameContext';
import Board from './Board';

const GamePage = () => {
  const { difficulty, reset, resetGame } = useContext(GameContext);
  const [gameOverMessage, setGameOverMessage] = useState('');

  const getBoardSettings = (difficulty) => {
    switch (difficulty) {
      case 'easy': return { rows: 8, cols: 8, mines: 10 };
      case 'medium': return { rows: 16, cols: 16, mines: 40 };
      case 'hard': return { rows: 16, cols: 30, mines: 99 };
      default: return { rows: 8, cols: 8, mines: 10 };
    }
  };

  const settings = getBoardSettings(difficulty);

  useEffect(() => {
    setGameOverMessage(''); 
  }, [reset]);

  const handleGameOver = (message) => {
    setGameOverMessage(message);
  };

  return (
    <div className="game-page">
      <h1>Playing Minesweeper - {difficulty} mode</h1>
      <Board
        rows={settings.rows}
        cols={settings.cols}
        mines={settings.mines}
        onGameOver={handleGameOver}
      />
      {gameOverMessage && <h2>{gameOverMessage}</h2>}
      <button onClick={resetGame}>Reset</button>
    </div>
  );
};

export default GamePage;
