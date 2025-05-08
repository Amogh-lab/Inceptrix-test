import React, { useState, useRef, useEffect } from 'react';
import {
  FaThumbsUp,
  FaComment,
  FaShare,
  FaInfoCircle,
  FaUserSlash,
  FaLink,
  FaShareAlt,
  FaBan,
  FaEllipsisH
} from 'react-icons/fa';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; 
import './postcard.css';
import CommentSection from './commentsection';

function PostCard({ user, time, content, media, likes, comments, shares, commentList }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const menuRef = useRef();
  const mediaRef = useRef();

    const scrollMedia = (direction) => {
    if (mediaRef.current) {
    const scrollAmount = 450;
    mediaRef.current.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  }
};

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied!');
  };

  return (
    <div className="post-card">
  <div className="post-header">
    <img src={user.avatar} className="avatar" alt="user" />
    <div className="post-info">
      <span className="post-user">{user.name}</span>
      <span className="post-time">{time}</span>
    </div>
    <div className="post-menu-wrapper" ref={menuRef}>
      <div className="post-menu" onClick={() => setMenuOpen(!menuOpen)}>
        <FaEllipsisH />
      </div>
      {menuOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-item"><FaBan /> Not Recommended</div>
          <div className="dropdown-item"><FaInfoCircle /> Info</div>
          <div className="dropdown-item"><FaUserSlash /> Unfollow</div>
          <div className="dropdown-item"><FaShareAlt /> Share To</div>
          <div className="dropdown-item" onClick={handleCopyLink}><FaLink /> Copy Link</div>
        </div>
      )}
    </div>
  </div>

  <div className="post-content">{content}</div>

  {media.length > 0 && (
    <div className="post-media-wrapper">
      {media.length > 2 && (
        <button className="scroll-btn left" onClick={() => scrollMedia('left')}>
          <FaChevronLeft />
        </button>
      )}

      <div className="post-media" ref={mediaRef}>
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

      {media.length > 2 && (
        <button className="scroll-btn right" onClick={() => scrollMedia('right')}>
          <FaChevronRight />
        </button>
      )}
    </div>
  )}

  <div className="post-actions">
      <div className="action like"><FaThumbsUp /> {likes}</div>
      <div className="action comment" onClick={() => setShowComments(!showComments)}>
      <FaComment /> {comments}
      </div>
      <div className="action share"><FaShare /> {shares}</div>
     </div>

     {showComments && <CommentSection comments={commentList} />}
    </div>

  );
}

export default PostCard;
