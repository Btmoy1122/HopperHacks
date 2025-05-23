import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Journal.css';

const Journal = () => {
    const [entry, setEntry] = useState('');
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchEntries = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('http://localhost:5000/api/journal-entries');
            setEntries(response.data);
        } catch (error) {
            console.error("Error fetching entries:", error);
            setError('Failed to fetch journal entries. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const logEntry = async () => {
        if (!entry.trim()) {
            setError('Journal entry cannot be empty.');
            return;
        }

        setError('');
        try {
            await axios.post('http://localhost:5000/api/log-journal', { entry });
            setEntry(''); // Clear the textarea after logging
            fetchEntries(); // Refresh the list of entries
        } catch (error) {
            console.error("Error logging entry:", error);
            setError('Failed to log journal entry. Please try again.');
        }
    };

    const clearEntries = async () => {
        setError('');
        try {
            console.log('Attempting to clear journal entries...');
            const response = await axios.delete('http://localhost:5000/api/clear-journal');
            console.log('Response:', response.data);
            setEntries([]); // Clear the entries in the UI
        } catch (error) {
            console.error("Error clearing entries:", error);
            setError(`Failed to clear journal entries. Error: ${error.response?.status}`);
        }
    };
    
    useEffect(() => {
        fetchEntries();
    }, []);

    return (
        <div className="container">
            <h1>Journal</h1>
            <textarea
                placeholder="Write your journal entry..."
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
            />
            <button onClick={logEntry} disabled={loading}>
                {loading ? 'Logging...' : 'Log Entry'}
            </button>
            <button onClick={clearEntries} disabled={loading} style={{ marginTop: '10px', backgroundColor: '#ff4444' }}>
                Clear Journal
            </button>
            {error && <p className="error-message">{error}</p>}
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