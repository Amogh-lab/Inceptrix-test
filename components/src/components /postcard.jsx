import React from 'react';
import './postcard.css';

function PostCard({ user, time, content, media, likes, comments, shares }) {
  return (
    <div className="post-card">
      <div className="post-header">
        <img src={user.avatar} className="avatar" alt="user" />
        <div className="post-info">
          <span className="post-user">{user.name}</span>
          <span className="post-time">{time}</span>
        </div>
        <div className="post-menu">⋯</div>
      </div>
      <div className="post-content">{content}</div>
      <div className="post-media">
        {media.map((item, index) =>
          item.type === 'image' ? (
            <img key={index} src={item.src} alt="" className="media-item" />
          ) : (
            <video key={index} controls className="media-item">
              <source src={item.src} type="video/mp4" />
            </video>
          )
        )}
      </div>
      <div className="post-actions">
        <div className="action like">👍 {likes}</div>
        <div className="action comment">💬 {comments}</div>
        <div className="action share">↗ {shares}</div>
      </div>
    </div>
  );
}

export default PostCard;
