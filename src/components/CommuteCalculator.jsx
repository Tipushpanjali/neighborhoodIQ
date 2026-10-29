import React, { useState, useEffect } from 'react';
import { Navigation, Clock, Compass, Car, AlertCircle, Loader2 } from 'lucide-react';
import { MAJOR_NCR_HUBS, calculateCommute } from '../services/routingService';

export default function CommuteCalculator({ originLat = 28.5244, originLon = 77.1588 }) {
  const [selectedHub, setSelectedHub] = useState(MAJOR_NCR_HUBS[0]);
  const [customDestination, setCustomDestination] = useState('');
  const [commuteResult, setCommuteResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    let isCurrent = true;
    async function runCalculation() {
      setIsCalculating(true);
      try {
        const dest = selectedHub;
        const res = await calculateCommute(originLat, originLon, dest.lat, dest.lon);
        if (isCurrent) {
          setCommuteResult({ ...res, destName: dest.name });
        }
      } catch (err) {
        console.error('Error calculating commute:', err);
      } finally {
        if (isCurrent) setIsCalculating(false);
      }
    }
    runCalculation();
    return () => { isCurrent = false; };
  }, [originLat, originLon, selectedHub]);

  return (
    <div className="commute-widget">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <Navigation size={16} color="#B94D3D" />
        <span style={{ fontWeight: 600, fontSize: '0.92rem' }}>Estimated Commute to Major Workplaces</span>
      </div>

      <div className="commute-destinations-pills">
        {MAJOR_NCR_HUBS.map(hub => (
          <button
            key={hub.id}
            type="button"
            className={`dest-pill ${selectedHub.id === hub.id ? 'active' : ''}`}
            onClick={() => setSelectedHub(hub)}
          >
            {hub.name.split(' (')[0]}
          </button>
        ))}
      </div>

      {isCalculating ? (
        <div style={{ padding: '20px', textAlign: 'center', color: '#82756C' }}>
          <Loader2 className="search-spinner" size={20} style={{ margin: '0 auto 6px' }} />
          <div style={{ fontSize: '0.82rem' }}>Calculating road routing...</div>
        </div>
      ) : commuteResult ? (
        <div className="commute-result-box">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#B94D3D', lineHeight: 1 }}>
              {commuteResult.estimatedMinutes} min
            </div>
            <div style={{ fontSize: '0.72rem', color: '#82756C', textTransform: 'uppercase', marginTop: '2px' }}>
              Driving Estimate
            </div>
          </div>

          <div style={{ width: '1px', height: '36px', backgroundColor: '#E8DCCB' }} />

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#392E29', lineHeight: 1 }}>
              {commuteResult.distanceKm} km
            </div>
            <div style={{ fontSize: '0.72rem', color: '#82756C', textTransform: 'uppercase', marginTop: '2px' }}>
              Route Distance
            </div>
          </div>

          <div style={{ width: '1px', height: '36px', backgroundColor: '#E8DCCB' }} />

          <div style={{ maxWidth: '200px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#392E29' }}>
              {selectedHub.name}
            </div>
            <div style={{ fontSize: '0.74rem', color: '#82756C' }}>
              {selectedHub.hubType}
            </div>
          </div>
        </div>
      ) : null}

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', marginTop: '10px', fontSize: '0.76rem', color: '#82756C' }}>
        <AlertCircle size={13} style={{ flexShrink: 0, marginTop: '2px' }} />
        <span>
          <strong>Routing Methodology:</strong> {commuteResult?.label || 'OSRM Routing Engine'}. {commuteResult?.conditions}
        </span>
      </div>
    </div>
  );
}
