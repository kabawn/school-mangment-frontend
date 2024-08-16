import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios'; // Import the axios instance
import { Box, Typography, Grid, Avatar, Paper, IconButton, Menu, MenuItem, Divider } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import SubjectIcon from '@mui/icons-material/MenuBook';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import SportsIcon from '@mui/icons-material/SportsSoccer';
import WarningIcon from '@mui/icons-material/Warning';

const StudentDetails = () => {
  const { id } = useParams(); // Get the student ID from the URL
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`/users/student/${id}`);
        setStudent(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data.error : 'Error fetching student details');
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, [id]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    // Navigate to the edit page or show edit modal
  };

  const handleDelete = () => {
    handleMenuClose();
    // Handle delete functionality
  };

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ padding: { xs: '10px', sm: '20px' }, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ borderRadius: '10px', overflow: 'hidden' }}>
        {/* Header section with background color and image */}
        <Box sx={{ backgroundColor: '#5A67D8', height: '200px', position: 'relative' }}>
          <Avatar
            alt={student.profile.name}
            src={`http://172.27.160.1:5000${student.profile.profileImage}`}
            sx={{
              width: 120,
              height: 120,
              position: 'absolute',
              bottom: '-60px',
              left: { xs: '50%', sm: '30px' }, // Center on mobile, left on desktop
              transform: { xs: 'translateX(-50%)', sm: 'none' }, // Center on mobile, no transform on desktop
              border: '5px solid white',
            }}
          />
          <IconButton
            sx={{ position: 'absolute', top: '10px', right: '10px', color: 'white' }}
            onClick={handleMenuClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              elevation: 3,
              style: {
                width: '150px',
              },
            }}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </Box>

        {/* Main content section */}
        <Box sx={{ padding: { xs: '80px 10px 20px 10px', sm: '80px 30px 30px 30px' } }}>
          <Typography variant="h4" fontWeight="bold" textAlign={{ xs: 'center', sm: 'left' }}>
            {student.profile.name}
          </Typography>
          <Typography variant="body1" color="textSecondary" textAlign={{ xs: 'center', sm: 'left' }} sx={{ mb: 3 }}>
            Student
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} display="flex" alignItems="center">
              <Box sx={{ 
                backgroundColor: '#FF6B6B', 
                borderRadius: '50%', 
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2 
              }}>
                <PersonIcon sx={{ color: 'white' }} />
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">Parents:</Typography>
                <Typography variant="body1" fontWeight="bold">Justin Hope</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} display="flex" alignItems="center">
              <Box sx={{ 
                backgroundColor: '#FF6B6B', 
                borderRadius: '50%', 
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2 
              }}>
                <LocationOnIcon sx={{ color: 'white' }} />
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">Address:</Typography>
                <Typography variant="body1" fontWeight="bold">{student.profile.address}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} display="flex" alignItems="center">
              <Box sx={{ 
                backgroundColor: '#FF6B6B', 
                borderRadius: '50%', 
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2 
              }}>
                <PhoneIcon sx={{ color: 'white' }} />
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">Phone:</Typography>
                <Typography variant="body1" fontWeight="bold">{student.profile.phone}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} display="flex" alignItems="center">
              <Box sx={{ 
                backgroundColor: '#FF6B6B', 
                borderRadius: '50%', 
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2 
              }}>
                <EmailIcon sx={{ color: 'white' }} />
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">Email:</Typography>
                <Typography variant="body1" fontWeight="bold">{student.email}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Additional Sections */}
        <Box sx={{ padding: '30px' }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
            Academic Information
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} display="flex" alignItems="center">
              <Box sx={{ 
                backgroundColor: '#FF6B6B', 
                borderRadius: '50%', 
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2 
              }}>
                <SchoolIcon sx={{ color: 'white' }} />
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">Class:</Typography>
                <Typography variant="body1" fontWeight="bold">{student.profile.studentInfo.class}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} display="flex" alignItems="center">
              <Box sx={{ 
                backgroundColor: '#FF6B6B', 
                borderRadius: '50%', 
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2 
              }}>
                <SubjectIcon sx={{ color: 'white' }} />
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">Section:</Typography>
                <Typography variant="body1" fontWeight="bold">{student.profile.studentInfo.section}</Typography>
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={4} sx={{ mt: 3 }}>
            <Grid item xs={12} sm={6} display="flex" alignItems="center">
              <Box sx={{ 
                backgroundColor: '#FF6B6B', 
                borderRadius: '50%', 
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2 
              }}>
                <MedicalServicesIcon sx={{ color: 'white' }} />
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">Medical Conditions:</Typography>
                <Typography variant="body1" fontWeight="bold">
                  {student.profile.studentInfo.medicalConditions.length > 0 ? student.profile.studentInfo.medicalConditions.join(', ') : 'None'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} display="flex" alignItems="center">
              <Box sx={{ 
                backgroundColor: '#FF6B6B', 
                borderRadius: '50%', 
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2 
              }}>
                <SportsIcon sx={{ color: 'white' }} />
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">Extracurricular Activities:</Typography>
                <Typography variant="body1" fontWeight="bold">
                  {student.profile.studentInfo.extracurricularActivities.length > 0 ? student.profile.studentInfo.extracurricularActivities.join(', ') : 'None'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} display="flex" alignItems="center">
              <Box sx={{ 
                backgroundColor: '#FF6B6B', 
                borderRadius: '50%', 
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2 
              }}>
                <WarningIcon sx={{ color: 'white' }} />
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">Disciplinary Records:</Typography>
                <Typography variant="body1" fontWeight="bold">
                  {student.profile.studentInfo.disciplinaryRecords.length > 0 ? student.profile.studentInfo.disciplinaryRecords.join(', ') : 'None'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default StudentDetails;
