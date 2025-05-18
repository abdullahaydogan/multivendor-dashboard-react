import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Divider,
  Snackbar,
  Button,
} from "@mui/material";
import { getProducts } from "./ProductApiServices";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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
    setSnackbarMessage(`Ürün #${id} düzenleme ekranına yönlendiriliyor...`);
    setOpenSnackbar(true);
    // navigate(`/admin/products/edit/${id}`);
  };

  const handleDelete = (id) => {
    setSnackbarMessage(`Ürün #${id} silindi (örnek mesaj).`);
    setOpenSnackbar(true);
    // Gerçek silme işlemi yapılabilir
  };

  if (loading) return <CircularProgress sx={{ m: 4 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Ürün Yönetimi
      </Typography>

      <Grid container spacing={3}>
        {products.map((product) => (
         <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
         <Card
           sx={{
             height: 400,
             display: "flex",
             flexDirection: "column",
             justifyContent: "space-between",
             boxShadow: 3,
           }}
         >
           <Box
             sx={{
               height: 200,
               backgroundColor: "#f4f4f4",
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
               p: 1,
             }}
           >
             {product.photo ? (
               <img
                 src={`data:image/jpeg;base64,${product.photo}`}
                 alt={product.name}
                 style={{
                   maxHeight: "100%",
                   maxWidth: "100%",
                   objectFit: "contain",
                 }}
               />
             ) : (
               <Typography color="text.secondary">Görsel yok</Typography>
             )}
           </Box>
           <Divider />
           <CardContent sx={{ flexGrow: 1 }}>
             <Typography variant="h6" gutterBottom noWrap>
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
           <Box sx={{ p: 2, display: "flex", gap: 1 }}>
             <Button
               variant="contained"
               color="primary"
               size="small"
               onClick={() => handleEdit(product.id)}
             >
               Düzenle
             </Button>
             <Button
               variant="outlined"
               color="error"
               size="small"
               onClick={() => handleDelete(product.id)}
             >
               Sil
             </Button>
           </Box>
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
