import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Ensure styles are included

const Journal = () => {
    const [entry, setEntry] = useState('');
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    
    let recognition;

    useEffect(() => {
        fetchEntries();
    }, []);

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

    // Start Voice Recognition
    const startRecording = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Speech recognition is not supported in this browser. Try Chrome or Edge.');
            return;
        }

        recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setIsRecording(true);
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setEntry(prevEntry => prevEntry + ' ' + transcript);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            setError('Speech recognition error. Please try again.');
        };

        recognition.onend = () => {
            setIsRecording(false);
        };

        recognition.start();
    };

    return (
        <div className="journal-container">
            <h1>Journal</h1>
            <textarea
                placeholder="Write or dictate your journal entry..."
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
            />
            <div className="button-container">
                <button onClick={logEntry} disabled={loading}>
                    {loading ? 'Logging...' : 'Log Entry'}
                </button>
                <button onClick={clearEntries} disabled={loading} style={{ backgroundColor: '#ff4444' }}>
                    Clear Journal
                </button>
                <button onClick={startRecording} disabled={isRecording} style={{ backgroundColor: isRecording ? '#ccc' : '#007BFF' }}>
                    {isRecording ? 'Listening...' : 'Start Recording'}
                </button>
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="journal-entries">
                {entries.map((entry, index) => (
                    <div key={index} className="journal-entry">
                        <strong>{entry.date}:</strong> {entry.entry}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Journal;
