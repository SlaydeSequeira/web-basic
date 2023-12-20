import React from 'react';

const Map = () => {
  return (
    <div>
      <iframe
        title="Map"
        width="600"
        height="450"
        loading="lazy"
        allowFullScreen
        src={`https://www.google.com/maps/embed/v1/place?q=place_id:ChIJVXealLU_xkcRja_At0z9AGY&key=AIzaSyABKwZg9-Ls2cAQ5gkEr5z4qtY9X3mQ5X4`}
      ></iframe>
    </div>
  );
};

export default Map;
