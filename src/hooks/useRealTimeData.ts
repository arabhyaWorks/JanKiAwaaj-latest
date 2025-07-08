import { useState, useEffect, useCallback } from 'react';
import { apiService, TwitterTweet, TrendingHashtag, SentimentAnalysis } from '../services/apiService';

interface UseRealTimeDataOptions {
  autoRefresh?: boolean;
  refreshInterval?: number;
  onError?: (error: Error) => void;
}

interface RealTimeData {
  tweets: TwitterTweet[];
  hashtags: TrendingHashtag[];
  sentiment: SentimentAnalysis | null;
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  lastUpdated: Date;
  connectionStatus: 'connected' | 'disconnected' | 'error';
}

export const useRealTimeData = (options: UseRealTimeDataOptions = {}) => {
  const {
    autoRefresh = true,
    refreshInterval = 5 * 60 * 1000, // 5 minutes
    onError
  } = options;

  const [data, setData] = useState<RealTimeData>({
    tweets: [],
    hashtags: [],
    sentiment: null,
    loading: true,
    refreshing: false,
    error: null,
    lastUpdated: new Date(),
    connectionStatus: 'connected'
  });

  const loadData = useCallback(async (showLoading = true) => {
    setData(prev => ({
      ...prev,
      loading: showLoading,
      refreshing: !showLoading,
      error: null
    }));

    try {
      const [tweets, hashtags, sentiment] = await Promise.all([
        apiService.getPoliticalTweets(100),
        apiService.getTrendingHashtags(15),
        apiService.getSentimentAnalysis('24h')
      ]);

      setData(prev => ({
        ...prev,
        tweets,
        hashtags,
        sentiment,
        loading: false,
        refreshing: false,
        lastUpdated: new Date(),
        connectionStatus: 'connected'
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load data';
      
      setData(prev => ({
        ...prev,
        loading: false,
        refreshing: false,
        error: errorMessage,
        connectionStatus: 'error'
      }));

      if (onError) {
        onError(error instanceof Error ? error : new Error(errorMessage));
      }
    }
  }, [onError]);

  const refreshData = useCallback(async () => {
    try {
      await apiService.refreshCache();
      await loadData(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to refresh data';
      setData(prev => ({
        ...prev,
        error: errorMessage,
        connectionStatus: 'error'
      }));
    }
  }, [loadData]);

  const checkConnection = useCallback(async () => {
    try {
      await apiService.checkHealth();
      setData(prev => ({
        ...prev,
        connectionStatus: 'connected'
      }));
    } catch (error) {
      setData(prev => ({
        ...prev,
        connectionStatus: 'disconnected'
      }));
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      loadData(false);
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, loadData]);

  useEffect(() => {
    checkConnection();
    const healthInterval = setInterval(checkConnection, 30000);
    
    return () => clearInterval(healthInterval);
  }, [checkConnection]);

  return {
    ...data,
    refresh: refreshData,
    reload: () => loadData(true)
  };
};