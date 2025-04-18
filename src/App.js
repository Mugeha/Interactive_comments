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
        className="bg-white p-5 my-6 rounded-md shadow-md border border-gray-200"
      >
        <div className="flex justify-between items-center mb-3">
          <span className="font-semibold text-blue-900">@{comment.user.username}</span>
          <span className="text-xs text-gray-500">{comment.createdAt}</span>
        </div>
        <p className="text-sm text-gray-800">{comment.content}</p>
        <div className="mt-3 text-gray-600 text-sm">Score: {comment.score}</div>
      </div>
      
      ))}
      <AddComment />

    </main>
  );
};

export default App;
