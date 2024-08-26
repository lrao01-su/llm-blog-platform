import express, { Request, Response } from 'express';
import Post from '../models/Posts';
import { generateBlogPost } from '../services/openaiService';
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

router.post('/', async (req: Request, res: Response) => {
  try {
    console.log('Received post data:', req.body); // Log received data
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    console.log('Saved post:', savedPost); // Log saved post
  } catch (error) {
    console.error('Error creating post:', error); // Log detailed error
    res.status(500).json({ message: 'Error creating post', error: error as any });
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

router.post('/generate', async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    const generatedContent = await generateBlogPost(prompt);
    const newPost = new Post({
      title: prompt,
      content: generatedContent,
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error generating post:', error);
    res.status(500).json({ message: 'Error generating post' });
  }
});

export default router;
