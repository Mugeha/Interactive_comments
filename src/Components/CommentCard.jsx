// CommentCard.jsx
import React from 'react';
import '../CommentCard.css';
import data from '../Data/data.json';

const CommentCard = ({ comment }) => {
  const isCurrentUser = comment.user.username === data.currentUser.username;

  return (
    <div className="comment-card">
      <div className="comment-header">
        <img src={comment.user.image.png} alt="user avatar" className="avatar" />
        <span className="username">{comment.user.username}</span>
        {isCurrentUser && <span className="you-tag">you</span>}
        <span className="timestamp">{comment.createdAt}</span>
      </div>

      <p className="comment-content">{comment.content}</p>

      <div className="comment-footer">
        <div className="score-box">
          <button className="score-btn">+</button>
          <span className="score">{comment.score}</span>
          <button className="score-btn">-</button>
        </div>

        <div className="action-buttons">
          {isCurrentUser ? (
            <>
              <button className="delete-btn">🗑 Delete</button>
              <button className="edit-btn">✏️ Edit</button>
            </>
          ) : (
            <button className="reply-btn">💬 Reply</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
