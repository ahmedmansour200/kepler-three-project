import React from 'react';
import {
  MapContainer,
  TileLayer,
  Polygon,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { statesData } from '../data'; // Ensure this imports your geo data
import Building from './Building';

const center = [40.63463151377654, -97.89969605983609]; // Map center coordinates
const buildingPosition = [40.63463151377654, -97.89969605983609]; // Coordinates for the building

const MyMap = () => {
  return (
    <>
      <MapContainer
        center={center}
        zoom={10}
        style={{ width: '100vw', height: '100vh', position: 'relative' }} // Ensure the map takes full space
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {
          statesData.features.map((state, index) => {
            const coordinates = state.geometry.coordinates[0].map((item) => [item[1], item[0]]);
            
            return (
              <Polygon
                key={state.properties.name || index}
                pathOptions={{
                  fillColor: '#FD8D3C',
                  fillOpacity: 0.7,
                  weight: 2,
                  opacity: 1,
                  dashArray: 3,
                  color: 'white',
                }}
                positions={coordinates}
                eventHandlers={{
                  mouseover: (e) => {
                    const layer = e.target;
                    layer.setStyle({
                      dashArray: '',
                      fillColor: '#BD0026',
                      fillOpacity: 0.7,
                      weight: 2,
                      opacity: 1,
                      color: 'white',
                    });
                  },
                  mouseout: (e) => {
                    const layer = e.target;
                    layer.setStyle({
                      fillOpacity: 0.7,
                      weight: 2,
                      dashArray: '3',
                      color: 'white',
                      fillColor: '#FD8D3C',
                    });
                  },
                  click: (e) => {
                    console.log(`${state.properties.name} clicked!`);
                  },
                }}
              />
            );
          })
        }
      </MapContainer>
      {/* Render the Building component */}
      <Building position={buildingPosition} />
    </>
  );
};

export default MyMap;
