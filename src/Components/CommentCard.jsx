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

  const updateCommentContent = (arr, id, newContent) =>
    arr.map((c) =>
      c.id === id
        ? { ...c, content: newContent }
        : { ...c, replies: updateCommentContent(c.replies || [], id, newContent) }
    );

  const updateCommentScore = (arr, id, delta) =>
    arr.map((c) =>
      c.id === id
        ? { ...c, score: c.score + delta }
        : { ...c, replies: updateCommentScore(c.replies || [], id, delta) }
    );

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
    if (!trimmed) return;
    setComments(updateCommentContent(comments, comment.id, trimmed));
    setIsEditing(false);
  };

  const addReplyToComment = (arr, id, newReply) =>
    arr.map((c) =>
      c.id === id
        ? { ...c, replies: [...(c.replies || []), newReply] }
        : { ...c, replies: addReplyToComment(c.replies || [], id, newReply) }
    );

  const handleReplySubmit = () => {
    const trimmed = replyContent.trim();
    if (!trimmed) return;

    const newReply = {
      id: Date.now(),
      content: trimmed,
      createdAt: 'just now',
      score: 0,
      replyingTo: comment.user.username,
      user: data.currentUser,
      replies: [],
    };

    setComments(addReplyToComment(comments, comment.id, newReply));
    setReplyContent('');
    setShowReplyInput(false);
  };

  const confirmDelete = () => {
    deleteComment(comment.id);
    setShowDeleteModal(false);
  };

  return (
    <div className="comment-card-container">
     

      <div className={isReply ? 'reply-card' : 'comment-card'}>
      <div className="score-box">
        <button className={`score-btn ${userVote === 1 ? 'voted' : ''}`} onClick={handleUpvote}>+</button>
        <span className="score">{comment.score}</span>
        <button className={`score-btn ${userVote === -1 ? 'voted' : ''}`} onClick={handleDownvote}>-</button>
      </div>
        <div className="comment-header">
          <img src={comment.user.image.png} alt="avatar" className="avatar" />
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
            <img src={data.currentUser.image.png} alt="avatar" className="avatar" />
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
    </div>
  );
};

export default CommentCard;
