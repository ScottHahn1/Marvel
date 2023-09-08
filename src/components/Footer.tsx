import '../styles/Footer.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebook, faTwitter, faYoutube, faGithub, } from '@fortawesome/free-brands-svg-icons';
import { faHome, faPeopleGroup, faBookOpen, faFilm, faTv } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer>
      <div className="footer-links">
        <ul className="footer-nav-links">
          <Link to="/">
            <li>Home &nbsp; <FontAwesomeIcon icon={faHome} /></li>
          </Link>

          <Link to="/characters">
            <li>Characters &nbsp; <FontAwesomeIcon icon={faPeopleGroup} /></li>
          </Link>

          <Link to="/comics">
            <li>Comics &nbsp; <FontAwesomeIcon icon={faBookOpen} /></li>
          </Link>

          <Link to="/movies">
            <li>Movies &nbsp; <FontAwesomeIcon icon={faFilm} /></li>
          </Link>

          <Link to="/series">
            <li>Series &nbsp; <FontAwesomeIcon icon={faTv} /></li>
          </Link>
        </ul>

        <ul className="social-media-links">
          <a href="https://www.instagram.com/marvel" target="_blank">
            <li>Instagram &nbsp; <FontAwesomeIcon icon={faInstagram} /></li>
          </a>
          <a href="https://twitter.com/marvel" target="_blank">
            <li>Twitter &nbsp; <FontAwesomeIcon icon={faTwitter} /></li>
          </a>
          <a href="https://www.facebook.com/Marvel" target="_blank" >
            <li>Facebook &nbsp; <FontAwesomeIcon icon={faFacebook} /></li>
          </a>
          <a href="https://www.youtube.com/marvel" target="_blank">
            <li>YouTube &nbsp; <FontAwesomeIcon icon={faYoutube} /></li>  
          </a>
        </ul>
      </div>

      <div className="made-by">
        <a href="https://github.com/ScottHahn1" target="_blank"> 
          Made by Scott Hahn <FontAwesomeIcon icon={faGithub}/> 
        </a>
      </div>
    </footer>
  )
}

export default Footer;