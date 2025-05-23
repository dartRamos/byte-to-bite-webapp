import React, { useState, useEffect, useRef } from 'react';
import '../styling/CountdownTimer.css';

const MAX_TIMERS = 3;

function CountdownTimer() {
  const [timers, setTimers] = useState([
    { input: { hours: 0, minutes: 0, seconds: 0 }, timeRemaining: { hours: 0, minutes: 0, seconds: 0 }, isRunning: false, label: '' }
  ]);
  const [labelModal, setLabelModal] = useState({ open: false, idx: null, value: '' });
  const audioRefs = useRef([]);

  useEffect(() => {
    const intervalIds = timers.map((timer, idx) => {
      if (!timer.isRunning) return null;
      return setInterval(() => {
        setTimers(prevTimers => prevTimers.map((t, i) => {
          if (i !== idx || !t.isRunning) return t;
          const totalSeconds = t.timeRemaining.hours * 3600 + t.timeRemaining.minutes * 60 + t.timeRemaining.seconds - 1;
          if (totalSeconds <= 0) {
            if (audioRefs.current[idx]) {
              audioRefs.current[idx].play();
            }
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
          ? { ...timer, input: { ...timer.input, [name]: Math.max(0, parseInt(value) || 0) } }
          : timer
      )
    );
  };

  // Open modal instead of starting timer directly
  const handleStart = idx => {
    setLabelModal({ open: true, idx, value: timers[idx].label || '' });
  };

  // When modal is submitted
  const handleLabelSubmit = e => {
    e.preventDefault();
    setTimers(prev =>
      prev.map((timer, i) =>
        i === labelModal.idx
          ? {
              ...timer,
              timeRemaining: { ...timer.input },
              isRunning: true,
              label: labelModal.value
            }
          : timer
      )
    );
    setLabelModal({ open: false, idx: null, value: '' });
  };

  const handleLabelChange = e => {
    setLabelModal(modal => ({ ...modal, value: e.target.value }));
  };

  const handleLabelCancel = () => {
    setLabelModal({ open: false, idx: null, value: '' });
  };

  const handleReset = idx => {
    if (audioRefs.current[idx]) {
      audioRefs.current[idx].pause();
      audioRefs.current[idx].currentTime = 0;
    }
    setTimers(prev =>
      prev.map((timer, i) =>
        i === idx
          ? {
              ...timer,
              isRunning: false,
              timeRemaining: { hours: 0, minutes: 0, seconds: 0 },
              input: { hours: 0, minutes: 0, seconds: 0 },
              label: ''
            }
          : timer
      )
    );
  };

  const handleAddTimer = () => {
    if (timers.length < MAX_TIMERS) {
      setTimers([
        ...timers,
        { input: { hours: 0, minutes: 0, seconds: 0 }, timeRemaining: { hours: 0, minutes: 0, seconds: 0 }, isRunning: false, label: '' }
      ]);
    }
  };

  const handleRemoveTimer = idx => {
    setTimers(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="countdown-timer-wrapper">
      {timers.map((timer, idx) => (
        <div className="countdown-timer-container" key={idx}>
          {timer.label && (
            <div className="countdown-timer-label" style={{ fontWeight: 'bold', marginBottom: '0.5em' }}>
              {timer.label}
            </div>
          )}
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
          <div className="countdown-timer-controls">
            <button onClick={handleAddTimer} disabled={timers.length >= MAX_TIMERS}>
              Add Timer
            </button>
            {timers.length > 1 && (
              <button
                style={{ marginLeft: '0.5em' }}
                onClick={() => handleRemoveTimer(idx)}
              >
                Remove Timer
              </button>
            )}
          </div>
          <audio
            ref={el => (audioRefs.current[idx] = el)}
            src="/alarm_wake_up.mp3"
            preload="auto"
            loop
          />
        </div>
      ))}

      {/* Modal for label input */}
      {labelModal.open && (
        <div className="countdown-timer-modal-backdrop">
          <form className="countdown-timer-modal-form" onSubmit={handleLabelSubmit}>
            <label>
              Enter a label for this timer:
              <input
                type="text"
                value={labelModal.value}
                onChange={handleLabelChange}
                autoFocus
                style={{ marginTop: '0.5em', width: '100%' }}
              />
            </label>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5em' }}>
              <button type="button" onClick={handleLabelCancel}>Cancel</button>
              <button type="submit">Start</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default CountdownTimer;