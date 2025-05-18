import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Snackbar,
  Stack,
  CardMedia,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../ProductApiServices";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message || "Veriler alınırken hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/products/edit/${id}`);
  };

  const handleDelete = (id) => {
    setSnackbarMessage(`Ürün #${id} silindi (örnek mesaj).`);
    setOpenSnackbar(true);
  };

  if (loading) return <CircularProgress sx={{ m: 4 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
        🛒 Ürün Listesi
      </Typography>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card
              onClick={() => navigate(`/products/${product.id}`)} // TIKLANINCA DETAY
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
                transition: "0.3s",
                cursor: "pointer",
                '&:hover': { boxShadow: 6, transform: "translateY(-4px)" },
              }}
            >
              {product.photo ? (
                <CardMedia
                  component="img"
                  height="180"
                  image={`data:image/jpeg;base64,${product.photo}`}
                  alt={product.name}
                  sx={{ objectFit: "cover", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                />
              ) : (
                <Box
                  height={180}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ backgroundColor: "#f5f5f5", color: "text.secondary" }}
                >
                  Görsel Yok
                </Box>
              )}

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom noWrap>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Kategori: <strong>{product.category}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Stok: <strong>{product.stock}</strong>
                </Typography>
                <Typography variant="body2" color="success.main">
                  Fiyat: <strong>₺{product.price.toFixed(2)}</strong>
                </Typography>
              </CardContent>

              <Stack direction="row" spacing={1} p={2} justifyContent="flex-end">
                <IconButton
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation(); // kart tıklamasını engelle
                    handleEdit(product.id);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation(); // kart tıklamasını engelle
                    handleDelete(product.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default ProductList;
