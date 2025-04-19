// 1. Import React and the custom hook to access comments
import React from 'react';
import AddComment from './Components/AddComment';
import CommentCard from './Components/CommentCard';
import { useComments } from './Context/CommentsContext';

const App = () => {
  // 2. Pull comments from our global context using the custom hook
  const { comments } = useComments();

  return (
    <>
    <main className="app">
      {/* <h1 className="title">💬 Interactive Comments Section</h1> */}

      {comments.map((comment) => (
  <CommentCard key={comment.id} comment={comment} />
))}
    </main>
    <AddComment />
    </>
  );
};

export default App;
