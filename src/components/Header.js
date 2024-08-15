import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Box, Grid, Menu, MenuItem, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import GridViewIcon from '@mui/icons-material/GridView';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const navigate = useNavigate();

  // Retrieve user data from localStorage
  const [profileImage, setProfileImage] = useState('/default-avatar.jpg'); // Default avatar image

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('Retrieved user from localStorage:', user); // Log the user object

    if (user && user.profile && user.profile.profileImage) {
      const imageUrl = `http://172.27.160.1:5000${user.profile.profileImage}`;
      setProfileImage(imageUrl);
      console.log('Profile image URL:', imageUrl); // Log the full profile image URL
    } else {
      console.log('No profile image found, using default'); // Log if no profile image is found
    }
  }, []);

  // Menu state for the profile dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle sign out
  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ minHeight: 80, flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }}>
        <Grid container alignItems="center" justifyContent="space-between" sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
          <Grid item sx={{ textAlign: { xs: 'center', sm: 'left' }, mb: { xs: 2, sm: 0 } }}>
            <Typography variant="h6" noWrap sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
              <Box component="span" sx={{ marginRight: '10px', display: 'flex', alignItems: 'center' }}>
                <GridViewIcon fontSize="small" />
              </Box>
              School Management
            </Typography>
          </Grid>
          <Grid item>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-end' }, flexWrap: 'wrap' }}>
              <IconButton>
                <SearchIcon />
              </IconButton>
              <IconButton>
                <GridViewIcon />
              </IconButton>
              <IconButton>
                <NightsStayIcon />
              </IconButton>
              <IconButton>
                <FullscreenIcon />
              </IconButton>
              <IconButton>
                <ChatIcon />
              </IconButton>
              <IconButton>
                <NotificationsIcon />
              </IconButton>
              <IconButton onClick={handleMenuOpen}>
                <Avatar
                  alt="User Avatar"
                  src={profileImage}
                  sx={{ marginLeft: '10px', width: '40px', height: '40px' }}
                  onError={(e) => { e.target.onerror = null; e.target.src="/default-avatar.jpg"; }}  // Fallback in case the image fails to load
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </Menu>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
