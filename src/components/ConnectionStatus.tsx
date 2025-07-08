import React from 'react';
import { Wifi, WifiOff, AlertCircle, CheckCircle } from 'lucide-react';

interface ConnectionStatusProps {
  status: 'connected' | 'disconnected' | 'error';
  lastUpdated?: Date;
  onRetry?: () => void;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ 
  status, 
  lastUpdated, 
  onRetry 
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return {
          icon: CheckCircle,
          text: 'Connected',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800',
          iconColor: 'text-green-600'
        };
      case 'disconnected':
        return {
          icon: WifiOff,
          text: 'Disconnected',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-800',
          iconColor: 'text-yellow-600'
        };
      case 'error':
        return {
          icon: AlertCircle,
          text: 'Error',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800',
          iconColor: 'text-red-600'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${config.bgColor} ${config.borderColor}`}>
      <Icon className={`w-4 h-4 ${config.iconColor}`} />
      <span className={`text-sm font-medium ${config.textColor}`}>
        {config.text}
      </span>
      {lastUpdated && status === 'connected' && (
        <span className="text-xs text-gray-500">
          • {lastUpdated.toLocaleTimeString()}
        </span>
      )}
      {status !== 'connected' && onRetry && (
        <button
          onClick={onRetry}
          className={`text-xs ${config.textColor} hover:underline ml-2`}
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ConnectionStatus;