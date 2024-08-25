import React from 'react';

function PostList({ posts, onPostDeleted }) {
  const deletePost = async (id) => {
    try {
      await fetch(`http://localhost:5001/api/posts/${id}`, {
        method: 'DELETE',
      });
      onPostDeleted(id);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <h2>Blog Posts</h2>
      {posts.map(post => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <button onClick={() => deletePost(post._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default PostList;