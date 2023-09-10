import { useState, useEffect, Dispatch, SetStateAction } from "react";
import "../styles/CharacterInfo.css";
import CharacterComics from "../components/CharacterComics";
import { CharacterData } from "../interfaces/ICharacters";
import useFetch from "../components/useFetch";

interface IParams { characterId: string | number };

const CharacterInfo = ({ clicked, setClicked }: { clicked: string | number, setClicked: Dispatch<SetStateAction<string | number>> }) => {
  const [characters, setCharacters] = useState<CharacterData[]>([]);

  const params = { characterId: clicked };
  const url = `/.netlify/functions/api/characters/character-info/${clicked}`
  const { data: marvelApiData } = useFetch<CharacterData[], IParams>(url, [], params, undefined);

  useEffect(() => {
    marvelApiData.length > 0 && setCharacters(marvelApiData);
  }, [marvelApiData]);

  return (
    <div className="character-info-container">
      {characters.length > 0 && (
        <>
          <div className="character-details" style={{ background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${characters[0].data.results[0].thumbnail.path}.${characters[0].data.results[0].thumbnail.extension})` }}>
            <div>
              <h3>{characters[0].data.results[0].name}</h3>
              <p>{characters[0].data.results[0].description}</p>
            </div>
            <img
              src={`${characters[0].data.results[0].thumbnail.path}.${characters[0].data.results[0].thumbnail.extension}`}
              alt={characters[0].data.results[0].name}
            />
          </div>
          <h2 className="montserrat">Comics</h2>
        </>
      )}
      <CharacterComics clicked={clicked} setClicked={setClicked} />
    </div>
  );
};

export default CharacterInfo;