import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import firebaseConfig from './firebaseConfig';
import LM from './LM';
import RM from './RM';
import './Chat.css';

const Text = ({ id1, id2, username, imageURL }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const fetchMessages = async () => {
    try {
      const snapshot = await firebase.database().ref('Chats').once('value');
      const messagesData = snapshot.val();

      if (messagesData) {
        const filteredMessages = Object.entries(messagesData)
          .map(([key, message]) => ({ key, ...message }))
          .filter(
            (message) =>
              (message.sender === id1 && message.receiver === id2) ||
              (message.sender === id2 && message.receiver === id1)
          );

        setMessages(filteredMessages);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    try {
      // Generate a unique message ID, you can use your preferred method
      const messageId = firebase.database().ref('Chats').push().key;
      setNewMessage('');
      // Prepare the new message object
      const newMessageObj = {
        sender: id2,
        receiver: id1,
        message: newMessage,
        isseen: false,
      };

      // Update the database with the new message
      await firebase.database().ref(`Chats/${messageId}`).set(newMessageObj);

      // Fetch and update the messages to include the new message
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [id1, id2]);

  return (
    <div
      id="chat-container"
      className="clearfix"
      style={{
        margin: '20px',
        padding: '10px',
        position: 'relative',
        minHeight: '100vh',
      }}
    >
      {messages.map((message) => {
        if (message.sender === id1) {
          return <LM key={message.key} m={message.message} />;
        } else if (message.sender === id2) {
          return <RM key={message.key} m={message.message} />;
        }
        return null;
      })}
      <div
        style={{
          position: 'absolute',
          bottom: 50,
          width: '100%',
          margin: '10px',
          display: 'flex',
        }}
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          style={{ flex: 1, marginLeft: '10px', marginRight: '10px' }}
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Text;

