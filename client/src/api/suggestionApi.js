import axiosClient from "./axiosClient";

export const getRecipeSuggestion = async () => {
  const response = await axiosClient.post("/recipes/suggest/");
  return response.data;
};