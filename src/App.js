// App.js

import React, { useState } from 'react';
import RegisterPage from './RegisterPage';
import Home from './Home';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleLogin = (userId) => {
    console.log('User logged in with ID:', userId);
    setIsLoggedIn(true);
    setUserId(userId);
  };

  return (
    <div>
      {isLoggedIn ? (
        <Home userId={userId} />
      ) : (
        <RegisterPage onLoginSuccess={handleLogin} />
      )}
    </div>
  );
};

export default App;
