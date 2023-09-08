import { useState, useEffect, Dispatch, SetStateAction } from "react";
import "../styles/CharacterInfo.css";
import CharacterComics from "../components/CharacterComics";
import { CharacterParams, CharacterData } from "../interfaces/ICharacters";
import useFetch from "../components/useFetch";
import { timestamp, publicKey, hash } from "./Characters";

const characterParams: CharacterParams = {
  apikey: publicKey,
  ts: timestamp,
  hash: hash,
}

const CharacterInfo = ({ clicked, setClicked }: { clicked: string | number, setClicked: Dispatch<SetStateAction<string | number>> }) => {
  const [characters, setCharacters] = useState<CharacterData[]>([]);
  const url = `http://gateway.marvel.com/v1/public/characters/${clicked}`;
  const { data: marvelApiData } = useFetch<CharacterData[], CharacterParams>(url, [], characterParams, undefined);

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