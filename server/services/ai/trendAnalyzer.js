import { analyzeText } from './nlp.js';

export async function analyzeTrends(posts = null, realTime = false) {
  try {
    // Combine historical data with real-time trends
    const historicalTrends = posts ? analyzeHistoricalTrends(posts) : [];
    const currentTrends = realTime ? await fetchRealTimeTrends() : [];

    return {
      topics: combineAndRankTrends(historicalTrends, currentTrends),
      recommendedHashtags: generateHashtags(historicalTrends, currentTrends),
      urgentTopics: identifyUrgentTopics(currentTrends)
    };
  } catch (error) {
    console.error('Trend Analysis Error:', error);
    throw error;
  }
}

function analyzeHistoricalTrends(posts) {
  // Analyze successful posts for recurring themes and topics
  const successfulPosts = posts.filter(post => 
    post.analytics && post.analytics.engagement > 0.05
  );

  const topics = successfulPosts.flatMap(post => {
    const analysis = analyzeText(post.content);
    return analysis.topics;
  });

  return rankTopics(topics);
}

async function fetchRealTimeTrends() {
  // Simulate fetching real-time trends
  // In production, this would connect to social media APIs or trend analysis services
  return [
    {
      topic: 'AI Integration',
      momentum: 0.85,
      relevance: 0.9,
      urgency: true
    },
    {
      topic: 'Remote Work Tools',
      momentum: 0.75,
      relevance: 0.8,
      urgency: false
    },
    {
      topic: 'Data Security',
      momentum: 0.7,
      relevance: 0.85,
      urgency: true
    }
  ];
}

function combineAndRankTrends(historical, current) {
  const allTrends = [...historical];
  
  current.forEach(trend => {
    const existingIndex = allTrends.findIndex(t => t.topic === trend.topic);
    if (existingIndex >= 0) {
      allTrends[existingIndex].score += trend.momentum;
    } else {
      allTrends.push({
        topic: trend.topic,
        score: trend.momentum * trend.relevance
      });
    }
  });

  return allTrends
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(trend => trend.topic);
}

function generateHashtags(historical, current) {
  const hashtags = new Set();

  // Add hashtags from historical trends
  historical.forEach(trend => {
    hashtags.add(`#${trend.topic.replace(/\s+/g, '')}`);
  });

  // Add hashtags from current trends
  current.forEach(trend => {
    hashtags.add(`#${trend.topic.replace(/\s+/g, '')}`);
  });

  // Add industry-specific hashtags
  const industryHashtags = [
    '#TechInnovation',
    '#FutureOfWork',
    '#ProductivityTools'
  ];
  industryHashtags.forEach(tag => hashtags.add(tag));

  return Array.from(hashtags).slice(0, 10);
}

function identifyUrgentTopics(currentTrends) {
  return currentTrends
    .filter(trend => trend.urgency && trend.relevance > 0.8)
    .map(trend => trend.topic);
}

function rankTopics(topics) {
  const frequency = {};
  topics.forEach(topic => {
    frequency[topic] = (frequency[topic] || 0) + 1;
  });

  return Object.entries(frequency)
    .map(([topic, count]) => ({
      topic,
      score: count
    }))
    .sort((a, b) => b.score - a.score);
}