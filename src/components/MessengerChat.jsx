import React, { useState } from 'react';
import { FaSmile, FaPaperPlane, FaMicrophone, FaTimes } from 'react-icons/fa';
import './MessengerChat.css';

const MessengerChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([
    {
      id: 1,
      name: 'John Doe',
      lastMessage: 'Hey, how are you?',
      time: '10:30 AM',
      unread: 2,
      messages: [
        { id: 1, sender: 'John Doe', content: 'Hey, how are you?', timestamp: '10:30 AM' },
        { id: 2, sender: 'You', content: 'I\'m good, thanks!', timestamp: '10:31 AM' }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      lastMessage: 'I sent you the files',
      time: '9:45 AM',
      unread: 0,
      messages: [
        { id: 1, sender: 'Jane Smith', content: 'I sent you the files', timestamp: '9:45 AM' },
        { id: 2, sender: 'You', content: 'Thanks for sharing!', timestamp: '9:46 AM' }
      ]
    },
    {
      id: 3,
      name: 'Team Meeting',
      lastMessage: 'Meeting at 2 PM',
      time: '8:15 AM',
      unread: 1,
      messages: [
        { id: 1, sender: 'Team', content: 'Meeting at 2 PM', timestamp: '8:15 AM' },
        { id: 2, sender: 'You', content: 'I\'ll be there!', timestamp: '8:16 AM' }
      ]
    }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && selectedChat) {
      const newMessage = {
        id: Date.now(),
        sender: 'You',
        content: message,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      
      setChats(prevChats => 
        prevChats.map(chat => 
          chat.id === selectedChat.id 
            ? { ...chat, messages: [...chat.messages, newMessage], unread: 0 }
            : chat
        )
      );
      setMessage('');
    }
  };

  const toggleChat = () => {
    setSelectedChat(null);
    setIsOpen(!isOpen);
  };

  const selectChat = (chat) => {
    setSelectedChat(chat);
    setChats(prevChats => 
      prevChats.map(c => 
        c.id === chat.id 
          ? { ...c, unread: 0 }
          : c
      )
    );
  };

  return (
    <div className="messenger-container">
      {/* Chat Bar */}
      <div className={`chat-bar ${isOpen ? 'open' : ''}`} onClick={toggleChat}>
        <div className="chat-bar-content">
          <span className="chat-count">3</span>
          <span className="chat-text">Messages</span>
        </div>
      </div>

      {/* Chat Panel */}
      <div className={`chat-panel ${isOpen ? 'open' : ''}`}>
        {/* Chat List */}
        <div className="chat-list">
          <div className="chat-header">
            <button className="close-button" onClick={toggleChat}>
              <FaTimes />
            </button>
            <h3>Messages</h3>
          </div>
          <div className="chat-list-content">
            {chats.map((chat) => (
              <div key={chat.id} className="chat-item" onClick={() => selectChat(chat)}>
                <div className="chat-item-content">
                  <div className="chat-item-info">
                    <h4>{chat.name}</h4>
                    <span className="chat-time">{chat.time}</span>
                  </div>
                  <div className="chat-item-message">
                    <p>{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <span className="unread-count">{chat.unread}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Chat Messages Display */}
            {selectedChat && (
              <div className="chat-messages">
                <div className="chat-messages-header">
                  <h4>{selectedChat.name}</h4>
                </div>
                <div className="chat-messages-content">
                  {selectedChat.messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.sender === 'You' ? 'sent' : 'received'}`}>
                      <div className="message-content">
                        <span className="message-sender">{msg.sender}</span>
                        <p>{msg.content}</p>
                        <span className="message-time">{msg.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chat Input */}
        <div className="chat-input-container">
          <div className="chat-input-wrapper">
            <div className="chat-input-icons">
              <FaSmile className="icon" />
              <FaPaperPlane className="icon" />
            </div>
            <form onSubmit={handleSendMessage}>
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="chat-input"
              />
            </form>
            <button className={`send-button ${message.trim() ? 'send' : ''}`} type="submit" onClick={handleSendMessage}>
              {message.trim() ? <FaPaperPlane className="icon" /> : <FaMicrophone className="icon" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessengerChat;
