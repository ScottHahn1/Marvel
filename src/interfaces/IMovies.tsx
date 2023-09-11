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