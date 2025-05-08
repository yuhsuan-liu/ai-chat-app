import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (message.trim()) {
      setChat([...chat, { user: 'You', text: message }]);
      setMessage('');

      try {
        const response = await axios.post('http://localhost:5000/api/chat', {
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

  return (
    <div>
      <div>
        {chat.map((entry, index) => (
          <div key={index}>
            <strong>{entry.user}:</strong> {entry.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;