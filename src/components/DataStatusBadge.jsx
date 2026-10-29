import React from 'react';
import { ShieldCheck, Info, AlertTriangle, HelpCircle } from 'lucide-react';
import { getStatusBadgeConfig } from '../utils/formatters';

export default function DataStatusBadge({ status }) {
  const config = getStatusBadgeConfig(status);

  const renderIcon = () => {
    switch (config.label) {
      case 'Verified':
        return <ShieldCheck size={12} />;
      case 'Official (Limited)':
        return <Info size={12} />;
      case 'Community Reported':
      case 'Estimated':
        return <AlertTriangle size={12} />;
      default:
        return <HelpCircle size={12} />;
    }
  };

  return (
    <span className={`pill-badge ${config.className}`}>
      {renderIcon()}
      <span>{config.label}</span>
    </span>
  );
}
