import { HashRouter as Router, Routes, Route } from "react-router-dom";
import './styles/App.css';
import { useState, useRef, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import CharacterInfo from "./pages/CharacterInfo";
import Footer from "./components/Footer";
import Comics from "./pages/Comics";
import ComicInfo from "./pages/ComicInfo";
import Movies from "./pages/Movies";
import MovieInfo from "./pages/MovieInfo";
import Series from "./pages/Series";
import SeriesInfo from "./pages/SeriesInfo";
import MobileMenu from "./components/MobileMenu";

export type ClickedProps = {
    id: number
    name: string
    backdrop_path: string;
    overview: string;
    poster_path: string;
}

function App() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [clicked, setClicked] = useState(localStorage.getItem("clicked") as string | number);
// localStorage.removeItem('clicked')
  useEffect(() => {
    localStorage.setItem("clicked", JSON.stringify(clicked));
  }, [clicked]);

  const headerRef = useRef<HTMLElement | null>(null);

  let prevScrollpos = window.scrollY;
  window.onscroll = function() {
    const currentScrollPos = window.scrollY;
    if (prevScrollpos > currentScrollPos && headerRef.current) {
      headerRef.current.style.top = '0';
    } 
    else if (headerRef.current){
      headerRef.current.style.top = '-4rem';
    }
    prevScrollpos = currentScrollPos;
  }

  return (
    <Router>
        <header ref={headerRef}>
          <div className='heading'>
            <h1>Marvel World</h1>

            <div className="mobile-menu" onClick={() => setShowMobileMenu(!showMobileMenu)}>
              <div className="mobile-menu-item"></div>
              <div className="mobile-menu-item"></div>
              <div className="mobile-menu-item"></div>
            </div>

          </div>
          { showMobileMenu && <MobileMenu /> }
          <Navbar />
        </header>
        <Routes>
          <Route path="/" element={ <Home setClicked={setClicked} /> } />
          <Route path="/characters" element={ <Characters clicked={clicked} setClicked={setClicked} /> } /> 
          <Route path="/characters/character-info/:id" element={ <CharacterInfo clicked={clicked} setClicked={setClicked} /> } /> 
          <Route path="/comics" element={ <Comics clicked={clicked} setClicked={setClicked} /> } />
          <Route path="comics/comic-info/:id" element={ <ComicInfo clicked={clicked} setClicked={setClicked} /> } />
          <Route path="/movies" element={ <Movies clicked={clicked} setClicked={setClicked} /> } />
          <Route path="/movies/movie-info/:id" element={ <MovieInfo clicked={clicked} /> } />
          <Route path="/series" element={ <Series setClicked={setClicked} /> } />
          <Route path="/series/series-info/:id" element={ <SeriesInfo clicked={clicked} /> } />
        </Routes>
        <Footer /> 
    </Router>
  );
}

export default App;