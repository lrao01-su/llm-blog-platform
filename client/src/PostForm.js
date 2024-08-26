import React, { useState, useCallback } from 'react';

function PostForm({ onPostCreated }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const newPost = await response.json();
      onPostCreated(newPost);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error:', error);
    }
  }, [title, content, onPostCreated]);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a New Post</h2>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create Post</button>
    </form>
  );
}

export default React.memo(PostForm);