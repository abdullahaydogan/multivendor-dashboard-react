// src/services/UserApiServices.js
import axios from "axios";

const API_URL = "https://localhost:7079/api/User"; 

// Kullanıcıları getiren fonksiyon
export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL); // Kullanıcıları API'den çek
    return response.data; // Veriyi döndür
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

// Kullanıcıyı ID ile getiren fonksiyon
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

// Kullanıcı oluşturma fonksiyonu
export const createUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

// Kullanıcı güncelleme fonksiyonu
export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

// Kullanıcı silme fonksiyonu
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};
