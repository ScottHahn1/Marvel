import { SetStateAction, Dispatch } from "react";
import useFetch from "./useFetch";
import { Link } from "react-router-dom";
import { ComicsData } from "../interfaces/IComics";

interface IParams { characterId: string | number };

const CharacterComics = ({ clicked, setClicked }: { clicked: string | number, setClicked: Dispatch<SetStateAction<string | number>> }) => {
  const params = { characterId: clicked };
  const url = `/.netlify/functions/api/characters/character-info/${clicked}/comics`;
  const { data: marvelApiData } = useFetch<ComicsData[], IParams>(url, [], params, undefined);

  return (
    <div className='character-comics-container'>
      <div className='character-comics'>
        {
          marvelApiData.length > 0 && marvelApiData[0].data.results.map(comic => (
            <div key={comic.id} className="character-comic montserrat-reg">
              <p>{ comic.title }</p>
              <Link to="/comic-info">
                <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title}
                  onClick={() => setClicked(comic.id)}
                />
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default CharacterComics;