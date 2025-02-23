// Meditation.js
import React, { useState } from 'react';
import './Meditation.css';

const Meditation = () => {
    const [isBreathing, setIsBreathing] = useState(false);

    const startBreathing = () => {
        setIsBreathing(true);
        setTimeout(() => setIsBreathing(false), 10000); // Stop after 10 seconds
    };

    return (
        <div>
            <h1>Guided Meditation</h1>
            <audio controls>
                <source src="/meditation.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <button onClick={startBreathing}>Start Breathing Exercise</button>
            <div className={`circle ${isBreathing ? 'expand' : ''}`}></div>
        </div>
    );
};

export default Meditation;