import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, deleteProduct } from "../ProductApiServices";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";

// Styled Components
const StyledContainer = styled(Container)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  minHeight: "100vh",
  backgroundColor: "#fafafa",
});

const StyledCard = styled(Card)({
  maxWidth: "600px",
  boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.1)",
  borderRadius: "16px",
  backgroundColor: "#ffffff",
  overflow: "hidden",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const StyledCardMedia = styled(CardMedia)({
  width: "100%",
  height: "350px",
  objectFit: "cover",
  borderBottom: "4px solid #f1f1f1",
});

const ProductTitle = styled(Typography)({
  fontSize: "2rem",
  fontWeight: 600,
  color: "#333",
  marginBottom: "16px",
});

const ProductDescription = styled(Typography)({
  fontSize: "1rem",
  color: "#666",
  lineHeight: "1.6",
  marginBottom: "16px",
});

const ProductInfo = styled(Typography)({
  fontSize: "1.1rem",
  color: "#444",
  fontWeight: "500",
  marginBottom: "8px",
});

const ActionButtons = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "24px",
  padding: "0 16px 16px 16px",
});

const ButtonStyled = styled(Button)({
  fontSize: "1rem",
  fontWeight: "500",
  textTransform: "none",
  padding: "10px 20px",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "#1565c0",
    color: "#fff",
  },
});

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete the product?")) {
      try {
        await deleteProduct(id);
        alert("Product deleted successfully");
        navigate("/products");
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <CircularProgress sx={{ display: "block", margin: "auto" }} />;
  if (error) return <Alert severity="error">Error: {error}</Alert>;
  if (!product) return <p className="not-found">Product not found.</p>;

  return (
    <StyledContainer>
      <StyledCard>
        {product.photo && (
          <StyledCardMedia
            component="img"
            image={`data:image/jpeg;base64,${product.photo}`}
            alt={product.name}
          />
        )}
        <CardContent>
          <ProductTitle>{product.name}</ProductTitle>
          <ProductDescription>{product.description || "No description available."}</ProductDescription>
          <ProductInfo><strong>Stock:</strong> {product.stock}</ProductInfo>
          <ProductInfo><strong>Price:</strong> ${product.price.toFixed(2)}</ProductInfo>
          <ProductInfo><strong>Category:</strong> {product.category}</ProductInfo>
        </CardContent>
        <ActionButtons>
         
          <ButtonStyled variant="outlined" color="secondary" onClick={handleDelete}>
            Delete
          </ButtonStyled>
        </ActionButtons>
      </StyledCard>
    </StyledContainer>
  );
};

export default ProductDetail;
