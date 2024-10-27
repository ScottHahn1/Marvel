import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import serverless from 'serverless-http';
import { router as charactersRouter } from '../../routes/Characters';
import { router as comicsRouter } from '../../routes/Comics';
import { router as moviesRouter } from '../../routes/Movies';
import { router as seriesRouter } from '../../routes/Series';
import { router as homeRouter } from '../../routes/Home';
import crypto from 'crypto';

const app = express();
app.use(cors({
  origin: 'https://marvel-world-heroes.netlify.app',
  methods: 'GET',
  allowedHeaders: ['Content-Type', 'Authorization']
}));

dotenv.config();

export const timestamp = Date.now().toString();
export const publicKey = process.env.REACT_APP_PUBLIC_API_KEY;
export const privateKey = process.env.REACT_APP_PRIVATE_API_KEY;
export const hash = crypto.createHash('md5').update(timestamp + privateKey +  publicKey).digest('hex');
export const tmdbToken = process.env.REACT_APP_BEARER_TOKEN;
export const newsKey = process.env.REACT_APP_NEWS_KEY;

app.use('/.netlify/functions/api', homeRouter);
app.use('/.netlify/functions/api/characters', charactersRouter);
app.use('/.netlify/functions/api/comics', comicsRouter);
app.use('/.netlify/functions/api/movies', moviesRouter);
app.use('/.netlify/functions/api/series', seriesRouter);

export const handler = serverless(app);