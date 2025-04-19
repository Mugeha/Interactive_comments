// 1. Import what we need from React
import React, { createContext, useContext, useState, useEffect } from 'react';

// 2. Import the starter data (the one from Frontend Mentor)
import data from '../Data/data.json';

// 3. Create a context object
const CommentsContext = createContext();

// 4. Provider to wrap the app
export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState(() => {
    const local = localStorage.getItem('comments');
    return local ? JSON.parse(local) : data.comments;
  });

  // 5. Save to localStorage on comment change
  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  // 6. Add new comment (top-level)
  const addComment = (content) => {
    const newComment = {
      id: Date.now(),
      content,
      createdAt: 'just now',
      score: 0,
      user: data.currentUser,
      replies: [],
    };
    setComments((prev) => [...prev, newComment]);
  };

  // 7. Delete comment or reply (🔥 smart logic)
  const deleteComment = (commentId) => {
    const updatedComments = comments
      .map((comment) => {
        if (comment.id === commentId) {
          return null; // Top-level comment match? Remove it
        }

        const updatedReplies = comment.replies?.filter(
          (reply) => reply.id !== commentId
        );

        // Only return if there are still replies or the comment is untouched
        return {
          ...comment,
          replies: updatedReplies,
        };
      })
      .filter(Boolean); // Remove any `null` top-level comments

    setComments(updatedComments);
  };

  return (
    <CommentsContext.Provider
      value={{ comments, setComments, addComment, deleteComment }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

// 8. Custom hook
export const useComments = () => useContext(CommentsContext);
