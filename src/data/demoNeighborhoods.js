/**
 * Comprehensive verified & realistic demo datasets for key residential hubs across Delhi NCR.
 * Used for demo fallbacks, quick presets, and side-by-side comparisons.
 */

export const DEMO_NEIGHBORHOODS = [
  {
    id: 'vasant-kunj-delhi',
    name: 'Vasant Kunj, South Delhi',
    locality: 'Vasant Kunj',
    city: 'New Delhi',
    state: 'Delhi',
    lat: 28.5244,
    lon: 77.1588,
    pinCode: '110070',
    overview: {
      schoolsCount: 8,
      hospitalsCount: 5,
      transitStopsCount: 12,
      environmentalStationsCount: 2,
      infrastructureProjectsCount: 2,
      reliableCategoriesCount: 7
    },
    airQuality: {
      stationName: 'Jawaharlal Nehru University (JNU) CAAQMS / CPCB',
      stationDistanceKm: 1.4,
      aqi: 218,
      primaryPollutant: 'PM2.5',
      pollutants: {
        pm25: { value: 112, unit: 'µg/m³', standard: 60, status: 'Poor' },
        pm10: { value: 198, unit: 'µg/m³', standard: 100, status: 'Moderate' },
        no2: { value: 48, unit: 'µg/m³', standard: 80, status: 'Good' },
        co: { value: 1.2, unit: 'mg/m³', standard: 2.0, status: 'Good' },
        so2: { value: 14, unit: 'µg/m³', standard: 80, status: 'Good' },
        o3: { value: 36, unit: 'µg/m³', standard: 100, status: 'Good' }
      },
      lastUpdated: '2026-10-27T18:00:00+05:30',
      trend: [
        { day: 'Wed', aqi: 185 },
        { day: 'Thu', aqi: 194 },
        { day: 'Fri', aqi: 230 },
        { day: 'Sat', aqi: 242 },
        { day: 'Sun', aqi: 210 },
        { day: 'Mon', aqi: 205 },
        { day: 'Today', aqi: 218 }
      ],
      evidence: {
        sourceName: 'CPCB National Air Quality Index',
        sourceUrl: 'https://airquality.cpcb.gov.in/AQI_India/',
        status: 'Verified',
        coverage: 'Direct local station within 1.5 km radius',
        limitations: 'AQI fluctuates seasonally; post-monsoon stubble burning in northern plains affects winter readings across Delhi.'
      }
    },
    schools: [
      { name: 'Delhi Public School (DPS), Vasant Kunj', type: 'Private Co-ed', board: 'CBSE', distanceKm: 0.6, grades: 'Nursery to XII', udisecode: '07080312001', verifiedDate: '2026-09-15' },
      { name: 'Vasant Valley School', type: 'Private Co-ed', board: 'CBSE', distanceKm: 0.9, grades: 'Nursery to XII', udisecode: '07080312004', verifiedDate: '2026-09-15' },
      { name: 'The Heritage School', type: 'Private Co-ed', board: 'CBSE', distanceKm: 1.2, grades: 'Nursery to XII', udisecode: '07080312009', verifiedDate: '2026-09-15' },
      { name: 'Bloom Public School', type: 'Private Co-ed', board: 'CBSE', distanceKm: 0.8, grades: 'Nursery to XII', udisecode: '07080312015', verifiedDate: '2026-09-15' },
      { name: 'Kendriya Vidyalaya, AFS Arjan Garh/Sultanpur', type: 'Government', board: 'CBSE', distanceKm: 2.1, grades: 'I to XII', udisecode: '07080312020', verifiedDate: '2026-09-15' }
    ],
    hospitals: [
      { name: 'Fortis Flt. Lt. Rajan Dhall Hospital', type: 'Super-Specialty Tertiary', beds: 200, emergency24x7: true, distanceKm: 0.4, abdmId: 'DL-HFR-10492', address: 'Sector B, Pocket 1, Aruna Asaf Ali Marg' },
      { name: 'Institute of Liver and Biliary Sciences (ILBS)', type: 'Autonomous Super-Specialty', beds: 350, emergency24x7: true, distanceKm: 1.1, abdmId: 'DL-HFR-10021', address: 'D-1, Vasant Kunj' },
      { name: 'Cronus Multispeciality Hospital', type: 'Secondary Care Hospital', beds: 50, emergency24x7: true, distanceKm: 1.8, abdmId: 'DL-HFR-12490', address: 'Mahipalpur - Vasant Kunj Rd' },
      { name: 'Sitaram Bhartia Institute of Science & Research', type: 'Multispecialty Hospital', beds: 70, emergency24x7: true, distanceKm: 3.2, abdmId: 'DL-HFR-10088', address: 'B-16, Qutab Institutional Area' }
    ],
    publicTransport: {
      metroStations: [
        { name: 'Chhatarpur Metro Station', line: 'Yellow Line', distanceKm: 2.3, parkingAvailable: true, feederBus: true },
        { name: 'Delhi Aerocity Metro Station', line: 'Airport Express & Golden Line (Ph IV)', distanceKm: 3.5, parkingAvailable: true, feederBus: true },
        { name: 'Vasant Vihar Metro Station', line: 'Magenta Line', distanceKm: 3.8, parkingAvailable: true, feederBus: true }
      ],
      busStops: [
        { name: 'Vasant Kunj B-Block / Fortis Hospital', routes: ['604', '715', '717A', 'ML-70'], distanceKm: 0.2 },
        { name: 'Pocket 9 Vasant Kunj Terminal', routes: ['605', '719', 'Airport Shuttle'], distanceKm: 0.7 },
        { name: 'Vasant Kunj C-Block Market', routes: ['604', '615', '715'], distanceKm: 0.9 }
      ],
      evidence: {
        sourceName: 'Delhi Metro (DMRC) & Open Transit Data Delhi',
        sourceUrl: 'https://otd.delhi.gov.in/documentation/',
        status: 'Verified',
        coverage: 'Mapped stations & bus route network',
        limitations: 'First-and-last-mile connectivity often requires e-rickshaw or feeder autos to reach Yellow/Magenta lines.'
      }
    },
    commuteBenchmarks: [
      { destination: 'Connaught Place (Central Delhi)', distanceKm: 16.2, estimatedMinutes: 38, mode: 'Driving / Cab' },
      { destination: 'Cyber Hub (Gurugram)', distanceKm: 14.5, estimatedMinutes: 28, mode: 'Driving via Mehrauli-Gurgaon Rd' },
      { destination: 'Indira Gandhi International Airport (T3)', distanceKm: 8.5, estimatedMinutes: 18, mode: 'Driving via Nelson Mandela Marg' },
      { destination: 'Nehru Place Financial District', distanceKm: 13.0, estimatedMinutes: 32, mode: 'Driving / Magenta Line' },
      { destination: 'Sector 62 (Noida)', distanceKm: 27.5, estimatedMinutes: 52, mode: 'Driving via Barapullah Flyway' }
    ],
    infrastructure: [
      { name: 'Delhi Metro Golden Line Phase IV (Aerocity - Tughlakabad)', status: 'Under Construction', completion: 'Late 2026', source: 'DMRC Gazette' },
      { name: 'Nelson Mandela Marg to Mahipalpur Underpass Widening', status: 'Completed', completion: '2023', source: 'PWD Delhi' }
    ],
    utility: {
      waterProvider: 'Delhi Jal Board (DJB)',
      waterSchedule: 'Piped supply 2x daily (morning/evening); groundwater table ~42m (CGWB)',
      tankerReliance: 'Low in plotted/DDA blocks',
      electricityDiscom: 'BSES Rajdhani Power Limited (BRPL)',
      electricityReliability: 'High (~1.5 hours total monthly downtime, mainly planned maintenance)',
      evidence: {
        sourceName: 'Delhi Jal Board & BSES Rajdhani Monthly Discom Disclosures',
        sourceUrl: 'https://delhijalboard.delhi.gov.in/',
        status: 'Official but limited',
        coverage: 'Ward 157 South Delhi Municipal Corporation',
        limitations: 'Internal plumbing and society booster pumps affect terminal pressure.'
      }
    },
    noiseFlooding: {
      ambientNoiseLevel: 'Moderate (52 - 58 dB in residential interior pockets; 68 dB near Nelson Mandela Marg)',
      floodingVulnerability: 'Very Low (Rocky Aravalli Ridge terrain, natural rainwater drainage gradient)',
      knownWaterloggingPoints: 'Mild intersection pooling at Mahipalpur-Vasant Kunj flyover underpass during heavy downpours',
      evidence: {
        sourceName: 'CPCB Noise Survey & Delhi PWD Monsoon Hotspot List',
        sourceUrl: 'https://cpcb.nic.in/noise-pollution/',
        status: 'Verified',
        coverage: 'Aravalli Ridge and South-West Delhi drainage zone',
        limitations: 'Noise fluctuates with commercial mall peak hours on Nelson Mandela Marg.'
      }
    }
  },
  {
    id: 'dlf-phase-5-gurugram',
    name: 'DLF Phase 5, Golf Course Road, Gurugram',
    locality: 'Golf Course Road / Sector 42 & 43',
    city: 'Gurugram',
    state: 'Haryana',
    lat: 28.4552,
    lon: 77.0984,
    pinCode: '122002',
    overview: {
      schoolsCount: 7,
      hospitalsCount: 6,
      transitStopsCount: 9,
      environmentalStationsCount: 1,
      infrastructureProjectsCount: 2,
      reliableCategoriesCount: 7
    },
    airQuality: {
      stationName: 'Sector 51 Gurugram CAAQMS / HSPCB',
      stationDistanceKm: 2.8,
      aqi: 226,
      primaryPollutant: 'PM2.5',
      pollutants: {
        pm25: { value: 124, unit: 'µg/m³', standard: 60, status: 'Poor' },
        pm10: { value: 215, unit: 'µg/m³', standard: 100, status: 'Poor' },
        no2: { value: 52, unit: 'µg/m³', standard: 80, status: 'Moderate' },
        co: { value: 1.4, unit: 'mg/m³', standard: 2.0, status: 'Good' },
        so2: { value: 16, unit: 'µg/m³', standard: 80, status: 'Good' },
        o3: { value: 42, unit: 'µg/m³', standard: 100, status: 'Good' }
      },
      lastUpdated: '2026-10-27T18:00:00+05:30',
      trend: [
        { day: 'Wed', aqi: 195 },
        { day: 'Thu', aqi: 205 },
        { day: 'Fri', aqi: 240 },
        { day: 'Sat', aqi: 255 },
        { day: 'Sun', aqi: 220 },
        { day: 'Mon', aqi: 215 },
        { day: 'Today', aqi: 226 }
      ],
      evidence: {
        sourceName: 'Haryana State Pollution Control Board (HSPCB) & CPCB',
        sourceUrl: 'https://airquality.cpcb.gov.in/AQI_India/',
        status: 'Verified',
        coverage: 'Sector 51 station ~2.8 km away',
        limitations: 'Regional road dust from surrounding construction corridors occasionally impacts localized particulate counts.'
      }
    },
    schools: [
      { name: 'The Shri Ram School, Moulsari', type: 'Private Co-ed', board: 'ICSE / IB', distanceKm: 2.1, grades: 'V to XII', udisecode: '06180104101', verifiedDate: '2026-09-15' },
      { name: 'Heritage Xperiential Learning School', type: 'Private Co-ed', board: 'CBSE / IB', distanceKm: 3.2, grades: 'Nursery to XII', udisecode: '06180104108', verifiedDate: '2026-09-15' },
      { name: 'Shiv Nadar School Gurugram', type: 'Private Co-ed', board: 'CBSE / IB', distanceKm: 2.6, grades: 'Nursery to XII', udisecode: '06180104112', verifiedDate: '2026-09-15' },
      { name: 'Lancer International School', type: 'Private International', board: 'IB / IGCSE', distanceKm: 1.1, grades: 'Nursery to XII', udisecode: '06180104115', verifiedDate: '2026-09-15' }
    ],
    hospitals: [
      { name: 'Paras Health Gurugram', type: 'Multi-Specialty Tertiary', beds: 300, emergency24x7: true, distanceKm: 1.9, abdmId: 'HR-HFR-20188', address: 'C-1, Sushant Lok Phase 1' },
      { name: 'Fortis Memorial Research Institute (FMRI)', type: 'Quaternary Care Multi-Super Specialty', beds: 400, emergency24x7: true, distanceKm: 3.1, abdmId: 'HR-HFR-20015', address: 'Sector 44, HUDA City Centre' },
      { name: 'Max Hospital Gurugram', type: 'Super-Specialty Tertiary', beds: 150, emergency24x7: true, distanceKm: 3.4, abdmId: 'HR-HFR-20042', address: 'B-Block, Sushant Lok 1' },
      { name: 'Sanar International Hospital', type: 'Tertiary Care Hospital', beds: 130, emergency24x7: true, distanceKm: 1.4, abdmId: 'HR-HFR-20914', address: 'Golf Course Road, Sector 53' }
    ],
    publicTransport: {
      metroStations: [
        { name: 'Sector 42-43 Rapid Metro Station', line: 'Rapid Metro Gurugram', distanceKm: 0.4, parkingAvailable: false, feederBus: true },
        { name: 'Sector 53-54 Rapid Metro Station', line: 'Rapid Metro Gurugram', distanceKm: 0.8, parkingAvailable: false, feederBus: true },
        { name: 'Millennium City Centre (HUDA) Metro', line: 'Delhi Metro Yellow Line', distanceKm: 2.9, parkingAvailable: true, feederBus: true }
      ],
      busStops: [
        { name: 'Golf Course Road / One Horizon Center', routes: ['Gurugaman Route 111', '116', '212'], distanceKm: 0.3 },
        { name: 'Sushant Lok A-Block', routes: ['Gurugaman Route 112'], distanceKm: 0.9 }
      ],
      evidence: {
        sourceName: 'Rapid Metro Gurugram / Gurugaman City Bus Network',
        sourceUrl: 'https://www.gmcbl.in/',
        status: 'Verified',
        coverage: 'Rapid Metro seamlessly interchanges with Yellow Line at Sikanderpur',
        limitations: 'Rapid Metro fares are slightly higher than standard DMRC slab rates.'
      }
    },
    commuteBenchmarks: [
      { destination: 'Cyber Hub / Cyber City', distanceKm: 4.8, estimatedMinutes: 12, mode: 'Rapid Metro / Driving' },
      { destination: 'Connaught Place (Central Delhi)', distanceKm: 28.5, estimatedMinutes: 48, mode: 'Driving / Yellow Line' },
      { destination: 'IGI Airport T3', distanceKm: 17.5, estimatedMinutes: 26, mode: 'Driving via NH-48 Express' },
      { destination: 'Golf Course Extension IT Hubs', distanceKm: 5.2, estimatedMinutes: 10, mode: 'Driving via Golf Course Ext Rd' },
      { destination: 'Sector 62 Noida', distanceKm: 41.0, estimatedMinutes: 65, mode: 'Driving via DND / NH-48' }
    ],
    infrastructure: [
      { name: 'Golf Course Road 16-Lane Signal-Free Underpass Corridor', status: 'Completed', completion: 'Operational', source: 'DLF-HUDA Joint Venture' },
      { name: 'Gurugram Metro Extension (HUDA City Centre to Cyber City loop)', status: 'Approved', completion: '2027', source: 'Haryana Mass Rapid Transport Corp' }
    ],
    utility: {
      waterProvider: 'GMDA / Basai WTP + Condominium Tankers',
      waterSchedule: 'Pressurized water via internal condominium treatment & storage plants',
      tankerReliance: 'Moderate across unpiped commercial towers in peak summer',
      electricityDiscom: 'DHBVN (Dakshin Haryana Bijli Vitran Nigam)',
      electricityReliability: 'High in gated complexes with 100% DG power backup mandatory',
      evidence: {
        sourceName: 'GMDA Water Supply Division & DHBVN Tariff Orders',
        sourceUrl: 'https://gmda.gov.in/',
        status: 'Official but limited',
        coverage: 'HUDA Sectors 42, 43, 53, 54',
        limitations: 'Condominium maintenance charges (CAM) include backup diesel generator fuel rates.'
      }
    },
    noiseFlooding: {
      ambientNoiseLevel: 'Moderate to High near main Golf Course Road underpasses (62 - 70 dB peak); Quiet in gated residential towers',
      floodingVulnerability: 'Low on main elevated sections; Golf Course Rd underpasses equipped with high-capacity storm pumps after 2020 retrofitting',
      knownWaterloggingPoints: 'Service lane drainage backflow during severe 100mm+ monsoon storms',
      evidence: {
        sourceName: 'GMDA Monsoon Preparedness Report 2024',
        sourceUrl: 'https://gmda.gov.in/',
        status: 'Verified',
        coverage: 'DLF Phase 5 stormwater trunk line',
        limitations: 'Underpass operations depend on continuous pump power during cloudbursts.'
      }
    }
  },
  {
    id: 'sector-62-noida',
    name: 'Sector 62, Noida',
    locality: 'Sector 62 / Institutional & Residential Zone',
    city: 'Noida',
    state: 'Uttar Pradesh',
    lat: 28.6279,
    lon: 77.3649,
    pinCode: '201309',
    overview: {
      schoolsCount: 6,
      hospitalsCount: 4,
      transitStopsCount: 14,
      environmentalStationsCount: 1,
      infrastructureProjectsCount: 2,
      reliableCategoriesCount: 7
    },
    airQuality: {
      stationName: 'Sector 62 Noida CAAQMS / UPPCB',
      stationDistanceKm: 0.6,
      aqi: 238,
      primaryPollutant: 'PM2.5',
      pollutants: {
        pm25: { value: 130, unit: 'µg/m³', standard: 60, status: 'Poor' },
        pm10: { value: 228, unit: 'µg/m³', standard: 100, status: 'Poor' },
        no2: { value: 44, unit: 'µg/m³', standard: 80, status: 'Moderate' },
        co: { value: 1.3, unit: 'mg/m³', standard: 2.0, status: 'Good' },
        so2: { value: 18, unit: 'µg/m³', standard: 80, status: 'Good' },
        o3: { value: 38, unit: 'µg/m³', standard: 100, status: 'Good' }
      },
      lastUpdated: '2026-10-27T18:00:00+05:30',
      trend: [
        { day: 'Wed', aqi: 205 },
        { day: 'Thu', aqi: 215 },
        { day: 'Fri', aqi: 248 },
        { day: 'Sat', aqi: 260 },
        { day: 'Sun', aqi: 232 },
        { day: 'Mon', aqi: 225 },
        { day: 'Today', aqi: 238 }
      ],
      evidence: {
        sourceName: 'Uttar Pradesh Pollution Control Board (UPPCB) & CPCB',
        sourceUrl: 'https://airquality.cpcb.gov.in/AQI_India/',
        status: 'Verified',
        coverage: 'Direct station situated inside Sector 62',
        limitations: 'Proximity to Delhi-Meerut Expressway (NH-9) results in elevated particulate readings during peak truck transit windows.'
      }
    },
    schools: [
      { name: 'Father Agnel School, Sector 62', type: 'Private Co-ed', board: 'CBSE', distanceKm: 0.5, grades: 'Nursery to XII', udisecode: '09100100405', verifiedDate: '2026-09-15' },
      { name: 'Indus Valley Public School', type: 'Private Co-ed', board: 'CBSE', distanceKm: 0.8, grades: 'Nursery to XII', udisecode: '09100100412', verifiedDate: '2026-09-15' },
      { name: 'Symbiosis Centre for Management Studies Campus', type: 'Higher Secondary & University', board: 'UGC / CBSE affiliate', distanceKm: 0.9, grades: 'Higher Ed', udisecode: '09100100419', verifiedDate: '2026-09-15' },
      { name: 'Karl Huber School', type: 'Private Co-ed', board: 'CBSE', distanceKm: 1.2, grades: 'Nursery to XII', udisecode: '09100100424', verifiedDate: '2026-09-15' }
    ],
    hospitals: [
      { name: 'Fortis Hospital Noida', type: 'Tertiary Multi-Specialty Hospital', beds: 200, emergency24x7: true, distanceKm: 0.4, abdmId: 'UP-HFR-30101', address: 'B-22, Sector 62, Noida' },
      { name: 'Jaypee Hospital (Sector 128)', type: 'Quaternary Care Multi-Specialty', beds: 504, emergency24x7: true, distanceKm: 6.8, abdmId: 'UP-HFR-30012', address: 'Sector 128, Wish Town Noida' },
      { name: 'Kailash Hospital & Neuro Institute (Sector 71)', type: 'Super-Specialty', beds: 160, emergency24x7: true, distanceKm: 3.5, abdmId: 'UP-HFR-30045', address: 'H-33, Sector 71, Noida' }
    ],
    publicTransport: {
      metroStations: [
        { name: 'Noida Electronic City Metro Station', line: 'Delhi Metro Blue Line', distanceKm: 0.5, parkingAvailable: true, feederBus: true },
        { name: 'Sector 62 Metro Station', line: 'Delhi Metro Blue Line', distanceKm: 0.8, parkingAvailable: true, feederBus: true }
      ],
      busStops: [
        { name: 'Sector 62 Fortis Hospital Chowk', routes: ['Noida City Bus 392', '347', 'DTC 391'], distanceKm: 0.3 },
        { name: 'Electronic City Terminal', routes: ['DTC 347', 'Ghaziabad Feeder'], distanceKm: 0.6 }
      ],
      evidence: {
        sourceName: 'Delhi Metro Blue Line & Noida Metro Rail Corporation',
        sourceUrl: 'https://www.delhimetrorail.com/',
        status: 'Verified',
        coverage: 'Direct terminal stations of DMRC Blue Line',
        limitations: 'Direct connectivity to central Delhi, but transit to Gurugram requires interchange at Rajiv Chowk or Botanical Garden (Magenta Line).'
      }
    },
    commuteBenchmarks: [
      { destination: 'Connaught Place (Central Delhi)', distanceKm: 18.5, estimatedMinutes: 38, mode: 'Direct Blue Line Metro / Driving' },
      { destination: 'Cyber Hub (Gurugram)', distanceKm: 39.0, estimatedMinutes: 62, mode: 'Driving via DND Flyway / Metro Magenta' },
      { destination: 'Noida Sector 18 (Atta Market)', distanceKm: 9.5, estimatedMinutes: 18, mode: 'Blue Line Metro / Auto' },
      { destination: 'Anand Vihar Railway & Bus Terminal', distanceKm: 7.2, estimatedMinutes: 16, mode: 'Driving via NH-9 / Metro' },
      { destination: 'Noida International Airport (Jewar)', distanceKm: 56.0, estimatedMinutes: 58, mode: 'Driving via Noida-Greater Noida Expressway' }
    ],
    infrastructure: [
      { name: 'Delhi-Meerut Expressway (NH-9) Sector 62 Underpass & Flyover', status: 'Completed', completion: 'Operational', source: 'NHAI' },
      { name: 'Noida-Greater Noida West Metro Corridor Extension', status: 'Approved', completion: '2027', source: 'NMRC' }
    ],
    utility: {
      waterProvider: 'Noida Jal Board (Ganga Water Pratap Vihar WTP)',
      waterSchedule: 'Regular 2x daily pressurized municipal supply (morning/evening)',
      tankerReliance: 'Very Low in planned institutional & residential societies',
      electricityDiscom: 'PVVNL (Paschimanchal Vidyut Vitran Nigam Limited)',
      electricityReliability: 'High (Institutional grid priority, < 2 hours outage/month)',
      evidence: {
        sourceName: 'Noida Authority Annual Performance Review',
        sourceUrl: 'https://noidaauthorityonline.in/',
        status: 'Verified',
        coverage: 'Sector 62 residential blocks (Shatabdi Rail Vihar, Mecon, etc.)',
        limitations: 'Periodic Ganga canal desilting in October curtails piped volume slightly.'
      }
    },
    noiseFlooding: {
      ambientNoiseLevel: 'Moderate (55 - 62 dB; elevated along NH-9 highway corridor)',
      floodingVulnerability: 'Low (Deep subterranean storm drainage channels built by Noida Authority)',
      knownWaterloggingPoints: 'Underpass service lane entrance during acute cloudburst storms',
      evidence: {
        sourceName: 'Noida Authority Monsoon Action Plan',
        sourceUrl: 'https://noidaauthorityonline.in/',
        status: 'Verified',
        coverage: 'Sector 62 drainage catchment',
        limitations: 'Traffic bottlenecks at Model Town crossing cause engine idling noise during 6-8 PM.'
      }
    }
  },
  {
    id: 'indirapuram-ghaziabad',
    name: 'Indirapuram, Ghaziabad',
    locality: 'Indirapuram / Ahinsa Khand & Vaibhav Khand',
    city: 'Ghaziabad',
    state: 'Uttar Pradesh',
    lat: 28.6415,
    lon: 77.3712,
    pinCode: '201014',
    overview: {
      schoolsCount: 8,
      hospitalsCount: 5,
      transitStopsCount: 11,
      environmentalStationsCount: 1,
      infrastructureProjectsCount: 2,
      reliableCategoriesCount: 6
    },
    airQuality: {
      stationName: 'Vasundhara Ghaziabad CAAQMS / UPPCB',
      stationDistanceKm: 2.1,
      aqi: 245,
      primaryPollutant: 'PM2.5',
      pollutants: {
        pm25: { value: 136, unit: 'µg/m³', standard: 60, status: 'Poor' },
        pm10: { value: 240, unit: 'µg/m³', standard: 100, status: 'Poor' },
        no2: { value: 46, unit: 'µg/m³', standard: 80, status: 'Moderate' },
        co: { value: 1.5, unit: 'mg/m³', standard: 2.0, status: 'Good' },
        so2: { value: 20, unit: 'µg/m³', standard: 80, status: 'Good' },
        o3: { value: 34, unit: 'µg/m³', standard: 100, status: 'Good' }
      },
      lastUpdated: '2026-10-27T18:00:00+05:30',
      trend: [
        { day: 'Wed', aqi: 210 },
        { day: 'Thu', aqi: 224 },
        { day: 'Fri', aqi: 255 },
        { day: 'Sat', aqi: 268 },
        { day: 'Sun', aqi: 240 },
        { day: 'Mon', aqi: 232 },
        { day: 'Today', aqi: 245 }
      ],
      evidence: {
        sourceName: 'UPPCB & CPCB Air Monitoring Network',
        sourceUrl: 'https://airquality.cpcb.gov.in/AQI_India/',
        status: 'Verified',
        coverage: 'Vasundhara station ~2.1 km away',
        limitations: 'High residential density and localized commercial traffic contribute to localized PM10 dust.'
      }
    },
    schools: [
      { name: 'Delhi Public School (DPS), Indirapuram', type: 'Private Co-ed', board: 'CBSE', distanceKm: 0.8, grades: 'Nursery to XII', udisecode: '09090101802', verifiedDate: '2026-09-15' },
      { name: 'St. Francis School, Indirapuram', type: 'Private Co-ed', board: 'ICSE', distanceKm: 1.1, grades: 'Nursery to XII', udisecode: '09090101808', verifiedDate: '2026-09-15' },
      { name: 'Cambridge School Indirapuram', type: 'Private Co-ed', board: 'CBSE', distanceKm: 1.4, grades: 'Nursery to XII', udisecode: '09090101815', verifiedDate: '2026-09-15' }
    ],
    hospitals: [
      { name: 'Max Super Speciality Hospital, Vaishali', type: 'Super-Specialty Tertiary', beds: 350, emergency24x7: true, distanceKm: 2.8, abdmId: 'UP-HFR-30214', address: 'Sector 1, Vaishali, Ghaziabad' },
      { name: 'Shanti Gopal Hospital', type: 'Multispecialty Hospital', beds: 110, emergency24x7: true, distanceKm: 0.9, abdmId: 'UP-HFR-30388', address: 'Mall Road, Ahinsa Khand 2, Indirapuram' },
      { name: 'AmiCare Hospital', type: 'Multispecialty Center', beds: 60, emergency24x7: true, distanceKm: 0.7, abdmId: 'UP-HFR-30421', address: 'Vaibhav Khand, Indirapuram' }
    ],
    publicTransport: {
      metroStations: [
        { name: 'Vaishali Metro Station', line: 'Delhi Metro Blue Line', distanceKm: 3.2, parkingAvailable: true, feederBus: true },
        { name: 'Noida Electronic City Metro', line: 'Delhi Metro Blue Line', distanceKm: 1.8, parkingAvailable: true, feederBus: true }
      ],
      busStops: [
        { name: 'Kala Patthar Chowk Bus Stop', routes: ['Ghaziabad City Feeder', 'DTC 391'], distanceKm: 0.4 },
        { name: 'Shipra Mall CISF Camp Stop', routes: ['NH-9 Regional Lines'], distanceKm: 0.6 }
      ],
      evidence: {
        sourceName: 'Delhi Metro & Ghaziabad Development Authority (GDA)',
        sourceUrl: 'https://gda.up.gov.in/',
        status: 'Official but limited',
        coverage: 'Indirapuram does not have an internal metro station; relies on adjacent Vaishali and Sector 62',
        limitations: 'E-rickshaws and shared autos are required for last-mile connectivity to Blue Line stations.'
      }
    },
    commuteBenchmarks: [
      { destination: 'Connaught Place (Central Delhi)', distanceKm: 19.8, estimatedMinutes: 42, mode: 'Driving via Delhi-Meerut Expressway' },
      { destination: 'Anand Vihar ISBT & Railway Station', distanceKm: 6.8, estimatedMinutes: 15, mode: 'Driving / Auto' },
      { destination: 'Noida Sector 62 IT Park', distanceKm: 2.4, estimatedMinutes: 8, mode: 'Driving / E-rickshaw' },
      { destination: 'Cyber Hub Gurugram', distanceKm: 42.5, estimatedMinutes: 68, mode: 'Driving via DND Flyway' }
    ],
    infrastructure: [
      { name: 'Delhi-Meerut Expressway 14-Lane Corridor', status: 'Completed', completion: 'Operational', source: 'NHAI' },
      { name: 'Namo Bharat RRTS Anand Vihar - Sahibabad Corridor', status: 'Under Construction', completion: '2025', source: 'NCRTC' }
    ],
    utility: {
      waterProvider: 'Ghaziabad Nagar Nigam (GNN) / Pratap Vihar Ganga Plant',
      waterSchedule: 'Morning and evening timings; groundwater levels deeply stressed (~38m)',
      tankerReliance: 'Moderate in summer for large society complexes',
      electricityDiscom: 'PVVNL Ghaziabad',
      electricityReliability: 'Moderate (3 - 6 hours monthly outage; societies rely on diesel generator sets)',
      evidence: {
        sourceName: 'Ghaziabad Nagar Nigam Citizen Charter',
        sourceUrl: 'https://onlinegnn.com/',
        status: 'Community reported',
        coverage: 'Ahinsa Khand, Vaibhav Khand, Niti Khand',
        limitations: 'High variation in society maintenance charges due to diesel generator run-hours.'
      }
    },
    noiseFlooding: {
      ambientNoiseLevel: 'Moderate to High during market hours (58 - 66 dB around Kala Patthar)',
      floodingVulnerability: 'Moderate during monsoon cloudbursts in low-lying internal pockets',
      knownWaterloggingPoints: 'Ahinsa Khand 2 underpass and CISF road dip during heavy rains',
      evidence: {
        sourceName: 'Ghaziabad Municipal Drainage Inspection',
        sourceUrl: 'https://onlinegnn.com/',
        status: 'Official but limited',
        coverage: 'Indirapuram stormwater drains',
        limitations: 'Storm runoff drains into Hindon river; backflow occurs during Hindon high-water levels.'
      }
    }
  },
  {
    id: 'dwarka-sector-10-delhi',
    name: 'Dwarka Sector 10, South West Delhi',
    locality: 'Dwarka Sector 10',
    city: 'New Delhi',
    state: 'Delhi',
    lat: 28.5815,
    lon: 77.0560,
    pinCode: '110075',
    overview: {
      schoolsCount: 9,
      hospitalsCount: 4,
      transitStopsCount: 15,
      environmentalStationsCount: 1,
      infrastructureProjectsCount: 3,
      reliableCategoriesCount: 7
    },
    airQuality: {
      stationName: 'Dwarka Sector 8 CAAQMS / Delhi Pollution Control Committee (DPCC)',
      stationDistanceKm: 1.2,
      aqi: 212,
      primaryPollutant: 'PM2.5',
      pollutants: {
        pm25: { value: 108, unit: 'µg/m³', standard: 60, status: 'Poor' },
        pm10: { value: 192, unit: 'µg/m³', standard: 100, status: 'Moderate' },
        no2: { value: 42, unit: 'µg/m³', standard: 80, status: 'Good' },
        co: { value: 1.1, unit: 'mg/m³', standard: 2.0, status: 'Good' },
        so2: { value: 12, unit: 'µg/m³', standard: 80, status: 'Good' },
        o3: { value: 32, unit: 'µg/m³', standard: 100, status: 'Good' }
      },
      lastUpdated: '2026-10-27T18:00:00+05:30',
      trend: [
        { day: 'Wed', aqi: 180 },
        { day: 'Thu', aqi: 190 },
        { day: 'Fri', aqi: 220 },
        { day: 'Sat', aqi: 235 },
        { day: 'Sun', aqi: 202 },
        { day: 'Mon', aqi: 198 },
        { day: 'Today', aqi: 212 }
      ],
      evidence: {
        sourceName: 'DPCC & CPCB Continuous Ambient Air Quality Monitoring',
        sourceUrl: 'https://airquality.cpcb.gov.in/AQI_India/',
        status: 'Verified',
        coverage: 'Direct monitoring station in adjacent Sector 8',
        limitations: 'Dwarka benefits from wide sub-city road grids and green parks, mitigating local trapping of pollutants.'
      }
    },
    schools: [
      { name: 'Maxfort School, Dwarka Sector 7', type: 'Private Co-ed', board: 'CBSE', distanceKm: 0.8, grades: 'Nursery to XII', udisecode: '07090204102', verifiedDate: '2026-09-15' },
      { name: 'Mount Carmel School, Dwarka', type: 'Private Co-ed', board: 'CBSE', distanceKm: 1.2, grades: 'Nursery to XII', udisecode: '07090204108', verifiedDate: '2026-09-15' },
      { name: 'Venkateshwar International School', type: 'Private Co-ed', board: 'CBSE', distanceKm: 1.4, grades: 'Nursery to XII', udisecode: '07090204115', verifiedDate: '2026-09-15' },
      { name: 'Bal Bharati Public School, Sector 12', type: 'Private Co-ed', board: 'CBSE', distanceKm: 1.5, grades: 'Nursery to XII', udisecode: '07090204120', verifiedDate: '2026-09-15' }
    ],
    hospitals: [
      { name: 'Manipal Hospital Dwarka', type: 'Quaternary Multi-Super Specialty', beds: 380, emergency24x7: true, distanceKm: 1.1, abdmId: 'DL-HFR-10311', address: 'Sector 6, Dwarka' },
      { name: 'Venkateshwar Hospital', type: 'Tertiary Multi-Super Specialty', beds: 325, emergency24x7: true, distanceKm: 1.3, abdmId: 'DL-HFR-10350', address: 'Sector 18A, Dwarka' },
      { name: 'Indira Gandhi Hospital (Govt)', type: 'Government Tertiary Hospital', beds: 1200, emergency24x7: true, distanceKm: 1.6, abdmId: 'DL-HFR-10400', address: 'Sector 9, Dwarka' }
    ],
    publicTransport: {
      metroStations: [
        { name: 'Dwarka Sector 10 Metro Station', line: 'Delhi Metro Blue Line', distanceKm: 0.3, parkingAvailable: true, feederBus: true },
        { name: 'Dwarka Sector 9 Metro Station', line: 'Delhi Metro Blue Line', distanceKm: 0.9, parkingAvailable: true, feederBus: true },
        { name: 'Dwarka Sector 21 (Airport Express Link)', line: 'Blue Line & Airport Express', distanceKm: 3.2, parkingAvailable: true, feederBus: true }
      ],
      busStops: [
        { name: 'Dwarka Sector 10 Metro Station Bus Stop', routes: ['764', 'RL-77', '718', 'Airport Shuttle'], distanceKm: 0.2 },
        { name: 'Sector 10 Market Terminal', routes: ['761', '801'], distanceKm: 0.5 }
      ],
      evidence: {
        sourceName: 'Delhi Metro & Open Transit Data Delhi',
        sourceUrl: 'https://otd.delhi.gov.in/documentation/',
        status: 'Verified',
        coverage: 'Direct sub-city Blue Line connectivity with easy Airport Express interchange',
        limitations: 'Peak office hour trains at Sector 10 have high passenger occupancy.'
      }
    },
    commuteBenchmarks: [
      { destination: 'IGI Airport Terminal 3', distanceKm: 9.8, estimatedMinutes: 18, mode: 'Airport Express Metro / Driving' },
      { destination: 'Cyber Hub Gurugram', distanceKm: 18.2, estimatedMinutes: 30, mode: 'Driving via Dwarka Expressway / NH-48' },
      { destination: 'Connaught Place (Central Delhi)', distanceKm: 22.0, estimatedMinutes: 44, mode: 'Direct Blue Line Metro' },
      { destination: 'Aerocity Hospitality District', distanceKm: 11.5, estimatedMinutes: 22, mode: 'Driving / Airport Express' }
    ],
    infrastructure: [
      { name: 'Dwarka Expressway (NH-248BB Delhi Section)', status: 'Under Construction', completion: 'Early 2025', source: 'NHAI' },
      { name: 'Urban Extension Road II (UER-II)', status: 'Under Construction', completion: 'Mid 2025', source: 'NHAI' },
      { name: 'Yashobhoomi (IICC) Convention Center', status: 'Completed', completion: 'Operational', source: 'DPIIT' }
    ],
    utility: {
      waterProvider: 'Delhi Jal Board (Dwarka Water Treatment Plant)',
      waterSchedule: 'Piped supply 2x daily; Dwarka Command Tank reservoirs maintain steady pressure',
      tankerReliance: 'Very Low in organized CGHS societies',
      electricityDiscom: 'BSES Rajdhani Power Limited (BRPL)',
      electricityReliability: 'High (Underground cabling throughout Dwarka sub-city, < 1.2 hrs outage/month)',
      evidence: {
        sourceName: 'DDA Dwarka Project Office & DJB Water Quality Audit',
        sourceUrl: 'https://dda.gov.in/',
        status: 'Verified',
        coverage: 'Dwarka Sectors 6, 7, 9, 10, 11',
        limitations: 'Groundwater extraction is legally prohibited in Dwarka to protect saline aquifer tables.'
      }
    },
    noiseFlooding: {
      ambientNoiseLevel: 'Low to Moderate (48 - 54 dB inside residential sectors; wide green buffers between roads)',
      floodingVulnerability: 'Low in plotted & group housing sectors; engineered stormwater box drains',
      knownWaterloggingPoints: 'Dwarka underpasses near Sector 21 during intense downpours',
      evidence: {
        sourceName: 'DDA Sub-city Drainage Master Plan',
        sourceUrl: 'https://dda.gov.in/',
        status: 'Verified',
        coverage: 'Sector 10 residential grid',
        limitations: 'Occasional flight overhead noise from IGI Airport runway approaches.'
      }
    }
  }
];
