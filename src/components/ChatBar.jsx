import React from 'react';
import { FaSmile, FaPaperclip, FaMicrophone } from 'react-icons/fa';
import './ChatBar.css';

const ChatBar = () => {
  const handleSendMessage = (e) => {
    e.preventDefault();
    // Add your message sending logic here
  };

  return (
    <div className="chat-bar">
      <div className="chat-bar-container">
        <div className="chat-bar-icons">
          <FaSmile className="icon" />
          <FaPaperclip className="icon" />
        </div>
        <div className="chat-input-container">
          <form onSubmit={handleSendMessage}>
            <input 
              type="text" 
              placeholder="Type a message" 
              className="chat-input"
            />
          </form>
        </div>
        <button className="send-button">
          <FaMicrophone className="icon" />
        </button>
      </div>
    </div>
  );
};

export default ChatBar;
