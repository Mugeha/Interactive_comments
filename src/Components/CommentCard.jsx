import React, { useState } from 'react';
import '../CommentCard.css';
import data from '../Data/data.json';
import { useComments } from '../Context/CommentsContext';

const CommentCard = ({ comment, isReply = false }) => {
  const { comments, setComments, deleteComment } = useComments();
  const isCurrentUser = comment.user.username === data.currentUser.username;

  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [userVote, setUserVote] = useState(0); // 0 = no vote, 1 = upvoted, -1 = downvoted

  const updateCommentContent = (commentsArr, commentId, newContent) => {
    return commentsArr.map((c) => {
      if (c.id === commentId) {
        return { ...c, content: newContent };
      } else if (c.replies?.length > 0) {
        return { ...c, replies: updateCommentContent(c.replies, commentId, newContent) };
      }
      return c;
    });
  };

  const updateCommentScore = (commentsArr, commentId, delta) => {
    return commentsArr.map((c) => {
      if (c.id === commentId) {
        return { ...c, score: c.score + delta };
      } else if (c.replies?.length > 0) {
        return { ...c, replies: updateCommentScore(c.replies, commentId, delta) };
      }
      return c;
    });
  };

  const handleUpvote = () => {
    if (userVote === 1) return;
    const delta = userVote === -1 ? 2 : 1;
    setComments(updateCommentScore(comments, comment.id, delta));
    setUserVote(1);
  };

  const handleDownvote = () => {
    if (userVote === -1) return;
    const delta = userVote === 1 ? -2 : -1;
    setComments(updateCommentScore(comments, comment.id, delta));
    setUserVote(-1);
  };

  const handleEditSubmit = () => {
    const trimmed = editContent.trim();
    if (trimmed === '') return;
    const updated = updateCommentContent(comments, comment.id, trimmed);
    setComments(updated);
    setIsEditing(false);
  };

  // ✅ Updated with fallback to [] for c.replies
  const addReplyToComment = (commentsArr, commentId, newReply) => {
    return commentsArr.map((c) => {
      if (c.id === commentId) {
        return {
          ...c,
          replies: [...(c.replies || []), newReply],
        };
      } else if (c.replies?.length > 0) {
        return { ...c, replies: addReplyToComment(c.replies, commentId, newReply) };
      }
      return c;
    });
  };

  const handleReplySubmit = () => {
    const trimmed = replyContent.trim();
    if (trimmed === '') return;

    const newReply = {
      id: Date.now(),
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

  const confirmDelete = () => {
    deleteComment(comment.id);
    setShowDeleteModal(false);
  };

  return (
    <div className={isReply ? 'reply-card' : 'comment-card'}>
      <div className="comment-header">
        <img src={comment.user.image.png} alt="user avatar" className="avatar" />
        <span className="username">{comment.user.username}</span>
        {isCurrentUser && <span className="you-tag">you</span>}
        <span className="timestamp">{comment.createdAt}</span>
      </div>

      <div className="comment-content">
        {isEditing ? (
          <textarea
            className="edit-input"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
        ) : (
          <p>
            {comment.replyingTo && (
              <span className="mention">@{comment.replyingTo} </span>
            )}
            {comment.content}
          </p>
        )}
      </div>

      <div className="comment-footer">
        <div className="score-box">
          <button className="score-btn" onClick={handleUpvote}>+</button>
          <span className="score">{comment.score}</span>
          <button className="score-btn" onClick={handleDownvote}>-</button>
        </div>

        <div className="action-buttons">
          {isCurrentUser ? (
            isEditing ? (
              <>
                <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                <button className="send-btn" onClick={handleEditSubmit}>Update</button>
              </>
            ) : (
              <>
                <button className="delete-btn" onClick={() => setShowDeleteModal(true)}>🗑 Delete</button>
                <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
              </>
            )
          ) : (
            <button className="reply-btn" onClick={() => setShowReplyInput(!showReplyInput)}>💬 Reply</button>
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
          <button className="send-btn" onClick={handleReplySubmit}>Send</button>
        </div>
      )}

      {comment.replies?.length > 0 && (
        <div className="replies-thread">
          {comment.replies.map((reply) => (
            <CommentCard key={reply.id} comment={reply} isReply={true} />
          ))}
        </div>
      )}

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <h3>Delete comment</h3>
            <p>Are you sure you want to delete this comment? This action can’t be undone.</p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>No, Cancel</button>
              <button className="confirm-btn" onClick={confirmDelete}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentCard;
