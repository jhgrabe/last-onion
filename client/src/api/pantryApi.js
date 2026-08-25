import axiosClient from "./axiosClient";

export const getPantryItems = async () => {
  const response = await axiosClient.get("/pantry/items/");
  return response.data;
};

export const addPantryItem = async (item) => {
  const response = await axiosClient.post("/pantry/items/", item);
  return response.data;
};

export const updatePantryItem = async (id, item) => {
  const response = await axiosClient.patch(`/pantry/items/${id}/`, item);
  return response.data;
};

export const deletePantryItem = async (id) => {
  await axiosClient.delete(`/pantry/items/${id}/`);
};
