import { useState, useEffect, Dispatch, SetStateAction } from "react";
import useFetch from "../components/useFetch";
import CharacterComics from "../components/CharacterComics";
import { ComicsData } from "../interfaces/IComics";

interface IParams { comicId: string | number };

const ComicInfo = ({ clicked, setClicked }: { clicked: string | number, setClicked: Dispatch<SetStateAction<string | number>> }) => {
  const [comicData, setComicData] = useState<ComicsData[]>([]);

  const params = { comicId: clicked };
  const url = `/.netlify/functions/api/comics/comic-info/${clicked}`
  const { data: marvelApiData } = useFetch<ComicsData[], IParams>(url, [], params, undefined);
  
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