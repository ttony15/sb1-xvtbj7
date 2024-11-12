import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Calendar, Globe, Image as ImageIcon, MessageCircle, Instagram, Twitter, Facebook, AlertCircle, Hash, Clock } from 'lucide-react';

interface PostData {
  id: string;
  title: string;
  content: string;
  image?: string;
  platform: 'instagram' | 'twitter' | 'facebook';
  scheduledTime?: string;
  scheduledDate?: string;
  status: 'draft' | 'scheduled' | 'published';
  hashtags?: string[];
  campaign?: {
    id: string;
    name: string;
  };
}

function EditPost() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const postData = location.state?.post;
    if (postData) {
      setPost(postData);
      setIsLoading(false);
    } else if (id) {
      // Fetch post data using the ID
      // This would typically be an API call
      setPost({
        id,
        title: 'Loading...',
        content: '',
        platform: 'instagram',
        status: 'draft'
      });
      setIsLoading(false);
    }
  }, [id, location.state]);

  const handleSave = async () => {
    try {
      setError(null);
      setIsSaving(true);
      // Save post changes
      // This would typically be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/calendar');
    } catch (err) {
      setError('Failed to save post. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="w-5 h-5 text-pink-600" />;
      case 'twitter':
        return <Twitter className="w-5 h-5 text-blue-400" />;
      case 'facebook':
        return <Facebook className="w-5 h-5 text-blue-600" />;
      default:
        return <Globe className="w-5 h-5 text-gray-600" />;
    }
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <button
          onClick={() => navigate('/calendar')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Calendar
        </button>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Edit Post</h1>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={post?.title || ''}
                onChange={(e) => setPost(prev => prev ? { ...prev, title: e.target.value } : null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter post title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                value={post?.content || ''}
                onChange={(e) => setPost(prev => prev ? { ...prev, content: e.target.value } : null)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Write your post content..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hashtags
              </label>
              <div className="flex items-center gap-2">
                <Hash className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={post?.hashtags?.join(' ') || ''}
                  onChange={(e) => setPost(prev => prev ? { 
                    ...prev, 
                    hashtags: e.target.value.split(' ').filter(tag => tag.length > 0)
                  } : null)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add hashtags (space-separated)"
                />
              </div>
            </div>

            {post?.image && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Media
                </label>
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={post.image}
                    alt="Post media"
                    className="w-full h-64 object-cover"
                  />
                  <button className="absolute top-2 right-2 p-2 bg-white rounded-lg shadow-md hover:bg-gray-100">
                    <ImageIcon className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Platform
                </label>
                <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg">
                  {getPlatformIcon(post?.platform || 'instagram')}
                  <span className="text-sm text-gray-900 capitalize">{post?.platform}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Schedule Date
                </label>
                <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <input
                    type="date"
                    value={post?.scheduledDate || ''}
                    onChange={(e) => setPost(prev => prev ? { ...prev, scheduledDate: e.target.value } : null)}
                    className="text-sm text-gray-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Schedule Time
                </label>
                <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <input
                    type="time"
                    value={post?.scheduledTime || ''}
                    onChange={(e) => setPost(prev => prev ? { ...prev, scheduledTime: e.target.value } : null)}
                    className="text-sm text-gray-900 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {post?.campaign && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">Part of Campaign:</span>
                    <span className="text-sm text-blue-700">{post.campaign.name}</span>
                  </div>
                  <button
                    onClick={() => navigate(`/campaigns/${post.campaign?.id}`)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    View Campaign
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPost;