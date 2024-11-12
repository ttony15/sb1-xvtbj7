// Simple NLP utilities for text analysis
// In production, this would use more sophisticated NLP libraries or AI services

export function analyzeText(text) {
  return {
    tone: detectTone(text),
    intent: detectIntent(text),
    keywords: extractKeywords(text),
    topics: extractTopics(text)
  };
}

function detectTone(text) {
  const tonePatterns = {
    professional: /\b(announce|introduce|present|launch|report)\b/i,
    casual: /\b(hey|hi|hello|check|awesome|cool)\b/i,
    technical: /\b(implement|deploy|architecture|system|framework)\b/i,
    educational: /\b(learn|guide|tutorial|how|tips)\b/i
  };

  let bestMatch = 'neutral';
  let maxMatches = 0;

  Object.entries(tonePatterns).forEach(([tone, pattern]) => {
    const matches = (text.match(pattern) || []).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      bestMatch = tone;
    }
  });

  return bestMatch;
}

function detectIntent(text) {
  const intentPatterns = {
    announce: /\b(announce|introducing|launch|new|release)\b/i,
    educate: /\b(learn|guide|how|tips|tutorial)\b/i,
    engage: /\b(what|thoughts|opinion|share|discuss)\b/i,
    promote: /\b(offer|deal|save|discount|special)\b/i
  };

  let bestMatch = 'inform';
  let maxMatches = 0;

  Object.entries(intentPatterns).forEach(([intent, pattern]) => {
    const matches = (text.match(pattern) || []).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      bestMatch = intent;
    }
  });

  return bestMatch;
}

function extractKeywords(text) {
  // Remove common words and extract significant terms
  const stopWords = new Set(['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have']);
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  
  return words
    .filter(word => !stopWords.has(word) && word.length > 3)
    .reduce((acc, word) => {
      if (!acc.includes(word)) acc.push(word);
      return acc;
    }, [])
    .slice(0, 5);
}

function extractTopics(text) {
  const topicPatterns = {
    technology: /\b(tech|software|app|digital|platform)\b/i,
    business: /\b(business|company|enterprise|industry|market)\b/i,
    productivity: /\b(productivity|efficiency|workflow|automation)\b/i,
    innovation: /\b(innovation|future|transform|revolutionary)\b/i,
    development: /\b(development|coding|programming|developer)\b/i
  };

  return Object.entries(topicPatterns)
    .filter(([_, pattern]) => pattern.test(text))
    .map(([topic]) => topic);
}