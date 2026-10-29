/**
 * Registry of public, official, and open geospatial data sources
 * utilized or investigated for Delhi NCR neighborhood intelligence.
 */
export const DATA_SOURCES = [
  {
    id: 'cpcb',
    name: 'Central Pollution Control Board (CPCB)',
    category: 'Air Quality & Environmental Noise',
    sourceType: 'Official Regulatory Body',
    url: 'https://airquality.cpcb.gov.in/AQI_India/',
    lastChecked: '2026-10-27',
    updateFrequency: 'Hourly automated continuous ambient monitoring (CAAQMS)',
    coverage: 'Delhi NCT, Gurugram, Noida, Ghaziabad, Faridabad (40+ monitoring stations)',
    licensing: 'Government of India Open Data / Public Domain Portal',
    limitations: 'Spatial microclimates between stations may vary; local localized vehicular jams or construction dust can create spikes not reflected at distant stations.'
  },
  {
    id: 'osm',
    name: 'OpenStreetMap (OSM) via Overpass API',
    category: 'Amenities: Schools, Hospitals & Transit',
    sourceType: 'Collaborative Open Geospatial Database',
    url: 'https://www.openstreetmap.org/',
    lastChecked: '2026-10-25',
    updateFrequency: 'Real-time community edits & surveyor revisions',
    coverage: 'Pan-India, granular street-level mapping across Delhi NCR',
    licensing: 'Open Database License (ODbL) 1.0',
    limitations: 'Amenity completeness depends on volunteer contributor mapping; some private clinics or newly built pre-schools may not yet have tags.'
  },
  {
    id: 'otd',
    name: 'Open Transit Data (OTD) Delhi',
    category: 'Public Transport: Bus & Metro Networks',
    sourceType: 'Government Transport Open Data Portal',
    url: 'https://otd.delhi.gov.in/documentation/',
    lastChecked: '2026-10-20',
    updateFrequency: 'Static GTFS feeds updated monthly; dynamic GPS feeds available for select DTC routes',
    coverage: 'Delhi NCT bus stops, DTC / DIMTS cluster routes, Delhi Metro stations',
    licensing: 'Delhi Government Open Data License',
    limitations: 'Live vehicle tracking is limited to specific operational depots; schedule adherences can fluctuate with traffic.'
  },
  {
    id: 'udise',
    name: 'Unified District Information System for Education (UDISE+)',
    category: 'Schools & Educational Infrastructure',
    sourceType: 'Ministry of Education, Government of India',
    url: 'https://www.udiseplus.gov.in/',
    lastChecked: '2026-09-15',
    updateFrequency: 'Annual official census of recognized schools',
    coverage: 'All recognized public and private schools in India',
    licensing: 'Government Data Portal Terms',
    limitations: 'Covers physical infrastructure and affiliation (CBSE/ICSE/State); does not measure subjective teacher effectiveness or parent reviews.'
  },
  {
    id: 'abdm_hfr',
    name: 'Health Facility Registry (Ayushman Bharat Digital Mission)',
    category: 'Hospitals & Healthcare Facilities',
    sourceType: 'National Health Authority (NHA) & MoHFW',
    url: 'https://facility.abdm.gov.in/',
    lastChecked: '2026-10-10',
    updateFrequency: 'Continuous verification and state registry synchronizations',
    coverage: 'Verified public & private healthcare facilities across Delhi NCR',
    licensing: 'Ministry of Health and Family Welfare Open Registry',
    limitations: 'Distinguishes facility level (Primary, Secondary, Tertiary) and bed counts where registered; bed occupancy fluctuates dynamically.'
  },
  {
    id: 'dda',
    name: 'Delhi Development Authority (DDA) Master Plan 2041',
    category: 'Infrastructure Projects & Land Use Planning',
    sourceType: 'Urban Planning Authority',
    url: 'https://dda.gov.in/',
    lastChecked: '2026-10-01',
    updateFrequency: 'Periodically as gazette notifications & zonal plans are released',
    coverage: 'National Capital Territory of Delhi',
    licensing: 'Official Statutory Publication',
    limitations: 'Projects under planning stage are subject to budgetary approvals, environmental clearances, and right-of-way milestones.'
  },
  {
    id: 'djb',
    name: 'Delhi Jal Board (DJB)',
    category: 'Water Supply & Wastewater Management',
    sourceType: 'Municipal Water Authority',
    url: 'https://delhijalboard.delhi.gov.in/',
    lastChecked: '2026-10-26',
    updateFrequency: 'Daily water rationing bulletins, emergency shutdowns, water tanker helpline updates',
    coverage: 'Delhi NCT municipal zones',
    licensing: 'Official Public Notices',
    limitations: 'Notices detail pipeline repairs and planned shut-offs; underground pipeline pressure can vary street by street.'
  },
  {
    id: 'cgwb',
    name: 'Central Ground Water Board (CGWB)',
    category: 'Groundwater Table & Water Security',
    sourceType: 'Ministry of Jal Shakti, Government of India',
    url: 'http://cgwb.gov.in/',
    lastChecked: '2026-08-30',
    updateFrequency: 'Quarterly observation well measurements',
    coverage: 'Delhi NCR observation aquifer network',
    licensing: 'National Water Informatics Center Open Data',
    limitations: 'Aquifer depth measurements represent broad neighborhood groundwater zones rather than plot-specific borewells.'
  },
  {
    id: 'osrm',
    name: 'Open Source Routing Machine (OSRM) with OSM Road Network',
    category: 'Traffic & Commute Estimates',
    sourceType: 'Algorithmic Routing Engine on Open Road Graphs',
    url: 'https://project-osrm.org/',
    lastChecked: '2026-10-27',
    updateFrequency: 'Continuous network updates',
    coverage: 'Delhi NCR highway, arterial, and local road networks',
    licensing: 'BSD 2-Clause / OpenStreetMap Data',
    limitations: 'Calculates standard driving duration and route distance based on legal road speeds. Does not claim live sensor-based congestion.'
  }
];
