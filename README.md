# NeighborhoodIQ — Neighborhood Intelligence Report for Homebuyers (Delhi NCR)

NeighborhoodIQ is an open-source, frontend-only intelligence platform designed to empower homebuyers in India to understand the quality of life, environmental realities, amenities, and civic infrastructure around a residential property before purchasing it.

The platform focuses on **Delhi NCR** (covering National Capital Territory of Delhi, Gurugram, Noida, Greater Noida, Ghaziabad, and Faridabad), consolidating data from official Indian government registries, continuous ambient monitoring networks, and open geospatial databases into an honest, structured intelligence report.

---

## 🎨 Visual Identity & Design System

The application is built with a warm, friendly, modern, and trustworthy aesthetic:
- **Warm Beige (`#F5EBDD`)**: Primary page canvas.
- **Cream (`#FFF9F0`)**: Card backgrounds and content panels.
- **Terracotta Red (`#B94D3D`)**: Primary action buttons, active states, and highlights.
- **Soft Mustard Yellow (`#E9BD55`)**: Secondary highlights, trend indicators, and badges.
- **Dark Brown (`#392E29`)**: Headings and primary text.
- **Muted Brown (`#82756C`)**: Subtitles, metadata, and timestamps.
- **Soft Green (`#6D9274`)**: Positive status badges and good readings.
- **Soft Coral (`#D97A68`)**: Warning indicators and sensitive levels.
- **Light Border (`#E8DCCB`)**: Subtle card boundaries and divider lines.
- **No Emojis**: Clean Lucide React iconography, custom SVG shapes, and typography.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm (version 9 or higher)

### Setup & Run

```bash
# 1. Clone or extract the repository
cd neighborhood-iq

# 2. Install dependencies
npm install

# 3. Start local Vite development server
npm run dev
```

Open your browser at `http://localhost:3000` to interact with NeighborhoodIQ.

To build the production bundle:
```bash
npm run build
npm run preview
```

---

## 🏗️ Architecture & Project Structure

The project strictly follows a modular frontend architecture, separating UI presentation, custom hooks, API service adapters, and data fixtures:

```
neighborhood-iq/
├── index.html                 # App shell with fonts and Leaflet CSS
├── package.json               # Dependencies and Vite scripts
├── vite.config.js             # Vite configuration with React plugin
├── .env.example               # Configuration template for public endpoints
├── README.md                  # Complete documentation and methodology
├── public/
│   └── favicon.svg            # Custom terracotta home & pin favicon
└── src/
    ├── main.jsx               # React DOM entry point
    ├── App.jsx                # React Router navigation and view orchestrator
    ├── components/
    │   ├── Navbar.jsx         # Header navigation with mobile drawer
    │   ├── Footer.jsx         # Footer with source links and disclaimers
    │   ├── SearchLocation.jsx # Debounced Nominatim search + preset chips
    │   ├── LocationMap.jsx    # Interactive Leaflet map with radius circle & pins
    │   ├── RadiusSelector.jsx # Analysis perimeter selector (500m to 5km)
    │   ├── ReportHeader.jsx   # Locality overview, coordinates, & compare action
    │   ├── CategoryCard.jsx   # Reusable card container with EvidencePanel
    │   ├── EvidencePanel.jsx  # Audit panel with source links & confidence score
    │   ├── DataStatusBadge.jsx# Status badge (Verified, Official, Estimated)
    │   ├── NearbyPlacesList.jsx# Facility lists (Schools, Hospitals, Transit)
    │   ├── CommuteCalculator.jsx# OSRM driving duration & distance calculator
    │   ├── LoadingSkeleton.jsx# Shimmer placeholder state
    │   └── EmptyState.jsx     # Friendly zero-state feedback
    ├── pages/
    │   ├── Home.jsx           # Landing page with hero, search, & categories
    │   ├── NeighborhoodReport.jsx # 8-category intelligence dashboard
    │   ├── CompareNeighborhoods.jsx # Side-by-side comparison matrix & charts
    │   ├── DataSources.jsx    # Transparent methodology & source directory
    │   └── NotFound.jsx       # 404 handler
    ├── services/
    │   ├── geocodingService.js# OpenStreetMap Nominatim geocoding adapter
    │   ├── placesService.js   # Overpass API amenities fetcher with cache
    │   ├── airQualityService.js# CPCB CAAQMS air monitoring station resolver
    │   ├── routingService.js  # OSRM road graph driving commute engine
    │   ├── infrastructureService.js # DDA, NHAI & DMRC project query engine
    │   └── utilityService.js  # Municipal water & electricity status resolver
    ├── hooks/
    │   ├── useLocationSearch.js # Debounced address search state
    │   └── useNeighborhoodReport.js# Spatial aggregation & confidence evaluator
    ├── utils/
    │   ├── distance.js        # Haversine formula and distance formatters
    │   ├── formatters.js      # NAQI calculation and timestamp formatting
    │   └── confidence.js      # Epistemic data confidence calculation
    ├── data/
    │   ├── demoNeighborhoods.js # Verified profiles for Vasant Kunj, DLF, etc.
    │   ├── dataSources.js     # Authoritative directory of all 9 data providers
    │   └── ncrInfrastructure.js# Gazette-documented projects & utility records
    └── styles/
        ├── variables.css      # Design tokens and color variables
        ├── global.css         # Typography, reset, and shared button styles
        └── components.css     # Responsive component stylesheets
```

---

## 🌐 API Integrations & Resilient Adapters

NeighborhoodIQ integrates real public endpoints while providing graceful offline and rate-limit fallbacks:

| Capability | Real API Integrated | Public Endpoint / Provider | Fallback Strategy |
| :--- | :--- | :--- | :--- |
| **Geocoding & Search** | OpenStreetMap Nominatim | `https://nominatim.openstreetmap.org/search` | Bounded to Delhi NCR (`viewbox`); debounced; falls back to curated Delhi NCR hub database |
| **Amenity Places** | OpenStreetMap Overpass | `https://overpass-api.de/api/interpreter` | Queries `school`, `hospital`, `clinic`, `station` within radius; caches in-memory; falls back to nearest curated cluster |
| **Air Quality** | CPCB Continuous Ambient (CAAQMS) | CPCB NAQI Portal / OpenAQ | Resolves nearest active continuous monitoring station (JNU, R.K. Puram, Anand Vihar, Sector 62, etc.) with verified NAQI pollutant metrics and 7-day trend |
| **Commute & Driving** | Open Source Routing Machine | `https://router.project-osrm.org/route/v1/` | Real road network routing; falls back to Delhi NCR calibrated arterial speed model |
| **Infrastructure & Utilities** | Official Gazettes | DDA, DMRC, NHAI, DJB, GMDA, PVVNL | Curated statutory records with publication dates, project completion horizons, and official notice links |

---

## 🛡️ Epistemic Integrity & Methodology

### 1. No Universal Neighborhood Score
NeighborhoodIQ explicitly avoids generating a single composite score (e.g., "7.8/10"). In urban planning, a single score masks critical trade-offs: an area with world-class hospital access may have severe peak traffic congestion; an area with clean air near the Aravalli ridge may face declining groundwater tables. We empower buyers to weigh categories according to their unique household priorities.

### 2. Missing Data is Never Penalized
In newly planned sectors (e.g. Dwarka Expressway or Greater Noida West), certain local amenities may not yet be tagged by OpenStreetMap volunteers. Missing information is explicitly marked as `Data Unavailable` rather than lowering the neighborhood's rating.

### 3. Objective Evidence Confidence Rating
Every card calculates an epistemic confidence percentage based on:
- **Source Authority**: Statutory regulatory monitoring (CPCB, UDISE+) vs open community data.
- **Physical Proximity**: Distance from property to the monitoring sensor (e.g. station < 2 km receives higher confidence than station 8 km away).
- **Freshness**: Observation date and update cadence.

---

## 🔒 Security & Client-Side Configuration

All configuration is provided via `.env.example`. Environment variables prefixed with `VITE_` are bundled directly into the browser and are publicly visible:
- **Do not store private API keys or database passwords in client files.**
- If private paid APIs (such as Google Maps or proprietary traffic sensors) are integrated in the future, they must be proxied through a secure backend server.

---

## 📜 Licensing & Attributions

- **Map Data**: &copy; [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors (ODbL).
- **Air Quality Norms**: Central Pollution Control Board (CPCB), Ministry of Environment, Forest and Climate Change, Government of India.
- **Education Data**: UDISE+ National Portal, Ministry of Education, Government of India.
- **Transit Data**: Delhi Metro Rail Corporation (DMRC) & Open Transit Data (OTD) Delhi.
- **Healthcare Registry**: Ayushman Bharat Digital Mission (ABDM) Health Facility Registry, MoHFW.
