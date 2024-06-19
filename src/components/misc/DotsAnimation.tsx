import React, { useState, useEffect } from 'react';
import styles from './DotsAnimation.module.css';

const DotsAnimation: React.FC = () => {
  const [dots, setDots] = useState<number[]>([]);
  const [increasing, setIncreasing] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (increasing) {
          if (prevDots.length < 10) {
            return [...prevDots, prevDots.length];
          } else {
            setIncreasing(false);
            return prevDots.slice(0, -1);
          }
        } else {
          if (prevDots.length > 1) {
            return prevDots.slice(0, -1);
          } else {
            setIncreasing(true);
            return [...prevDots, prevDots.length];
          }
        }
      });
    }, 300);

    return () => clearInterval(interval);
  }, [increasing]);

  return (
    <div className={styles.dotsContainer}>
      {dots.map((dot, index) => (
        <div key={index} className={styles.dot}></div>
      ))}
    </div>
  );
};

export default DotsAnimation;
