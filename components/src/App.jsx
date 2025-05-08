import React from 'react';
import Sidebar from './components /sidebar';
import Navbar from './components /navbar';
import PostCard from './components /postcard';

function App() {
  const samplePost = {
    user: {
      name: 'Robert Hammond',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    time: '20 min ago',
    content:
      'My wife prepared a surprise trip for me. I’m so thankful and I love her very much. Here are some of the best shots from our trip to Sri Lanka. ',
    media: [
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1480497490787-505ec076689f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        type: 'image',
        src: 'https://plus.unsplash.com/premium_photo-1673240367277-e1d394465b56?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
    likes: 230,
    comments: 6,
    shares: 2,
  };

  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <Sidebar />
      <div style={{ marginLeft: '300px', height: '100vh', overflowY: 'auto', padding: '20px', marginTop: '60px' }}>
        <PostCard {...samplePost} />
      </div>
    </div>
  );
}

export default App;
