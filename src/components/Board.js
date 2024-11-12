import React, { useState, useEffect, useContext } from 'react';
import { GameContext } from '../context/GameContext';
import Tile from './Tile';
import './Board.css';

const Board = ({ rows, cols, mines, onGameOver }) => {
  const { board, setBoard, reset } = useContext(GameContext);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    setBoard(generateBoard(rows, cols, mines));
    setIsGameOver(false);
  }, [rows, cols, mines, setBoard, reset]);

  const generateBoard = (rows, cols, mines) => {
    const board = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({
        isMine: false,
        number: 0,
        isRevealed: false,
        isFlagged: false,
      }))
    );

    let mineCount = 0;
    while (mineCount < mines) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      if (!board[row][col].isMine) {
        board[row][col].isMine = true;
        mineCount++;
      }
    }

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (!board[row][col].isMine) {
          board[row][col].number = calculateAdjacentMines(board, row, col);
        }
      }
    }

    return board;
  };

  const calculateAdjacentMines = (board, row, col) => {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];
    return directions.reduce((count, [dx, dy]) => {
      const newRow = row + dx;
      const newCol = col + dy;
      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && board[newRow][newCol].isMine) {
        return count + 1;
      }
      return count;
    }, 0);
  };

  const revealTile = (row, col) => {
    if (isGameOver || board[row][col].isRevealed || board[row][col].isFlagged) return;

    const newBoard = [...board];
    newBoard[row][col].isRevealed = true;

    if (newBoard[row][col].isMine) {
      setIsGameOver(true);
      onGameOver('Game over! You lost!');
    } else {
      if (checkWin(newBoard)) {
        setIsGameOver(true);
        onGameOver('Game over! You Won!');
      } else {
        if (newBoard[row][col].number === 0) {
          revealAdjacentTiles(newBoard, row, col);
        }
      }
    }

    setBoard(newBoard);
  };

  const revealAdjacentTiles = (board, row, col) => {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];
    directions.forEach(([dx, dy]) => {
      const newRow = row + dx;
      const newCol = col + dy;
      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
        if (!board[newRow][newCol].isRevealed && !board[newRow][newCol].isMine) {
          revealTile(newRow, newCol);
        }
      }
    });
  };

  const checkWin = (board) => {
    return board.every(row => row.every(tile => (tile.isRevealed || tile.isMine)));
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((tile, colIndex) => (
            <Tile
              key={colIndex}
              {...tile}
              onClick={() => revealTile(rowIndex, colIndex)}
              disabled={isGameOver}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;