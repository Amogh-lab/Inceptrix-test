import React, { useState } from 'react';
import { FaImage, FaLink, FaMapMarkerAlt, FaSmile } from 'react-icons/fa';
import './uploadpost.css';

function UploadPost({ user }) {
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState(null);
  const [location, setLocation] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation({ latitude, longitude });
        },
        (err) => console.warn('Location error:', err)
      );
    }
  };

  const handlePost = async () => {
    if (!description && !media) return;

    const formData = new FormData();
    formData.append('username', user.name);
    formData.append('description', description);
    if (media) formData.append('media', media);
    if (location) formData.append('location', JSON.stringify(location));

    try {
      const res = await fetch('YOUR_API_ENDPOINT_HERE', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setDescription('');
        setMedia(null);
        setPreviewURL(null);
        setLocation(null);
        alert('Post uploaded!');
      } else {
        alert('Failed to upload post');
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading post');
    }
  };

  return (
    <div className="upload-post">
      <div className="upload-top">
      {user?.avatar && (
            <img src={user.avatar} className="upload-avatar" alt="user" />
        )}
        <input
          className="upload-input"
          placeholder="What's on your mind?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {previewURL && (
        <div className="upload-preview">
          {media.type.startsWith('video') ? (
            <video src={previewURL} controls />
          ) : (
            <img src={previewURL} alt="preview" />
          )}
        </div>
      )}

      <div className="upload-bottom">
        <div className="upload-icons">
          <label>
            <FaImage />
            <input type="file" accept="image/*,video/*" hidden onChange={handleMediaChange} />
          </label>
          <FaLink />
          <FaMapMarkerAlt onClick={fetchLocation} />
          <FaSmile />
        </div>
        <button className="upload-btn" onClick={handlePost}>
          Post
        </button>
      </div>
    </div>
  );
}

export default UploadPost;
