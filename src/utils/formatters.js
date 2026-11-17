/**
 * Format timestamps into friendly human-readable strings
 */
export function formatTimestamp(isoString) {
  if (!isoString) return 'Time not recorded';
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;
    return date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  } catch {
    return isoString;
  }
}

/**
 * Get AQI level color and health implication text according to Indian National Air Quality Index (NAQI) standards
 */
export function getAQIInfo(aqi) {
  if (aqi === null || aqi === undefined || isNaN(aqi)) {
    return { category: 'Unavailable', color: '#82756C', bg: '#F1ECE6', implication: 'Data not reported by station.' };
  }
  const val = Number(aqi);
  if (val <= 50) {
    return { category: 'Good', color: '#6D9274', bg: '#EFF5F0', implication: 'Minimal health impact; satisfactory air quality.' };
 
  }
  if (val <= 100) {
    return { category: 'Satisfactory', color: '#88A375', bg: '#F2F6ED', implication: 'Minor breathing discomfort to sensitive people.' };
  }
  if (val <= 200) {
    return { category: 'Moderate', color: '#E9BD55', bg: '#FDF6E3', implication: 'Breathing discomfort to people with lungs, asthma, and heart diseases.' };
  }
  if (val <= 300) {
    return { category: 'Poor', color: '#D97A68', bg: '#FCF1EE', implication: 'Breathing discomfort to most people on prolonged exposure.' };
  }
  if (val <= 400) {
    return { category: 'Very Poor', color: '#B94D3D', bg: '#F9EBE8', implication: 'Respiratory illness to the people on prolonged exposure.' };
  }
  return { category: 'Severe', color: '#7E2A26', bg: '#F4E5E4', implication: 'Affects healthy people and seriously impacts those with existing diseases.' };
}

/**
 * Maps data confidence status to badge configuration
 */



export function getStatusBadgeConfig(status) {
  const norm = String(status || '').toLowerCase().trim();

  switch (norm) {
    case 'verified':
      return { label: 'Verified', className: 'badge-verified' };

    case 'available':
    case 'live':
    case 'success':
    case 'available - live data':
      return { label: 'Available', className: 'badge-verified' };

    case 'official':
    case 'official but limited':
      return { label: 'Official (Limited)', className: 'badge-official' };

    case 'community':
    case 'community reported':
      return { label: 'Community Reported', className: 'badge-limited' };

    case 'estimated':
      return { label: 'Estimated', className: 'badge-estimated' };

    case 'available - historical data':
    case 'historical data':
      return { label: 'Historical Data', className: 'badge-limited' };

    case 'empty':
    case 'no results':
    case 'no matching records':
      return { label: 'No Matching Records', className: 'badge-limited' };

    case 'not searched':
    case 'not_searched':
      return { label: 'Not Searched', className: 'badge-unavailable' };

    case 'error':
    case 'disabled':
    case 'unavailable':
    case 'data unavailable':
    default:
      return { label: 'Data Unavailable', className: 'badge-unavailable' };
  }
}

