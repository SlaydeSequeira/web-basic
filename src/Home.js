import React from 'react';
import Map from './js/map'
import Message from './js/Message'

const Home = ({ userId }) => {

  return (
    <div>
      {/*<Map/>*/} {/*Use where u wanna make a map */}
      <Message uid={userId}/>
    </div>
  );
};

export default Home;