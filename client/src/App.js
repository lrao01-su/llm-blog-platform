import React, { useState, useEffect } from 'react';
import PostList from './PostList';
import PostForm from './PostForm';
import GeneratePostForm from './GeneratePostForm';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostGenerated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostDeleted = (deletedPostId) => {
    setPosts(posts.filter(post => post._id !== deletedPostId));
  };

  return (
    <div className="App">
      <h1>My Blog</h1>
      <PostForm onPostCreated={handlePostCreated} />
      <GeneratePostForm onPostGenerated={handlePostGenerated} />
      <PostList posts={posts} onPostDeleted={handlePostDeleted} />
    </div>
  );
}

export default App;