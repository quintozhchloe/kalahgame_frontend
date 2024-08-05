import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Avatar, Grid, Dialog, DialogContent, DialogTitle, DialogActions, Card, CardContent, CardHeader, IconButton, CircularProgress } from '@mui/material';
import AvatarSelection from './AvatarSelection';
import { io, Socket } from 'socket.io-client';

const PlayerSetup: React.FC = () => {
  const [player1Name, setPlayer1Name] = useState('Lucky');
  const [player2Name, setPlayer2Name] = useState('');
  const [player1Avatar, setPlayer1Avatar] = useState('/assets/1.png');
  const [player2Avatar, setPlayer2Avatar] = useState('/assets/2.png');
  const [isAIPlayer, setIsAIPlayer] = useState(false);
  const [showSelectionDialog, setShowSelectionDialog] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<'player1' | 'player2' | null>(null);
  const [startingSeeds, setStartingSeeds] = useState(4);
  const [isMatching, setIsMatching] = useState(false);
  const [matchFound, setMatchFound] = useState(false);
  const navigate = useNavigate();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5200/match');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('connected to server');
    });

    newSocket.on('matchFound', (data) => {
      console.log('match found:', data);
      setPlayer2Name(data.player1Name);
      setPlayer2Avatar(data.player1Avatar);
      setIsMatching(false);
      setMatchFound(true);

      setTimeout(() => {
        handleStartGame();
      }, 1000); // 等待1秒后进入游戏
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleStartGame = () => {
    sessionStorage.setItem('player1Name', player1Name);
    sessionStorage.setItem('player2Name', player2Name);
    sessionStorage.setItem('player1Avatar', player1Avatar);
    sessionStorage.setItem('player2Avatar', player2Avatar);
    sessionStorage.setItem('isAIPlayer', JSON.stringify(isAIPlayer));
    sessionStorage.setItem('startingSeeds', startingSeeds.toString());
    navigate('/game');
    window.location.reload();
  };

  const handleAvatarSelect = (avatar: string) => {
    if (currentPlayer === 'player1') {
      setPlayer1Avatar(avatar);
    } else if (currentPlayer === 'player2') {
      setPlayer2Avatar(avatar);
    }
    setShowSelectionDialog(false);
  };

  const handlePlayerTypeSelect = (type: 'bot' | 'local') => {
    if (type === 'bot') {
      setIsAIPlayer(true);
      setPlayer2Name('Robot');
    } else {
      setIsAIPlayer(false);
      setPlayer2Name('');
    }
    setShowSelectionDialog(false);
  };

  const generateRandomName = () => {
    const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // 生成随机大写字母
    setPlayer2Name(randomLetter);
  };

  const handleRandomMatch = () => {
    setIsMatching(true);
    if (socket) {
      socket.emit('RequestMatch', player1Name, player1Avatar);
    }
  };

  const handleCancelMatch = () => {
    setIsMatching(false);
    if (socket) {
      socket.emit('CancelMatch');
    }
  };

  return (
    <Box textAlign="center" mt={4} sx={{ bgcolor: 'background.default', minHeight: '100vh', p: 3, background: 'linear-gradient(to bottom right, #00ff00, #0000ff)' }}>
      <Typography variant="h4" gutterBottom sx={{ fontFamily: '"Press Start 2P", cursive' }}>Kalah Lobby</Typography>
      <Typography variant="h6" gutterBottom sx={{ fontFamily: '"Press Start 2P", cursive' }}>Players ( 2 / 2 )</Typography>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid item>
          <Card sx={{ maxWidth: 300, boxShadow: 3 }}>
            <CardHeader
              avatar={<Typography variant="h6" sx={{ fontFamily: '"Press Start 2P", cursive' }}>👑</Typography>}
              title={
                <TextField
                  variant="outlined"
                  label="Player 1 Name"
                  value={player1Name}
                  onChange={(e) => setPlayer1Name(e.target.value)}
                  fullWidth
                  InputLabelProps={{ style: { fontFamily: '"Press Start 2P", cursive' } }}
                  inputProps={{ style: { fontFamily: '"Press Start 2P", cursive' } }}
                />
              }
            />
            <CardContent>
              <Avatar
                src={player1Avatar}
                sx={{ width: 100, height: 100, cursor: 'pointer', mx: 'auto' }}
                onClick={() => {
                  setCurrentPlayer('player1');
                  setShowSelectionDialog(true);
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card sx={{ maxWidth: 300, boxShadow: 3 }}>
            <CardHeader
              avatar={<Typography variant="h6" sx={{ fontFamily: '"Press Start 2P", cursive' }}>Player2</Typography>}
              title={
                <Box display="flex" alignItems="center">
                  <TextField
                    variant="outlined"
                    label="Player 2 Name"
                    value={player2Name}
                    onChange={(e) => setPlayer2Name(e.target.value)}
                    fullWidth
                    InputLabelProps={{ style: { fontFamily: '"Press Start 2P", cursive' } }}
                    inputProps={{ style: { fontFamily: '"Press Start 2P", cursive' } }}
                  />
                  <IconButton onClick={generateRandomName}>
                    🎲
                  </IconButton>
                </Box>
              }
            />
            <CardContent>
              <Avatar
                src={player2Avatar}
                sx={{ width: 100, height: 100, cursor: 'pointer', mx: 'auto' }}
                onClick={() => {
                  setCurrentPlayer('player2');
                  setShowSelectionDialog(true);
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Typography variant="subtitle1" mt={2} sx={{ fontFamily: '"Press Start 2P", cursive' }}>Let's play!</Typography>
      <Box sx={{ mt: 3 }}>
        <Card sx={{ maxWidth: 600, mx: 'auto', boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontFamily: '"Press Start 2P", cursive' }}>Options</Typography>
            <Box display="flex" alignItems="center" mt={2}>
              <Typography variant="body1" mr={2} sx={{ fontFamily: '"Press Start 2P", cursive' }}>Start marbles</Typography>
              <TextField
                type="number"
                value={startingSeeds}
                onChange={(e) => setStartingSeeds(Number(e.target.value))}
                inputProps={{ min: 1, style: { fontFamily: '"Press Start 2P", cursive' } }}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Button variant="contained" color="primary" onClick={handleStartGame} sx={{ bgcolor: '#3498db', color: 'white', mr: 2, fontFamily: '"Press Start 2P", cursive' }}>
          Start Game
        </Button>
        <Button variant="contained" color="secondary" onClick={handleRandomMatch} sx={{ bgcolor: '#e74c3c', color: 'white', ml: 2, fontFamily: '"Press Start 2P", cursive' }}>
          Random Match
        </Button>
      </Box>

      <Dialog open={showSelectionDialog} onClose={() => setShowSelectionDialog(false)}>
        <DialogTitle sx={{ fontFamily: '"Press Start 2P", cursive' }}>Select Avatar and Player Type</DialogTitle>
        <DialogContent>
          <AvatarSelection 
            onSelect={handleAvatarSelect} 
            onSelectType={handlePlayerTypeSelect} 
            onCancel={() => setShowSelectionDialog(false)} 
            showPlayerType={currentPlayer === 'player2'} // 控制是否显示玩家类型选择
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isMatching}>
        <DialogTitle sx={{ fontFamily: '"Press Start 2P", cursive' }}>Matching...</DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
            <CircularProgress />
            <Typography variant="subtitle1" mt={2} sx={{ fontFamily: '"Press Start 2P", cursive' }}>Waiting for another player...</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelMatch} sx={{ fontFamily: '"Press Start 2P", cursive' }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PlayerSetup;
