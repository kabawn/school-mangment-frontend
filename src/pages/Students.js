import React, { useState, useEffect } from 'react';
import axios from '../axios'; // Import the axios instance
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Avatar, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import GridViewIcon from '@mui/icons-material/GridView';
import TopBar from '../components/TopBar'; // Assuming TopBar is in the same directory

const Students = () => {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('/users/students'); // Get all students
        setStudents(response.data); // Set the student data
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents(); // Fetch students on component mount
  }, []);

  const handleOpen = (title, content) => {
    setModalContent({ title, content });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ padding: { xs: '10px', sm: '20px' }, backgroundColor: '#f5f5f5', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* Page Header */}
      <Grid container alignItems="center" mb={3} sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
        <Grid item xs={12} sm={6}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 'bold', 
              display: 'flex', 
              alignItems: 'center', 
              textAlign: 'left' // Force left alignment
            }}
          >
            <GridViewIcon sx={{ marginRight: '10px' }} />
            Student List
          </Typography>
        </Grid>
      </Grid>

      {/* Top Bar (Search, Filter, Button) */}
      <TopBar />

      {/* Students Table */}
      <Box sx={{ overflowX: 'auto', marginTop: '20px', width: '100%' }}>
        <TableContainer component={Paper} sx={{ minWidth: 650 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
                <TableCell padding="checkbox"><input type="checkbox" /></TableCell>
                <TableCell>Name</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Grade</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student._id.$oid}>
                  <TableCell padding="checkbox"><input type="checkbox" /></TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      {/* Ensure the URL to the image is correct */}
                      <Avatar alt={student.profile.name} src={`http://172.27.160.1:5000${student.profile.profileImage}`} />
                      <Typography sx={{ marginLeft: 2 }}>{student.profile.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: '#6c63ff' }}>{student.profile.studentInfo.studentID}</TableCell>
                  <TableCell>{new Date(student.profile.dateOfBirth.$date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <IconButton sx={{ color: '#6c63ff' }} onClick={() => handleOpen('Phone', student.profile.phone)}>
                      <PhoneIcon />
                    </IconButton>
                    <IconButton sx={{ color: '#6c63ff' }} onClick={() => handleOpen('Email', student.email)}>
                      <EmailIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" sx={{ backgroundColor: '#6c63ff', color: '#fff' }}>
                      {student.profile.studentInfo.class}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <IconButton sx={{ color: '#6c63ff' }}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Modal for Phone and Email */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{modalContent.title}</DialogTitle>
        <DialogContent>
          <Typography>{modalContent.content}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Students;
