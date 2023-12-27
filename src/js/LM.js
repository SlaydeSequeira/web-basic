// LM component
import React from 'react';
import './Chat.css'; // Import the CSS file

const LM = ({ m }) => {
  return (
    <div className="LM-container">
      <p>{m}</p>
    </div>
  );
};

export default LM;