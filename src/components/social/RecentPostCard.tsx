import React from 'react';
import { Heart, MessageCircle, Share2, TrendingUp, Users, BarChart3, ArrowUp, ArrowDown } from 'lucide-react';

interface PostMetrics {
  engagement: string;
  reach: string;
  sentiment: number;
  likes: number;
  comments: number;
  shares: number;
  trend: 'up' | 'down' | 'neutral';
}

interface Post {
  id: string;
  platform: 'instagram' | 'twitter' | 'facebook';
  content: string;
  image?: string;
  publishedAt: string;
  metrics: PostMetrics;
}

interface RecentPostCardProps {
  post: Post;
}

function RecentPostCard({ post }: RecentPostCardProps) {
  const getSentimentColor = (sentiment: number) => {
    if (sentiment >= 80) return 'text-green-600';
    if (sentiment >= 60) return 'text-blue-600';
    return 'text-yellow-600';
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    if (trend === 'up') return <ArrowUp className="w-4 h-4 text-green-600" />;
    if (trend === 'down') return <ArrowDown className="w-4 h-4 text-red-600" />;
    return null;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Post Performance</h3>
        <span className="text-sm text-gray-500">{post.publishedAt}</span>
      </div>

      <div className="mb-6">
        {post.image && (
          <img
            src={post.image}
            alt="Post"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}
        <p className="text-gray-600">{post.content}</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-500">Engagement</span>
            {getTrendIcon(post.metrics.trend)}
          </div>
          <p className="text-lg font-semibold text-gray-900">{post.metrics.engagement}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-500">Reach</span>
            <Users className="w-4 h-4 text-gray-400" />
          </div>
          <p className="text-lg font-semibold text-gray-900">{post.metrics.reach}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-500">Sentiment</span>
            <BarChart3 className="w-4 h-4 text-gray-400" />
          </div>
          <p className={`text-lg font-semibold ${getSentimentColor(post.metrics.sentiment)}`}>
            {post.metrics.sentiment}%
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-gray-500">
            <Heart className="w-4 h-4" />
            <span className="text-sm">{post.metrics.likes}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">{post.metrics.comments}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Share2 className="w-4 h-4" />
            <span className="text-sm">{post.metrics.shares}</span>
          </div>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700">
          View Details
        </button>
      </div>
    </div>
  );
}

export default RecentPostCard;