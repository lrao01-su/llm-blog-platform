import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

// Create Express app
const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());

// Define a simple route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Blog Generator API' });
});

// Set port and start the server
const PORT: string | number = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});