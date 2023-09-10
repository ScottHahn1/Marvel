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

export { router };