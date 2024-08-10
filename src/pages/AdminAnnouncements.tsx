import React, { useState, useEffect } from 'react';
import {
  Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Dialog, DialogContent, DialogTitle, DialogActions, TextField, IconButton, Snackbar, Alert
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '';
const apiBaseUrl = API_URL;

interface Announcement {
  id: string;
  content: string;
  date: string;
}

const AdminAnnouncements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [editAnnouncement, setEditAnnouncement] = useState<Announcement | null>(null);
  const [newAnnouncement, setNewAnnouncement] = useState<string>('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/announcements`);
      setAnnouncements(response.data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };
  const handleAddAnnouncement = async () => {
    try {
      const response = await axios.post(`${apiBaseUrl}/announcements/`, { 
        id: "0", // Default id value
        title: "title", // Default title value
        content: newAnnouncement 
      });
      setAnnouncements([...announcements, response.data]);
      setSnackbarMessage('Announcement added successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setTimeout(() => {
        setIsAddDialogOpen(false);
      }, 5000); // Close the dialog after 5 seconds
      setNewAnnouncement('');
    } catch (error) {
      setSnackbarMessage('Failed to add announcement');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
};


  const handleUpdateAnnouncement = async (announcement: Announcement) => {
    try {
      const { id, ...updatedFields } = announcement; // Destructure to separate id from the fields to update
      await axios.put(`${apiBaseUrl}/announcements/${id}`, updatedFields); // Only pass updated fields
      setAnnouncements(announcements.map(a => a.id === announcement.id ? { ...a, ...updatedFields } : a));
      setEditAnnouncement(null);
    } catch (error) {
      console.error('Error updating announcement:', error);
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    try {
      await axios.delete(`${apiBaseUrl}/announcements/${id}`);
      setAnnouncements(announcements.filter(a => a.id !== id));
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Manage Announcements</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsAddDialogOpen(true)}
        sx={{ mb: 2 }}
      >
        Add Announcement
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {announcements.map((announcement) => (
              <TableRow key={announcement.id}>
                <TableCell>{announcement.id}</TableCell>
                <TableCell>
                  {editAnnouncement?.id === announcement.id ? (
                    <TextField
                      variant="outlined"
                      fullWidth
                      value={editAnnouncement.content}
                      onChange={(e) =>
                        setEditAnnouncement({
                          ...editAnnouncement,
                          content: e.target.value,
                        })
                      }
                      onBlur={() => handleUpdateAnnouncement(editAnnouncement)}
                    />
                  ) : (
                    announcement.content
                  )}
                </TableCell>
                <TableCell>{new Date(announcement.date).toLocaleString()}</TableCell>
                <TableCell>
                  <IconButton onClick={() => setEditAnnouncement(announcement)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteAnnouncement(announcement.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)}>
        <DialogTitle>Add Announcement</DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            fullWidth
            value={newAnnouncement}
            onChange={(e) => setNewAnnouncement(e.target.value)}
            placeholder="Enter announcement content"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddAnnouncement} color="primary">Add</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminAnnouncements;
