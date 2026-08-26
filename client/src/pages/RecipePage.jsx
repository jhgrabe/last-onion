import { useState } from "react";
import { searchMealsByIngredient } from "../api/mealdbApi";
import { addFavorite } from "../api/favoritesApi";
import { getRecipeSuggestion } from "../api/suggestionApi";

function RecipesPage() {
  const [ingredient, setIngredient] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [savedIds, setSavedIds] = useState([]);
  const [suggestion, setSuggestion] = useState(null);
  const [suggestionLoading, setSuggestionLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const results = await searchMealsByIngredient(ingredient);
      setMeals(results);
    } catch (err) {
      setError("Failed to search recipes. Try a different ingredient.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (meal) => {
    try {
      await addFavorite({
        mealdb_id: meal.idMeal,
        title: meal.strMeal,
        image_url: meal.strMealThumb,
      });
      setSavedIds((prev) => [...prev, meal.idMeal]);
    } catch (err) {
      setError("Failed to save recipe.");
    }
  };

  const handleGetSuggestion = async () => {
    try {
      setSuggestionLoading(true);
      setError(null);
      const data = await getRecipeSuggestion();
      setSuggestion(data.suggestion);
    } catch (err) {
      const message = err.response?.data?.error || "Failed to get a suggestion. Try again.";
      setError(message);
    } finally {
      setSuggestionLoading(false);
    }
  };

  return (
    <div>
      <h1>Find Recipes</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSearch}>
        <input
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          placeholder="e.g. chicken, onion, garlic"
          required
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Searching...</p>}

      {!loading && meals.length === 0 && <p>No results yet — try searching an ingredient.</p>}

      <div>
        <button onClick={handleGetSuggestion} disabled={suggestionLoading}>
          {suggestionLoading ? "Thinking..." : "Get AI Suggestion from My Pantry"}
        </button>
        {suggestion && <p><strong>Suggestion:</strong> {suggestion}</p>}
      </div>

      <ul>
        {meals.map((meal) => (
          <li key={meal.idMeal}>
            <img src={meal.strMealThumb} alt={meal.strMeal} width="80" />
            <span>{meal.strMeal}</span>
            {savedIds.includes(meal.idMeal) ? (
              <span> Saved</span>
            ) : (
              <button onClick={() => handleSave(meal)}>Save to Favorites</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipesPage;