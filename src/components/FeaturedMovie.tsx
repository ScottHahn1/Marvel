import {  Dispatch, SetStateAction, useEffect, useState } from "react";
import useFetch from "../components/useFetch";
import { Movie, MovieData } from "../interfaces/IMovies";

const date = new Date();
const today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString().slice(0, 10);

const FeaturedMovie = ({ setLoading }: { setLoading: Dispatch<SetStateAction<boolean>> }) => {
    const url = "/.netlify/functions/api/featured-movie";
    const [movie, setMovie] = useState<Movie>({} as Movie);
    const { data: movieData, loading: movieLoading } = useFetch<MovieData[], null>(url, [], null, undefined);
    const backgroundImgColor = "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))";
    
    useEffect(() => {
        if (movieData.length > 0) {
            setMovie(movieData[0].results.filter(movie => movie.release_date > today && movie.backdrop_path)[0]);
        }
    }, [movieData])

    useEffect(() => {
        movie && setLoading(false);
    }, [movie])

    return (
        movie && !movieLoading ?
        <div className="home featured-movie" style={{ background: `${backgroundImgColor}, url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})` }}>
            <div className="featured-movie-info">
                <h4>Coming Soon...</h4>
                <em><h3>{movie.title}</h3></em>
                <p>{movie.overview}</p>
                <h4>Release Date: {new Date(movie.release_date).toDateString()}</h4>
            </div>
            <img src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`} alt={movie.title} />
        </div>
        : null
    )
}

export default FeaturedMovie;