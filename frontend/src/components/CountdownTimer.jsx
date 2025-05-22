import React, { useState, useEffect } from 'react';
import '../styling/CountdownTimer.css'; // Import your CSS file

const MAX_TIMERS = 3;

function CountdownTimer() {
  const [timers, setTimers] = useState([
    { input: { hours: 0, minutes: 0, seconds: 0 }, timeRemaining: { hours: 0, minutes: 0, seconds: 0 }, isRunning: false }
  ]);

  useEffect(() => {
    const intervalIds = timers.map((timer, idx) => {
      if (!timer.isRunning) return null;
      return setInterval(() => {
        setTimers(prevTimers => prevTimers.map((t, i) => {
          if (i !== idx || !t.isRunning) return t;
          const totalSeconds = t.timeRemaining.hours * 3600 + t.timeRemaining.minutes * 60 + t.timeRemaining.seconds - 1;
          if (totalSeconds <= 0) {
            return { ...t, isRunning: false, timeRemaining: { hours: 0, minutes: 0, seconds: 0 } };
          }
          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = totalSeconds % 60;
          return { ...t, timeRemaining: { hours, minutes, seconds } };
        }));
      }, 1000);
    });

    return () => intervalIds.forEach(id => id && clearInterval(id));
  }, [timers]);

  const handleChange = (idx, e) => {
    const { name, value } = e.target;
    setTimers(prev =>
      prev.map((timer, i) =>
        i === idx
          ? {
              ...timer,
              input: { ...timer.input, [name]: Math.max(0, parseInt(value) || 0) }
            }
          : timer
      )
    );
  };

  const handleStart = idx => {
    setTimers(prev =>
      prev.map((timer, i) =>
        i === idx
          ? {
              ...timer,
              timeRemaining: { ...timer.input },
              isRunning: true
            }
          : timer
      )
    );
  };

  const handleReset = idx => {
    setTimers(prev =>
      prev.map((timer, i) =>
        i === idx
          ? {
              ...timer,
              isRunning: false,
              timeRemaining: { hours: 0, minutes: 0, seconds: 0 },
              input: { hours: 0, minutes: 0, seconds: 0 }
            }
          : timer
      )
    );
  };

  const handleAddTimer = () => {
    if (timers.length < MAX_TIMERS) {
      setTimers([
        ...timers,
        { input: { hours: 0, minutes: 0, seconds: 0 }, timeRemaining: { hours: 0, minutes: 0, seconds: 0 }, isRunning: false }
      ]);
    }
  };

  const handleRemoveTimer = idx => {
    setTimers(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div>
      {timers.map((timer, idx) => (
        <div className="countdown-timer-container" key={idx}>
          <div className="countdown-timer-inputs">
            <input
              type="number"
              name="hours"
              min="0"
              value={timer.input.hours}
              onChange={e => handleChange(idx, e)}
              disabled={timer.isRunning}
            /> h
            <input
              type="number"
              name="minutes"
              min="0"
              max="59"
              value={timer.input.minutes}
              onChange={e => handleChange(idx, e)}
              disabled={timer.isRunning}
            /> m
            <input
              type="number"
              name="seconds"
              min="0"
              max="59"
              value={timer.input.seconds}
              onChange={e => handleChange(idx, e)}
              disabled={timer.isRunning}
            /> s
            <button
              onClick={() => handleStart(idx)}
              disabled={
                timer.isRunning ||
                (timer.input.hours === 0 && timer.input.minutes === 0 && timer.input.seconds === 0)
              }
            >
              Start
            </button>
            <button onClick={() => handleReset(idx)}>
              Reset
            </button>
          </div>
          <div className="countdown-timer-display">
            <span>{timer.timeRemaining.hours.toString().padStart(2, '0')}</span>:
            <span>{timer.timeRemaining.minutes.toString().padStart(2, '0')}</span>:
            <span>{timer.timeRemaining.seconds.toString().padStart(2, '0')}</span>
          </div>
        </div>
      ))}
      <div className="countdown-timer-controls">
        <button onClick={handleAddTimer} disabled={timers.length >= MAX_TIMERS}>
          Add Timer
        </button>
        {timers.length > 1 && (
          <button
            style={{ marginLeft: '0.5em' }}
            onClick={() => handleRemoveTimer(timers.length - 1)}
          >
            Remove Timer
          </button>
        )}
      </div>
    </div>
  );
}

export default CountdownTimer;