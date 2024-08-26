import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import blogRoutes from './routes/blogRoutes';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

if (!process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY is not set in the environment variables.');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use('/api/posts', blogRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('OPENAI_API_KEY is set:', !!process.env.OPENAI_API_KEY);
});