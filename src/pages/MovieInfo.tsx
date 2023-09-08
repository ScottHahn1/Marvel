import { useEffect, useState } from "react";
import { tmdbHeaders } from "../interfaces/IMovies";
import useFetch from "../components/useFetch";

interface ParamsProps {
  external_source: string
  language: string
}

const params: ParamsProps = {
  external_source: 'imdb_id',
  language: 'en-US',
}

type MovieData = {
  movie_results: {
    id: number
    backdrop_path: string;
    first_air_date: string;
    overview: string;
    poster_path: string;
    original_language: string;
    release_date: string;
    title: string;
  }[]
}

type Movie = {
  id: number
  backdrop_path: string;
  first_air_date: string;
  overview: string;
  poster_path: string;
  original_language: string;
  release_date: string;
  title: string;
}

type ExternalId = {
  imdb_id: string
}

const MovieInfo = ({ clicked }: { clicked: string | number }) => {
  const [movie, setMovie] = useState<Movie>({} as Movie);
  const [url, setUrl] = useState('');
  const { data: externalId } = useFetch<ExternalId[], null>(`https://api.themoviedb.org/3/movie/${clicked}/external_ids`, [], null, tmdbHeaders);
  const { data: movieData, loading } = useFetch<MovieData[], ParamsProps>(url, [], params, tmdbHeaders);

  useEffect(() => {
    if (externalId.length > 0) {
      setUrl(`https://api.themoviedb.org/3/find/${externalId[0].imdb_id}`);
    }
  }, [externalId])

  useEffect(() => {
    movieData.length > 0 && setMovie(movieData[0].movie_results[0]);
  }, [movieData])

  return (
    <div className="character-info-container">
      {movie && !loading && (
        <div className="character-details" style={{ background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})` }}>
          <div>
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
          </div>
          <img src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`} alt={movie.title}/>
        </div>
      )}
    </div>
  );
}

export default MovieInfo;