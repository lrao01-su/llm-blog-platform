import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import blogRoutes from './routes/blogRoutes';

dotenv.config();

const app: Express = express();
const PORT: string | number = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());

// Use blog routes
app.use('/api/posts', blogRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Blog Generator API' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});