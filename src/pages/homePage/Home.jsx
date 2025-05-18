import React from 'react';
import UserList from '../userList/UserList';
import CategoryDistribution from '../CategoryDistribution/CategoryDistribution';
import { Box, Grid } from '@mui/material';

function Home() {
  return (
    <Box sx={{ px: 2, py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4} md={4}>
          <UserList />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <CategoryDistribution />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
