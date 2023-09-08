import { useState, useEffect, Dispatch, SetStateAction } from "react";
import useFetch from "../components/useFetch";
import CharacterComics from "../components/CharacterComics";
import { ComicParams, ComicsData } from "../interfaces/IComics";
import { hash, publicKey, timestamp } from "./Characters";

const ComicInfo = ({ clicked, setClicked }: { clicked: string | number, setClicked: Dispatch<SetStateAction<string | number>> }) => {
  const url = `http://gateway.marvel.com/v1/public/comics/${clicked}?limit=100`;
  const [comicData, setComicData] = useState<ComicsData[]>([]);
  const comicParams: ComicParams = {
    apikey: publicKey,
    ts: timestamp,
    hash: hash,
  }
  const { data: marvelApiData } = useFetch<ComicsData[], ComicParams>(url, [], comicParams, undefined);
  
  useEffect(() => {
    marvelApiData.length > 0 && setComicData(marvelApiData);
  }, [marvelApiData]);

  return (
    <div className="character-info-container">
      {comicData.length > 0 && (
        <div className="character-details" style={{ background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${comicData[0].data.results[0].thumbnail.path}.${comicData[0].data.results[0].thumbnail.extension})` }}>
          <div>
            <h3>{comicData[0].data.results[0].title}</h3>
            <p>{comicData[0].data.results[0].description}</p>
          </div>
          <img
            src={`${comicData[0].data.results[0].thumbnail.path}.${comicData[0].data.results[0].thumbnail.extension}`}
            alt={comicData[0].data.results[0].title}
          />
        </div>
      )}
      <CharacterComics clicked={clicked} setClicked={setClicked} />
    </div>
  );
};

export default ComicInfo;