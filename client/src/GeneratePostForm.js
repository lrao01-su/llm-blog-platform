import React, { useState } from 'react';

function GeneratePostForm({ onPostGenerated }) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/posts/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      onPostGenerated(data);
      setPrompt('');
    } catch (error) {
      console.error('Error generating post:', error);
    }
  };

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

export default GeneratePostForm;