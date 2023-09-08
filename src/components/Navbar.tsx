import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-menu">
        <li className="nav-item">
          <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/characters">Characters</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/comics">Comics</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/movies">Movies</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/series">Series</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
