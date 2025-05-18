import axios from "axios";

const API_BASE_URL = "https://localhost:7079/api/Product";

export function shareProduct(body) {
    return axios.post('https://localhost:7079/api/Product/add', body);
}
export const getProducts = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    throw new Error(error.message);
  }
};
export function updateProduct(id, formData) {
  return axios.put(`https://localhost:7079/api/Product/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}