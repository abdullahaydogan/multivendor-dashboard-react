import React, { useEffect, useState } from "react";
import { getUsers } from "../userList/UserListApi";
import {
  Typography,
  Box,
  Avatar,
  Stack,
  CircularProgress,
  Alert,
  Paper,
  Divider,
} from "@mui/material";

const HomeUserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setError("Kullanıcılar alınamadı.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <CircularProgress sx={{ display: "block", m: "auto" }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Typography variant="h6" fontWeight={700} gutterBottom>
        👥 Users
      </Typography>

      <Box
        sx={{
          overflowY: "auto",
          flexGrow: 1,
          pr: 1,
        }}
      >
        {users.slice(0, 10).map((user) => (
          <Paper
            key={user.id}
            elevation={2}
            sx={{
              p: 1,
              mb: 1,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Avatar
              src={`https://i.pravatar.cc/150?u=${user.id}`}
              alt={user.userName}
              sx={{ width: 40, height: 40 }}
            />
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                @{user.userName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.firstName} {user.lastName}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography
        variant="caption"
        sx={{ color: "text.secondary", textAlign: "center", display: "block" }}
      >
        Toplam: {users.length} kullanıcı
      </Typography>
    </Box>
  );
};

export default HomeUserList;
