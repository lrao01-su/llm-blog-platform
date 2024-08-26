import React, { useCallback } from 'react';

function PostList({ posts, onPostDeleted }) {
  const deletePost = useCallback(async (id) => {
    try {
      await fetch(`http://localhost:5001/api/posts/${id}`, {
        method: 'DELETE',
      });
      onPostDeleted(id);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }, [onPostDeleted]);

  return (
    <div className="post-list">
      <h2>Generated Blog Posts</h2>
      {posts.map(post => (
        <div key={post._id} className="post">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <button onClick={() => deletePost(post._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default React.memo(PostList);