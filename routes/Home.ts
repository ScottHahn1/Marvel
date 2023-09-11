import axios from 'axios';
import { hash, publicKey, timestamp, newsKey } from '../functions/api';
import { Router } from 'express';

const router = Router();

const date = new Date();
const lastWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 6).toISOString().slice(0, 10);
const today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString().slice(0, 10);
const twoMonthsFromNow = new Date(date.getFullYear(), date.getMonth() + 2, date.getDate()).toISOString().slice(0, 10);

router.get('/featured-movie', (req, res) => {
    axios.get(`https://api.themoviedb.org/3/discover/movie?&page=1`, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MDkwZDc0YjRkYmIyM2QxNDU2NWVlZThhMGU4ZWMxYyIsInN1YiI6IjYyNWUyYjcxMjI5YWUyMzIxNzBlNjBjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ANwWprg7zoDClPIwXYW8sjH3yQ_QLdos_AIHzCv-2n8",
        },
        params: {
            include_adult: false,
            year: new Date().getFullYear(),
            language: 'en-US',
            with_companies: '420|19551|38679|2301|13252',
            sort_by: 'primary_release_date.asc',
            primary_release_year: 2023
        }
    })
    .then(response => {
        res.json(response.data);
    })
    .catch(err => console.error(err));
});

router.get('/news', (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;

    axios.get(`https://newsapi.org/v2/everything?q=mcu`, {
        params: {
            apikey: newsKey,
            sortBy: "relevancy",
            from: lastWeek,
            to: today,
            language: "en",
            pageSize: pageSize,
            page: page
        }
    })
    .then(response => {
        res.json(response.data);
    })
    .catch(err => console.error(err));
});

router.get('/new-comics', (req, res) => {
    axios.get(`http://gateway.marvel.com/v1/public/comics?&limit=100&orderBy=onsaleDate&dateRange=${today},${twoMonthsFromNow}`, {
        params: {
            apikey: publicKey,
            ts: timestamp,
            hash: hash,
        }
    })
    .then(response => {
        res.json(response.data);
    })
    .catch(err => console.error(err));
});

export { router }