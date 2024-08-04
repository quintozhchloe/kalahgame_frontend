import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import PlayerSetup from './pages/PlayerSetup'; // 确保路径正确

const App: React.FC = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/setup" element={<PlayerSetup />} />
        </Routes>
      </Router>
    </Box>
  );
};

export default App;
