// CommentCard.jsx
import React from 'react';
import '../CommentCard.css';
import data from '../Data/data.json';

// Import at the top
import CommentCard from './CommentCard';

const CommentCard = ({ comment, isReply = false }) => {
  const isCurrentUser = comment.user.username === data.currentUser.username;

  return (
    <div className={isReply ? 'reply-card' : 'comment-card'}>
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

      {/* 🔁 Render replies recursively if they exist */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="replies-thread">
          {comment.replies.map((reply) => (
            <CommentCard key={reply.id} comment={reply} isReply={true} />
          ))}
        </div>
      )}
    </div>
  );
};


export default CommentCard;
