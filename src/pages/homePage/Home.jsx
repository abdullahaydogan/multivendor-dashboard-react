import React from "react";
import UserList from "../userList/UserList";
import CategoryDistribution from "../CategoryDistribution/CategoryDistribution";
import { Box, Grid, Paper } from "@mui/material";
import ChatAi from "../ai/ChatAi";
import HomeChatAi from "../ai/HomeChatAi";
import HomeUserList from "../userList/HomeUserList";

function Home() {
  return (
    <Box sx={{ px: 2, py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              height: "90vh",
              p: 2,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <HomeUserList />
          </Paper>
        </Grid>

        {/* Orta sütun: CategoryDistribution */}
        <Grid item xs={12} md={4}>
          <Box sx={{ height: "100%" }}>
            <CategoryDistribution />
          </Box>
        </Grid>

        {/* Sağ sütun: Chat AI */}
        <Grid item xs={12} md={4}>
          <Box sx={{ height: 600 }}>
            <HomeChatAi />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
