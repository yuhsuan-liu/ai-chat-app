import React, { useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import './chat.css';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (message.trim()) {
      setChat([...chat, { user: 'You', text: message }]);
      setMessage('');

      try {
        const response = await axios.post('https://ai-chat-app-rkz1.onrender.com/api/chat', {
          message,
        });

        setChat((prevChat) => [
          ...prevChat,
          { user: 'AI', text: response.data.reply },
        ]);
      } catch (error) {
        console.error(error);
      }
    }
  };

//function to clear chatting history
  const clearChat = () => {
    setChat([])
  };

//function to export chat history into PDF files
const downloadPDF = () => {
  const doc = new jsPDF();
  const leftMargin = 20;
  const topMargin = 20;
  const lineHeight = 10;
  const pageWidth = doc.internal.pageSize.getWidth();
  const textWidth = pageWidth - leftMargin * 2;
  chat.forEach((entry,i) => {
    doc.text(`${entry.user}:${entry.text}`,leftMargin, topMargin + i * lineHeight);
  });
  doc.save('chat-history.pdf');
  };


  return (
    <div className="chat-container">
      <div className="chat-messages">
        {chat.map((entry, index) => (
          <div key={index} className={`message ${entry.user === 'You' ? 'user-message' : 'ai-message'}`}>
            <strong>{entry.user}:</strong> {entry.text}
          </div>
        ))}
      </div>
      <input
        className="chat-input"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Type your message..."
      />
      <div className="button-group">
        <button className="chat-button send-button" onClick={sendMessage}>Send</button>
        <button className="chat-button clear-button" onClick={clearChat}>Clear</button>
        <button className="chat-button download-button" onClick={downloadPDF}>Download PDF</button>
      </div>
      <div className="attribution">
        Made by Yuhsuan Liu
        <div className="social-links">

          <a href="https://www.linkedin.com/in/yuhsuan-liu-yl/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://github.com/yuhsuan-liu/ai-chat-app" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Chat;

