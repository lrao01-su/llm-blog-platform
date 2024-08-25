import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import blogRoutes from './routes/blogRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

app.use('/api/posts', blogRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});