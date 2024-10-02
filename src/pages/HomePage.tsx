import React from 'react';
import { Box, Button, Typography, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'; 

const HomePage: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center', p: 3, background: 'linear-gradient(to bottom right, #00ff00, #0000ff)' }}>
      <Card sx={{ maxWidth: 800, p: 3 }}>
        <CardContent>
          <img src="/assets/title.png" alt="Kalah Title" style={{ maxWidth: '100%' }} />
          <Typography variant="h2" gutterBottom>Kalah - description</Typography>
          <Typography variant="body1" paragraph align="left">
            Kalah is a well-known board game, also known under the names Mancala, Warri or Kalaha. It is a strategic board game in which two players compete against each other. The aim of the game is to get as many stones (usually pebbles or beans) as possible into your collection area. The game originally comes from Africa and has been played in many countries around the world for centuries.
          </Typography>
          <Typography variant="h4" gutterBottom>Kalah rules</Typography>
          <Typography variant="h6" gutterBottom>Bonus round</Typography>
          <Typography variant="body1" paragraph align="left">
            If the last stone is dropped into an empty pool on the friendly side, the player gets one more turn. However, if the last stone falls into a pit that already contains stones, the player's turn ends.
          </Typography>
          <Typography variant="h6" gutterBottom>Victory! (Steal marble from your opponent)</Typography>
          <Typography variant="body1" paragraph align="left">
            If the last stone falls into a pit that is on your side and that contains exactly one stone, both the stone from the pit and the last stone from the opponent's pool are taken and placed in your own pool. This is referred to as "victory".
          </Typography>
          <Typography variant="h6" gutterBottom>Game end</Typography>
          <Typography variant="body1" paragraph align="left">
            The game ends when one of the players runs out of stones in their pits or has no more possibility to draw stones. The player with the most stones in their bucket wins the game.
          </Typography>
        </CardContent>
      </Card>
      <Box sx={{ mt: 3 }}>
        <Link to="/setup">
          <Button variant="contained" color="success" sx={{ px: 5, py: 1 }}>Play</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default HomePage;
