import express, { Request, Response } from 'express';

const router = express.Router();

let posts = [
  { id: 1, title: 'First Blog Post', content: 'This is the first blog post.' },
  { id: 2, title: 'Second Blog Post', content: 'This is the second blog post.' },
];

// GET all posts
router.get('/', (req: Request, res: Response) => {
  res.json(posts);
});

// GET a single post by id
router.get('/:id', (req: Request, res: Response) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
});

// POST a new post
router.post('/', (req: Request, res: Response) => {
  // Basic validation
  if (!req.body.title || !req.body.content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }
  
  // Convert to string if not already
  const title = String(req.body.title).trim();
  const content = String(req.body.content).trim();
  
  // Check for minimum length
  if (title.length < 1 || content.length < 1) {
    return res.status(400).json({ message: 'Title and content cannot be empty' });
  }

  const newPost = {
    id: posts.length + 1,
    title,
    content
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// PUT (update) a post
router.put('/:id', (req: Request, res: Response) => {
  const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
  if (postIndex === -1) return res.status(404).json({ message: 'Post not found' });
  
  const updatedPost = { ...posts[postIndex] };

  if (req.body.title !== undefined) {
    updatedPost.title = String(req.body.title).trim();
  }
  if (req.body.content !== undefined) {
    updatedPost.content = String(req.body.content).trim();
  }

  // Ensure title and content are not empty after trimming
  if (updatedPost.title.length < 1 || updatedPost.content.length < 1) {
    return res.status(400).json({ message: 'Title and content cannot be empty' });
  }

  posts[postIndex] = updatedPost;
  res.json(updatedPost);
});

// DELETE a post
router.delete('/:id', (req: Request, res: Response) => {
  const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
  if (postIndex === -1) return res.status(404).json({ message: 'Post not found' });
  
  const deletedPost = posts.splice(postIndex, 1);
  res.json(deletedPost[0]);
});

export default router;