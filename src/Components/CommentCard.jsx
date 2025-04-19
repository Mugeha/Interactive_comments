import React, { useState } from 'react';
import '../CommentCard.css';
import data from '../Data/data.json';
import { useComments } from '../Context/CommentsContext';

const CommentCard = ({ comment, isReply = false }) => {
  const { comments, setComments } = useComments();
  const isCurrentUser = comment.user.username === data.currentUser.username;
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  // 🔁 Recursive helper to add reply
  const addReplyToComment = (commentsArr, commentId, newReply) => {
    return commentsArr.map((c) => {
      if (c.id === commentId) {
        return {
          ...c,
          replies: [...c.replies, newReply],
        };
      } else if (c.replies && c.replies.length > 0) {
        return {
          ...c,
          replies: addReplyToComment(c.replies, commentId, newReply),
        };
      }
      return c;
    });
  };

  const handleReplySubmit = () => {
    const trimmed = replyContent.trim();
    if (trimmed === '') return;

    const newReply = {
      id: Date.now(), // simple unique ID
      content: trimmed,
      createdAt: 'just now',
      score: 0,
      replyingTo: comment.user.username,
      user: data.currentUser,
      replies: [],
    };

    const updatedComments = addReplyToComment(comments, comment.id, newReply);
    setComments(updatedComments);
    setReplyContent('');
    setShowReplyInput(false);
  };

  return (
    <div className={isReply ? 'reply-card' : 'comment-card'}>
      <div className="comment-header">
        <img src={comment.user.image.png} alt="user avatar" className="avatar" />
        <span className="username">{comment.user.username}</span>
        {isCurrentUser && <span className="you-tag">you</span>}
        <span className="timestamp">{comment.createdAt}</span>
      </div>

      <p className="comment-content">
        {comment.replyingTo && <span className="mention">@{comment.replyingTo} </span>}
        {comment.content}
      </p>

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
              <button className="edit-btn">Edit</button>
            </>
          ) : (
            <button className="reply-btn" onClick={() => setShowReplyInput(!showReplyInput)}>
              💬 Reply
            </button>
          )}
        </div>
      </div>

      {showReplyInput && (
        <div className="reply-input-box">
          <img src={data.currentUser.image.png} alt="your avatar" className="avatar" />
          <textarea
            className="reply-input"
            placeholder={`Reply to @${comment.user.username}`}
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <button className="send-btn" onClick={handleReplySubmit}>
            Send
          </button>
        </div>
      )}

      {/* 🔁 Replies */}
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
