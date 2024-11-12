import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import GamePage from './components/GamePage';
import RulesPage from './components/RulesPage';
import Header from './components/Header';
import { GameProvider } from './context/GameContext';

function App() {
  return (
    <GameProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/game/:difficulty" element={<GamePage />} />
          <Route path="/rules" element={<RulesPage />} />
        </Routes>
      </Router>
    </GameProvider>
  );
}

export default App;