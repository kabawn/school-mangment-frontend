import React, { useState, useEffect } from 'react';
import axios from '../axios'; // Import the axios instance
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Avatar, IconButton, Button, Menu, MenuItem, ListItemIcon
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import GridViewIcon from '@mui/icons-material/GridView';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TopBar from '../components/TopBar'; // Assuming TopBar is in the same directory

const Students = () => {
  const [students, setStudents] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const navigate = useNavigate();

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

  const handleMenuClick = (event, student) => {
    setAnchorEl(event.currentTarget);
    setSelectedStudent(student);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedStudent(null);
  };

  const handleViewDetails = () => {
    handleMenuClose();
    navigate(`/student/${selectedStudent._id}`);
  };

  const handleEditStudent = () => {
    handleMenuClose();
    navigate(`/student/edit/${selectedStudent._id}`); // Assuming you will create an edit page
  };

  const handleDeleteStudent = async () => {
    handleMenuClose();
    if (window.confirm(`Are you sure you want to delete ${selectedStudent.profile.name}?`)) {
      try {
        await axios.delete(`/users/students/${selectedStudent._id}`);
        setStudents(students.filter(student => student._id !== selectedStudent._id));
        alert(`${selectedStudent.profile.name} has been deleted.`);
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
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
                <TableCell>Address</TableCell> 
                <TableCell>Contact</TableCell>
                <TableCell>Grade</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => {
                const dateOfBirth = student?.profile?.dateOfBirth;
                const formattedDate = dateOfBirth ? new Date(dateOfBirth).toLocaleDateString() : 'Date not available';

                return (
                  <TableRow key={student._id}>
                    <TableCell padding="checkbox"><input type="checkbox" /></TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar alt={student.profile.name} src={`http://172.27.160.1:5000${student.profile.profileImage}`} />
                        <Typography sx={{ marginLeft: 2 }}>{student.profile.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: '#6c63ff' }}>{student.profile.studentInfo.studentID}</TableCell>
                    <TableCell>{formattedDate}</TableCell>
                    <TableCell>{student.profile.address}</TableCell>
                    <TableCell>
                      <IconButton sx={{ color: '#6c63ff' }} onClick={() => alert(`Phone: ${student.profile.phone}`)}>
                        <PhoneIcon />
                      </IconButton>
                      <IconButton sx={{ color: '#6c63ff' }} onClick={() => alert(`Email: ${student.email}`)}>
                        <EmailIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" sx={{ backgroundColor: '#6c63ff', color: '#fff' }}>
                        {student.profile.studentInfo.class}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <IconButton sx={{ color: '#6c63ff' }} onClick={(event) => handleMenuClick(event, student)}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        PaperProps={{
                          elevation: 1,
                          sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },
                            '&:before': {
                              content: '""',
                              display: 'block',
                              position: 'absolute',
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: 'background.paper',
                              transform: 'translateY(-50%) rotate(45deg)',
                              zIndex: 0,
                            },
                          },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                      >
                        <MenuItem onClick={handleViewDetails}>
                          <ListItemIcon>
                            <VisibilityIcon fontSize="small" />
                          </ListItemIcon>
                          View Details
                        </MenuItem>
                        <MenuItem onClick={handleEditStudent}>
                          <ListItemIcon>
                            <EditIcon fontSize="small" />
                          </ListItemIcon>
                          Edit
                        </MenuItem>
                        <MenuItem onClick={handleDeleteStudent}>
                          <ListItemIcon>
                            <DeleteIcon fontSize="small" />
                          </ListItemIcon>
                          Delete
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Students;
