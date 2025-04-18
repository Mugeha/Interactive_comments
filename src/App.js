// 1. Import React and the custom hook to access comments
import React from 'react';
import AddComment from './Components/AddComment';
import { useComments } from './Context/CommentsContext';

const App = () => {
  // 2. Pull comments from our global context using the custom hook
  const { comments } = useComments();

  return (
    <>
    <main className="app">
      {/* <h1 className="title">💬 Interactive Comments Section</h1> */}

      {comments.map((comment) => (
        <div key={comment.id} className="comment-box">
          <div className="comment-header">
          {/* <span className="username">{comment.user.image.webp}</span> */}

            <span className="username">@{comment.user.username}</span>
            <span className="created-at">{comment.createdAt}</span>
          </div>
          <p className="content">{comment.content}</p>
          <div className="score">Score: {comment.score}</div>
        </div>
      ))}
    </main>
    <AddComment />
    </>
  );
};

export default App;
