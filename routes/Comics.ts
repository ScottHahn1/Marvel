import axios from 'axios';
import { hash, publicKey, timestamp } from '../functions/api';
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    const offset = req.query.offset;
  
    axios.get('https://gateway.marvel.com/v1/public/comics?limit=100', {
      params: {
        apikey: publicKey,
        ts: timestamp,
        hash: hash,
        offset: offset,
      }
    })
    .then(response => {
      res.json(response.data);
    })
    .catch(err => console.error(err));
});
  
router.get('/comic-info/:id', (req, res) => {
    const id = req.query.comicId;

    axios.get(`https://gateway.marvel.com/v1/public/comics/${id}`, {
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

export { router };