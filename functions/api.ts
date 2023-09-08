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
// const port = process.env.PORT;
const router = Router();

router.get('/characters', (req, res) => {
  const offset = req.query.offset;

  axios.get('http://gateway.marvel.com/v1/public/characters?limit=100', {
    params: {
      apikey: publicKey,
      ts: timestamp,
      hash: hash,
      offset: offset,
    }
  })
  .then(response => {
    res.json(response.data);
    console.log(response.data);
  })
  .catch(err => console.error(err));
});

app.use('/api/', router);

export const handler = serverless(app);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });