import React, { useEffect, useState } from 'react';
import Sidebar from './components /sidebar';
import Navbar from './components /navbar';
import PostCard from './components /postcard';
import UploadPost from './components /uploadpost';
import SOSPopup from './components /SOSPopup';
import RightSidebar from './components /rightsidebar';

function App() {
  const samplePost1 = {
    user: {
      name: 'Robert Hammond', 
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    time: '54 min ago',
    content:
      'A person witnesses someone openly brandishing a gun in a public place, causing immediate fear and concern for safety. They need a discreet and rapid way to report this serious threat to the authorities without escalating the situation.',
    media: [
      {
        type: 'image',
        src: 'https://res.cloudinary.com/preethamcloud/image/upload/v1746726960/el0jukdwxfg73etru5jz.avif',
      },
      {
        type: 'image',
        src: 'https://res.cloudinary.com/preethamcloud/image/upload/v1746726774/jpxaobuhaaakqnzbqjwf.avif',
      },
    ],
    likes: 4829,
    comments: 6,
    shares: 2,
    comments: 3,
    commentList: [
      { user: 'Vivek', text: 'Very Informative' },
      { user: 'Lea', text: 'Very Informative' },
      { user: 'Preetham', text: 'Very Informative' }
    ]
  };

  const samplePost2 = {
    user: {
      name: 'Rohan Gowda',
      avatar: 'https://randomuser.me/api/portraits/men/31.jpg',
    },
    time: '36 min ago',
    content:
      ' - - -  ',
    media: [
      {
        type: 'image',
        src: 'https://res.cloudinary.com/preethamcloud/image/upload/v1746726977/a6j11whq7ab8bvdmxhtq.webp',
      },
      {
        type: 'image',
        src: 'https://res.cloudinary.com/preethamcloud/image/upload/v1746726753/eyooathwn2jhg6k5kyib.png',
      },
      {
        type: 'image',
        src: 'https://res.cloudinary.com/preethamcloud/image/upload/v1746726784/ofoujqwrdubfehjyg4hg.webp',
      },
    ],
    likes: 2340,
    comments: 6,
    shares: 2,
    comments: 2,
    commentList: [
    { user: 'Nina', text: 'Very informative.' },
    { user: 'Dan', text: 'Very informative' }
  ]
  };

  const samplePost3 = {
    user: {
      name: 'Shripad Maradi',
      avatar: 'https://randomuser.me/api/portraits/men/69.jpg',
    },
    time: '20 min ago',
    content:
      'While walking with her husband, a woman suddenly feels a tug and realizes her necklace has been snatched by someone who quickly ran off. They need a way to immediately report this and pinpoint the exact location.',
    media: [
      {
        type: 'video',
        src: 'https://res.cloudinary.com/preethamcloud/video/upload/v1746727705/fy0hqqd19kfb8culcqoe.mp4',
      },
      {
        type: 'image',
        src: 'https://res.cloudinary.com/preethamcloud/image/upload/v1746727780/yitkmcr5djhpqtqu1cin.png',
      },
    ],
    likes: 6930,
    comments: 6,
    shares: 2,
    comments: 2,
    commentList: [
    { user: 'Alice', text: 'very  informative' },
    { user: 'John', text: 'very informative' }
  ]
  };

  const posts = [samplePost1, samplePost2, samplePost3];

  const sortedPosts = posts.sort((a,b)=>(b.likes-a.likes));

        // database values

  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   fetch('http://172.20.230.254:5000/posts')
  //     .then(response => response.json())
  //     .then(data => {
  //       // Optionally sort if needed
  //       const sorted = data.sort((a, b) => b.likes - a.likes);
  //       setPosts(sorted);
  //     })
  //     .catch(error => console.error('Error fetching posts:', error));
  // }, []);

  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <Sidebar />
      <RightSidebar />
      <div style={{ marginLeft: '300px', height: '90vh', overflowY: 'auto', padding: '20px', marginTop: '60px' }}>
        <UploadPost />
        
        {/* from database */}

        {/* {posts.map((post, index) => (
          <PostCard key={index} {...post} />
        ))} */}

        {/* dummy values */}

        {sortedPosts.map((post, index) => (
          <PostCard key={index} {...post} />
        ))}

      </div>
        <SOSPopup />
    </div>
  );
}

export default App;
