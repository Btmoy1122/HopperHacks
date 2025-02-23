import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Chatbot() {
  const [message, setMessage] = useState("");  // Stores current input
  const [conversation, setConversation] = useState([]); // Stores chat history

  const sendMessage = async (inputMessage) => {
    if (!inputMessage) return;

    // Add user's message to conversation
    setConversation((prev) => [...prev, { sender: "You", text: inputMessage }]);

    try {
      const res = await fetch("http://127.0.0.1:5000/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
      const botResponse = data.response;

      // Add chatbot's response to conversation
      setConversation((prev) => [...prev, { sender: "Bot", text: botResponse }]);

    } catch (error) {
      console.error("Fetch error:", error);
      setConversation((prev) => [...prev, { sender: "Bot", text: "Error: Unable to connect to chatbot server." }]);
    }

    setMessage(""); // Clear input after sending
  };

  const handleVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setMessage(speechText); // Show recognized text in input box
      sendMessage(speechText); // Send recognized speech as a message
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event);
    };
  };

  return (
    <div className="chat-container">
      <h1>Health Bot AI</h1>
      <div className="chat-box">
        <div className="chat-history">
          {conversation.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender === "You" ? "user-message" : "bot-message"}`}>
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))}
        </div>
        <textarea 
          placeholder="Type your question here..." 
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="button-container">
          <button onClick={() => sendMessage(message)}>Send</button>
          <button onClick={handleVoiceInput}>🎙 Speak</button> {/* Voice Input Button */}
        </div>
        <Link to="/" className="back-home">⬅ Back to Home</Link>
      </div>
    </div>
  );
}

export default Chatbot;
