import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import "../styles/Characters.css";
import useFetch from "../components/useFetch";
import { CharacterData } from "../interfaces/ICharacters";
import axios from "axios";

const getHash = (ts: string, privateKey: string | undefined, publicKey: string | undefined) => {
  let md5 = require("md5");
  return md5(ts + privateKey + publicKey).toString();
};

export const timestamp = Date.now().toString();
export const publicKey = process.env.REACT_APP_PUBLIC_API_KEY;
export const privateKey = process.env.REACT_APP_PRIVATE_API_KEY;
export const hash = getHash(timestamp, privateKey, publicKey);
                                                                                                        
type CharacterDetails = {
  name: string
  id: number
  description: string
  thumbnail: {
    path: string
    extension: string
  }
}[]

const Characters = ({ setClicked }: { setClicked: Dispatch<SetStateAction<string | number>> }) => {
  const [characters, setCharacters] = useState<CharacterDetails[]>([]);
  const [queryOffset, setQueryOffset] = useState(0);
  // const characterParams: CharacterParams = {
  //   apikey: publicKey,
  //   ts: timestamp,
  //   hash: hash,
  //   offset: queryOffset,
  // }

  interface IParams { offset: number }
  const params = { offset: queryOffset }

  const url = './netlify/functions/characters'
  // const { data: marvelApiData, loading } = useFetch<CharacterData[], CharacterParams>(url, [], characterParams, undefined, queryOffset);
  const { data: marvelApiData, loading } = useFetch<CharacterData[], IParams>(url, [], params, undefined, queryOffset);

  // const [data, setData] = useState<CharacterData[]>([]);
  // const [hasMore, setHasMore] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState('');

  // useEffect(() => {
  //     if (url) {
  //         setLoading(true);
  //         setError('');
  //         axios.get(url, {
  //           params: {
  //             offset: queryOffset
  //           }
  //         })
  //         .then(res => {
  //           setCharacters((prev: any) => (prev ? [...prev, res.data] : res.data));
  //           setHasMore(res.data ? true : false);
  //           setLoading(false);
  //         })
  //         .catch((err) => setError(err));
  //     }
  // }, [url, queryOffset])

  useEffect(() => {
    if (marvelApiData.length > 0) {
      setCharacters(marvelApiData.map(group => group.data.results.filter(character => character.description !== '')));
    }
  }, [marvelApiData]); 

  return (
    <div className="characters-container">
      <h2>Characters</h2> 
      <div className="characters">
        {characters.length > 0 &&
          characters.map((characterGroup) =>
            characterGroup
              .map(character => 
                <div key={character.id} className="character-info">
                  <p>{character.name}</p>
                  <Link to="/character-info">
                    <img
                      style={{ cursor: "pointer" }}
                      src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                      alt={character.name}
                      onClick={() => setClicked(character.id)}
                    />
                  </Link>
                </div>
            )
          )
        }
      </div>
      {
        characters.length > 0 &&
        <button className="show-more" onClick={() => setQueryOffset(prev => prev + 100)}>Show More</button>
      }
      { loading && <div className="loading"></div> }
    </div>
  );
};

export default Characters;