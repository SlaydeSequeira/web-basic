import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import firebaseConfig from './firebaseConfig';
import LM from './LM';
import RM from './RM';
import './Chat.css'
const Text = ({ id1, id2 ,username,imageURL}) => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const snapshot = await firebase
        .database()
        .ref('Chats')
        .once('value');

      const messagesData = snapshot.val();

      if (messagesData) {
        const filteredMessages = Object.entries(messagesData)
          .map(([key, message]) => ({
            key, // The key is the unique identifier
            ...message,
          }))
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

  useEffect(() => {
    fetchMessages();
  }, [id1, id2]);

  return (
    <div id="chat-container" className="clearfix">
      {messages.map((message) => {
        if (message.sender === id1) {
          return <LM key={message.key} m={message.message} />;
        } else if (message.sender === id2) {
          return <RM key={message.key} m={message.message} />;
        }
        return null;
      })}
    </div>
  );
};

export default Text;
