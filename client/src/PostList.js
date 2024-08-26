import React, { useState, useCallback } from 'react';

function PostList({ posts, onPostDeleted, onPostUpdated }) {
  const [editingPost, setEditingPost] = useState(null);

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

  const startEditing = (post) => {
    setEditingPost({ ...post });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingPost(prev => ({ ...prev, [name]: value }));
  };

  const saveEdit = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/posts/${editingPost._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: editingPost.title, content: editingPost.content }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedPost = await response.json();
      onPostUpdated(updatedPost);
      setEditingPost(null);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div className="post-list">
      <h2>Generated Blog Posts</h2>
      {posts.map(post => (
        <div key={post._id} className="post">
          {editingPost && editingPost._id === post._id ? (
            <>
              <input
                name="title"
                value={editingPost.title}
                onChange={handleEditChange}
              />
              <textarea
                name="content"
                value={editingPost.content}
                onChange={handleEditChange}
              />
              <button onClick={saveEdit}>Save</button>
              <button onClick={() => setEditingPost(null)}>Cancel</button>
            </>
          ) : (
            <>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <button onClick={() => startEditing(post)}>Edit</button>
              <button onClick={() => deletePost(post._id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default React.memo(PostList);