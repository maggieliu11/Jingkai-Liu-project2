import React from 'react';

const RulesPage = () => (
  <div className="rules-page">
    <h1>Game Rules</h1>
    <p>Your goal is to find all the safe cells without hitting a mine!</p>
    <ul>
      <li>Select a cell to reveal it.</li>
      <li>Numbers indicate how many mines are adjacent to that cell.</li>
      <li>If you click on a mine, you lose the game.</li>
    </ul>
  </div>
);

export default RulesPage;
