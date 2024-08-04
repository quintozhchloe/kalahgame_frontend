import React from 'react';
import { Avatar, Box, DialogActions, Button, Grid } from '@mui/material';

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
  onCancel: () => void;
}

const AvatarSelection: React.FC<AvatarSelectionProps> = ({ onSelect, onCancel }) => {
  return (
    <Box textAlign="center">
      <Grid container spacing={2} justifyContent="center">
        {avatarOptions.map((avatar, index) => (
          <Grid item xs={4} key={index}>
            <Avatar
              src={avatar.src}
              sx={{ width: 80, height: 80, cursor: 'pointer' }}
              onClick={() => onSelect(avatar.src)}
            />
          </Grid>
        ))}
      </Grid>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
      </DialogActions>
    </Box>
  );
};

export default AvatarSelection;
