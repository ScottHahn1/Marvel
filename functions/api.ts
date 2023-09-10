import express, { Router } from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import cors from 'cors';
import serverless from 'serverless-http';
import router from '../routes/Characters';

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

const charactersRouter = router;
app.use('/characters', charactersRouter);
app.use('/.netlify/functions/api', router);

export const handler = serverless(app);