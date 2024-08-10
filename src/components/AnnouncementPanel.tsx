import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { Announcement } from '../types';

interface AnnouncementPanelProps {
  announcements: Announcement[];
}

const AnnouncementPanel: React.FC<AnnouncementPanelProps> = ({ announcements }) => {
  const latestAnnouncement = announcements.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  return (
    <Box>
      <Typography variant="h5" sx={{ fontFamily: '"Press Start 2P", cursive' }}>Latest Announcement</Typography>
      {latestAnnouncement ? (
        <Card sx={{ mt: 2 }}>
          <CardContent>
        
            <Typography variant="body1" sx={{ fontFamily: '"Press Start 2P", cursive' }}>
              {latestAnnouncement.content}
            </Typography>
            <Typography variant="caption" sx={{ fontFamily: '"Press Start 2P", cursive' }}>
              {new Date(latestAnnouncement.date).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="body1" sx={{ fontFamily: '"Press Start 2P", cursive' }}>
          No announcements available.
        </Typography>
      )}
    </Box>
  );
};

export default AnnouncementPanel;
