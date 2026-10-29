import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Circle, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { formatDistance } from '../utils/distance';

// Fix default Leaflet icon paths in React/Vite
delete L.Icon.Default.prototype._getIconUrl;

const createSvgIcon = (bgColor, iconText) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        background-color: ${bgColor};
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 2px solid #FFFFFF;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #FFFFFF;
        font-weight: 700;
        font-size: 11px;
      ">
        ${iconText}
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -16]
  });
};

const propertyIcon = createSvgIcon('#B94D3D', 'H'); // Terracotta Home
const schoolIcon = createSvgIcon('#5B84B1', 'S');    // School
const hospitalIcon = createSvgIcon('#D97A68', '+');  // Hospital / Healthcare
const transitIcon = createSvgIcon('#E9BD55', 'T');   // Transit / Metro

function MapCenterController({ center, radiusKm }) {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] && center[1]) {
      map.setView(center, radiusKm > 3 ? 13 : radiusKm > 1 ? 14 : 15);
    }
  }, [center, radiusKm, map]);
  return null;
}

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      if (onMapClick) {
        onMapClick(e.latlng.lat, e.latlng.lng);
      }
    }
  });
  return null;
}

export default function LocationMap({
  lat = 28.5244,
  lon = 77.1588,
  radiusKm = 2.0,
  propertyName = "Selected Property",
  schools = [],
  hospitals = [],
  transit = [],
  onLocationChange
}) {
  const position = [lat, lon];
  const radiusMeters = radiusKm * 1000;

  return (
    <div className="leaflet-map-wrapper">
      <MapContainer
        center={position}
        zoom={radiusKm > 3 ? 13 : radiusKm > 1 ? 14 : 15}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapCenterController center={position} radiusKm={radiusKm} />
        <MapClickHandler onMapClick={onLocationChange} />

        {/* Selected Property Marker */}
        <Marker position={position} icon={propertyIcon}>
          <Popup>
            <div style={{ textAlign: 'center', padding: '4px' }}>
              <strong style={{ color: '#B94D3D' }}>{propertyName}</strong>
              <div style={{ fontSize: '11px', color: '#82756C', marginTop: '2px' }}>
                Center of {radiusKm} km analysis zone
              </div>
            </div>
          </Popup>
        </Marker>

        {/* Radius Boundary Circle */}
        <Circle
          center={position}
          radius={radiusMeters}
          pathOptions={{
            color: '#B94D3D',
            fillColor: '#B94D3D',
            fillOpacity: 0.08,
            weight: 2,
            dashArray: '4, 6'
          }}
        />

        {/* Nearby Schools */}
        {schools.map((item, idx) => {
          const sLat = item.lat || item.latitude;
          const sLon = item.lon || item.longitude;
          if (!sLat || !sLon) return null;
          return (
            <Marker key={`school-${idx}`} position={[sLat, sLon]} icon={schoolIcon}>
              <Popup>
                <div>
                  <strong>{item.name}</strong>
                  <div style={{ fontSize: '12px', color: '#554A42' }}>
                    Type: {item.type || 'School'} | Distance: {formatDistance(item.distanceKm)}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Nearby Hospitals */}
        {hospitals.map((item, idx) => {
          const hLat = item.lat || item.latitude;
          const hLon = item.lon || item.longitude;
          if (!hLat || !hLon) return null;
          return (
            <Marker key={`hosp-${idx}`} position={[hLat, hLon]} icon={hospitalIcon}>
              <Popup>
                <div>
                  <strong>{item.name}</strong>
                  <div style={{ fontSize: '12px', color: '#554A42' }}>
                    {item.type || 'Hospital'} | Distance: {formatDistance(item.distanceKm)}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Nearby Transit Stops */}
        {transit.map((item, idx) => {
          const tLat = item.lat || item.latitude;
          const tLon = item.lon || item.longitude;
          if (!tLat || !tLon) return null;
          return (
            <Marker key={`transit-${idx}`} position={[tLat, tLon]} icon={transitIcon}>
              <Popup>
                <div>
                  <strong>{item.name}</strong>
                  <div style={{ fontSize: '12px', color: '#554A42' }}>
                    {item.line || item.type || 'Transit Stop'} | Distance: {formatDistance(item.distanceKm)}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
