import axios from 'axios';
import { hash, publicKey, timestamp } from '../functions/api';
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    const offset = req.query.offset;
  
    axios.get('https://gateway.marvel.com/v1/public/characters?limit=100', {
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
  
router.get('/character-info/:id', (req, res) => {
    const id = req.query.characterId;

    axios.get(`https://gateway.marvel.com/v1/public/characters/${id}`, {
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

router.get('/character-info/:id/comics', (req, res) => {
    const id = req.query.characterId;

    axios.get(`http://gateway.marvel.com/v1/public/characters/${id}/comics?limit=100`, {
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

export default router;