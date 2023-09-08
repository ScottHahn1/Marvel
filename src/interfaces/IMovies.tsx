import { AxiosHeaders } from "axios";

export const tmdbHeaders = new AxiosHeaders({
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MDkwZDc0YjRkYmIyM2QxNDU2NWVlZThhMGU4ZWMxYyIsInN1YiI6IjYyNWUyYjcxMjI5YWUyMzIxNzBlNjBjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ANwWprg7zoDClPIwXYW8sjH3yQ_QLdos_AIHzCv-2n8",
});

export interface ITmdbParams {
    include_adult: boolean
    year: number
    language: string
    with_companies: string
    sort_by: string
    primary_release_year: number
}

export const tmdbParams: ITmdbParams = {
    include_adult: false,
    year: new Date().getFullYear(),
    language: 'en-US',
    with_companies: '420|19551|38679|2301|13252',
    sort_by: 'primary_release_date.asc',
    primary_release_year: 2023
}

export type MovieData = {
    results : {
        id: number;
        backdrop_path: string;
        first_air_date: string;
        overview: string;
        poster_path: string;
        original_language: string;
        release_date: string;
        title: string;
        name: string;
    }[]
};

export type Movie = {
    backdrop_path: string;
    first_air_date: string;
    overview: string;
    poster_path: string;
    original_language: string;
    release_date: string;
    title: string;
}