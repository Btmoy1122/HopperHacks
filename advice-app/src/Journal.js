// Journal.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Journal = () => {
    const [entry, setEntry] = useState('');
    const [entries, setEntries] = useState([]);

    const fetchEntries = async () => {
        const response = await axios.get('/api/journal-entries');
        setEntries(response.data);
    };

    const logEntry = async () => {
        await axios.post('/api/log-journal', { entry });
        fetchEntries();
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    return (
        <div>
            <h1>Journal</h1>
            <textarea
                placeholder="Write your journal entry..."
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
            />
            <button onClick={logEntry}>Log Entry</button>
            <ul>
                {entries.map((entry, index) => (
                    <li key={index}>
                        <strong>{entry.date}:</strong> {entry.entry}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Journal;