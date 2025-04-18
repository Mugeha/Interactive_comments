import React, { useState } from 'react';
import { useComments } from '../Context/CommentsContext'; // Access addComment + current user
import data from '../Data/data.json'; // Just to get current user info (you can lift this later)

const AddComment = () => {
  const { addComment } = useComments(); // Grab addComment function from context
  const [content, setContent] = useState(''); // Track what's typed in textarea

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault(); // Stop page reload
    if (content.trim() === '') return; // Don't add empty comments

    addComment(content); // Add the comment to global state
    setContent(''); // Clear the textarea
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 mt-6 rounded shadow-md flex flex-col sm:flex-row items-start sm:items-center gap-4"
    >
      {/* 🖼 User image */}
      <img
        src={data.currentUser.image.png}
        alt="user"
        className="w-10 h-10 rounded-full"
      />

      {/* ✍️ Textarea */}
      <textarea
        className="flex-1 border border-gray-300 rounded p-2 w-full resize-none focus:outline-blue-500"
        rows="3"
        placeholder="Add a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* 📩 Send button */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Send
      </button>
    </form>
  );
};

export default AddComment;
