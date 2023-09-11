import { useEffect, useState } from "react";
import useFetch from "../components/useFetch";

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

interface IParams { id: string | number };

const MovieInfo = ({ clicked }: { clicked: string | number }) => {
  const [movie, setMovie] = useState<Movie>({} as Movie);

  const params = { id: clicked };
  const { data: movieData, loading } = useFetch<MovieData[], IParams>(`/.netlify/functions/api/movies/movie-info/:id`, [], params, undefined);
  
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