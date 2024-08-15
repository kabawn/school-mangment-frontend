import React from 'react';
import { Box, TextField, Button, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const TopBar = () => {
  return (
    <Box mb={2} p={2} sx={{ backgroundColor: '#f1f4f7', borderRadius: '8px' }}>
      <Grid container spacing={2} alignItems="center">
        {/* Search Bar */}
        <Grid item xs={12} sm={8} md={9} lg={10}>
          <TextField
            variant="outlined"
            placeholder="Search here..."
            fullWidth
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: '#6c63ff', marginRight: '8px' }} />,
            }}
            sx={{ backgroundColor: '#fff', borderRadius: '8px' }}
          />
        </Grid>
        {/* Button */}
        <Grid item xs={12} sm={4} md={3} lg={2}>
          <Button
            variant="contained"
            fullWidth
            sx={{ 
              backgroundColor: '#6c63ff', 
              color: '#fff', 
              borderRadius: '8px', 
              fontSize: '0.875rem',
              padding: '8px' 
            }}
          >
            + New Student
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TopBar;
