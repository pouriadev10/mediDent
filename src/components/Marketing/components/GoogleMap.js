import React, { useCallback } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '82%',
};



const GoogleMapComponent = ({ coordinates, setCoordinates }) => {
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: 'AIzaSyD656YHmwQkieoKwzJopN31fZmr9Vly7w0', 
    });
  
    const handleClick = useCallback((event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setCoordinates({ lat, lng });
    }, [setCoordinates]);
  
    if (!isLoaded) {
      return <div>Loading...</div>;
    }
  
    return (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={coordinates}
          zoom={10}
          onClick={handleClick}
        >
          <Marker position={coordinates} />
        </GoogleMap>
    );
  };

  export default GoogleMapComponent;