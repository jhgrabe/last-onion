import axios from "axios";

const MEALDB_URL = "https://www.themealdb.com/api/json/v1/1";

export const searchMealsByIngredient = async (ingredient) => {
  const response = await axios.get(`${MEALDB_URL}/filter.php?i=${ingredient}`);
  return response.data.meals || [];
};

export const getMealDetails = async (mealId) => {
  const response = await axios.get(`${MEALDB_URL}/lookup.php?i=${mealId}`);
  return response.data.meals ? response.data.meals[0] : null;
};