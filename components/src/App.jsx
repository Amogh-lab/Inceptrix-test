import React from 'react';
import Sidebar from './components /sidebar';
import Navbar from './components /navbar';
import PostCard from './components /postcard';
import UploadPost from './components /uploadpost';
import SOSPopup from './components /SOSPopup';

function App() {
  const samplePost1 = {
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
    likes: 4829,
    comments: 6,
    shares: 2,
  };

  const samplePost2 = {
    user: {
      name: 'Rohan Gowda',
      avatar: 'https://randomuser.me/api/portraits/men/31.jpg',
    },
    time: '20 min ago',
    content:
      'Space tech, or space technology, encompasses the broad range of technologies used for space exploration, satellite applications, and related activities. ',
    media: [
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        type: 'image',
        src: 'https://res.cloudinary.com/preethamcloud/image/upload/v1745405967/euva3wdtex7rnr9m47vt.jpg',
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1447433865958-f402f562b843?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
    likes: 2340,
    comments: 6,
    shares: 2,
  };

  const samplePost3 = {
    user: {
      name: 'Shripad Maradi',
      avatar: 'https://randomuser.me/api/portraits/men/69.jpg',
    },
    time: '20 min ago',
    content:
      'Technology, broadly defined, is the application of scientific knowledge for practical purposes, often involving tools and processes that change the world and enhance our lives. ',
    media: [
      {
        type: 'video',
        src: 'https://res.cloudinary.com/preethamcloud/video/upload/v1745406259/nj0syucl7fdxxjrrblr3.mp4',
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
    likes: 6930,
    comments: 6,
    shares: 2,
  };

  const posts = [samplePost1, samplePost2, samplePost3];

  const sortedPosts = posts.sort((a,b)=>(b.likes-a.likes));
  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <Sidebar />
      <div style={{ marginLeft: '300px', height: '90vh', overflowY: 'auto', padding: '20px', marginTop: '60px' }}>
        <UploadPost />
        {sortedPosts.map((post, index) => (
          <PostCard key={index} {...post} />
        ))}
      </div>
        <SOSPopup />
    </div>
  );
}

export default App;
