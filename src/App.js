import React, { useState } from 'react';
import RegisterPage from './RegisterPage';
import Home from './Home';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null); // State to hold the user ID

  const handleLogin = (userId) => {
    setIsLoggedIn(true);
    setUserId(userId); // Set the user ID upon successful login
  };

  return (
    <div>
      {isLoggedIn ? (
        <Home userId={userId} /> // Pass the userId as a prop to Home
      ) : (
        <RegisterPage onLoginSuccess={handleLogin} />
      )}
    </div>
  );
};

export default App;
