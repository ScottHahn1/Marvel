import { Link } from "react-router-dom";

const MobileMenu = () => {
  return (
    <div className="mobile-links">
        <Link to="/">
            Home
        </Link>
        <Link to="/characters">
            Characters
        </Link>
        <Link to="/comics">
            Comics
        </Link>
        <Link to="/movies">
            Movies
        </Link>
        <Link to="/series">
            Series
        </Link>
    </div>
  )
}

export default MobileMenu;