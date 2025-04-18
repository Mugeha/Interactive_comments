// 1. Import what we need from React
import React, { createContext, useContext, useState, useEffect } from 'react';

// 2. Import the starter data (the one from Frontend Mentor)
// This contains comments and the current logged-in user
import data from '../Data/data.json';

// 3. Create a context object – this is like creating a box where we'll store and share data
const CommentsContext = createContext();

// 4. Create a context provider component – this wraps your app and provides the comment state
export const CommentsProvider = ({ children }) => {
  // 5. Initialize state: try to load from localStorage first, fallback to starter data
  const [comments, setComments] = useState(() => {
    const local = localStorage.getItem('comments'); // Check local storage
    return local ? JSON.parse(local) : data.comments; // Use local if exists, else use default
  });

  // 6. Save updated comments to localStorage whenever comments change
  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);


  // 🧠 After useEffect, add this function
const addComment = (content) => {
  const newComment = {
    id: Date.now(), // Unique-ish ID
    content: content,
    createdAt: 'just now',
    score: 0,
    user: data.currentUser, // Grabbing current user from starter data
    replies: [],
  };

  setComments((prevComments) => [...prevComments, newComment]);
};


  // 7. Provide the comments state + update function to any component that needs it
  return (
<CommentsContext.Provider value={{ comments, setComments, addComment }}>
{children} {/* This renders the wrapped app inside the provider */}
    </CommentsContext.Provider>
  );
};

// 8. Custom hook – lets us use the context easily from any component
export const useComments = () => useContext(CommentsContext);
