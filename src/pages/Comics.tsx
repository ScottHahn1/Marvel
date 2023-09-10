import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import useFetch from "../components/useFetch";
import "../styles/Comics.css";
import { ComicsData, ComicDetails } from "../interfaces/IComics";

interface IParams { 
  offset: number, 
  orderBy: string 
}

const Comics = ({ clicked, setClicked }: { clicked: string | number, setClicked: Dispatch<SetStateAction<string | number>> }) => {
  const [comics, setComics] = useState<ComicDetails[]>([]);
  const [queryOffset, setQueryOffset] = useState(0);

  const params = {
    offset: queryOffset,
    orderBy: 'title'
  }

  const url = '/.netlify/functions/api/comics';
  const { data: marvelApiData, loading } = useFetch<ComicsData[], IParams>(url, [], params, undefined, queryOffset);

  useEffect(() => {
    if (marvelApiData.length > 0) {
      setComics(marvelApiData.map(group => group.data.results.filter(comic => comic.description)))
    }
  }, [marvelApiData]);

  return (
    <div className="characters-container">
      <h2>Comics</h2>
      <div className="characters">
        {comics.length > 0 &&
          comics.map(comicGroup =>
            comicGroup.map(comic => 
              <div key={comic.id} className="character-info">
                <p>{comic.title}</p>
                <Link to={`/comics/comic-info/${clicked}`}>
                  <img
                    style={{ cursor: "pointer" }}
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.title}
                    onClick={() => setClicked(comic.id)}
                  />
                </Link>
              </div>
          ))
        }
      </div>
      {
        comics.length > 0 &&
        <button className="show-more" onClick={() => setQueryOffset(prev => prev + 100)}>Show More</button>
      }
      { loading && <div className="loading"></div> }
    </div>
  );
}

export default Comics;