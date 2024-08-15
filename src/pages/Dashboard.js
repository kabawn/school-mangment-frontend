import React, { useState, useEffect } from "react";
import axios from "../axios"; // Import the configured axios instance
import { Grid, Paper, Typography, IconButton, Avatar, Box } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import StudentsIcon from "@mui/icons-material/School";
import TeachersIcon from "@mui/icons-material/Person";
import EventsIcon from "@mui/icons-material/Event";
import FoodsIcon from "@mui/icons-material/Restaurant";

const AdminDashboard = () => {
   const [studentCount, setStudentCount] = useState(0);
   const [teacherCount, setTeacherCount] = useState(0);

   useEffect(() => {
      const fetchStudents = async () => {
         try {
            const response = await axios.get("/users/students");
            setStudentCount(response.data.length);
         } catch (error) {
            console.error("Error fetching student count:", error);
         }
      };

      fetchStudents();
   }, []);

   useEffect(() => {
      const fetchTeachers = async () => {
         try {
            const response = await axios.get("/users/teachers");
            setTeacherCount(response.data.length);
         } catch (error) {
            console.error("Error fetching teacher count:", error);
         }
      };

      fetchTeachers();
   }, []);

   return (
      <Box sx={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
         <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            sx={{ marginBottom: "20px" }}
         >
            <Grid item>
               <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}
               >
                  <Box
                     component="span"
                     sx={{ marginRight: "10px", display: "flex", alignItems: "center" }}
                  >
                     <GridViewIcon fontSize="small" />
                  </Box>
                  Dashboard
               </Typography>
            </Grid>
         </Grid>

         <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
               <Paper
                  style={{
                     padding: "20px",
                     display: "flex",
                     alignItems: "center",
                     backgroundColor: "#7367f0",
                     color: "#fff",
                  }}
               >
                  <StudentsIcon sx={{ fontSize: "40px", marginRight: "15px" }} />
                  <div>
                     <Typography variant="body2">Students</Typography>
                     <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        {studentCount}
                     </Typography>
                  </div>
               </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
               <Paper
                  style={{
                     padding: "20px",
                     display: "flex",
                     alignItems: "center",
                     backgroundColor: "#ff6b6b",
                     color: "#fff",
                  }}
               >
                  <TeachersIcon sx={{ fontSize: "40px", marginRight: "15px" }} />
                  <div>
                     <Typography variant="body2">Teachers</Typography>
                     <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        {teacherCount}
                     </Typography>
                  </div>
               </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
               <Paper
                  style={{
                     padding: "20px",
                     display: "flex",
                     alignItems: "center",
                     backgroundColor: "#ffc107",
                     color: "#fff",
                  }}
               >
                  <EventsIcon sx={{ fontSize: "40px", marginRight: "15px" }} />
                  <div>
                     <Typography variant="body2">Events</Typography>
                     <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        40K
                     </Typography>
                  </div>
               </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
               <Paper
                  style={{
                     padding: "20px",
                     display: "flex",
                     alignItems: "center",
                     backgroundColor: "#7367f0",
                     color: "#fff",
                  }}
               >
                  <FoodsIcon sx={{ fontSize: "40px", marginRight: "15px" }} />
                  <div>
                     <Typography variant="body2">Foods</Typography>
                     <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        32K
                     </Typography>
                  </div>
               </Paper>
            </Grid>
         </Grid>
      </Box>
   );
};

export default AdminDashboard;
