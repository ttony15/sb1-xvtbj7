import { useState, useEffect } from 'react';
import { CampaignMetric, CampaignPerformance } from '../types';

interface UseCampaignMetricsProps {
  campaignId?: string;
}

export function useCampaignMetrics({ campaignId }: UseCampaignMetricsProps = {}) {
  const [metrics, setMetrics] = useState<CampaignMetric[]>([]);
  const [insights, setInsights] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!campaignId) return;

    const fetchMetrics = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // In a real implementation, this would fetch from your API
        // For now, we'll return mock data
        await new Promise(resolve => setTimeout(resolve, 1000));

        const mockPerformance: CampaignPerformance = {
          metrics: [
            {
              name: "Brand Awareness",
              current: "+35%",
              target: "+50%",
              trend: "up"
            },
            {
              name: "Lead Generation",
              current: "320",
              target: "500",
              trend: "up"
            },
            {
              name: "Engagement Rate",
              current: "3.8%",
              target: "4.5%",
              trend: "up"
            },
            {
              name: "Conversion Rate",
              current: "1.8%",
              target: "2.5%",
              trend: "up"
            }
          ],
          insights: [
            "Video content driving 2.5x more engagement",
            "LinkedIn showing highest B2B conversion rates",
            "Morning posts (9-11 AM) performing best"
          ]
        };

        setMetrics(mockPerformance.metrics);
        setInsights(mockPerformance.insights);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to fetch metrics');
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, [campaignId]);

  return {
    metrics,
    insights,
    isLoading,
    error
  };
}