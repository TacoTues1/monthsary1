import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [flowers, setFlowers] = useState([]);
  const [clickCount, setClickCount] = useState(0);

  // changed: wrapped loveMessages in useMemo to fix eslint warning
  const loveMessages = React.useMemo(() => [
    "I love you",
    "You're the prettiest in my eyes",
    "You make my heart smile",
    "Forever yours",
    "My everything",
    "You're my dream come true",
    "I'm so lucky to have you",
    "You're my soulmate",
    "Every day with you is perfect",
    "You're my happiness",
    "I love you more each day",
    "You're my sunshine",
    "My love for you grows stronger",
    "You're my perfect match",
    "I cherish every moment with you",
    "You're my angel",
    "My heart beats for you",
    "You're my world",
    "I'm yours forever",
    "You're my sweetheart",
    "My love, my life",
    "You're my everything",
    "I adore you",
    "You're my blessing",
    "My heart belongs to you",
    "You're my inspiration",
    "I'm crazy about you",
    "You're my treasure",
    "My love is endless",
    "You're my miracle"
  ], []);

  const handleClick = (e) => {
    // Don't allow clicks after reaching 3
    if (clickCount >= 3) {
      return;
    }

    // Increment click counter
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);
    
    // Check if we should redirect after 3 clicks
    if (newClickCount >= 3) {
      window.open('https://flowerforressa.netlify.app/', '_blank');
      return;
    }

    // CHANGED: Added random size and rotation + centered flower on cursor
    const size = Math.random() * 15 + 30; // 30–45px
    const rotation = Math.random() * 360; // Random rotation angle
    const newFlower = {
      id: Date.now(),
      x: e.clientX - size / 2, // Center on click
      y: e.clientY - size / 2,
      type: Math.floor(Math.random() * 3) + 1,
      size,
      rotation
    };
    setFlowers(prev => [...prev, newFlower]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (messages.length < 50) {
        // Create 3-5 messages at once for multiple dropping effect
        const numMessages = Math.floor(Math.random() * 1)+ 1; // 3 to 5 messages
        
        for (let i = 0; i < numMessages; i++) {
          const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
          const newMessage = {
            id: Date.now() + i, // Unique ID for each message
            text: randomMessage,
            left: Math.random() * 100,
            animationDelay: Math.random() * 1 // Reduced delay for more simultaneous effect
          };
          setMessages(prev => [...prev, newMessage]);
        }
      }
    }, 800); // Reduced interval for more frequent bursts

    return () => clearInterval(interval);
  }, [messages, loveMessages]); // changed: added loveMessages to dependencies

  useEffect(() => {
    const cleanup = setInterval(() => {
      setMessages(prev => prev.filter(msg => Date.now() - msg.id < 12000)); // Increased cleanup time to 12 seconds
    }, 1000);

    return () => clearInterval(cleanup);
  }, []);

  useEffect(() => {
    const flowerCleanup = setInterval(() => {
      setFlowers(prev => prev.filter(flower => Date.now() - flower.id < 3000));
    }, 1000);

    return () => clearInterval(flowerCleanup);
  }, []);

  return (
    <div className="App" onClick={handleClick}>
      <div className="background">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>
      
      <div className="content">
        <h1 className="title">Happy 40th Monthsary! Love</h1>
        <h5 className="subtitle">Click to everywhere in the website</h5>
        
        {/* Simple click counter */}
        <div className="click-counter">
          <p className='click-counter-text'>Clicks: {clickCount}/3</p>
        </div>
      </div>

      {messages.map(message => (
        <div
          key={message.id}
          className="falling-message"
          style={{
            left: `${message.left}%`,
            animationDelay: `${message.animationDelay}s`
          }}
        >
          {message.text}
        </div>
      ))}
     {flowers.map(flower => (
  <div
    key={flower.id}
    className="flower"
    style={{
      left: flower.x,
      top: flower.y,
      transform: `rotate(${flower.rotation}deg)`,
      width: flower.size,
      height: flower.size
    }}
  >
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="petal"
        style={{ transform: `rotate(${i * 60}deg) translate(-50%, -100%)` }}
      ></div>
    ))}
    <div className="center"></div>
  </div>
))}
  </div>  
  );
}
//text sample
export default App;
