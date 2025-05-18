import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "./UserListApi";
import {
  Box,
  Typography,
  TextField,
  Avatar,
  Stack,
  Card,
  CardContent,
  IconButton,
  CircularProgress,
  Alert,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slide,
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
  };
  return (
    <Chip
      label={role || "N/A"}
      color={colorMap[role] || "default"}
      size="small"
      variant="filled"
      sx={{ fontSize: "0.75rem", fontWeight: 600 }}
    />
  );
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
        setError("An error occurred while fetching users.");
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
    openDialog(
      "User Details",
      `👤 ${user.firstName} ${user.lastName}\n📧 ${user.email}\n🔑 Role: ${user.role || "N/A"}`
    );
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(confirmDelete.userId);
      setUsers((prev) => prev.filter((u) => u.id !== confirmDelete.userId));
      openDialog("Success", "✅ User has been deleted.");
    } catch (err) {
      openDialog("Error", "❌ Failed to delete user.");
    } finally {
      setConfirmDelete({ open: false, userId: null });
    }
  };

  const filteredUsers = users.filter((u) =>
    `${u.firstName} ${u.lastName} ${u.userName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <CircularProgress sx={{ display: "block", mt: 10, mx: "auto" }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
        👥 User Directory
      </Typography>

      <TextField
        label="🔍 Search users..."
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 4, borderRadius: 2 }}
      />

      <Grid container spacing={3}>
        {filteredUsers.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card
              onClick={() => handleUserClick(user)}
              sx={{
                p: 2,
                borderRadius: 4,
                transition: "0.3s",
                boxShadow: 3,
                "&:hover": {
                  boxShadow: 6,
                  transform: "translateY(-4px)",
                },
                cursor: "pointer",
                position: "relative",
              }}
            >
              <IconButton
                sx={{ position: "absolute", top: 10, right: 10 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirmDelete({ open: true, userId: user.id });
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>

              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar
                  src={`https://i.pravatar.cc/150?u=${user.id}`}
                  sx={{ width: 60, height: 60 }}
                />
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    @{user.userName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                  <RoleChip role={user.role} />
                </Box>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button
        variant="contained"
        size="large"
        startIcon={<InfoOutlinedIcon />}
        sx={{ mt: 5, display: "block", mx: "auto", borderRadius: 3, px: 4, py: 1.5 }}
        onClick={() =>
          openDialog("Info", "🛠️ The add new user feature is coming soon!")
        }
      >
        ➕ Add New User
      </Button>

      {/* Info Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        TransitionComponent={Transition}
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <Typography sx={{ whiteSpace: "pre-line", mt: 1 }}>{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog
        open={confirmDelete.open}
        onClose={() => setConfirmDelete({ open: false, userId: null })}
      >
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete({ open: false, userId: null })}>
            Cancel
          </Button>
          <Button onClick={handleDeleteUser} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserList;
