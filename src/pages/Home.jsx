import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wind,
  GraduationCap,
  Building2,
  Train,
  Navigation,
  HardHat,
  Droplets,
  Volume2,
  ShieldCheck,
  Search,
  Compass,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  MapPin
} from 'lucide-react';
import SearchLocation from '../components/SearchLocation';
import { DEMO_NEIGHBORHOODS } from '../data/demoNeighborhoods';

export default function Home() {
  const navigate = useNavigate();

  const handleSelectLocation = ({ name, lat, lon, radiusKm }) => {
    navigate(`/report?lat=${lat}&lon=${lon}&radius=${radiusKm}&name=${encodeURIComponent(name)}`);
  };

  const categories = [
    {
      title: 'Air Quality & NAQI',
      desc: 'Real-time particulate readings, monitoring station proximity, and 7-day seasonal trend graphs.',
      icon: Wind,
      color: '#B94D3D',
      bg: '#F9EBE8'
    },
    {
      title: 'Schools & Education',
      desc: 'Recognized public and private schools, education boards (CBSE/ICSE), and official UDISE+ attributes.',
      icon: GraduationCap,
      color: '#5B84B1',
      bg: '#EDF3F9'
    },
    {
      title: 'Hospitals & Healthcare',
      desc: 'Tertiary hospitals, clinics, and ABDM registry records with verified distance metrics.',
      icon: Building2,
      color: '#D97A68',
      bg: '#FCF1EE'
    },
    {
      title: 'Public Transit & Metro',
      desc: 'Delhi Metro stations, line interchanges, and DTC / DIMTS bus stop coverage.',
      icon: Train,
      color: '#E9BD55',
      bg: '#FDF6E3'
    },
    {
      title: 'Traffic & Commute Estimates',
      desc: 'OSRM routing distance and typical travel times to central hubs like Connaught Place, Cyber City, and Noida.',
      icon: Navigation,
      color: '#6D9274',
      bg: '#EFF5F0'
    },
    {
      title: 'Infrastructure Projects',
      desc: 'Delhi Metro Phase IV, RRTS corridors, Dwarka Expressway, and DDA Master Plan developments.',
      icon: HardHat,
      color: '#C2962C',
      bg: '#FDF6E3'
    },
    {
      title: 'Water & Electricity',
      desc: 'Delhi Jal Board supply timings, groundwater table depths (CGWB), and power discom reliability.',
      icon: Droplets,
      color: '#5B84B1',
      bg: '#EDF3F9'
    },
    {
      title: 'Noise & Flooding',
      desc: 'CPCB ambient noise zone standards and low-lying Yamuna monsoon waterlogging history.',
      icon: Volume2,
      color: '#82756C',
      bg: '#F1ECE6'
    }
  ];

  return (
    <div className="main-content">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div>
            <div className="hero-badge">
              <Compass size={14} />
              <span>Delhi NCR Neighborhood Intelligence</span>
            </div>
            <h1 className="hero-title">
              Before you buy a home, <span>get to know its neighborhood.</span>
            </h1>
            <p className="hero-description">
              NeighborhoodIQ brings official air quality data, verified schools and hospitals, metro connectivity, infrastructure projects, and utility reliability into one transparent report.
            </p>

            <SearchLocation onSelectLocation={handleSelectLocation} />
          </div>

          {/* Friendly SVG Illustration & Report Preview Card */}
          <div className="hero-illustration">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#B94D3D' }} />
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#392E29' }}>Sample Intelligence Preview</span>
              </div>
              <span className="pill-badge badge-verified">Verified Data</span>
            </div>

            {/* SVG Illustration of Delhi NCR Neighborhood */}
            <div style={{ textAlign: 'center', margin: '12px 0 20px' }}>
              <svg viewBox="0 0 400 160" width="100%" height="150" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="160" rx="14" fill="#F5EBDD" />
                {/* Roads */}
                <path d="M 0 130 Q 150 110, 400 135" stroke="#E8DCCB" strokeWidth="22" fill="none" />
                <path d="M 0 130 Q 150 110, 400 135" stroke="#FFF9F0" strokeWidth="2" strokeDasharray="6,6" fill="none" />
                {/* Metro Line elevated */}
                <line x1="20" y1="50" x2="380" y2="50" stroke="#B94D3D" strokeWidth="4" />
                <circle cx="80" cy="50" r="6" fill="#FFF9F0" stroke="#B94D3D" strokeWidth="3" />
                <circle cx="200" cy="50" r="6" fill="#FFF9F0" stroke="#B94D3D" strokeWidth="3" />
                <circle cx="320" cy="50" r="6" fill="#FFF9F0" stroke="#B94D3D" strokeWidth="3" />
                {/* Trees */}
                <circle cx="140" cy="100" r="14" fill="#6D9274" />
                <rect x="137" y="112" width="6" height="14" fill="#82756C" />
                <circle cx="270" cy="95" r="16" fill="#6D9274" />
                <rect x="267" y="108" width="6" height="16" fill="#82756C" />
                {/* Houses */}
                <polygon points="50,115 65,95 80,115" fill="#B94D3D" />
                <rect x="53" y="115" width="24" height="20" fill="#FFF9F0" />
                <rect x="61" y="122" width="8" height="13" fill="#392E29" />
                <polygon points="175,110 195,90 215,110" fill="#E9BD55" />
                <rect x="180" y="110" width="30" height="24" fill="#FFF9F0" />
                <rect x="190" y="120" width="10" height="14" fill="#392E29" />
                {/* Hospital / Clinic */}
                <rect x="330" y="98" width="34" height="28" rx="4" fill="#FFF9F0" stroke="#D97A68" strokeWidth="2" />
                <path d="M 347 106 L 347 118 M 341 112 L 353 112" stroke="#D97A68" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>

            {/* Quick Card Snippet */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '14px', borderRadius: '14px', border: '1px solid #E8DCCB' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Vasant Kunj, South Delhi</span>
                <span style={{ fontSize: '0.78rem', color: '#6D9274', fontWeight: 700 }}>AQI 218 • Moderate</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '0.8rem', textAlign: 'center' }}>
                <div style={{ backgroundColor: '#F5EBDD', padding: '6px', borderRadius: '8px' }}>
                  <strong>8</strong> Schools
                </div>
                <div style={{ backgroundColor: '#F5EBDD', padding: '6px', borderRadius: '8px' }}>
                  <strong>5</strong> Hospitals
                </div>
                <div style={{ backgroundColor: '#F5EBDD', padding: '6px', borderRadius: '8px' }}>
                  <strong>12</strong> Transit Stops
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="steps-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">How NeighborhoodIQ Works</span>
            <h2>Three steps to a well-informed home buying decision</h2>
            <p>
              We aggregate fragmented Indian open data portals into an easily scannable, honest neighborhood report with verifiable citations.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Find your property</h3>
              <p>
                Search any address, sector, or landmark in Delhi, Gurugram, Noida, or Ghaziabad, or drop a pin directly on our interactive map.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Explore its surroundings</h3>
              <p>
                Analyze verified air quality stations, public school boards, hospitals, commute routing, and documented infrastructure projects.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Compare before deciding</h3>
              <p>
                Compare shortlisted properties side by side across real metrics without vague, opaque single scores.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Report Categories Preview Grid */}
      <section className="categories-preview-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Comprehensive Coverage</span>
            <h2>8 Key pillars of livability and quality of life</h2>
            <p>
              Every category is backed by verifiable government and geospatial data, with explicit disclaimers where data is limited.
            </p>
          </div>

          <div className="category-preview-grid">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div key={idx} className="cat-preview-card">
                  <div className="cat-icon-bubble" style={{ backgroundColor: cat.bg, color: cat.color }}>
                    <Icon size={20} />
                  </div>
                  <h4 style={{ fontSize: '1.05rem', marginBottom: '6px' }}>{cat.title}</h4>
                  <p style={{ fontSize: '0.86rem', color: '#82756C', lineHeight: 1.5 }}>{cat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Delhi NCR Hubs */}
      <section style={{ padding: '64px 0' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Explore Delhi NCR</span>
            <h2>Sample verified neighborhood intelligence reports</h2>
            <p>
              Jump into ready-to-inspect reports for popular residential corridors in Delhi, Gurugram, Noida, and Ghaziabad.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {DEMO_NEIGHBORHOODS.map(n => (
              <div key={n.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <MapPin size={16} color="#B94D3D" />
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#82756C' }}>{n.city}, {n.state}</span>
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{n.name}</h3>
                <p style={{ fontSize: '0.86rem', color: '#82756C', marginBottom: '16px', flex: 1 }}>
                  AQI: {n.airQuality.aqi} • {n.overview.schoolsCount} schools • {n.overview.hospitalsCount} hospitals within 2 km
                </p>

                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => handleSelectLocation({ name: n.name, lat: n.lat, lon: n.lon, radiusKm: 2.0 })}
                  style={{ width: '100%' }}
                >
                  <span>View Intelligence Report</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
