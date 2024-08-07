import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, Typography, Box } from '@mui/material';

interface MatchingDialogProps {
  isMatching: boolean;
  handleCancelMatch: () => void;
}

const MatchingDialog: React.FC<MatchingDialogProps> = ({ isMatching, handleCancelMatch }) => {
  return (
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
  );
};

export default MatchingDialog;
