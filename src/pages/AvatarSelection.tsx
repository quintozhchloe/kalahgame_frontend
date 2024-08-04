import React from 'react';
import { Avatar, Box, DialogActions, Button, Grid, Typography } from '@mui/material';

const avatarOptions = [
  { color: 'red', src: '/assets/1.png' },
  { color: 'blue', src: '/assets/2.png' },
  { color: 'green', src: '/assets/3.png' },
  { color: 'yellow', src: '/assets/4.png' },
  { color: 'purple', src: '/assets/5.png' },
  { color: 'orange', src: '/assets/6.png' },
];

interface AvatarSelectionProps {
  onSelect: (avatar: string) => void;
  onSelectType?: (type: 'bot' | 'local') => void; // Add the optional onSelectType prop
  onCancel: () => void;
  showPlayerType?: boolean; // Add the optional showPlayerType prop
}

const AvatarSelection: React.FC<AvatarSelectionProps> = ({ onSelect, onSelectType, onCancel, showPlayerType }) => {
  return (
    <Box textAlign="center">
      <Typography variant="h6" gutterBottom sx={{ fontFamily: '"Press Start 2P", cursive' }}>Select Avatar</Typography>
      <Grid container spacing={2} justifyContent="center">
        {avatarOptions.map((avatar, index) => (
          <Grid item xs={4} key={index}>
            <Avatar
              src={avatar.src}
              sx={{ width: 80, height: 80, cursor: 'pointer', border: '2px solid #000', borderRadius: '50%' }}
              onClick={() => onSelect(avatar.src)}
            />
          </Grid>
        ))}
      </Grid>
      {showPlayerType && (
        <>
          <Typography variant="h6" gutterBottom sx={{ fontFamily: '"Press Start 2P", cursive', marginTop: 2 }}>Select Player Type</Typography>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button onClick={() => onSelectType && onSelectType('local')} sx={{ margin: 1 }}>
              <img src="/assets/local.png" alt="Local Player" style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
              <Typography variant="subtitle1" sx={{ fontFamily: '"Press Start 2P", cursive' }}>Local Player</Typography>
            </Button>
            <Button onClick={() => onSelectType && onSelectType('bot')} sx={{ margin: 1 }}>
              <img src="/assets/bot.png" alt="Robot" style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
              <Typography variant="subtitle1" sx={{ fontFamily: '"Press Start 2P", cursive' }}>Robot</Typography>
            </Button>
          </Box>
        </>
      )}
      <DialogActions>
        <Button onClick={onCancel} sx={{ fontFamily: '"Press Start 2P", cursive' }}>Cancel</Button>
      </DialogActions>
    </Box>
  );
};

export default AvatarSelection;
