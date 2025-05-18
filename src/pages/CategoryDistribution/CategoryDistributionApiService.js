import axios from "axios";

export const getCategoryDistribution = async () => {
  const response = await axios.get("https://localhost:7079/api/Product/category-distribution");
  return response.data;
};
