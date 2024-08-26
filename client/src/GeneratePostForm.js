import React, { useState, useCallback } from 'react';

function GeneratePostForm({ onPostGenerated }) {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  }, [prompt, onPostGenerated]);

  return (
    <form onSubmit={handleSubmit} className="generate-form">
      <h2>Generate a Blog Post</h2>
      <div>
        <label htmlFor="prompt">Topic:</label>
        <input
          type="text"
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
          placeholder="Enter a topic for the blog post"
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate Post'}
      </button>
    </form>
  );
}

export default React.memo(GeneratePostForm);