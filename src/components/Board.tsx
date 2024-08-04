import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { GameState } from '../types';

interface BoardProps {
  gameState: GameState;
  onPitClick: (pitIndex: number) => void;
}

const Board: React.FC<BoardProps> = ({ gameState, onPitClick }) => {
  const renderPits = (start: number, end: number) => {
    return gameState.pits.slice(start, end).map((seeds, index) => (
      <Box 
        key={index} 
        className="pit" 
        onClick={() => onPitClick(start + index)}
        sx={{
          backgroundColor: 'rgba(192, 192, 192, 1)', // 浅灰色底色
          boxShadow: 'inset 0 0 10px #000000',
          borderRadius: '50%',
          padding: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          width: { xs: '60px', sm: '72px', md: '86.4px' }, // 自适应宽度
          height: { xs: '60px', sm: '72px', md: '86.4px' }, // 自适应高度
          margin: '10px'
        }}
      >
        <Typography 
          className="seeds"
          sx={{
            fontSize: { xs: '16px', sm: '20px', md: '24px' }, // 自适应字号
            fontWeight: 'bold',
            color: 'black'
          }}
        >
          {seeds}
        </Typography>
      </Box>
    ));
  };

  return (
    <Box sx={{ height: '350px', position: 'relative' }}>
      <Typography
        sx={{
          position: 'absolute',
          top: '10px',
          width: '100%',
          textAlign: 'center',
          fontSize: { xs: '18px', sm: '22px', md: '24px' }, // 自适应字号
          fontWeight: 'bold',
          color: 'black'
        }}
      >
        {gameState.currentPlayer === 0 ? "Player 1's turn" : "Player 2's turn"}
      </Typography>
      <Grid container justifyContent="center" alignItems="center" sx={{ backgroundColor: 'transparent', height: '100%' }}>
        <Grid item xs={1}>
          <Box 
            className="store" 
            sx={{
              backgroundColor: 'rgba(192, 192, 192, 1)', // 浅灰色底色
              boxShadow: 'inset 0 0 10px #000000',
              borderRadius: '15px',
              padding: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: { xs: '60px', sm: '72px', md: '86.4px' }, // 自适应宽度
              height: { xs: '180px', sm: '200px', md: '216px' }, // 自适应高度
              margin: '10px'
            }}
          >
            <Typography 
              className="seeds"
              sx={{
                fontSize: { xs: '18px', sm: '22px', md: '24px' }, // 自适应字号
                fontWeight: 'bold',
                color: 'black'
              }}
            >
              {gameState.pits[13]}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={10}>
          <Grid container justifyContent="space-between">
            <Grid item xs={12} className="pits" sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              {renderPits(7, 13).reverse()}
            </Grid>
            <Grid item xs={12} className="pits" sx={{ display: 'flex', justifyContent: 'space-between' }}>
              {renderPits(0, 6)}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <Box 
            className="store" 
            sx={{
              backgroundColor: 'rgba(192, 192, 192, 1)', // 浅灰色底色
              boxShadow: 'inset 0 0 10px #000000',
              borderRadius: '15px',
              padding: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: { xs: '60px', sm: '72px', md: '86.4px' }, // 自适应宽度
              height: { xs: '180px', sm: '200px', md: '216px' }, // 自适应高度
              margin: '10px'
            }}
          >
            <Typography 
              className="seeds"
              sx={{
                fontSize: { xs: '18px', sm: '22px', md: '24px' }, // 自适应字号
                fontWeight: 'bold',
                color: 'black'
              }}
            >
              {gameState.pits[6]}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Board;
