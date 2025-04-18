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
    <form className="add-comment" onSubmit={handleSubmit}>
    <img
      src={data.currentUser.image.png}
      alt="user"
      className="avatar"
    />
    <textarea
      className="textarea"
      placeholder="Add a comment..."
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
    />
    <button type="submit" className="send-btn">Send</button>
  </form>

  );
};

export default AddComment;
