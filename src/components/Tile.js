import React, { useState } from 'react';
import './Tile.css';

const Tile = ({ isRevealed, number, isMine, onClick }) => {
  const [hovered, setHovered] = useState(false);

  let tileClass = 'tile';
  if (isRevealed) {
    tileClass += isMine ? ' revealed mine' : ' revealed safe';
  } else if (hovered) {
    tileClass += ' hovered';
  }

  return (
    <div
      className={tileClass}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {isRevealed ? (
        isMine ? (
          '💣'
        ) : (
          number || ''
        )
      ) : (
        ''
      )}
    </div>
  );
};

export default Tile;
