import React, { useState, useEffect } from 'react';
import styles from "./stopwatch.module.css"

const Stopwatch = () => {
  const [time, setTime] = useState(0); // Store time in milliseconds
  const [isRunning, setIsRunning] = useState(false); // Store the running state

  // Update the stopwatch every second when running
  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1000); // Increment by 1000 milliseconds (1 second)
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  const handleStartStop = () => {
    setIsRunning(!isRunning); // Toggle the running state
  };

  const handleReset = () => {
    setIsRunning(false); // Stop the stopwatch
    setTime(0); // Reset the time to 0
  };

  const formatTime = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 60000) % 60);

    return `${minutes.toString().padStart(1, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className={styles.stopwatch}>
      <h2>Stopwatch</h2>
      <h3>Time: {formatTime(time)}</h3>
      <div>
        <button onClick={handleStartStop}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch;
