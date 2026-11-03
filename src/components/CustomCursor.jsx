import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorArrowRef = useRef(null);
  const cursorRingRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only activate for non-touch devices
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId = null;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);

      if (cursorArrowRef.current) {
        cursorArrowRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const render = () => {
      // Smooth lerp physics for trailing halo ring
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    const attachHoverListeners = () => {
      const targets = document.querySelectorAll(
        'a, button, .bento-card, .project-card, .contact-card, .filter-tab, .skill-pill, .bento-hero-section'
      );
      targets.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    rafId = requestAnimationFrame(render);
    attachHoverListeners();

    const t1 = setTimeout(attachHoverListeners, 1000);
    const t2 = setTimeout(attachHoverListeners, 2500);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="custom-cursor-container" aria-hidden="true">
      {/* Big Designer Arrow Pointer */}
      <div
        ref={cursorArrowRef}
        className={`big-cursor-arrow ${!isVisible ? 'is-hidden' : ''} ${isHovering ? 'is-hovering' : ''}`}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-svg"
        >
          {/* Futuristic precision pointer */}
          <path
            d="M3 3L10.5 21L14 14L21 10.5L3 3Z"
            fill="#FFFFFF"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Trailing Fluid Magnetic Halo */}
      <div
        ref={cursorRingRef}
        className={`big-cursor-ring ${isHovering ? 'is-hovering' : ''} ${isClicking ? 'is-clicking' : ''} ${!isVisible ? 'is-hidden' : ''}`}
      >
        <span className="cursor-ring-pulse" />
      </div>
    </div>
  );
}
