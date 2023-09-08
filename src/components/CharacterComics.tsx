import { SetStateAction, Dispatch } from "react";
import useFetch from "./useFetch";
import { Link } from "react-router-dom";
import { ComicsData, ComicParams } from "../interfaces/IComics";
import { publicKey, timestamp, hash } from "../pages/Characters";

const comicParams: ComicParams = {
  apikey: publicKey,
  ts: timestamp,
  hash: hash,
}

const CharacterComics = ({ clicked, setClicked }: { clicked: string | number, setClicked: Dispatch<SetStateAction<string | number>> }) => {
  const url = `http://gateway.marvel.com/v1/public/characters/${clicked}/comics?limit=100`;
  const { data: marvelApiData } = useFetch<ComicsData[], ComicParams>(url, [], comicParams, undefined);

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