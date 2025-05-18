import React, { useState } from "react";
import { shareProduct } from "../ProductApiServices";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const ProductCreate = () => {
  const [productName, setProductName] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPhotoName(file?.name || "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError("");

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("stock", stock);
    formData.append("price", price);
    formData.append("category", category);
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      const response = await shareProduct(formData);
      if (response.status === 200) {
        setSuccess(true);
        setProductName("");
        setStock(0);
        setPrice(0);
        setCategory("");
        setPhoto(null);
        setPhotoName("");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.title || "Bir hata oluştu.";
      setError(errorMessage);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, mb: 10 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography
          variant="h5"
          align="center"
          sx={{ mb: 3, fontWeight: "bold", color: "primary.main" }}
        >
          ➕ Yeni Ürün Oluştur
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">✅ Ürün başarıyla eklendi!</Alert>}

            <TextField
              label="Ürün Adı"
              fullWidth
              required
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <TextField
              label="Kategori"
              fullWidth
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <TextField
              label="Stok"
              type="number"
              fullWidth
              required
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            <TextField
              label="Fiyat"
              type="number"
              fullWidth
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <Button
              variant="outlined"
              component="label"
              fullWidth
              startIcon={<UploadFileIcon />}
            >
              {photoName || "Dosya Seç"}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </Button>

            <Button type="submit" variant="contained" fullWidth size="large">
              Kaydet
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProductCreate;
