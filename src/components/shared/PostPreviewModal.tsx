import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Share2, TrendingUp, Users, BarChart3, ArrowUp, ArrowDown, Clock, Target, Edit, ExternalLink, Eye, X } from 'lucide-react';

interface PostMetrics {
  engagement?: string;
  reach?: string;
  sentiment?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  trend?: 'up' | 'down' | 'neutral';
}

interface Campaign {
  id: string;
  name: string;
  progress: number;
}

export interface Post {
  id: string;
  title?: string;
  platform: 'instagram' | 'twitter' | 'facebook';
  content?: string;
  image?: string;
  publishedAt?: string;
  time?: string;
  date?: string;
  status: 'draft' | 'scheduled' | 'published';
  metrics?: PostMetrics;
  campaign?: Campaign;
}

interface PostPreviewModalProps {
  post: Post;
  onClose: () => void;
  onEdit?: (post: Post) => void;
}

function PostPreviewModal({ post, onClose, onEdit }: PostPreviewModalProps) {
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  const handleEdit = () => {
    if (onEdit) {
      onEdit(post);
    } else {
      navigate(`/create/post/${post.id}`, { 
        state: { 
          mode: 'edit',
          post: {
            ...post,
            originalId: post.id,
            scheduledTime: post.time || post.publishedAt,
            mediaUrl: post.image
          }
        }
      });
    }
    onClose();
  };

  const handleCampaignClick = () => {
    if (post.campaign) {
      navigate(`/campaigns/${post.campaign.id}`);
      onClose();
    }
  };

  const getTrendIcon = (trend?: string) => {
    if (trend === 'up') return <ArrowUp className="w-4 h-4 text-green-600" />;
    if (trend === 'down') return <ArrowDown className="w-4 h-4 text-red-600" />;
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{post.title || 'Social Media Post'}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{post.time || post.publishedAt}</span>
                <span>•</span>
                <span className="capitalize">{post.status}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Campaign Info */}
          {post.campaign && (
            <div 
              className="mb-4 p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
              onClick={handleCampaignClick}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-900">{post.campaign.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-blue-700">{post.campaign.progress}% Complete</span>
                  <div className="w-16 h-1.5 bg-blue-200 rounded-full">
                    <div 
                      className="h-1.5 bg-blue-600 rounded-full"
                      style={{ width: `${post.campaign.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-blue-700">Click to view campaign details</p>
            </div>
          )}

          {/* Content */}
          {post.image && (
            <div className="relative mb-4 rounded-lg overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title || 'Post content'}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          {post.content && (
            <p className="text-gray-600 mb-4 whitespace-pre-wrap">{post.content}</p>
          )}

          {/* Metrics */}
          {post.metrics && (
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-500">Engagement</span>
                  {getTrendIcon(post.metrics.trend)}
                </div>
                <p className="text-lg font-semibold text-gray-900">{post.metrics.engagement}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-500">Reach</span>
                  <Eye className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-lg font-semibold text-gray-900">{post.metrics.reach}</p>
              </div>
              {post.metrics.sentiment && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-500">Sentiment</span>
                    <BarChart3 className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{post.metrics.sentiment}%</p>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-6">
              {post.metrics && (
                <>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{post.metrics.likes || 0}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{post.metrics.comments || 0}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm">{post.metrics.shares || 0}</span>
                  </div>
                </>
              )}
            </div>
            <button 
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostPreviewModal;