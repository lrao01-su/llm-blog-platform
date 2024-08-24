import React, { useState, useEffect } from 'react';
import PostList from './PostList';
import PostForm from './PostForm';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    fetch('http://localhost:5001/api/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error:', error));
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="App">
      <h1>My Blog</h1>
      <PostForm onPostCreated={handlePostCreated} />
      <PostList posts={posts} />
    </div>
  );
}

export default App;
