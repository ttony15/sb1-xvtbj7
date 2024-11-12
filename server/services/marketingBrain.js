import { PrismaClient } from '@prisma/client';
import { analyzeContent } from './ai/contentAnalyzer.js';
import { generateInsights } from './ai/insightGenerator.js';
import { analyzeTrends } from './ai/trendAnalyzer.js';

const prisma = new PrismaClient();

class MarketingBrainService {
  async getCompanyContext(workspaceId) {
    try {
      // Get company's content and performance data
      const [posts, analytics, campaigns] = await Promise.all([
        prisma.post.findMany({
          where: { workspaceId },
          orderBy: { createdAt: 'desc' },
          take: 100,
          include: {
            analytics: true,
            socialAccount: true
          }
        }),
        prisma.analytics.findMany({
          where: { workspaceId },
          orderBy: { date: 'desc' },
          take: 30
        }),
        prisma.campaign.findMany({
          where: { 
            workspaceId,
            status: 'active'
          },
          include: {
            posts: {
              include: {
                analytics: true
              }
            }
          }
        })
      ]);

      // Analyze content performance
      const contentAnalysis = await analyzeContent(posts);

      // Generate performance insights
      const insights = await generateInsights({
        posts,
        analytics,
        campaigns,
        contentAnalysis
      });

      // Analyze market trends
      const trends = await analyzeTrends(posts);

      return {
        companyVoice: {
          tone: contentAnalysis.tone,
          keyThemes: contentAnalysis.themes,
          recommendedHashtags: trends.recommendedHashtags
        },
        contentStrategy: {
          optimal: {
            timing: insights.optimalTiming,
            frequency: insights.recommendedFrequency,
            formats: insights.topPerformingFormats
          },
          trending: trends.topics,
          gaps: insights.contentGaps
        },
        competitiveInsights: {
          share: {
            value: insights.marketShare,
            trend: insights.marketShareTrend
          },
          opportunities: insights.opportunities
        }
      };
    } catch (error) {
      console.error('Marketing Brain Service Error:', error);
      throw error;
    }
  }

  async generateLiveInsights(workspaceId) {
    try {
      const [recentPosts, analytics, trends] = await Promise.all([
        prisma.post.findMany({
          where: { workspaceId },
          orderBy: { createdAt: 'desc' },
          take: 10,
          include: {
            analytics: true
          }
        }),
        prisma.analytics.findMany({
          where: { workspaceId },
          orderBy: { date: 'desc' },
          take: 7
        }),
        analyzeTrends(null, true) // Get real-time industry trends
      ]);

      const insights = [];

      // Urgent insights (trending topics, viral opportunities)
      if (trends.urgentTopics.length > 0) {
        insights.push({
          type: 'urgent',
          title: 'Trending Topic Alert',
          message: `AI detected a relevant trending topic: "${trends.urgentTopics[0]}". Consider creating content about this topic.`,
          action: 'Create Post',
          color: 'red'
        });
      }

      // Performance insights
      const performanceAnalysis = await analyzeContent(recentPosts);
      if (performanceAnalysis.opportunities.length > 0) {
        insights.push({
          type: 'opportunity',
          title: 'Growth Opportunity',
          message: performanceAnalysis.opportunities[0],
          action: 'View Strategy',
          color: 'blue'
        });
      }

      // Timing and engagement insights
      const timingAnalysis = await this.analyzeOptimalTiming(analytics);
      if (timingAnalysis.recommendation) {
        insights.push({
          type: 'performance',
          title: 'Performance Insight',
          message: timingAnalysis.recommendation,
          action: 'Adjust Schedule',
          color: 'green'
        });
      }

      return insights;
    } catch (error) {
      console.error('Live Insights Generation Error:', error);
      throw error;
    }
  }

  async analyzeOptimalTiming(analytics) {
    // Analyze posting times and engagement patterns
    const engagementByHour = {};
    analytics.forEach(record => {
      const hour = new Date(record.date).getHours();
      if (!engagementByHour[hour]) {
        engagementByHour[hour] = {
          total: 0,
          count: 0
        };
      }
      engagementByHour[hour].total += record.engagement;
      engagementByHour[hour].count += 1;
    });

    // Find optimal posting time
    let bestHour = 0;
    let bestEngagement = 0;
    Object.entries(engagementByHour).forEach(([hour, data]) => {
      const avgEngagement = data.total / data.count;
      if (avgEngagement > bestEngagement) {
        bestEngagement = avgEngagement;
        bestHour = parseInt(hour);
      }
    });

    return {
      optimalHour: bestHour,
      recommendation: `Posts between ${bestHour}:00-${bestHour + 1}:00 get ${Math.round(bestEngagement * 100)}% more engagement`
    };
  }

  async processAiQuery(query, workspaceId) {
    try {
      // Get company context
      const context = await this.getCompanyContext(workspaceId);

      // Process query based on type
      if (query.toLowerCase().includes('content')) {
        return this.generateContentSuggestions(query, context);
      } else if (query.toLowerCase().includes('competitor')) {
        return this.analyzeCompetitors(query, context);
      } else if (query.toLowerCase().includes('trend')) {
        return this.analyzeTrends(query, context);
      }

      // Default response with general insights
      return {
        type: 'general',
        response: `Based on your recent performance:\n\n1. Best posting time: ${context.contentStrategy.optimal.timing}\n2. Top content format: ${context.contentStrategy.optimal.formats[0]}\n3. Trending topics: ${context.contentStrategy.trending.join(', ')}`
      };
    } catch (error) {
      console.error('AI Query Processing Error:', error);
      throw error;
    }
  }

  async generateContentSuggestions(query, context) {
    // Implementation for content suggestions
    const suggestions = await analyzeContent(query, context);
    return {
      type: 'content',
      suggestions
    };
  }

  async analyzeCompetitors(query, context) {
    // Implementation for competitor analysis
    const analysis = await analyzeTrends(query, context, true);
    return {
      type: 'competitors',
      analysis
    };
  }
}

export default new MarketingBrainService();