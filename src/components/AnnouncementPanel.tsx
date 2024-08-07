import React, { useEffect, useState } from 'react';
import { Box, Typography, Card } from '@mui/material';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL || '';

const AnnouncementPanel: React.FC = () => {
  const [announcement, setAnnouncement] = useState<string>('');

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await axios.get(API_URL+'/api/announcement');
        setAnnouncement(response.data.content);
      } catch (error) {
        console.error('Error fetching announcement:', error);
      }
    };

    fetchAnnouncement();
  }, []);

  return (
    <Card sx={{ mt: 3, p: 2, maxWidth: 1100, mx: 'auto', border: '2px solid white' }}>
      <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
        <Typography variant="h5" gutterBottom sx={{ fontFamily: '"Press Start 2P", cursive' }}>
          Announcement
        </Typography>
      </Box>
      <Typography variant="body1" sx={{ fontFamily: '"Press Start 2P", cursive' }}>
        {announcement}
      </Typography>
    </Card>
  );
};

export default AnnouncementPanel;
