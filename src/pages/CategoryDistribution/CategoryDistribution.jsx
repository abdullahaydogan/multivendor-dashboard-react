// src/components/CategoryDistribution.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Grid,
  Chip,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { getCategoryDistribution } from "./CategoryDistributionApiService";

const COLORS = ["#6a1b9a", "#0288d1", "#43a047", "#fb8c00", "#d81b60", "#8d6e63"];

const CategoryDistribution = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const result = await getCategoryDistribution();
        setData(result);
      } catch (err) {
        console.error(err);
        setError("Kategori verisi alınamadı.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, []);

  if (loading) return <CircularProgress sx={{ m: 4 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
        📊 Ürün Dağılım Paneli
      </Typography>

      <Grid container spacing={4}>
        {/* Pie Chart */}
        <Grid xs={12} md={6}>
          <Card elevation={6} sx={{ borderRadius: 4, background: "linear-gradient(135deg, #f3e5f5, #e1f5fe)" }}>
            <CardContent>
              <Typography variant="h6" fontWeight="600" gutterBottom>
                Grafiksel Dağılım
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="productCount"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    label
                  >
                    {data.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
                    formatter={(value, name) => [value, name]}
                  />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    iconType="circle"
                    formatter={(value) => (
                      <span style={{ fontSize: 14, color: "#333" }}>{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Table */}
        <Grid xs={12} md={6}>
          <Card elevation={6} sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="600" gutterBottom>
                Tablosal Dağılım
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Kategori</TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      Ürün Sayısı
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item, index) => (
                    <TableRow key={index} hover>
                      <TableCell>
                        <Chip
                          label={item.category}
                          sx={{
                            backgroundColor: COLORS[index % COLORS.length],
                            color: "#fff",
                            fontWeight: 500,
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">{item.productCount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoryDistribution;
