import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Avatar, Grid, Dialog, DialogContent, DialogTitle, DialogActions, Card, CardContent, CardHeader, IconButton } from '@mui/material';
import AvatarSelection from './AvatarSelection';

const PlayerSetup: React.FC = () => {
  const [player1Name, setPlayer1Name] = useState('Lucky');
  const [player2Name, setPlayer2Name] = useState('');
  const [player1Avatar, setPlayer1Avatar] = useState('/assets/1.png');
  const [player2Avatar, setPlayer2Avatar] = useState('/assets/2.png');
  const [isAIPlayer, setIsAIPlayer] = useState(false);
  const [showSelectionDialog, setShowSelectionDialog] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<'player1' | 'player2' | null>(null);
  const [startingSeeds, setStartingSeeds] = useState(4);
  const navigate = useNavigate();

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

  return (
    <Box textAlign="center" mt={4} sx={{ bgcolor: 'background.default', minHeight: '100vh', p: 3, background: 'linear-gradient(to bottom right, #00ff00, #0000ff)' }}>
      <Typography variant="h4" gutterBottom sx={{ fontFamily: '"Press Start 2P", cursive' }}>Kalah Lobby</Typography>
      <Typography variant="h6" gutterBottom sx={{ fontFamily: '"Press Start 2P", cursive' }}>Players ( 1 / 2 )</Typography>
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
              avatar={<Typography variant="h6" sx={{ fontFamily: '"Press Start 2P", cursive' }}>Empty</Typography>}
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
      <Typography variant="subtitle1" mt={2} sx={{ fontFamily: '"Press Start 2P", cursive' }}>Waiting for 1 player...</Typography>
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
      </Box>

      <Dialog open={showSelectionDialog} onClose={() => setShowSelectionDialog(false)}>
        <DialogTitle sx={{ fontFamily: '"Press Start 2P", cursive' }}>Select Avatar and Player Type</DialogTitle>
        <DialogContent>
          <AvatarSelection onSelect={handleAvatarSelect} onSelectType={handlePlayerTypeSelect} onCancel={() => setShowSelectionDialog(false)} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default PlayerSetup;
