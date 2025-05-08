import React from 'react';
import './commentsection.css';

function CommentSection({ comments }) {
  return (
    <div className="comment-section">
      {comments.map((comment, idx) => (
        <div key={idx} className="comment">
          <span className="comment-user">{comment.user}:</span>
          <span className="comment-text">{comment.text}</span>
        </div>
      ))}
    </div>
  );
}

export default CommentSection;
