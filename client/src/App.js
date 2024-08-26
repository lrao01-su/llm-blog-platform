import React, { useState, useEffect, useCallback } from 'react';
import PostList from './PostList';
import GeneratePostForm from './GeneratePostForm';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5001/api/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePostGenerated = useCallback((newPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  }, []);

  const handlePostDeleted = useCallback((deletedPostId) => {
    setPosts(prevPosts => prevPosts.filter(post => post._id !== deletedPostId));
  }, []);

  const handlePostUpdated = useCallback((updatedPost) => {
    setPosts(prevPosts => prevPosts.map(post => 
      post._id === updatedPost._id ? updatedPost : post
    ));
  }, []);

  return (
    <div className="App">
      <h1>AI Blog Generator</h1>
      <GeneratePostForm onPostGenerated={handlePostGenerated} />
      <PostList 
        posts={posts} 
        onPostDeleted={handlePostDeleted}
        onPostUpdated={handlePostUpdated}
      />
    </div>
  );
}

export default App;