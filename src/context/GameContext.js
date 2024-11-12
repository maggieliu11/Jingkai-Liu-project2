import React, { createContext, useState } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [difficulty, setDifficulty] = useState('easy');
  const [reset, setReset] = useState(false);
  const [board, setBoard] = useState([]);

  const resetGame = () => setReset(!reset);

  return (
    <GameContext.Provider value={{ difficulty, setDifficulty, reset, resetGame, board, setBoard }}>
      {children}
    </GameContext.Provider>
  );
};