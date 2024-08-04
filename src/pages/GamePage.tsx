import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Avatar, Grid, Dialog, DialogTitle, DialogContent, DialogActions, Card, CardHeader } from '@mui/material';
import Board from '../components/Board';
import Leaderboard from '../components/Leaderboard';
import { GameState } from '../types';
import axios from 'axios';

const getInitialGameState = (): GameState => {
  const startingSeeds = parseInt(sessionStorage.getItem('startingSeeds') || '4', 10);
  return {
    pits: Array(14).fill(startingSeeds).map((v, i) => (i === 6 || i === 13 ? 0 : startingSeeds)),
    currentPlayer: 0,
    players: [
      { name: sessionStorage.getItem('player1Name') || 'Player 1', score: 0, avatar: sessionStorage.getItem('player1Avatar') || 'red' },
      { name: sessionStorage.getItem('player2Name') || 'Player 2', score: 0, avatar: sessionStorage.getItem('player2Avatar') || 'blue' },
    ],
  };
};

const GamePage: React.FC<{ password?: string }> = ({ password }) => {
  const [gameState, setGameState] = useState<GameState>(getInitialGameState());
  const [notification, setNotification] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [showPlayerTypeSelection, setShowPlayerTypeSelection] = useState<boolean>(false);
  const [showAvatarSelection, setShowAvatarSelection] = useState<boolean>(false);
  const [currentPlayer, setCurrentPlayer] = useState<'player1' | 'player2' | null>(null);
  const isAIPlayer = JSON.parse(sessionStorage.getItem('isAIPlayer') || 'false');
  const [startTime, setStartTime] = useState<number>(Date.now());

  useEffect(() => {
    console.log('Initial gameState set:', gameState); // 调试检查点
  }, []);

  useEffect(() => {
    if (isAIPlayer && gameState.currentPlayer === 1 && !gameOver) {
      const validMoves = gameState.pits.slice(7, 13).map((seeds, index) => (seeds > 0 ? index + 7 : -1)).filter(index => index !== -1);
      if (validMoves.length > 0) {
        handlePitClick(validMoves[0]);
      }
    }
  }, [gameState, isAIPlayer, gameOver]);

  const handlePitClick = (pitIndex: number) => {
    console.log(`Pit ${pitIndex} clicked`); // 调试检查点
    if (isMoveValid(pitIndex) && !gameOver) {
      const newGameState = { ...gameState };
      let seeds = newGameState.pits[pitIndex];
      newGameState.pits[pitIndex] = 0;
      let index = pitIndex;

      while (seeds > 0) {
        index = (index + 1) % 14;
        if ((gameState.currentPlayer === 0 && index === 13) || (gameState.currentPlayer === 1 && index === 6)) {
          continue;
        }
        newGameState.pits[index]++;
        seeds--;
      }

      if (index !== 6 && index !== 13 && newGameState.pits[index] === 1 && ((gameState.currentPlayer === 0 && index < 6) || (gameState.currentPlayer === 1 && index > 6 && index < 13))) {
        const oppositeIndex = 12 - index;
        const storeIndex = gameState.currentPlayer === 0 ? 6 : 13;
        if (newGameState.pits[oppositeIndex] > 0) {
          newGameState.pits[storeIndex] += newGameState.pits[oppositeIndex] + 1;
          newGameState.pits[index] = 0;
          newGameState.pits[oppositeIndex] = 0;
        }
      }

      if ((gameState.currentPlayer === 0 && index === 6) || (gameState.currentPlayer === 1 && index === 13)) {
        setNotification(`${gameState.players[gameState.currentPlayer].name} gets an extra turn!`);
        setGameState({ ...newGameState, currentPlayer: gameState.currentPlayer });
      } else {
        setNotification(null);
        setGameState({ ...newGameState, currentPlayer: (gameState.currentPlayer + 1) % 2 });
      }

      newGameState.players[0].score = newGameState.pits[6];
      newGameState.players[1].score = newGameState.pits[13];

      if (isGameOver(newGameState)) {
        const finalGameState = { ...newGameState };
        finalGameState.pits[6] += finalGameState.pits.slice(0, 6).reduce((a, b) => a + b, 0);
        finalGameState.pits[13] += finalGameState.pits.slice(7, 13).reduce((a, b) => a + b, 0);
        finalGameState.pits = finalGameState.pits.map((val, index) => (index < 6 || (index > 6 && index < 13) ? 0 : val));
        setGameOver(true);
        const endTime = Date.now();
        const duration = Math.floor((endTime - startTime) / 1000); // 游戏时长（秒）
        if (finalGameState.players[0].score > finalGameState.players[1].score) {
          setWinner(`${finalGameState.players[0].name} wins with ${finalGameState.players[0].score} points!`);
          updateLeaderboard(finalGameState.players[0].name, finalGameState.players[0].score, duration, finalGameState.players[0].avatar);
        } else if (finalGameState.players[0].score < finalGameState.players[1].score) {
          setWinner(`${finalGameState.players[1].name} wins with ${finalGameState.players[1].score} points!`);
          updateLeaderboard(finalGameState.players[1].name, finalGameState.players[1].score, duration, finalGameState.players[1].avatar);
        } else {
          setWinner('It\'s a tie');
        }
        setNotification('Game Over');
        setGameState(finalGameState);
      }
    }
  };

  const isMoveValid = (pitIndex: number) => {
    return (gameState.currentPlayer === 0 && pitIndex < 6 && gameState.pits[pitIndex] > 0) ||
           (gameState.currentPlayer === 1 && pitIndex > 6 && pitIndex < 13 && gameState.pits[pitIndex] > 0);
  };

  const isGameOver = (gameState: GameState) => {
    const player1Empty = gameState.pits.slice(0, 6).every(pit => pit === 0);
    const player2Empty = gameState.pits.slice(7, 13).every(pit => pit === 0);
    return player1Empty || player2Empty;
  };

  const restartGame = () => {
    console.log('Restart button clicked');
    setGameState(getInitialGameState());
    setNotification(null);
    setGameOver(false);
    setWinner(null);
    setStartTime(Date.now());
  };

  const updateLeaderboard = async (name: string, score: number, duration: number, avatar: string) => {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    leaderboard.push({ name, score, duration, avatar });
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    try {
      await axios.post('/api/leaderboard', { name, score, duration, avatar });
    } catch (error) {
      console.error('Error updating leaderboard:', error);
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', p: 3, textAlign: 'center', background: 'linear-gradient(to bottom right, #00ff00, #0000ff)' }}>
      <Typography variant="h3" gutterBottom sx={{ color: 'white' }}>Kalah</Typography>
      <Typography variant="h5" mt={2} sx={{ color: 'white' }}>{gameState.currentPlayer === 0 ? "Player 1's turn" : "Player 2's turn"}</Typography>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={3} md={2}>
          <Card>
            <CardHeader
              avatar={<Avatar sx={{ bgcolor: gameState.players[1].avatar, width: 100, height: 100 }} />}
              title={gameState.players[1].name}
              titleTypographyProps={{ variant: 'h6' }}
              subheader={`Points: ${gameState.players[1].score}`}
              subheaderTypographyProps={{ variant: 'subtitle1' }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <Card sx={{ p: 2, background: 'url(/assets/wooden.png) no-repeat center/cover' }}>
            <Board gameState={gameState} onPitClick={handlePitClick} />
          </Card>
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <Card>
            <CardHeader
              avatar={<Avatar sx={{ bgcolor: gameState.players[0].avatar, width: 100, height: 100 }} />}
              title={gameState.players[0].name}
              titleTypographyProps={{ variant: 'h6' }}
              subheader={`Points: ${gameState.players[0].score}`}
              subheaderTypographyProps={{ variant: 'subtitle1' }}
            />
          </Card>
        </Grid>
      </Grid>
      {notification && (
        <Typography variant="h5" mt={2} sx={{ color: 'yellow' }}>{notification}</Typography>
      )}
      <Button variant="contained" color="primary" onClick={restartGame} sx={{ mt: 3 }}>Restart Game</Button>
      <Leaderboard />
      {gameOver && (
        <Dialog open={gameOver} onClose={() => setGameOver(false)}>
          <DialogTitle>Game Over</DialogTitle>
          <DialogContent>
            <Typography variant="h6">{winner}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setGameOver(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default GamePage;
