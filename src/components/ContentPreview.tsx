import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Heart, MessageCircle, Share2, ArrowRight, Instagram, Twitter, Facebook, Clock } from 'lucide-react';
import PostPreviewModal, { Post } from './shared/PostPreviewModal';

interface Props {
  recentPost: Post;
  upcomingPosts: Post[];
}

function ContentPreview({ recentPost, upcomingPosts }: Props) {
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = React.useState<Post | null>(null);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="w-4 h-4 text-pink-600" />;
      case 'twitter':
        return <Twitter className="w-4 h-4 text-blue-400" />;
      case 'facebook':
        return <Facebook className="w-4 h-4 text-blue-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="font-semibold text-gray-900">Content Overview</h2>
        </div>
        <button 
          onClick={() => navigate('/calendar')}
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
        >
          View Calendar
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Recent Post */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Most Recent Post</h3>
        <div 
          className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={() => setSelectedPost(recentPost)}
        >
          <div className="flex items-start gap-4">
            {recentPost.image && (
              <img
                src={recentPost.image}
                alt=""
                className="w-24 h-24 object-cover rounded-lg"
              />
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getPlatformIcon(recentPost.platform)}
                  <span className="text-sm text-gray-500">{recentPost.publishedAt}</span>
                </div>
              </div>
              <p className="text-gray-900 mb-3">{recentPost.content}</p>
              {recentPost.metrics && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-gray-500">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{recentPost.metrics.likes}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{recentPost.metrics.comments}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm">{recentPost.metrics.shares}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Posts */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Upcoming Posts</h3>
        <div className="space-y-3">
          {upcomingPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              {post.image ? (
                <img
                  src={post.image}
                  alt=""
                  className="w-12 h-12 rounded-lg object-cover"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  {getPlatformIcon(post.platform)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{post.title}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <Clock className="w-3 h-3" />
                  <span>{post.time}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
              </div>
              {getPlatformIcon(post.platform)}
            </div>
          ))}
        </div>
      </div>

      {selectedPost && (
        <PostPreviewModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
}

export default ContentPreview;