// 1. Import React and the custom hook to access comments
import React from 'react';
import AddComment from './Components/AddComment';
import { useComments } from './Context/CommentsContext';

const App = () => {
  // 2. Pull comments from our global context using the custom hook
  const { comments } = useComments();

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold">💬 Interactive Comments Section</h1>

      {/* 3. Render all the comments for now – just basic structure */}
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-white p-4 my-4 rounded shadow-md border border-gray-200"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">@{comment.user.username}</span>
            <span className="text-sm text-gray-500">{comment.createdAt}</span>
          </div>
          <p className="text-gray-800">{comment.content}</p>
          <div className="mt-2 text-blue-600">Score: {comment.score}</div>
        </div>
      ))}
      <AddComment />

    </main>
  );
};

export default App;
