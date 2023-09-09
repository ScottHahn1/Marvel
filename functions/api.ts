import express, { Router } from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import cors from 'cors';
import serverless from 'serverless-http';

dotenv.config();

const getHash = (ts: string, privateKey: string | undefined, publicKey: string | undefined) => {
  let md5 = require("md5");
  return md5(ts + privateKey + publicKey).toString();
};

export const timestamp = Date.now().toString();
export const publicKey = process.env.REACT_APP_PUBLIC_API_KEY;
export const privateKey = process.env.REACT_APP_PRIVATE_API_KEY;
export const hash = getHash(timestamp, privateKey, publicKey);

const app = express();
app.use(cors());
const router = Router();

router.get('/characters', (req, res) => {
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

router.get('/character-info', (req, res) => {
  const id = req.query.characterId;
  console.log(req.query)
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

app.use('/.netlify/functions/api', router);

export const handler = serverless(app);