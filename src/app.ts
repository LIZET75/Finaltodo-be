import express, { Express, Request, Response } from "express";
import postsRoutes from './routes/postsRoutes';
import todosRoutes from './routes/todosRoutes';

import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.use(express.json());
app.use('/posts', postsRoutes);
app.use('/todos', todosRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port} ${process.env.PORT}`);
});

