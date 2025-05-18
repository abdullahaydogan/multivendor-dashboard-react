import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Paper,
  Stack,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../ProductApiServices";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
        if (data.photo) {
          setPreviewUrl(`data:image/jpeg;base64,${data.photo}`);
        }
      } catch (err) {
        setError("Ürün verisi alınamadı.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    formData.append("Name", product.name); // backend uppercase bekliyor
    formData.append("Category", product.category);
    formData.append("Stock", product.stock);
    formData.append("Price", product.price);
    if (photoFile) {
      formData.append("Photo", photoFile); // Photo binary olarak
    }

    try {
      await updateProduct(id, formData); // FormData gönderiyoruz
      setSuccess(true);
      setTimeout(() => navigate("/productList"), 1500);
    } catch (err) {
      setError("Güncelleme sırasında hata oluştu.");
    }
  };

  if (loading) return <CircularProgress sx={{ mt: 5, mx: "auto", display: "block" }} />;
  if (!product) return <Typography align="center">Ürün bulunamadı.</Typography>;

  return (
    <Container maxWidth="sm" sx={{ mt: 5, mb: 10 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={600} textAlign="center" gutterBottom>
          🛠️ Ürünü Güncelle
        </Typography>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Stack spacing={2}>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">✅ Ürün başarıyla güncellendi</Alert>}

            <TextField
              label="Ürün Adı"
              name="name"
              fullWidth
              value={product.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Kategori"
              name="category"
              fullWidth
              value={product.category}
              onChange={handleChange}
              required
            />
            <TextField
              label="Stok"
              name="stock"
              type="number"
              fullWidth
              value={product.stock}
              onChange={handleChange}
              required
            />
            <TextField
              label="Fiyat"
              name="price"
              type="number"
              fullWidth
              value={product.price}
              onChange={handleChange}
              required
            />

            {previewUrl && (
              <Box
                component="img"
                src={previewUrl}
                alt="Görsel"
                sx={{ width: "100%", borderRadius: 2 }}
              />
            )}

            <Button variant="outlined" component="label">
              Yeni Fotoğraf Seç
              <input type="file" hidden accept="image/*" onChange={handlePhotoChange} />
            </Button>

            <Button type="submit" variant="contained" fullWidth size="large">
              Güncelle
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default EditProduct;
