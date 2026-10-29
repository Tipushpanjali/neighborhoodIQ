/**
 * Calculates a data evidence confidence level based on objective metadata:
 * - Source authority (official government body vs community open data)
 * - Measurement proximity (distance from property to monitoring point)
 * - Freshness (age of latest observation)
 * 
 * Note: Data confidence measures our epistemic certainty in the numbers,
 * NOT the physical quality of the neighborhood itself.
 */
export function calculateConfidenceScore({
  sourceType = 'official',
  distanceKm = null,
  maxAcceptableDistanceKm = 10,
  dataAgeDays = 0,
  hasDirectReadings = true
}) {
  if (!hasDirectReadings) {
    return {
      level: 'Low',
      percentage: 20,
      description: 'No direct local readings; relying on regional projections or historical summaries.'
    };
  }

  let score = 50; // base score for direct readings

  // Source authority factor
  if (sourceType === 'official' || sourceType === 'regulatory') {
    score += 25;
  } else if (sourceType === 'open_database') {
    score += 15;
  } else if (sourceType === 'community') {
    score += 5;
  }

  // Distance proximity factor
  if (distanceKm !== null && distanceKm !== undefined) {
    if (distanceKm <= 2) {
      score += 15;
    } else if (distanceKm <= 5) {
      score += 10;
    } else if (distanceKm <= maxAcceptableDistanceKm) {
      score += 5;
    } else {
      score -= 10; // station is far away
    }
  }

  // Freshness factor
  if (dataAgeDays <= 1) {
    score += 10;
  } else if (dataAgeDays <= 30) {
    score += 5;
  } else if (dataAgeDays > 365) {
    score -= 15;
  }

  // Bound score between 0 and 100
  const finalScore = Math.max(10, Math.min(95, score));

  let level = 'Moderate';
  let description = 'Sufficient data coverage with standard spatial interpolation.';

  if (finalScore >= 80) {
    level = 'High';
    description = 'Authoritative official source located in close proximity with recent verification.';
  } else if (finalScore < 50) {
    level = 'Low';
    description = 'Limited local reporting or station situated at significant distance.';
  }

  return {
    level,
    percentage: finalScore,
    description
  };
}
