import express, { Request, Response } from 'express';
import Post from '../models/Posts';

const router = express.Router();

// GET all posts
router.get('/', async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

//GET a single post by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post' });
  }
});

// POST a new post
router.post('/', async (req: Request, res: Response) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: 'Error creating post' });
  }
});

//Delete a post by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post' });
  }
});

// add the generate route here later
router.post('/generate', (req: Request, res: Response) => {
  // This is a placeholder for the LLM integration
  res.status(501).json({ message: 'Post generation not yet implemented' });
});


export default router;
