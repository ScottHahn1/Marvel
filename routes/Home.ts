import axios from 'axios';
import { hash, publicKey, timestamp } from '../functions/api';
import { Router } from 'express';

const router = Router();

const date = new Date();
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

export { router }