import React, { useState, useEffect, useRef } from 'react';
import './Meditation.css';

const Meditation = () => {
    const [isExpanding, setIsExpanding] = useState(false);
    const [breathSpeed, setBreathSpeed] = useState(5000); // Default 5s per breath cycle
    const [isBreathing, setIsBreathing] = useState(false);
    const intervalRef = useRef(null);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (isBreathing) {
            intervalRef.current = setInterval(() => {
                setIsExpanding(prev => !prev); // Toggle breathing animation
            }, breathSpeed);
        } else {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        return () => clearInterval(intervalRef.current);
    }, [isBreathing, breathSpeed]);

    const startBreathing = () => {
        if (!isBreathing) {
            setIsBreathing(true);
            setIsExpanding(true); // Start expanding immediately
        }
    };

    const stopBreathing = () => {
        setIsBreathing(false);
        setIsExpanding(false);
    };

    const toggleAudio = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(error => console.error("Audio playback failed:", error));
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="meditation-container">
            <h1>Guided Meditation</h1>

            <audio ref={audioRef}>
                <source src={process.env.PUBLIC_URL + "/meditation.mp3"} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>

            <div className="audio-controls">
                <button onClick={toggleAudio}>{isPlaying ? "Pause Sound" : "Play Sound"}</button>
            </div>

            <div className="speed-input">
                <label>Breathing Speed (ms per cycle): </label>
                <input 
                    type="range" 
                    min="2000" 
                    max="10000" 
                    step="500"
                    value={breathSpeed}
                    onChange={(e) => setBreathSpeed(Number(e.target.value))}
                />
                <span>{breathSpeed / 1000} sec</span>
            </div>

            <div className="button-container">
                <button onClick={startBreathing} disabled={isBreathing}>Start</button>
                <button onClick={stopBreathing} disabled={!isBreathing}>Stop</button>
            </div>

            <div 
                className={`circle ${isExpanding ? 'expand' : 'shrink'}`} 
                style={{ transition: `transform ${breathSpeed / 2000}s ease-in-out` }} 
            ></div>
        </div>
    );
};

export default Meditation;
