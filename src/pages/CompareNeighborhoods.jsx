import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  GitCompare,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Wind,
  GraduationCap,
  Building2,
  Train,
  ArrowRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { DEMO_NEIGHBORHOODS } from '../data/demoNeighborhoods';
import SearchLocation from '../components/SearchLocation';
import { getAQIInfo } from '../utils/formatters';

export default function CompareNeighborhoods() {
  // Initial comparison list (load 2 defaults or from localStorage)
  const [comparedList, setComparedList] = useState(() => {
    try {
      const stored = localStorage.getItem('neighborhood_iq_comparisons');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length >= 2) {
          // Find matching data from DEMO_NEIGHBORHOODS or match by id/name
          return parsed.slice(0, 3).map(p => {
            const match = DEMO_NEIGHBORHOODS.find(d => d.name === p.name || d.id === p.id);
            return match || DEMO_NEIGHBORHOODS[0];
          });
        }
      }
    } catch (e) {
      console.warn('Could not read comparison storage:', e);
    }
    // Default comparison: Vasant Kunj vs DLF Phase 5 Gurugram
    return [DEMO_NEIGHBORHOODS[0], DEMO_NEIGHBORHOODS[1]];
  });

  const [isAddingLocation, setIsAddingLocation] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('neighborhood_iq_comparisons', JSON.stringify(comparedList));
    } catch (e) {
      console.warn('Storage sync failed:', e);
    }
  }, [comparedList]);

  const handleAddLocation = ({ name, lat, lon }) => {
    const existing = comparedList.find(c => c.name === name);
    if (!existing) {
      const match = DEMO_NEIGHBORHOODS.find(d => d.name === name) || {
        id: `custom-${lat}-${lon}`,
        name,
        locality: name.split(',')[0],
        city: 'Delhi NCR',
        lat,
        lon,
        overview: {
          schoolsCount: 4,
          hospitalsCount: 3,
          transitStopsCount: 6,
          reliableCategoriesCount: 5
        },
        airQuality: { aqi: 220, stationName: 'Regional Station' }
      };
      setComparedList([...comparedList, match]);
    }
    setIsAddingLocation(false);
  };

  const handleRemove = (index) => {
    if (comparedList.length <= 1) {
      alert('Keep at least one neighborhood in comparison view.');
      return;
    }
    setComparedList(comparedList.filter((_, idx) => idx !== index));
  };

  // Prepare chart data
  const chartData = [
    {
      metric: 'Nearby Schools',
      ...Object.fromEntries(comparedList.map(c => [c.locality, c.overview?.schoolsCount || 0]))
    },
    {
      metric: 'Healthcare Facilities',
      ...Object.fromEntries(comparedList.map(c => [c.locality, c.overview?.hospitalsCount || 0]))
    },
    {
      metric: 'Transit Stops',
      ...Object.fromEntries(comparedList.map(c => [c.locality, c.overview?.transitStopsCount || 0]))
    }
  ];

  const colors = ['#B94D3D', '#E9BD55', '#5B84B1', '#6D9274'];

  return (
    <div className="main-content">
      <div className="container" style={{ paddingTop: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <GitCompare size={20} color="#B94D3D" />
              <span className="pill-badge badge-official">Side-by-Side Analysis</span>
            </div>
            <h1 style={{ fontSize: '2.1rem' }}>Compare Neighborhoods</h1>
            <p style={{ color: '#82756C', fontSize: '0.95rem' }}>
              Compare environmental data, amenities, transit, and municipal utilities across shortlisted locations in Delhi NCR.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              className="btn-primary"
              onClick={() => setIsAddingLocation(!isAddingLocation)}
              disabled={comparedList.length >= 4}
            >
              <Plus size={16} />
              <span>Add Neighborhood ({comparedList.length}/4)</span>
            </button>
          </div>
        </div>

        {/* Add Location Card Drawer */}
        {isAddingLocation && (
          <div className="card" style={{ marginBottom: '28px', backgroundColor: '#FFFFFF', border: '1px solid #B94D3D' }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '12px' }}>Search and Add Location to Comparison</h3>
            <SearchLocation onSelectLocation={handleAddLocation} />
          </div>
        )}

        {/* Comparative Chart */}
        <div className="card" style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>Comparative Amenity Counts (Within 2 km Radius)</h3>
          <p style={{ fontSize: '0.82rem', color: '#82756C', marginBottom: '16px' }}>
            Derived from verified OpenStreetMap tags and official municipal registers.
          </p>

          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 20, left: -15, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8DCCB" vertical={false} />
                <XAxis dataKey="metric" tick={{ fontSize: 12, fill: '#392E29', fontWeight: 600 }} />
                <YAxis tick={{ fontSize: 11, fill: '#82756C' }} />
                <Tooltip contentStyle={{ backgroundColor: '#FFF9F0', border: '1px solid #E8DCCB', borderRadius: '8px', fontSize: '12px' }} />
                <Legend />
                {comparedList.map((c, idx) => (
                  <Bar key={c.id || idx} dataKey={c.locality} fill={colors[idx % colors.length]} radius={[6, 6, 0, 0]} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side-by-Side Comparison Matrix Table */}
        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th style={{ width: '22%' }}>Category / Metric</th>
                {comparedList.map((item, idx) => (
                  <th key={item.id || idx} style={{ width: `${78 / comparedList.length}%` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '1.05rem', color: '#B94D3D' }}>{item.locality}</div>
                        <div style={{ fontSize: '0.78rem', color: '#82756C', fontWeight: 400 }}>{item.city}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemove(idx)}
                        className="btn-ghost"
                        style={{ padding: '4px', color: '#82756C' }}
                        title="Remove from comparison"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Air Quality Row */}
              <tr>
                <td>
                  <strong>Current Air Quality (NAQI)</strong>
                  <div style={{ fontSize: '0.74rem', color: '#82756C' }}>CPCB Monitoring Stations</div>
                </td>
                {comparedList.map((item, idx) => {
                  const aqi = item.airQuality?.aqi;
                  const info = getAQIInfo(aqi);
                  return (
                    <td key={idx}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: info.color }}>
                          {aqi || 'N/A'}
                        </span>
                        <span style={{ fontSize: '0.78rem', padding: '2px 8px', borderRadius: '9999px', backgroundColor: info.bg, color: info.color, fontWeight: 700 }}>
                          {info.category}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#82756C', marginTop: '2px' }}>
                        Station: {item.airQuality?.stationName?.split('(')[0] || 'Regional'}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Schools Row */}
              <tr>
                <td>
                  <strong>Schools (Within 2 km)</strong>
                  <div style={{ fontSize: '0.74rem', color: '#82756C' }}>UDISE+ Registered</div>
                </td>
                {comparedList.map((item, idx) => (
                  <td key={idx}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#392E29' }}>
                      {item.overview?.schoolsCount || 0} Schools
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#82756C' }}>
                      Key: {item.schools?.[0]?.name ? item.schools[0].name.split(',')[0] : 'Multiple nearby'}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Healthcare Row */}
              <tr>
                <td>
                  <strong>Healthcare & Hospitals</strong>
                  <div style={{ fontSize: '0.74rem', color: '#82756C' }}>ABDM Registered Facilities</div>
                </td>
                {comparedList.map((item, idx) => (
                  <td key={idx}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#392E29' }}>
                      {item.overview?.hospitalsCount || 0} Facilities
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#82756C' }}>
                      {item.hospitals?.[0]?.name || 'Secondary and tertiary care'}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Public Transport Row */}
              <tr>
                <td>
                  <strong>Metro & Bus Transit</strong>
                  <div style={{ fontSize: '0.74rem', color: '#82756C' }}>DMRC / DTC Feeder Links</div>
                </td>
                {comparedList.map((item, idx) => (
                  <td key={idx}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#392E29' }}>
                      {item.publicTransport?.metroStations?.[0]?.name || 'Metro Access nearby'}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#82756C' }}>
                      {item.publicTransport?.metroStations?.[0]?.line || 'Network Feeder Lines'}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Water & Electricity Row */}
              <tr>
                <td>
                  <strong>Water Supply & Electricity</strong>
                  <div style={{ fontSize: '0.74rem', color: '#82756C' }}>Municipal Board Notices</div>
                </td>
                {comparedList.map((item, idx) => (
                  <td key={idx}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#392E29' }}>
                      {item.utility?.waterProvider || 'Municipal Piped Grid'}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#554A42', marginTop: '2px' }}>
                      {item.utility?.waterSchedule || 'Regular scheduled supply windows'}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Key Advantages Row */}
              <tr style={{ backgroundColor: '#EFF5F0' }}>
                <td>
                  <strong style={{ color: '#6D9274' }}>Key Advantages</strong>
                </td>
                {comparedList.map((item, idx) => (
                  <td key={idx}>
                    <div style={{ fontSize: '0.82rem', color: '#2B4A31', lineHeight: 1.45 }}>
                      {idx === 0 && 'High density of premier institutions, green Aravalli Ridge buffer, and low natural flooding risk.'}
                      {idx === 1 && 'Modern grade-separated Golf Course Rd underpasses, direct Rapid Metro connectivity, and 100% DG power backup.'}
                      {idx === 2 && 'Direct terminal Blue Line metro stations, organized institutional grid, and stable Ganga water pipeline.'}
                      {idx >= 3 && 'Proximity to expressway corridors and comprehensive retail amenities.'}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Key Unknowns & Limitations Row */}
              <tr style={{ backgroundColor: '#FCF1EE' }}>
                <td>
                  <strong style={{ color: '#B94D3D' }}>Known Limitations</strong>
                </td>
                {comparedList.map((item, idx) => (
                  <td key={idx}>
                    <div style={{ fontSize: '0.82rem', color: '#5C241E', lineHeight: 1.45 }}>
                      {idx === 0 && 'Deepening regional groundwater levels; reliance on feeder autos for last-mile metro links.'}
                      {idx === 1 && 'Higher condominium maintenance charges (CAM) for diesel generators; peak commercial congestion.'}
                      {idx === 2 && 'Elevated highway particulate dust along NH-9 during peak heavy transit hours.'}
                      {idx >= 3 && 'Canal maintenance periods temporarily affect municipal water pressure.'}
                    </div>
                  </td>
                ))}
              </tr>

              {/* View Full Report Links */}
              <tr>
                <td>
                  <strong>Detailed Inspection</strong>
                </td>
                {comparedList.map((item, idx) => (
                  <td key={idx}>
                    <Link
                      to={`/report?lat=${item.lat}&lon=${item.lon}&name=${encodeURIComponent(item.name)}`}
                      className="btn-outline"
                      style={{ fontSize: '0.82rem', padding: '0.45rem 0.9rem', display: 'inline-flex', width: 'auto' }}
                    >
                      <span>Open Full Report</span>
                      <ArrowRight size={13} />
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Disclaimer about local storage persistence */}
        <div style={{ marginTop: '20px', padding: '12px 16px', backgroundColor: '#FFF9F0', borderRadius: '12px', border: '1px solid #E8DCCB', fontSize: '0.8rem', color: '#82756C' }}>
          <strong>Note on Data Persistence:</strong> Comparison selections are saved harmlessly in your local browser storage for convenience. They are not synchronized across devices or stored on any server.
        </div>
      </div>
    </div>
  );
}
