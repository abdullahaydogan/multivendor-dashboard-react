import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "./UserListApi";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Avatar,
  TextField,
  Chip,
  Stack,
  CircularProgress,
  Alert,
  Button,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RoleChip = ({ role }) => {
  const colorMap = {
    Admin: "error",
    User: "primary",
    Saler: "success",
    default: "default",
  };

  return <Chip label={role || "N/A"} color={colorMap[role] || "default"} size="small" variant="outlined" />;
};

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [confirmDelete, setConfirmDelete] = useState({ open: false, userId: null });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setError("Error fetching users: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const openDialog = (title, message) => {
    setDialogTitle(title);
    setDialogMessage(message);
    setDialogOpen(true);
  };

  const handleUserClick = (user) => {
    openDialog("User Details", `👤 Name: ${user.firstName} ${user.lastName}\n👥 Username: ${user.userName}\n📧 Email: ${user.email}\n🔑 Role: ${user.role || "N/A"}`);
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(confirmDelete.userId);
      setUsers((prev) => prev.filter((user) => user.id !== confirmDelete.userId));
      openDialog("Success", "✅ User deleted successfully.");
    } catch (err) {
      openDialog("Error", "❌ Failed to delete user: " + err.message);
    } finally {
      setConfirmDelete({ open: false, userId: null });
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const filteredUsers = users.filter((user) =>
    `${user?.firstName ?? ""} ${user?.lastName ?? ""} ${user?.userName ?? ""}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (loading) return <CircularProgress sx={{ display: "block", m: "auto", mt: 10 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight={700} textAlign="center" gutterBottom>
        👥 User Directory
      </Typography>

      <Box sx={{ maxHeight: '75vh', overflowY: 'auto', p: 1, border: '1px solid #ddd', borderRadius: 2 }}>
        <TextField
          label="Search by name or username"
          variant="outlined"
          fullWidth
          sx={{ mb: 3 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Stack spacing={2}>
          {filteredUsers.length === 0 ? (
            <Typography textAlign="center" color="text.secondary">
              No users found.
            </Typography>
          ) : (
            filteredUsers.map((user) => (
              <Card
                key={user.id}
                variant="outlined"
                sx={{ position: "relative", cursor: "pointer", '&:hover': { boxShadow: 4, transform: "scale(1.02)" }, transition: "0.3s" }}
                onClick={() => handleUserClick(user)}
              >
                <IconButton
                  size="small"
                  sx={{ position: "absolute", top: 8, right: 8 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setConfirmDelete({ open: true, userId: user.id });
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>

                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                      alt={`${user.firstName} ${user.lastName}`}
                      src={`https://i.pravatar.cc/150?u=${user.id}`}
                      sx={{ width: 60, height: 60, border: "2px solid #1976d2" }}
                    />
                    <Stack spacing={0.5}>
                      <Typography variant="h6" fontWeight={600}>@{user.userName}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user.firstName} {user.lastName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user.email}
                      </Typography>
                      <RoleChip role={user.role} />
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ))
          )}
        </Stack>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Button
        variant="contained"
        size="large"
        startIcon={<InfoOutlinedIcon />}
        onClick={() => openDialog("Info", "🚀 Add new user functionality coming soon!")}
        sx={{ display: "block", mx: "auto", borderRadius: 3, textTransform: "none", px: 4, py: 1.5 }}
      >
        Add New User
      </Button>

      <Dialog
        open={dialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line", mt: 1 }}>
            {dialogMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confirmDelete.open}
        onClose={() => setConfirmDelete({ open: false, userId: null })}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this user? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete({ open: false, userId: null })}>Cancel</Button>
          <Button onClick={handleDeleteUser} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserList;
