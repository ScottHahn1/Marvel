import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import "../styles/Characters.css";
import useFetch from "../components/useFetch";
import { CharacterData } from "../interfaces/ICharacters";
                                                                                                        
type CharacterDetails = {
  name: string
  id: number
  description: string
  thumbnail: {
    path: string
    extension: string
  }
}[]

const Characters = ({ clicked, setClicked }: { clicked: string | number, setClicked: Dispatch<SetStateAction<string | number>> }) => {
  const [characters, setCharacters] = useState<CharacterDetails[]>([]);
  const [queryOffset, setQueryOffset] = useState(0);

  interface IParams { offset: number }
  const params = { offset: queryOffset }

  const url = '/.netlify/functions/api/characters/'
  const { data: marvelApiData, loading } = useFetch<CharacterData[], IParams>(url, [], params, undefined, queryOffset);

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
                  <Link to={`/characters/character-info/${clicked}`}>
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