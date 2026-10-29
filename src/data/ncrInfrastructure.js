/**
 * Documented Delhi NCR infrastructure, utility advisories, and environmental incidents
 * derived from official publications and spatial gazette records.
 */

export const NCR_INFRASTRUCTURE_PROJECTS = [
  {
    id: 'dmrc-ph4-aerocity-tughlakabad',
    name: 'Delhi Metro Phase IV: Golden Line (Aerocity – Tughlakabad Corridor)',
    category: 'Metro Transit',
    lat: 28.5200,
    lon: 77.1650,
    status: 'Under Construction',
    source: 'Delhi Metro Rail Corporation (DMRC) / Ministry of Housing and Urban Affairs',
    sourceUrl: 'https://www.delhimetrorail.com/',
    publicationDate: '2023-04-18',
    description: '23.6 km corridor connecting Aerocity, Vasant Kunj, Chhatarpur, Saket G-Block, and Tughlakabad with 15 stations (underground and elevated).',
    estimatedCompletion: '2026-12',
    impactRadiusKm: 6.0
  },
  {
    id: 'rrts-delhi-meerut',
    name: 'Delhi – Meerut Namo Bharat RRTS (Nizamuddin – Sarai Kale Khan – Anand Vihar – Ghaziabad)',
    category: 'Regional Rail',
    lat: 28.5880,
    lon: 77.2530,
    status: 'Under Construction',
    source: 'National Capital Region Transport Corporation (NCRTC)',
    sourceUrl: 'https://ncrtc.in/',
    publicationDate: '2024-01-10',
    description: '82.15 km semi-high-speed rail system reducing travel time between Sarai Kale Khan, Ghaziabad, and Meerut to under 55 minutes.',
    estimatedCompletion: '2025-06',
    impactRadiusKm: 8.0
  },
  {
    id: 'dwarka-expressway',
    name: 'Dwarka Expressway (NH-248BB: Shiv Murti to Kherki Daula)',
    category: 'Highways & Expressways',
    lat: 28.5140,
    lon: 77.0120,
    status: 'Under Construction',
    source: 'National Highways Authority of India (NHAI)',
    sourceUrl: 'https://nhai.gov.in/',
    publicationDate: '2024-03-11',
    description: '29 km 8-lane grade-separated access-controlled expressway linking Dwarka, Delhi with Gurugram NH-48 bypass. Haryana section operational; Delhi package finalizing.',
    estimatedCompletion: '2025-03',
    impactRadiusKm: 7.0
  },
  {
    id: 'uer-2',
    name: 'Urban Extension Road II (UER-II / NH-344M)',
    category: 'Highways & Ring Roads',
    lat: 28.6020,
    lon: 77.0350,
    status: 'Under Construction',
    source: 'NHAI / DDA Master Plan 2021-2041',
    sourceUrl: 'https://dda.gov.in/',
    publicationDate: '2023-11-20',
    description: 'Third Outer Ring Road of Delhi connecting Alipur (NH-44), Rohini, Mundka, Dwarka, and IGI Airport, decongesting inner Ring Roads.',
    estimatedCompletion: '2025-08',
    impactRadiusKm: 6.5
  },
  {
    id: 'jewar-airport-link',
    name: 'Noida International Airport (Jewar) & Eastern Peripheral Connector',
    category: 'Aviation & Transit',
    lat: 28.1800,
    lon: 77.5800,
    status: 'Under Construction',
    source: 'Yamuna International Airport Private Limited (YIAPL) / UP Govt',
    sourceUrl: 'https://niairport.com/',
    publicationDate: '2024-06-05',
    description: 'Greenfield commercial international airport for Greater Noida & Western UP with dedicated express link from Yamuna Expressway.',
    estimatedCompletion: '2025-04',
    impactRadiusKm: 25.0
  },
  {
    id: 'noida-metro-extension',
    name: 'Aqua Line Extension (Sector 51 Noida to Knowledge Park V Greater Noida West)',
    category: 'Metro Transit',
    lat: 28.6010,
    lon: 77.4100,
    status: 'Approved',
    source: 'Noida Metro Rail Corporation (NMRC)',
    sourceUrl: 'https://www.nmrcnoida.com/',
    publicationDate: '2024-02-14',
    description: '17.4 km corridor serving Noida Extension / Greater Noida West with 9 elevated stations, awaiting final central cabinet clearance.',
    estimatedCompletion: '2027-12',
    impactRadiusKm: 5.0
  }
];

export const UTILITY_OBSERVATIONS = {
  south_delhi: {
    zone: 'South Delhi Municipal Zone (Vasant Kunj, Saket, GK)',
    water: {
      provider: 'Delhi Jal Board (DJB)',
      supplyType: 'Piped Municipal Supply via Sonia Vihar & Chandrawal WTP',
      schedule: 'Scheduled 2x daily (6:00 AM - 8:30 AM, 6:00 PM - 7:30 PM)',
      tankerDependency: 'Low in DDA/plotted sectors, Moderate in farmhouses and unauthorized extensions',
      groundwaterDepth: 'Critical (35 - 55 meters below ground level - CGWB 2024 report)',
      officialNotices: [
        {
          date: '2026-10-14',
          title: 'Scheduled maintenance of Sonia Vihar WTP feeder line',
          impact: 'Low water pressure observed in Vasant Kunj sectors B & C for 18 hours',
          status: 'Resolved'
        }
      ]
    },
    electricity: {
      discom: 'BSES Rajdhani Power Limited (BRPL)',
      reliabilityTier: 'High (Tier 1)',
      averageMonthlyOutageHours: 1.8,
      solarNetMetering: 'Active (DDA societies transitioning under Delhi Solar Policy 2024)',
      officialNotices: [
        {
          date: '2026-09-22',
          title: 'Substation transformer upgrade at Mehrauli-Vasant Kunj grid',
          impact: 'Planned 2-hour morning maintenance window',
          status: 'Completed'
        }
      ]
    }
  },
  gurugram: {
    zone: 'Gurugram Municipal Corporation (DLF Phase 1-5, Golf Course Rd)',
    water: {
      provider: 'Gurugram Metropolitan Development Authority (GMDA)',
      supplyType: 'Basai & Chandu Budhera Water Treatment Plants',
      schedule: 'Piped supply supplemented by private condominium storage tanks',
      tankerDependency: 'Moderate (private tankers common during peak summer peak months)',
      groundwaterDepth: 'Over-exploited (40 - 65 meters below ground level)',
      officialNotices: [
        {
          date: '2026-10-18',
          title: 'Pipeline interconnectivity work along Golf Course Extension Rd',
          impact: 'Temporary supply rationing in Sectors 54-57 for 24 hours',
          status: 'Resolved'
        }
      ]
    },
    electricity: {
      discom: 'Dakshin Haryana Bijli Vitran Nigam (DHBVN)',
      reliabilityTier: 'Moderate to High in gated complexes (100% DG backup standard in DLF)',
      averageMonthlyOutageHours: 4.5,
      solarNetMetering: 'Rooftop solar permitted for plotted and independent floors',
      officialNotices: [
        {
          date: '2026-10-05',
          title: 'Underground cabling augmentation in Phase 5',
          impact: 'No service disruption; road shoulder work',
          status: 'Ongoing'
        }
      ]
    }
  },
  noida: {
    zone: 'Noida Authority (Sector 62, 50, 75-78)',
    water: {
      provider: 'Noida Jal Board (Noida Authority)',
      supplyType: 'Ganga Water Project (Pratap Vihar WTP) blended with Ranney wells',
      schedule: 'Regular 2x daily pressurized municipal supply',
      tankerDependency: 'Low in developed sectors (Sec 62, 50, 15)',
      groundwaterDepth: 'Moderate to deep (22 - 38 meters below ground level)',
      officialNotices: [
        {
          date: '2026-10-12',
          title: 'Annual Upper Ganga Canal closure for post-monsoon silt desilting',
          impact: 'Reduced pressure across Sectors 50 to 62; groundwater booster stations deployed',
          status: 'Ongoing until late October'
        }
      ]
    },
    electricity: {
      discom: 'Paschimanchal Vidyut Vitran Nigam Limited (PVVNL)',
      reliabilityTier: 'High (Dedicated industrial and institutional sub-stations)',
      averageMonthlyOutageHours: 2.2,
      solarNetMetering: 'Widely adopted across institutional campuses in Sector 62',
      officialNotices: [
        {
          date: '2026-09-18',
          title: 'Periodic pre-winter insulator maintenance on 132kV transmission line',
          impact: '1 hour scheduled switchover on Sunday morning',
          status: 'Completed'
        }
      ]
    }
  },
  east_delhi_ghaziabad: {
    zone: 'Ghaziabad & East Delhi (Indirapuram, Vaishali, Vasundhara)',
    water: {
      provider: 'Ghaziabad Nagar Nigam (GNN) / Pratap Vihar Ganga WTP',
      supplyType: 'Ganga water blended with tube wells',
      schedule: 'Morning & evening supply windows; high reliance on society overhead reservoirs',
      tankerDependency: 'Moderate in high-density group housing during canal maintenance',
      groundwaterDepth: 'Over-exploited (30 - 45 meters below ground level)',
      officialNotices: [
        {
          date: '2026-10-15',
          title: 'Upper Ganga canal desilting advisory',
          impact: 'Water supply timings curtailed by 30 mins in Ahinsa Khand and Niti Khand',
          status: 'Active'
        }
      ]
    },
    electricity: {
      discom: 'PVVNL Ghaziabad / UP Power Corporation',
      reliabilityTier: 'Moderate (Most gated societies maintain diesel generator backups)',
      averageMonthlyOutageHours: 5.8,
      solarNetMetering: 'Encouraged under UP Solar Energy Policy',
      officialNotices: [
        {
          date: '2026-08-28',
          title: 'Feeder load balancing at Kala Patthar sub-station',
          impact: 'No unscheduled breakdown reported',
          status: 'Completed'
        }
      ]
    }
  }
};

export const ENVIRONMENTAL_INCIDENTS = [
  {
    id: 'yamuna-floodplain',
    name: 'Yamuna River Low-lying Floodplain Risk Zone',
    category: 'Flooding & Drainage',
    type: 'Hydrological Risk Zone',
    dangerLevel: 'High within 500m of river embankment; Minimal in upland southern/western plateaus',
    affectedAreas: ['Mayur Vihar Ph-1 low lands', 'Yamuna Bazar', 'Civil Lines low stretches', 'Kashmere Gate ISBT'],
    monsoonStatus2024: 'River peaked at 207.4m in July monsoon; riverfront parks inundated but city defenses held.',
    drainageCapacity: 'Maintained by Delhi Irrigation & Flood Control Department (IFCD)',
    source: 'Central Water Commission (CWC) / IFCD Delhi',
    sourceUrl: 'https://cwc.gov.in/'
  },
  {
    id: 'najafgarh-stormwater-drain',
    name: 'Najafgarh Drain Corridor & Low-lying Waterlogging Points',
    category: 'Flooding & Drainage',
    type: 'Urban Stormwater Drainage',
    dangerLevel: 'Localized road waterlogging during sudden cloudbursts (>50mm/hr)',
    affectedAreas: ['Dwarka Underpasses', 'Minto Bridge', 'Pul Prahladpur underpass', 'Zakhira underpass'],
    monsoonStatus2024: 'Automated sump pumps and drainage grates operational in major underpasses.',
    source: 'Public Works Department (PWD) Delhi Monsoon Action Plan',
    sourceUrl: 'https://pwd.delhigovt.nic.in/'
  },
  {
    id: 'cpcb-ambient-noise',
    name: 'CPCB National Ambient Noise Monitoring Network (NANMN)',
    category: 'Ambient Noise',
    type: 'Acoustic Monitoring',
    standardLimits: {
      residential: 'Day: 55 dB(A) | Night: 45 dB(A)',
      commercial: 'Day: 65 dB(A) | Night: 55 dB(A)',
      silence_zone: 'Day: 50 dB(A) | Night: 40 dB(A)'
    },
    observationsSummary: 'Main arterial roads (Ring Road, NH-48, Mehrauli-Gurgaon Rd) exceed residential limits by 8-14 dB during peak commute hours. Gated interior sectors generally satisfy nighttime acoustic limits.',
    source: 'Central Pollution Control Board (CPCB) Noise Network',
    sourceUrl: 'https://cpcb.nic.in/noise-pollution/'
  }
];
