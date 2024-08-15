import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse, Typography, Box, IconButton, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/School';
import TeacherIcon from '@mui/icons-material/Person';
import FoodIcon from '@mui/icons-material/Restaurant';
import FileIcon from '@mui/icons-material/Folder';
import AppsIcon from '@mui/icons-material/Apps';
import ChartIcon from '@mui/icons-material/BarChart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PluginIcon from '@mui/icons-material/Extension';
import WidgetIcon from '@mui/icons-material/Widgets';
import FormIcon from '@mui/icons-material/Description';
import TableIcon from '@mui/icons-material/TableChart';
import ArrowRightIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';

const Sidebar = () => {
  const [openStudents, setOpenStudents] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          backgroundColor: '#4a3fbc',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>
          School Management
        </Typography>
      </Box>

      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon sx={{ color: 'inherit' }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
          <ArrowRightIcon sx={{ fontSize: 'small' }} />
        </ListItem>

        {/* Students Section */}
        <ListItem
          button
          onClick={() => setOpenStudents(!openStudents)}
          sx={{ backgroundColor: openStudents ? '#3d35a5' : 'inherit' }}
        >
          <ListItemIcon sx={{ color: 'inherit' }}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Student" />
          {openStudents ? <ExpandMore sx={{ fontSize: 'small' }} /> : <ArrowRightIcon sx={{ fontSize: 'small' }} />}
        </ListItem>
        <Collapse in={openStudents} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/students" sx={{ pl: 4 }}>
              <ListItemIcon sx={{ color: 'inherit' }}>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Students" />
              <ArrowRightIcon sx={{ fontSize: 'small' }} />
            </ListItem>
            <ListItem button component={Link} to="/students/add" sx={{ pl: 4 }}>
              <ListItemIcon sx={{ color: 'inherit' }}>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="New Student" />
              <ArrowRightIcon sx={{ fontSize: 'small' }} />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button component={Link} to="/teachers">
          <ListItemIcon sx={{ color: 'inherit' }}>
            <TeacherIcon />
          </ListItemIcon>
          <ListItemText primary="Teacher" />
          <ArrowRightIcon sx={{ fontSize: 'small' }} />
        </ListItem>

        <ListItem button component={Link} to="/food">
          <ListItemIcon sx={{ color: 'inherit' }}>
            <FoodIcon />
          </ListItemIcon>
          <ListItemText primary="Food" />
          <ArrowRightIcon sx={{ fontSize: 'small' }} />
        </ListItem>

        <ListItem button component={Link} to="/file-manager">
          <ListItemIcon sx={{ color: 'inherit' }}>
            <FileIcon />
          </ListItemIcon>
          <ListItemText primary="File Manager" />
          <ArrowRightIcon sx={{ fontSize: 'small' }} />
        </ListItem>

        <ListItem button component={Link} to="/apps">
          <ListItemIcon sx={{ color: 'inherit' }}>
            <AppsIcon />
          </ListItemIcon>
          <ListItemText primary="Apps" />
          <ArrowRightIcon sx={{ fontSize: 'small' }} />
        </ListItem>

        <ListItem button component={Link} to="/charts">
          <ListItemIcon sx={{ color: 'inherit' }}>
            <ChartIcon />
          </ListItemIcon>
          <ListItemText primary="Charts" />
          <ArrowRightIcon sx={{ fontSize: 'small' }} />
        </ListItem>

        <ListItem button component={Link} to="/bootstrap">
          <ListItemIcon sx={{ color: 'inherit' }}>
            <FavoriteIcon />
          </ListItemIcon>
          <ListItemText primary="Bootstrap" />
          <ArrowRightIcon sx={{ fontSize: 'small' }} />
        </ListItem>

        <ListItem button component={Link} to="/plugins">
          <ListItemIcon sx={{ color: 'inherit' }}>
            <PluginIcon />
          </ListItemIcon>
          <ListItemText primary="Plugins" />
          <ArrowRightIcon sx={{ fontSize: 'small' }} />
        </ListItem>

        <ListItem button component={Link} to="/widget">
          <ListItemIcon sx={{ color: 'inherit' }}>
            <WidgetIcon />
          </ListItemIcon>
          <ListItemText primary="Widget" />
          <ArrowRightIcon sx={{ fontSize: 'small' }} />
        </ListItem>

        <ListItem button component={Link} to="/forms">
          <ListItemIcon sx={{ color: 'inherit' }}>
            <FormIcon />
          </ListItemIcon>
          <ListItemText primary="Forms" />
          <ArrowRightIcon sx={{ fontSize: 'small' }} />
        </ListItem>

        <ListItem button component={Link} to="/table">
          <ListItemIcon sx={{ color: 'inherit' }}>
            <TableIcon />
          </ListItemIcon>
          <ListItemText primary="Table" />
          <ArrowRightIcon sx={{ fontSize: 'small' }} />
        </ListItem>
      </List>
    </>
  );

  return (
    <>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ position: 'absolute', top: 16, left: 16 }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#4a3fbc',
            color: '#fff',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
