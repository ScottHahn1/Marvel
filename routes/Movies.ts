import axios from 'axios';
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    const page = req.query.page
  
    axios.get(`https://api.themoviedb.org/3/discover/movie?&page=${page}`, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MDkwZDc0YjRkYmIyM2QxNDU2NWVlZThhMGU4ZWMxYyIsInN1YiI6IjYyNWUyYjcxMjI5YWUyMzIxNzBlNjBjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ANwWprg7zoDClPIwXYW8sjH3yQ_QLdos_AIHzCv-2n8",
        },
        params: {
            include_adult: false,
            language: 'en-US',
            with_companies: '420|19551|38679|2301|13252',
            sort_by: 'popularity.desc'
        }
    })
    .then(response => {
      res.json(response.data);
    })
    .catch(err => console.error(err));
});

router.get('/featured-movie', (req, res) => {
    axios.get(`https://api.themoviedb.org/3/discover/movie?&page=1&api_key=${process.env.TMDB_API_KEY}`, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        params: {
            include_adult: false,
            year: 2025,
            language: 'en-US',
            with_companies: '420|19551|38679|2301|13252',
            sort_by: 'primary_release_date.asc'
        }
    })
    .then(response => {
        res.json(response.data);
    })
    .catch(err => console.error(err));
});

router.get('/movie-info/:id', (req, res) => {
    const id = req.query.id;

    axios.get(`https://api.themoviedb.org/3/movie/${id}/external_ids`, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MDkwZDc0YjRkYmIyM2QxNDU2NWVlZThhMGU4ZWMxYyIsInN1YiI6IjYyNWUyYjcxMjI5YWUyMzIxNzBlNjBjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ANwWprg7zoDClPIwXYW8sjH3yQ_QLdos_AIHzCv-2n8",
        },
        params: {
            movie_id: id
        }
    })
    .then(response => {
        const imdb_id = response.data.imdb_id

        axios.get(`https://api.themoviedb.org/3/find/${imdb_id}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MDkwZDc0YjRkYmIyM2QxNDU2NWVlZThhMGU4ZWMxYyIsInN1YiI6IjYyNWUyYjcxMjI5YWUyMzIxNzBlNjBjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ANwWprg7zoDClPIwXYW8sjH3yQ_QLdos_AIHzCv-2n8",
            },
            params: {
                language: 'en-US',
                external_source: 'imdb_id'
            }
        })
        .then(response => res.json(response.data))
    })
    .catch(err => console.error(err));
});

export { router };