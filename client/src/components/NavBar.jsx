import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavBar() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <nav>
      <Link to="/pantry">Pantry</Link>{" | "}
      <Link to="/recipes">Recipes</Link>{" | "}
      <Link to="/favorites">Favorites</Link>{" | "}
      <button onClick={logout}>Logout</button>
    </nav>
  );
}

export default NavBar;