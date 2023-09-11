import { useEffect, useCallback, useState, useRef, SetStateAction, Dispatch } from "react";
import { MovieData } from "../interfaces/IMovies";
import useFetch from "../components/useFetch";
import { Link } from "react-router-dom";
import { tmdbHeaders } from "../interfaces/IMovies";

type Series = {
    id: number
    backdrop_path: string;
    first_air_date: string;
    overview: string;
    poster_path: string;
    original_language: string;
    release_date: string;
    name: string;
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

const Movies = ({ clicked, setClicked }: { clicked: string | number, setClicked: Dispatch<SetStateAction<string | number>> }) => {
    const [series, setSeries] = useState<Series[]>([]);
    const [page, setPage] = useState(1);
    const { data: seriesData, hasMore, loading } = useFetch<MovieData[], ParamsProps>(`https://api.themoviedb.org/3/discover/tv?&page=${page}`, [], params, tmdbHeaders, page);
    const observer = useRef<IntersectionObserver>();

    useEffect(() => {
        if (seriesData.length > 0) {
            setSeries(seriesData.map(group => group.results.filter(series => series.poster_path && series.backdrop_path)))
        }
    }, [seriesData])

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
            <h2>Series</h2>
            <div className="characters">
                {
                    series.length > 0 &&
                    series.map((seriesGroup, index) => 
                        seriesGroup.map((show) => {
                            if (series.length === index + 1) {
                                return (
                                    <div key={show.id} className="character-info" ref={lastMovieElementRef}>
                                        <p>{show.name}</p>
                                        <Link to={`/series/series-info/${clicked}`}>
                                            <img src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} alt={show.name} className="character-img"
                                                onClick={() => setClicked(show.id)}
                                        />
                                        </Link>
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div key={show.id} className="character-info">
                                        <p>{show.name}</p>
                                        <Link to={`/series/series-info/${clicked}`}>
                                            <img src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} alt={show.name} className="character-img" 
                                                onClick={() => setClicked(show.id)}
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