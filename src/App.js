import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard"; // Admin Dashboard
import Students from "./pages/Students";
import Login from "./pages/Login"; // Import the Login page
import StudentDetails from './pages/StudentDetails';  // Import the new page
import PrivateRoute from "./components/PrivateRoute"; // Import the PrivateRoute component
import { Box } from "@mui/material";

// Create a default theme
const theme = createTheme();

function App() {
   return (
      <ThemeProvider theme={theme}>
         <Router>
            <Routes>
               {/* Public Route for Login */}
               <Route path="/login" element={<Login />} />
               
               {/* Private Routes */}
               <Route
                  path="/"
                  element={
                     <PrivateRoute role="admin">
                        {/* Render the Dashboard if the user is an admin */}
                        <Header />
                        <Box sx={{ display: "flex", flexGrow: 1 }}>
                           <Sidebar />
                           <Box sx={{ flexGrow: 1, padding: { xs: "10px", sm: "20px" } }}>
                              <Dashboard />
                           </Box>
                        </Box>
                        <Footer />
                     </PrivateRoute>
                  }
               />
               <Route
                  path="/students"
                  element={
                     <PrivateRoute role="admin">
                        {/* Render the Students page if the user is an admin */}
                        <Header />
                        <Box sx={{ display: "flex", flexGrow: 1 }}>
                           <Sidebar />
                           <Box sx={{ flexGrow: 1, padding: { xs: "10px", sm: "20px" } }}>
                              <Students />
                           </Box>
                        </Box>
                        <Footer />
                     </PrivateRoute>
                  }
               />
               <Route
                  path="/student/:id"
                  element={
                     <PrivateRoute role="admin">
                        {/* Render the StudentDetails page if the user is an admin */}
                        <Header />
                        <Box sx={{ display: "flex", flexGrow: 1 }}>
                           <Sidebar />
                           <Box sx={{ flexGrow: 1, padding: { xs: "10px", sm: "20px" } }}>
                              <StudentDetails />
                           </Box>
                        </Box>
                        <Footer />
                     </PrivateRoute>
                  }
               />
            </Routes>
         </Router>
      </ThemeProvider>
   );
}

export default App;
