import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeader = () => {
  const token = localStorage.getItem("access");
  return { Authorization: `Bearer ${token}` };
};

export const getFavorites = async () => {
  const response = await axios.get(`${API_URL}/recipes/favorites/`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const addFavorite = async (recipe) => {
  const response = await axios.post(`${API_URL}/recipes/favorites/`, recipe, {
    headers: getAuthHeader(),
  });
  return response.data;
};