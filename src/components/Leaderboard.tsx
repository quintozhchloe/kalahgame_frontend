import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Card, Avatar, Grid } from '@mui/material';

interface PlayerScore {
  playerName: string;
  score: number;
  duration: number;
  avatar: string;
}

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<PlayerScore[]>([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get('http://localhost:5200/api/leaderboard');
      console.log('Fetched leaderboard data:', response.data); // 调试日志
      setLeaderboard(response.data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  return (
    <Card sx={{ mt: 3, p: 2, maxWidth: 1100, mx: 'auto', border: '2px solid white' }}>
      <Typography variant="h5" gutterBottom sx={{ fontFamily: '"Press Start 2P", cursive' }}>Leaderboard</Typography>
      <Box component="ul" sx={{ p: 0, listStyle: 'none' }}>
        {leaderboard.slice(0, 5).map((player, index) => (
          <Grid container key={index} spacing={2} alignItems="center">
            <Grid item>
              <Avatar src={player.avatar} alt={player.playerName} sx={{ width: 40, height: 40 }} />
            </Grid>
            <Grid item>
              <Typography component="li" sx={{ fontFamily: '"Press Start 2P", cursive' }}>
                {player.playerName}: {player.score} points, Duration: {player.duration} seconds
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Box>
    </Card>
  );
};

export default Leaderboard;
