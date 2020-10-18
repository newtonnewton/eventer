import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function TestMap({location}) {
    
    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCfrEfZPtVnXDOcOHOLamEH-nMecA5tvEo' }}
                center={location.center}
                zoom={location.zoom}
            >
                <AnyReactComponent
                lat={location.center.lat}
                lng={location.center.lng}
                text="My Marker"
                />
            </GoogleMapReact>
        </div>
    );
}