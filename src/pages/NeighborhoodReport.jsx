import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Wind,
  GraduationCap,
  Building2,
  Train,
  Navigation,
  HardHat,
  Droplets,
  Volume2,
  Filter,
  Check,
  RefreshCw,
  ExternalLink,
  MapPin,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useNeighborhoodReport } from '../hooks/useNeighborhoodReport';
import ReportHeader from '../components/ReportHeader';
import LocationMap from '../components/LocationMap';
import CategoryCard from '../components/CategoryCard';
import NearbyPlacesList from '../components/NearbyPlacesList';
import CommuteCalculator from '../components/CommuteCalculator';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import SearchLocation from '../components/SearchLocation';
import { getAQIInfo, formatTimestamp } from '../utils/formatters';
import { formatDistance } from '../utils/distance';

const PRIORITY_OPTIONS = [
  { id: 'all', label: 'Balanced Overview', icon: Filter },
  { id: 'families', label: 'Families with Children', icon: GraduationCap },
  { id: 'commuters', label: 'Daily Commuters', icon: Navigation },
  { id: 'transit', label: 'Public Transit Users', icon: Train },
  { id: 'environmental', label: 'Environmental Conditions', icon: Wind },
  { id: 'healthcare', label: 'Healthcare Access', icon: Building2 }
];

export default function NeighborhoodReport() {
  const location = useLocation();
  const navigate = useNavigate();

  // Parse query parameters
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const lat = parseFloat(queryParams.get('lat') || '28.5244');
  const lon = parseFloat(queryParams.get('lon') || '77.1588');
  const radiusKm = parseFloat(queryParams.get('radius') || '2.0');
  const propertyName = queryParams.get('name') || 'Vasant Kunj, South Delhi';

  const [selectedPriority, setSelectedPriority] = useState('all');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const { reportData, isLoading, error, refetch } = useNeighborhoodReport(lat, lon, radiusKm, selectedPriority);

  const handleRadiusChange = (newRadius) => {
    navigate(`/report?lat=${lat}&lon=${lon}&radius=${newRadius}&name=${encodeURIComponent(propertyName)}`);
  };

  const handleSelectNewLocation = ({ name, lat: nLat, lon: nLon, radiusKm: nRadius }) => {
    setIsSearchModalOpen(false);
    navigate(`/report?lat=${nLat}&lon=${nLon}&radius=${nRadius}&name=${encodeURIComponent(name)}`);
  };

  const handleSaveToCompare = () => {
    try {
      const savedList = JSON.parse(localStorage.getItem('neighborhood_iq_comparisons') || '[]');
      const newItem = {
        id: `comp-${lat.toFixed(4)}-${lon.toFixed(4)}`,
        name: propertyName,
        lat,
        lon,
        radiusKm,
        savedAt: new Date().toISOString()
      };
      if (!savedList.some(item => item.id === newItem.id)) {
        savedList.push(newItem);
        localStorage.setItem('neighborhood_iq_comparisons', JSON.stringify(savedList));
      }
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error || !reportData) {
    return (
      <div className="container" style={{ padding: '40px 16px' }}>
        <EmptyState
          title="Unable to load intelligence report"
          description={error || "An error occurred while compiling spatial datasets."}
          actionText="Retry Report"
          onAction={refetch}
        />
      </div>
    );
  }

  const { overview, airQuality, schools, hospitals, transit, infrastructure, utility, environmental } = reportData;
  const aqiInfo = getAQIInfo(airQuality.aqi);

  return (
    <div className="main-content">
      {/* Report Header */}
      <ReportHeader
        address={propertyName}
        lat={lat}
        lon={lon}
        radiusKm={radiusKm}
        timestamp={reportData.timestamp}
        coverageCount={overview.reliableCategoriesCount}
        totalCategories={6}
        onRadiusChange={handleRadiusChange}
        onChangeLocationClick={() => setIsSearchModalOpen(true)}
        onSaveToCompare={handleSaveToCompare}
      />

      <div className="container">
        {/* Priority Filter Bar */}
        <div className="priority-filter-bar">
          <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#82756C', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Filter size={15} /> Personalize Priority:
          </span>
          {PRIORITY_OPTIONS.map(opt => {
            const Icon = opt.icon;
            return (
              <button
                key={opt.id}
                type="button"
                className={`priority-chip ${selectedPriority === opt.id ? 'active' : ''}`}
                onClick={() => setSelectedPriority(opt.id)}
              >
                <Icon size={14} />
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>

        {/* Overview Metric Strip */}
        <div className="overview-metrics-grid">
          <div className="metric-stat-card">
            <div className="metric-stat-val">{overview.schoolsCount}</div>
            <div className="metric-stat-label">Schools</div>
          </div>
          <div className="metric-stat-card">
            <div className="metric-stat-val">{overview.hospitalsCount}</div>
            <div className="metric-stat-label">Healthcare</div>
          </div>
          <div className="metric-stat-card">
            <div className="metric-stat-val">{overview.transitStopsCount}</div>
            <div className="metric-stat-label">Transit Stops</div>
          </div>
          <div className="metric-stat-card">
            <div className="metric-stat-val" style={{ color: aqiInfo.color }}>{airQuality.aqi}</div>
            <div className="metric-stat-label">Current AQI</div>
          </div>
          <div className="metric-stat-card">
            <div className="metric-stat-val">{overview.infrastructureProjectsCount}</div>
            <div className="metric-stat-label">Major Projects</div>
          </div>
          <div className="metric-stat-card">
            <div className="metric-stat-val" style={{ color: '#6D9274' }}>
              {overview.reliableCategoriesCount}/6
            </div>
            <div className="metric-stat-label">Reliable Categories</div>
          </div>
        </div>

        {/* Interactive Map */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={18} color="#B94D3D" />
              <span>Interactive Neighborhood Map</span>
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#82756C' }}>
              Click any point on the map to relocate the analysis center
            </span>
          </div>

          <LocationMap
            lat={lat}
            lon={lon}
            radiusKm={radiusKm}
            propertyName={propertyName}
            schools={schools.items}
            hospitals={hospitals.items}
            transit={transit.items}
            onLocationChange={(newLat, newLon) => {
              navigate(`/report?lat=${newLat}&lon=${newLon}&radius=${radiusKm}&name=${encodeURIComponent(`Custom Location (${newLat.toFixed(3)}, ${newLon.toFixed(3)})`)}`);
            }}
          />
        </div>

        {/* Category Cards Grid */}
        <div className="category-cards-grid">
          {/* 1. Air Quality Card */}
          <CategoryCard
            title="Air Quality & Pollutant Profile"
            icon={Wind}
            iconColor="#B94D3D"
            iconBg="#F9EBE8"
            badgeText={`Station: ${airQuality.stationName} (${airQuality.stationDistanceKm} km)`}
            evidence={airQuality.evidence}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '2.4rem', fontWeight: 800, color: aqiInfo.color, fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
                  {airQuality.aqi}
                </span>
                <span style={{ fontSize: '0.9rem', color: '#82756C' }}>NAQI Index</span>
              </div>
              <span
                style={{
                  backgroundColor: aqiInfo.bg,
                  color: aqiInfo.color,
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  border: `1px solid ${aqiInfo.color}40`
                }}
              >
                {aqiInfo.category}
              </span>
            </div>

            <p style={{ fontSize: '0.82rem', color: '#554A42', marginBottom: '14px', lineHeight: 1.45 }}>
              {aqiInfo.implication} Primary pollutant: <strong>{airQuality.primaryPollutant}</strong>.
            </p>

            {/* Pollutant Breakdown Table */}
            {airQuality.pollutants && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
                {Object.entries(airQuality.pollutants).map(([key, val]) => (
                  <div key={key} style={{ backgroundColor: '#FFFFFF', padding: '8px', borderRadius: '10px', border: '1px solid #E8DCCB', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.72rem', color: '#82756C', textTransform: 'uppercase', fontWeight: 700 }}>{key}</div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#392E29' }}>{val.value}</div>
                    <div style={{ fontSize: '0.68rem', color: '#A3968C' }}>{val.unit} (Std: {val.standard})</div>
                  </div>
                ))}
              </div>
            )}

            {/* Recharts 7-Day Trend Chart */}
            {airQuality.trend && (
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#82756C', marginBottom: '6px', textTransform: 'uppercase' }}>
                  7-Day AQI Trend
                </div>
                <div style={{ width: '100%', height: 130 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={airQuality.trend} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#B94D3D" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#B94D3D" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E8DCCB" vertical={false} />
                      <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#82756C' }} />
                      <YAxis tick={{ fontSize: 10, fill: '#82756C' }} domain={[100, 300]} />
                      <Tooltip contentStyle={{ backgroundColor: '#FFF9F0', border: '1px solid #E8DCCB', borderRadius: '8px', fontSize: '12px' }} />
                      <Area type="monotone" dataKey="aqi" stroke="#B94D3D" strokeWidth={2} fillOpacity={1} fill="url(#aqiGradient)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </CategoryCard>

          {/* 2. Schools Card */}
          <CategoryCard
            title="Schools & Educational Access"
            icon={GraduationCap}
            iconColor="#5B84B1"
            iconBg="#EDF3F9"
            badgeText={`${schools.items.length} recognized schools within ${radiusKm} km`}
            evidence={schools.evidence}
          >
            <NearbyPlacesList
              items={schools.items}
              emptyMessage={`No official schools found in the ${radiusKm} km boundary. Expand radius to 5 km.`}
              maxItems={4}
            />
          </CategoryCard>

          {/* 3. Hospitals Card */}
          <CategoryCard
            title="Hospitals & Healthcare Facilities"
            icon={Building2}
            iconColor="#D97A68"
            iconBg="#FCF1EE"
            badgeText={`${hospitals.items.length} facilities in radius`}
            evidence={hospitals.evidence}
          >
            <div style={{ fontSize: '0.8rem', color: '#82756C', marginBottom: '10px', fontStyle: 'italic' }}>
              Note: Distance reflects emergency transit accessibility, not clinical quality or bed occupancy.
            </div>
            <NearbyPlacesList
              items={hospitals.items}
              emptyMessage={`No hospitals recorded within ${radiusKm} km. Try 5 km radius.`}
              maxItems={4}
            />
          </CategoryCard>

          {/* 4. Public Transport Card */}
          <CategoryCard
            title="Public Transport: Metro & Bus Network"
            icon={Train}
            iconColor="#E9BD55"
            iconBg="#FDF6E3"
            badgeText={`${transit.items.length} transit nodes in radius`}
            evidence={transit.evidence}
          >
            <NearbyPlacesList
              items={transit.items}
              emptyMessage={`No transit stops recorded within ${radiusKm} km.`}
              maxItems={4}
            />
          </CategoryCard>

          {/* 5. Traffic & Commute Card */}
          <CategoryCard
            title="Traffic & Workplace Commute"
            icon={Navigation}
            iconColor="#6D9274"
            iconBg="#EFF5F0"
            badgeText="Road network routing engine"
            evidence={{
              sourceName: 'Open Source Routing Machine (OSRM) on OSM',
              sourceUrl: 'https://project-osrm.org/',
              status: 'Estimated',
              coverage: 'Delhi NCR highway and arterial network',
              limitations: 'Calculates standard off-peak driving duration. Real-time peak hour jams typically add 30-50% in Delhi NCR.'
            }}
          >
            <CommuteCalculator originLat={lat} originLon={lon} />
          </CategoryCard>

          {/* 6. Infrastructure Projects Card */}
          <CategoryCard
            title="Documented Infrastructure Projects"
            icon={HardHat}
            iconColor="#C2962C"
            iconBg="#FDF6E3"
            badgeText={`${infrastructure.items.length} active development corridors`}
            evidence={infrastructure.evidence}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {infrastructure.items.slice(0, 3).map((proj, idx) => (
                <div key={idx} style={{ backgroundColor: '#FFFFFF', padding: '12px', borderRadius: '12px', border: '1px solid #E8DCCB' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                    <strong style={{ fontSize: '0.9rem', color: '#392E29', flex: 1, paddingRight: '8px' }}>
                      {proj.name}
                    </strong>
                    <span className="pill-badge badge-warning" style={{ fontSize: '0.72rem' }}>
                      {proj.status}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#82756C', margin: '4px 0 6px', lineHeight: 1.45 }}>
                    {proj.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#A3968C' }}>
                    <span>Target: {proj.estimatedCompletion || 'Under Review'}</span>
                    <span>Proximity: {formatDistance(proj.distanceKm)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CategoryCard>

          {/* 7. Water and Electricity Card */}
          <CategoryCard
            title="Water Supply & Electricity Grid"
            icon={Droplets}
            iconColor="#5B84B1"
            iconBg="#EDF3F9"
            badgeText={utility.data.zone}
            evidence={utility.evidence}
          >
            <div style={{ backgroundColor: '#FFFFFF', padding: '14px', borderRadius: '12px', border: '1px solid #E8DCCB', marginBottom: '12px' }}>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#392E29', marginBottom: '6px' }}>
                Municipal Water Profile ({utility.data.water.provider})
              </div>
              <ul style={{ fontSize: '0.82rem', color: '#554A42', paddingLeft: '18px', lineHeight: 1.6 }}>
                <li><strong>Supply Model:</strong> {utility.data.water.supplyType}</li>
                <li><strong>Timings:</strong> {utility.data.water.schedule}</li>
                <li><strong>Tanker Dependency:</strong> {utility.data.water.tankerDependency}</li>
                <li><strong>Groundwater:</strong> {utility.data.water.groundwaterDepth}</li>
              </ul>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', padding: '14px', borderRadius: '12px', border: '1px solid #E8DCCB' }}>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#392E29', marginBottom: '6px' }}>
                Electricity Discom ({utility.data.electricity.discom})
              </div>
              <ul style={{ fontSize: '0.82rem', color: '#554A42', paddingLeft: '18px', lineHeight: 1.6 }}>
                <li><strong>Reliability:</strong> {utility.data.electricity.reliabilityTier}</li>
                <li><strong>Outage Average:</strong> ~{utility.data.electricity.averageMonthlyOutageHours} hrs/month</li>
                <li><strong>Solar Net-Metering:</strong> {utility.data.electricity.solarNetMetering}</li>
              </ul>
            </div>
          </CategoryCard>

          {/* 8. Noise and Flooding Card */}
          <CategoryCard
            title="Noise Standards & Flooding Vulnerability"
            icon={Volume2}
            iconColor="#82756C"
            iconBg="#F1ECE6"
            badgeText="Hydrological & CPCB Acoustic Surveys"
            evidence={environmental.evidence}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {environmental.incidents.map((inc, idx) => (
                <div key={idx} style={{ backgroundColor: '#FFFFFF', padding: '12px', borderRadius: '12px', border: '1px solid #E8DCCB' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#392E29', marginBottom: '4px' }}>
                    {inc.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#554A42', lineHeight: 1.45 }}>
                    {inc.dangerLevel && (
                      <div style={{ marginBottom: '4px' }}>
                        <strong>Risk Assessment:</strong> {inc.dangerLevel}
                      </div>
                    )}
                    {inc.standardLimits && (
                      <div style={{ fontSize: '0.76rem', color: '#82756C' }}>
                        CPCB Norms — Residential: {inc.standardLimits.residential}
                      </div>
                    )}
                    {inc.observationsSummary && (
                      <div style={{ marginTop: '4px', fontSize: '0.78rem', color: '#82756C' }}>
                        {inc.observationsSummary}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CategoryCard>
        </div>
      </div>

      {/* Change Location Modal / Drawer */}
      {isSearchModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(57, 46, 41, 0.45)',
            backdropFilter: 'blur(4px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
          onClick={() => setIsSearchModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: '#FFF9F0',
              borderRadius: '20px',
              padding: '24px',
              width: '100%',
              maxWidth: '560px',
              boxShadow: 'var(--shadow-modal)',
              border: '1px solid #E8DCCB'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.25rem' }}>Select New Location</h3>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setIsSearchModalOpen(false)}
                aria-label="Close location selector"
              >
                Close
              </button>
            </div>
            <SearchLocation onSelectLocation={handleSelectNewLocation} initialRadius={radiusKm} />
          </div>
        </div>
      )}
    </div>
  );
}
