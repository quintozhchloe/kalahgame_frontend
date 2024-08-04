import React from 'react';
import { Button, Box } from '@mui/material';
import '../styles/PlayerTypeSelection.css'; // 确保路径正确

interface PlayerTypeSelectionProps {
  onSelect: (type: 'bot' | 'local' | 'online') => void;
  onCancel: () => void;
}

const PlayerTypeSelection: React.FC<PlayerTypeSelectionProps> = ({ onSelect, onCancel }) => {
  return (
    <Box textAlign="center">
      <Button variant="contained" color="primary" onClick={() => onSelect('bot')} sx={{ m: 1 }}>
        Bot
      </Button>
      <Button variant="contained" color="primary" onClick={() => onSelect('local')} sx={{ m: 1 }}>
        Local player
      </Button>
      <Button variant="contained" color="primary" onClick={() => onSelect('online')} sx={{ m: 1 }}>
        Online player
      </Button>
      <Button variant="outlined" onClick={onCancel} sx={{ mt: 2 }}>
        Cancel
      </Button>
    </Box>
  );
};

export default PlayerTypeSelection;
