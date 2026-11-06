
import React, { useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  Popup,
  useMap,
  useMapEvents
} from 'react-leaflet';
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

const propertyIcon = createSvgIcon('#B94D3D', 'H');
const schoolIcon = createSvgIcon('#5B84B1', 'S');
const hospitalIcon = createSvgIcon('#D97A68', '+');
const transitIcon = createSvgIcon('#E9BD55', 'T');

// Convert API coordinates into valid numeric coordinates.
const getCoordinates = (item) => {
  const latitude = Number(item?.lat ?? item?.latitude);
  const longitude = Number(item?.lon ?? item?.longitude);

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    return null;
  }

  return [latitude, longitude];
};

function MapCenterController({ center, radiusKm }) {
  const map = useMap();

  useEffect(() => {
    if (
      center &&
      Number.isFinite(center[0]) &&
      Number.isFinite(center[1])
    ) {
      const zoom = radiusKm > 3 ? 13 : radiusKm > 1 ? 14 : 15;
      map.setView(center, zoom);
    }
  }, [center, radiusKm, map]);

  return null;
}

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(event) {
      if (onMapClick) {
        onMapClick(event.latlng.lat, event.latlng.lng);
      }
    }
  });

  return null;
}

export default function LocationMap({
  lat = 28.5244,
  lon = 77.1588,
  radiusKm = 2,
  propertyName = 'Selected Property',
  schools = [],
  hospitals = [],
  transit = [],
  onLocationChange
}) {
  const latitude = Number(lat);
  const longitude = Number(lon);

  const validCenter =
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180;

  if (!validCenter) {
    return (
      <div className="leaflet-map-wrapper">
        <p>Map unavailable: the selected location has invalid coordinates.</p>
      </div>
    );
  }

  const position = [latitude, longitude];
  const safeRadius = Number.isFinite(Number(radiusKm))
    ? Math.max(0, Number(radiusKm))
    : 2;

  const radiusMeters = safeRadius * 1000;
  const zoom = safeRadius > 3 ? 13 : safeRadius > 1 ? 14 : 15;

  return (
    <div className="leaflet-map-wrapper">
      <MapContainer
        center={position}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapCenterController
          center={position}
          radiusKm={safeRadius}
        />

        <MapClickHandler onMapClick={onLocationChange} />

        <Marker position={position} icon={propertyIcon}>
          <Popup>
            <div style={{ textAlign: 'center', padding: '4px' }}>
              <strong style={{ color: '#B94D3D' }}>
                {propertyName}
              </strong>
              <div style={{
                fontSize: '11px',
                color: '#82756C',
                marginTop: '2px'
              }}>
                Center of {safeRadius} km analysis zone
              </div>
            </div>
          </Popup>
        </Marker>

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

        {schools.map((item, index) => {
          const coordinates = getCoordinates(item);
          if (!coordinates) return null;

          return (
            <Marker
              key={`school-${item.id ?? index}`}
              position={coordinates}
              icon={schoolIcon}
            >
              <Popup>
                <div>
                  <strong>{item.name || 'School'}</strong>
                  <div style={{ fontSize: '12px', color: '#554A42' }}>
                    Type: {item.type || 'School'} |
                    Distance: {formatDistance(item.distanceKm)}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {hospitals.map((item, index) => {
          const coordinates = getCoordinates(item);
          if (!coordinates) return null;

          return (
            <Marker
              key={`hospital-${item.id ?? index}`}
              position={coordinates}
              icon={hospitalIcon}
            >
              <Popup>
                <div>
                  <strong>{item.name || 'Hospital'}</strong>
                  <div style={{ fontSize: '12px', color: '#554A42' }}>
                    {item.type || 'Hospital'} |
                    Distance: {formatDistance(item.distanceKm)}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {transit.map((item, index) => {
          const coordinates = getCoordinates(item);
          if (!coordinates) return null;

          return (
            <Marker
              key={`transit-${item.id ?? index}`}
              position={coordinates}
              icon={transitIcon}
            >
              <Popup>
                <div>
                  <strong>{item.name || 'Transit Stop'}</strong>
                  <div style={{ fontSize: '12px', color: '#554A42' }}>
                    {item.line || item.type || 'Transit Stop'} |
                    Distance: {formatDistance(item.distanceKm)}
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
