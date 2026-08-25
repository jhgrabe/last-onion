/*
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeader = () => {
  const token = localStorage.getItem("access");
  return { Authorization: `Bearer ${token}` };
};

export const getSuggestions = async (pantryItems) => {
  const response = await axios.post(`${API_URL}/recipes/suggest/`, { pantryItems }, {
    headers: getAuthHeader(),
  });
  return response.data;
};
*/