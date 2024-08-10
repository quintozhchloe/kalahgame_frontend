import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Card, Divider, Button } from '@mui/material';

const API_URL = process.env.REACT_APP_API_URL || '';

interface PlayerScore {
  playerName: string;
  score: number;
}

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<PlayerScore[]>([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get(`${API_URL}/leaderboard`);
      console.log('Fetched leaderboard data:', response.data); // 调试日志
      setLeaderboard(response.data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  const addEntry = async (entry: PlayerScore) => {
    try {
      await axios.post(`${API_URL}/leaderboard`, entry);
      fetchLeaderboard(); // 刷新列表
    } catch (error) {
      console.error('Error adding entry:', error);
    }
  };

  
  

  return (
    <Card sx={{ mt: 3, p: 2, maxWidth: 1100, mx: 'auto', border: '2px solid white' }}>
      <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
        <Typography variant="h5" gutterBottom sx={{ fontFamily: '"Press Start 2P", cursive', mr: 1 }}>
          👑
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ fontFamily: '"Press Start 2P", cursive' }}>
          Rank
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ fontFamily: '"Press Start 2P", cursive', mr: 1 }}>
          👑
        </Typography>
      </Box>
      <Box component="ul" sx={{ p: 0, listStyle: 'none' }}>
        {leaderboard.slice(0, 5).map((player, index) => (
          <Box key={index} textAlign="center">
            <Typography component="li" sx={{ fontFamily: '"Press Start 2P", cursive', mb: 1 }}>
              {player.playerName}: {player.score} points
              {/* <Button onClick={() => deleteEntry(player.playerName)}>Delete</Button>
              <Button onClick={() => updateEntry(player.playerName, { ...player, score: player.score + 1 })}>Increment</Button> */}
            </Typography>
            {index < leaderboard.length - 1 && <Divider sx={{ my: 1 }} />}
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default Leaderboard;
