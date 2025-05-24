import React, { useState } from 'react';
import axios from 'axios';
import { jsPDF} from 'jspdf';

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
    <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
      <div>
        {chat.map((entry, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
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
        style={{ width: '100%', padding: '8px', marginTop: '10px' }}
      />
      <div style={{ marginTop: '10px' }}>
        <button onClick={sendMessage}>Send</button>
        <button onClick={clearChat} style={{marginLeft: '10px'}}>Clear</button>
        <button onClick={downloadPDF} style={{ marginLeft: '10px'}}>Download PDF</button>
      </div>
    </div>
  );
};

export default Chat;

