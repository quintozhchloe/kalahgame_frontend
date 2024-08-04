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

const playerTypeOptions = [
  { label: 'Local Player', src: '/assets/local.png', type: 'local' },
  { label: 'Robot', src: '/assets/bot.png', type: 'bot' },
];

interface AvatarSelectionProps {
  onSelect: (avatar: string) => void;
  onSelectType: (type: 'bot' | 'local') => void;
  onCancel: () => void;
}

const AvatarSelection: React.FC<AvatarSelectionProps> = ({ onSelect, onSelectType, onCancel }) => {
  return (
    <Box textAlign="center">
      <Typography variant="h6" sx={{ fontFamily: '"Press Start 2P", cursive', mb: 2 }}>Select Avatar</Typography>
      <Grid container spacing={2} justifyContent="center">
        {avatarOptions.map((avatar, index) => (
          <Grid item xs={4} key={index}>
            <Avatar
              src={avatar.src}
              sx={{ width: 80, height: 80, cursor: 'pointer', border: '2px solid black' }}
              onClick={() => onSelect(avatar.src)}
            />
          </Grid>
        ))}
      </Grid>
      <Typography variant="h6" sx={{ fontFamily: '"Press Start 2P", cursive', mt: 4, mb: 2 }}>Select Player Type</Typography>
      <Grid container spacing={2} justifyContent="center">
        {playerTypeOptions.map((option, index) => (
          <Grid item xs={4} key={index}>
            <Box
              textAlign="center"
              sx={{ cursor: 'pointer' }}
              onClick={() => onSelectType(option.type as 'bot' | 'local')}
            >
              <Avatar
                src={option.src}
                sx={{ width: 80, height: 80, border: '2px solid black', mb: 1 }}
              />
              <Typography variant="body2" sx={{ fontFamily: '"Press Start 2P", cursive' }}>{option.label}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <DialogActions>
        <Button onClick={onCancel} sx={{ fontFamily: '"Press Start 2P", cursive' }}>Cancel</Button>
      </DialogActions>
    </Box>
  );
};

export default AvatarSelection;
