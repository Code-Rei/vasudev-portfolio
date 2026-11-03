import React, { useState, useEffect } from 'react';

export default function TypewriterText({
  text,
  speed = 18,
  delay = 0,
  isTriggered = true,
  className = '',
  as: Component = 'span',
}) {
  const [displayedText, setDisplayedText] = useState(isTriggered ? '' : text);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isTriggered) {
      setDisplayedText('');
      setIsTyping(false);
      return;
    }

    setDisplayedText('');
    setIsTyping(true);

    const startTimer = setTimeout(() => {
      let currentIdx = 0;
      const interval = setInterval(() => {
        currentIdx++;
        setDisplayedText(text.slice(0, currentIdx));

        if (currentIdx >= text.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [text, isTriggered, speed, delay]);

  return (
    <Component className={`typewriter-container ${className}`}>
      {displayedText}
      {isTyping && <span className="typewriter-caret">|</span>}
    </Component>
  );
}
