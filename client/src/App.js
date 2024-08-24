import React from 'react';
import PostList from './PostList';
import PostForm from './PostForm';

function App() {
  return (
    <div className="App">
      <h1>My Blog</h1>
      <PostForm />
      <PostList />
    </div>
  );
}

export default App;
