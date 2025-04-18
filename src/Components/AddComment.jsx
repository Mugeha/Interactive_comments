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
  className="bg-white p-4 mt-6 rounded-md shadow-md flex flex-col md:flex-row items-start md:items-center gap-4"
>
  {/* 🖼 User image on the left */}
  <img
    src={data.currentUser.image.png}
    alt="user"
    className="w-10 h-10 rounded-full object-cover"
  />

  {/* 📝 Textarea grows */}
  <textarea
    className="flex-1 border border-gray-300 rounded-md p-3 w-full resize-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    rows="3"
    placeholder="Add a comment..."
    value={content}
    onChange={(e) => setContent(e.target.value)}
  />

  {/* 📩 Submit button */}
  <button
    type="submit"
    className="bg-blue-500 text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-blue-600 transition"
  >
    Send
  </button>
</form>

  );
};

export default AddComment;
