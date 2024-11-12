import { analyzeText } from './nlp.js';

export async function analyzeContent(posts, query = null) {
  try {
    if (query) {
      // Generate content suggestions based on query
      return generateContentSuggestions(query, posts);
    }

    // Analyze existing content performance
    const analysis = {
      tone: detectTone(posts),
      themes: extractThemes(posts),
      topPerforming: analyzeTopPerforming(posts),
      contentTypes: analyzeContentTypes(posts),
      opportunities: identifyOpportunities(posts)
    };

    return analysis;
  } catch (error) {
    console.error('Content Analysis Error:', error);
    throw error;
  }
}

function detectTone(posts) {
  // Analyze the tone of successful posts
  const tones = posts
    .filter(post => post.analytics && post.analytics.engagement > 0.05)
    .map(post => analyzeText(post.content).tone);

  // Find most common successful tone
  return findMostCommon(tones);
}

function extractThemes(posts) {
  // Extract common themes from successful posts
  const themes = posts
    .filter(post => post.analytics && post.analytics.engagement > 0.05)
    .flatMap(post => analyzeText(post.content).keywords);

  // Return top 5 most common themes
  return findTopN(themes, 5);
}

function analyzeTopPerforming(posts) {
  return posts
    .sort((a, b) => {
      const engagementA = a.analytics ? a.analytics.engagement : 0;
      const engagementB = b.analytics ? b.analytics.engagement : 0;
      return engagementB - engagementA;
    })
    .slice(0, 5)
    .map(post => ({
      content: post.content,
      type: post.type,
      engagement: post.analytics ? post.analytics.engagement : 0,
      reach: post.analytics ? post.analytics.reach : 0
    }));
}

function analyzeContentTypes(posts) {
  const typePerformance = {};
  
  posts.forEach(post => {
    if (!typePerformance[post.type]) {
      typePerformance[post.type] = {
        count: 0,
        totalEngagement: 0
      };
    }
    
    typePerformance[post.type].count += 1;
    if (post.analytics) {
      typePerformance[post.type].totalEngagement += post.analytics.engagement;
    }
  });

  // Calculate average engagement per type
  Object.keys(typePerformance).forEach(type => {
    typePerformance[type].avgEngagement = 
      typePerformance[type].totalEngagement / typePerformance[type].count;
  });

  return typePerformance;
}

function identifyOpportunities(posts) {
  const opportunities = [];
  const contentAnalysis = analyzeContentTypes(posts);

  // Identify underutilized high-performing content types
  Object.entries(contentAnalysis).forEach(([type, data]) => {
    if (data.avgEngagement > 0.05 && data.count < posts.length * 0.2) {
      opportunities.push(
        `Increase ${type} content - currently high-performing but underutilized`
      );
    }
  });

  return opportunities;
}

function generateContentSuggestions(query, posts) {
  // Analyze query intent
  const intent = analyzeText(query).intent;
  
  // Generate suggestions based on intent and historical performance
  const topPerforming = analyzeTopPerforming(posts);
  const contentTypes = analyzeContentTypes(posts);

  // Create content suggestions
  return {
    suggestedTopics: generateTopics(intent, topPerforming),
    recommendedFormat: recommendFormat(contentTypes),
    examples: generateExamples(topPerforming)
  };
}

function generateTopics(intent, topPerforming) {
  // Implementation for topic generation
  return [
    'Industry trends and insights',
    'Product features and benefits',
    'Customer success stories',
    'Expert tips and tutorials',
    'Behind-the-scenes content'
  ];
}

function recommendFormat(contentTypes) {
  // Find best performing content type
  let bestType = null;
  let bestEngagement = 0;

  Object.entries(contentTypes).forEach(([type, data]) => {
    if (data.avgEngagement > bestEngagement) {
      bestEngagement = data.avgEngagement;
      bestType = type;
    }
  });

  return {
    type: bestType,
    reason: `This format has shown ${Math.round(bestEngagement * 100)}% higher engagement`
  };
}

function generateExamples(topPerforming) {
  return topPerforming.map(post => ({
    content: post.content,
    type: post.type,
    performance: `${Math.round(post.engagement * 100)}% engagement rate`
  }));
}

// Utility functions
function findMostCommon(arr) {
  return arr.sort((a,b) =>
    arr.filter(v => v === a).length - arr.filter(v => v === b).length
  ).pop();
}

function findTopN(arr, n) {
  const frequency = {};
  arr.forEach(item => {
    frequency[item] = (frequency[item] || 0) + 1;
  });
  
  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([item]) => item);
}