import express, { Request, Response } from 'express';
import Post from '../models/Posts';
import { generateBlogPost } from '../services/openaiService';  

const router = express.Router();

// Get all posts
router.get('/', async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
});

// Generate and save a new post
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
    res.status(500).json({ message: 'Error generating post', error });
  }
});

// Delete a post
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error });
  }
});

// Update a post
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error });
  }
});

export default router;