import React, { useState, useEffect } from 'react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 left-6 z-40 w-12 h-12 bg-dark-800 hover:bg-dark-700 text-lime-400 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-dark-600 hover:border-lime-400/50"
      aria-label="Scroll to top"
    >
      <i className="bi bi-arrow-up text-lg"></i>
    </button>
  );
};

export default ScrollToTop;
