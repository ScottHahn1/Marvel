import { useEffect, useCallback, useState, useRef, SetStateAction, Dispatch } from "react";
import { MovieData } from "../interfaces/IMovies";
import useFetch from "../components/useFetch";
import { Link } from "react-router-dom";
import { tmdbHeaders } from "../interfaces/IMovies";

type MoviesProps = {
    id: number
    backdrop_path: string;
    first_air_date: string;
    overview: string;
    poster_path: string;
    original_language: string;
    release_date: string;
    title: string;
}[]

interface ParamsProps {
    include_adult: boolean
    language: string
    with_companies: string
    sort_by: string
}

const params: ParamsProps = {
    include_adult: false,
    language: 'en-US',
    with_companies: '420|19551|38679|2301|13252',
    sort_by: 'popularity.desc'
}

const Movies = ({ setClickedMovie }: { setClickedMovie: Dispatch<SetStateAction<string | number>> }) => {
    const [movies, setMovies] = useState<MoviesProps[]>([]);
    const [page, setPage] = useState(1);
    const { data: movieData, hasMore, loading } = useFetch<MovieData[], ParamsProps>(`https://api.themoviedb.org/3/discover/movie?&page=${page}`, [], params, tmdbHeaders, page);
    const observer = useRef<IntersectionObserver>();

    useEffect(() => {
        if (movieData.length > 0) {
            setMovies(movieData.map(group => group.results.filter(movie => movie.poster_path && movie.backdrop_path)))
        }
    }, [movieData])

    const lastMovieElementRef = useCallback(
        (node: HTMLDivElement) => {
          if (loading) return;
          if (observer.current) observer.current.disconnect();
          observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
              setPage(prev => prev + 1);
            }
          });
          if (node) {
            observer.current.observe(node);
          }
        },
        [loading, hasMore]
    );
    
    return (
        <div className="characters-container">
            <h2>Movies</h2>
            <div className="characters">
                {
                    movies.length > 0 &&
                    movies.map((movieGroup, index) => 
                        movieGroup.map((movie) => {
                            if (movies.length === index + 1) {
                                return (
                                    <div key={movie.id} className="character-info" ref={lastMovieElementRef}>
                                        <p>{movie.title}</p>
                                        <Link to='/movie-info'>
                                            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="character-img"
                                                onClick={() => setClickedMovie(movie.id)}
                                            />
                                        </Link>
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div key={movie.id} className="character-info">
                                        <p>{movie.title}</p>
                                        <Link to="/movie-info">
                                            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="character-img" 
                                                onClick={() => setClickedMovie(movie.id)}
                                            />
                                        </Link>
                                    </div>
                                )
                            }
                        })
                    )
                }
            </div>
            { loading && <div className="loading"></div> }
        </div>
    )
}

export default Movies;