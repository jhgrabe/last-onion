import axiosClient from "./axiosClient";

export const getFavorites = async () => {
  const response = await axiosClient.get("/recipes/favorites/");
  return response.data;
};

export const addFavorite = async (favorite) => {
  const response = await axiosClient.post("/recipes/favorites/", favorite);
  return response.data;
};

export const updateFavorite = async (id, favorite) => {
  const response = await axiosClient.patch(`/recipes/favorites/${id}/`, favorite);
  return response.data;
};

export const deleteFavorite = async (id) => {
  await axiosClient.delete(`/recipes/favorites/${id}/`);
};