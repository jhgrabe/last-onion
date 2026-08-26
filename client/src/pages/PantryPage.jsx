import { useState, useEffect } from "react";
import { getPantryItems, addPantryItem, deletePantryItem } from "../api/pantryApi";

function PantryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await getPantryItems();
      setItems(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load pantry items.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addPantryItem({ name, quantity, unit });
      setName("");
      setQuantity("");
      setUnit("");
      loadItems();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add item.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePantryItem(id);
      loadItems();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete item.");
    }
  };

  if (loading) return <p>Loading pantry...</p>;

  return (
    <div>
      <h1>My Pantry</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleAdd}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <input value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" required />
        <input value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="Unit" required />
        <button type="submit">Add Item</button>
      </form>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} — {item.quantity} {item.unit}
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PantryPage;