// StressTracker.js
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const StressTracker = () => {
    const [stressLevel, setStressLevel] = useState(0);
    const [trigger, setTrigger] = useState('');
    const [logs, setLogs] = useState([]);

    const fetchLogs = async () => {
        const response = await axios.get('/api/stress-logs');
        setLogs(response.data);
    };

    const logStress = async () => {
        await axios.post('/api/log-stress', { stress_level: stressLevel, trigger });
        fetchLogs();
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const data = {
        labels: logs.map(log => log.date),
        datasets: [
            {
                label: 'Stress Level',
                data: logs.map(log => log.stress_level),
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
            },
        ],
    };

    return (
        <div>
            <h1>Stress Tracker</h1>
            <input
                type="number"
                placeholder="Stress Level (1-10)"
                value={stressLevel}
                onChange={(e) => setStressLevel(e.target.value)}
            />
            <input
                type="text"
                placeholder="Trigger"
                value={trigger}
                onChange={(e) => setTrigger(e.target.value)}
            />
            <button onClick={logStress}>Log Stress</button>
            <Line data={data} />
        </div>
    );
};

export default StressTracker;