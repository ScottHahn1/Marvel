import { useEffect, useState } from "react";
import useFetch from "../components/useFetch";

type SeriesData = {
  tv_results: {
    id: number
    backdrop_path: string;
    first_air_date: string;
    overview: string;
    poster_path: string;
    original_language: string;
    name: string
  }[]
}

type Series = {
  id: number
  backdrop_path: string;
  first_air_date: string;
  overview: string;
  poster_path: string;
  original_language: string;
  name: string
}

interface IParams { id: string | number };

const SeriesInfo = ({ clicked }: { clicked: string | number }) => {
  const [series, setSeries] = useState<Series>({} as Series);

  const params = { id: clicked };
  const { data: seriesData, loading } = useFetch<SeriesData[], IParams>(`/.netlify/functions/api/series/series-info/:id`, [], params, undefined);

  useEffect(() => {
    seriesData.length > 0 && setSeries(seriesData[0].tv_results[0]);
  }, [seriesData])

  return (
    <div className="character-info-container">
      {series && !loading && (
        <div className="character-details" style={{ background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(https://image.tmdb.org/t/p/original/${series.backdrop_path})` }}>
          <div>
            <h3>{series.name}</h3>
            <p>{series.overview}</p>
          </div>
          <img src={`https://image.tmdb.org/t/p/w342/${series.poster_path}`} alt={series.name}/>
        </div>
      )}
    </div>
  );
}

export default SeriesInfo;