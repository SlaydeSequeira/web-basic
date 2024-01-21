import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import firebaseConfig from './firebaseConfig';
import Text from './Text'; // Import the new Text component
import './Message.css'; // Import the CSS file for styling

const Message = ({ uid }) => {
  const [uidData, setUidData] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app();
    }
    const fetchUidData = firebase.database().ref(`ChatList/${uid}`).once('value');
    const fetchUserData = firebase.database().ref('MyUsers').once('value');
    const fetchMessages = firebase.database().ref(`ChatList/${uid}/stuff i need`).once('value');
    Promise.all([fetchUidData, fetchUserData, fetchMessages])
      .then(([uidSnapshot, userSnapshot, messagesSnapshot]) => {
        const fetchedUidData = [];
        uidSnapshot.forEach(childSnapshot => {
          const childUID = childSnapshot.key;
          const id = childSnapshot.val().id;
          fetchedUidData.push({ uid: childUID, id });
        });

        const userNamesAndImages = {};
        userSnapshot.forEach(childSnapshot => {
          const childUID = childSnapshot.key;
          const username = childSnapshot.val().username;
          const imageURL = childSnapshot.val().imageURL;
          userNamesAndImages[childUID] = { username, imageURL };
        });

        const updatedUidData = fetchedUidData.map(item => ({
          uid: item.uid,
          id: item.id,
          username: userNamesAndImages[item.uid].username,
          imageURL: userNamesAndImages[item.uid].imageURL,
        }));
        setUidData(updatedUidData);

        const fetchedMessages = [];
        messagesSnapshot.forEach(childSnapshot => {
          const data = childSnapshot.val();
          fetchedMessages.push(data);
        });
        setMessages(fetchedMessages);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [uid]);

  const handleListItemClick = (itemId) => {
    console.log('Item clicked:', itemId);
    setSelectedItemId(itemId);
  };

  return (
    <div className="message-container">
      <div className="user-list" style={{backgroundColor:'#8c8c8c'}}>
        <h2>Chats </h2>
        <ul>
          {uidData.map((item, index) => (
            <li style={{backgroundColor:'#bfbfbf'}} key={index} onClick={() => handleListItemClick(item.id)}>
              <div style={{borderRadius:'100px', width: '50px', height: '50px' }}>
              {item.imageURL && (
                <img
  src={item.imageURL || 'https://clipground.com/images/my-profile-icon-clipart-2.jpg'}
  alt={item.imageURL || 'Placeholder Image'}
  style={{ width: '50px', height: '50px', borderRadius: '100px' }}
/>
              )}              </div>

              <h4 style={{marginLeft:'20px'}}>{item.username}</h4>
            </li>
          ))}
        </ul>
      </div>

      <div className="messages">
        {selectedItemId && (
          <Text
            id1={selectedItemId}
            id2={uid}
            username={uidData.find(item => item.id === selectedItemId)?.username}
            imageURL={uidData.find(item => item.id === selectedItemId)?.imageURL}
          />
        )}
      </div>
    </div>
  );
};

export default Message;
