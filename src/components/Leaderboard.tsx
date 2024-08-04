import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Card, Avatar, Grid } from '@mui/material';

interface PlayerScore {
  entryId: string;
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
      setLeaderboard(response.data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  return (
    <Card sx={{ mt: 3, p: 2, maxWidth: 700, height: 80, mx: 'auto', border: '2px solid white' }}>
      <Typography variant="h5" gutterBottom>Leaderboard</Typography>
      <Box component="ul" sx={{ p: 0, listStyle: 'none' }}>
        {leaderboard.slice(0, 5).map((player) => (
          <Grid container key={player.entryId} spacing={2} alignItems="center">
            <Grid item>
              <Avatar src={player.avatar} alt={player.playerName} sx={{ width: 40, height: 40 }} />
            </Grid>
            <Grid item>
              <Typography component="li">
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
