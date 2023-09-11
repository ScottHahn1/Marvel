import axios from 'axios';
import { hash, publicKey, timestamp, newsKey } from '../functions/api';
import { Router } from 'express';

const router = Router();

const date = new Date();
const lastWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 6).toISOString().slice(0, 10);
const today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString().slice(0, 10);
const twoMonthsFromNow = new Date(date.getFullYear(), date.getMonth() + 2, date.getDate()).toISOString().slice(0, 10);

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

export { router }