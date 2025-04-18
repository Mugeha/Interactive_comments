// App.js
import React from 'react';
import { useComments } from './Context/CommentsContext';
import './App.css'; 

const App = () => {
  const { comments } = useComments();

  return (
    <main className="app">
      <h1 className="title">💬 Interactive Comments Section</h1>

      {comments.map((comment) => (
        <div key={comment.id} className="comment-box">
          <div className="comment-header">
            <span className="username">@{comment.user.username}</span>
            <span className="created-at">{comment.createdAt}</span>
          </div>
          <p className="content">{comment.content}</p>
          <div className="score">Score: {comment.score}</div>
        </div>
      ))}
    </main>
  );
};

export default App;
