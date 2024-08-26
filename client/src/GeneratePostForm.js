import React, { useState, useCallback } from 'react';

function GeneratePostForm({ onPostGenerated }) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/posts/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const newPost = await response.json();
      onPostGenerated(newPost);
      setPrompt('');
    } catch (error) {
      console.error('Error:', error);
    }
  }, [prompt, onPostGenerated]);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Generate a Post</h2>
      <div>
        <label htmlFor="prompt">Prompt:</label>
        <input
          type="text"
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />
      </div>
      <button type="submit">Generate Post</button>
    </form>
  );
}

export default React.memo(GeneratePostForm);