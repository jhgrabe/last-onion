import { useState, useEffect } from "react";
import { getFavorites, updateFavorite, deleteFavorite } from "../api/favoritesApi";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const data = await getFavorites();
      setFavorites(data);
      setError(null);
    } catch (err) {
      setError("Failed to load favorites.");
    } finally {
      setLoading(false);
    }
  };

  const handleRatingChange = async (id, rating) => {
    try {
      await updateFavorite(id, { rating });
      loadFavorites();
    } catch (err) {
      setError("Failed to update rating.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFavorite(id);
      loadFavorites();
    } catch (err) {
      setError("Failed to delete favorite.");
    }
  };

  if (loading) return <p>Loading favorites...</p>;

  return (
    <div>
      <h1>My Favorite Recipes</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {favorites.length === 0 && <p>No favorites yet — save some recipes to see them here.</p>}

      <ul>
        {favorites.map((fav) => (
          <li key={fav.id}>
            <strong>{fav.title}</strong>
            {fav.image_url && <img src={fav.image_url} alt={fav.title} width="80" />}
            <select
              value={fav.rating || ""}
              onChange={(e) => handleRatingChange(fav.id, Number(e.target.value))}
            >
              <option value="">Rate...</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <button onClick={() => handleDelete(fav.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoritesPage;