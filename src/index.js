import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import multer from 'multer';
import connectDatabase from './database/mongodb.database.js';
import router from './routes/route.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;
connectDatabase();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().any());
app.use('/', router);
app.use('*', (req, res) =>
  res.status(404).send({ status: false, message: 'please enter valid URL' })
);

app.listen(port, () => console.log(`Connected on Port ${port}`));
