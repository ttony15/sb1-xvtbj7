import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Image as ImageIcon, 
  Video, 
  Link, 
  Calendar, 
  Clock, 
  Hash, 
  Globe, 
  Instagram, 
  Twitter, 
  Facebook, 
  ArrowLeft,
  Eye,
  Send
} from 'lucide-react';

interface Props {
  onBack?: () => void;
}

function ManualPostCreator({ onBack }: Props) {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = async () => {
    try {
      // Here you would typically save the post
      // For now, we'll just navigate back to the calendar
      navigate('/calendar');
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  const PostPreview = () => (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Eye className="w-6 h-6 text-gray-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Post Preview</h2>
        </div>
      </div>

      <div className="space-y-4">
        {mediaUrl && (
          <img
            src={mediaUrl}
            alt="Post media"
            className="w-full h-64 object-cover rounded-lg"
          />
        )}

        <p className="text-gray-900 whitespace-pre-wrap">{content}</p>

        {hashtags && (
          <div className="flex flex-wrap gap-2">
            {hashtags.split(' ').map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                {tag.startsWith('#') ? tag : `#${tag}`}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{scheduledDate || 'Not scheduled'}</span>
            </div>
            {scheduledTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{scheduledTime}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {selectedPlatforms.map(platform => {
              const Icon = platform === 'instagram' ? Instagram :
                         platform === 'twitter' ? Twitter :
                         Facebook;
              return <Icon key={platform} className="w-4 h-4" />;
            })}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <h1 className="text-2xl font-bold text-gray-900 mt-4">Create New Post</h1>
        <p className="text-gray-500">Create and schedule your social media content</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="space-y-4">
              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Post Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Write your post content..."
                />
              </div>

              {/* Media URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Media URL
                </label>
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter image or video URL"
                  />
                </div>
              </div>

              {/* Hashtags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hashtags
                </label>
                <div className="flex items-center gap-2">
                  <Hash className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={hashtags}
                    onChange={(e) => setHashtags(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Add hashtags (space-separated)"
                  />
                </div>
              </div>

              {/* Platforms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platforms
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedPlatforms(prev => 
                      prev.includes('instagram') 
                        ? prev.filter(p => p !== 'instagram')
                        : [...prev, 'instagram']
                    )}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
                      selectedPlatforms.includes('instagram')
                        ? 'border-pink-200 bg-pink-50 text-pink-600'
                        : 'border-gray-200 hover:border-pink-200 hover:bg-pink-50'
                    }`}
                  >
                    <Instagram className="w-4 h-4" />
                    <span className="text-sm">Instagram</span>
                  </button>
                  <button
                    onClick={() => setSelectedPlatforms(prev => 
                      prev.includes('twitter') 
                        ? prev.filter(p => p !== 'twitter')
                        : [...prev, 'twitter']
                    )}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
                      selectedPlatforms.includes('twitter')
                        ? 'border-blue-200 bg-blue-50 text-blue-600'
                        : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
                    }`}
                  >
                    <Twitter className="w-4 h-4" />
                    <span className="text-sm">Twitter</span>
                  </button>
                  <button
                    onClick={() => setSelectedPlatforms(prev => 
                      prev.includes('facebook') 
                        ? prev.filter(p => p !== 'facebook')
                        : [...prev, 'facebook']
                    )}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
                      selectedPlatforms.includes('facebook')
                        ? 'border-blue-200 bg-blue-50 text-blue-600'
                        : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
                    }`}
                  >
                    <Facebook className="w-4 h-4" />
                    <span className="text-sm">Facebook</span>
                  </button>
                </div>
              </div>

              {/* Schedule */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Send className="w-4 h-4" />
                  Schedule Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div>
          {showPreview ? (
            <PostPreview />
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex flex-col items-center justify-center h-[600px] text-gray-400">
                <Eye className="w-12 h-12 mb-4" />
                <p className="text-lg">Post preview will appear here</p>
                <p className="text-sm mt-2">Click "Show Preview" to see how your post will look</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManualPostCreator;