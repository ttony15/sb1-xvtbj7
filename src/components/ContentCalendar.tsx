import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, Instagram, Twitter, Facebook, Clock } from 'lucide-react';
import PostPreviewModal, { Post } from './shared/PostPreviewModal';

interface Props {
  isFullCalendar?: boolean;
}

function ContentCalendar({ isFullCalendar = false }: Props) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDate = new Date();
  const currentWeek = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(currentDate.getDate() + i);
    return date;
  });

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const posts: Record<string, Post[]> = {
    '2024-03-15': [
      {
        id: '1',
        title: 'Product Launch Announcement',
        platform: 'instagram',
        content: '🚀 Exciting news! Get ready for our biggest product launch yet. Stay tuned for something that will revolutionize your workflow.',
        time: '10:00 AM',
        status: 'scheduled',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        metrics: {
          engagement: '4.8%',
          reach: '12.5K',
          sentiment: 85,
          likes: 423,
          comments: 48,
          shares: 32,
          trend: 'up'
        },
        campaign: {
          id: 'spring-launch-2024',
          name: 'Spring 2024 Launch Campaign',
          progress: 65
        }
      },
      {
        id: '2',
        title: 'Tech Talk Series',
        platform: 'twitter',
        content: '🧵 1/5 Starting our new tech talk series! Today we dive deep into our architecture.',
        time: '2:00 PM',
        status: 'scheduled',
        metrics: {
          engagement: '3.2%',
          reach: '8.5K',
          sentiment: 78,
          likes: 234,
          comments: 56,
          shares: 89,
          trend: 'up'
        }
      }
    ],
    '2024-03-16': [
      {
        id: '3',
        title: 'Customer Success Story',
        platform: 'facebook',
        content: 'See how Company X achieved 200% growth using our platform! Full case study in the link below.',
        time: '11:00 AM',
        status: 'scheduled',
        image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        metrics: {
          engagement: '3.8%',
          reach: '15.2K',
          sentiment: 92,
          likes: 567,
          comments: 78,
          shares: 123,
          trend: 'up'
        }
      }
    ]
  };

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

  const renderPostPreview = (post: Post) => (
    <div
      key={post.id}
      onClick={() => setSelectedPost(post)}
      className="group cursor-pointer"
    >
      <div className="flex items-center gap-2 mb-1">
        {getPlatformIcon(post.platform)}
        <span className="text-xs text-gray-500">{post.time}</span>
      </div>
      {post.image ? (
        <div className="relative rounded overflow-hidden mb-1">
          <img
            src={post.image}
            alt=""
            className="w-full h-16 object-cover rounded"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity" />
        </div>
      ) : (
        <p className="text-xs text-gray-600 line-clamp-2 mb-1">{post.content}</p>
      )}
      {post.metrics && (
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>{post.metrics.engagement} engagement</span>
          <span>{post.metrics.reach} reach</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          {isFullCalendar ? 'Content Calendar' : 'Upcoming Content'}
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </div>

      {isFullCalendar ? (
        <div className="grid grid-cols-7 gap-4">
          {days.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-600">
              {day}
            </div>
          ))}
          {Array.from({ length: 35 }).map((_, i) => {
            const date = new Date(currentDate);
            date.setDate(date.getDate() - currentDate.getDay() + i);
            const dateStr = date.toISOString().split('T')[0];
            const dayPosts = posts[dateStr] || [];
            const isToday = date.toDateString() === new Date().toDateString();
            const isCurrentMonth = date.getMonth() === currentDate.getMonth();

            return (
              <div
                key={i}
                className={`min-h-[120px] p-2 border rounded-lg ${
                  isToday
                    ? 'border-blue-200 bg-blue-50'
                    : isCurrentMonth
                    ? 'border-gray-100'
                    : 'border-gray-50 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium ${
                    isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {date.getDate()}
                  </span>
                  {dayPosts.length > 0 && (
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      {dayPosts.length}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  {dayPosts.map(post => renderPostPreview(post))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-4">
          {currentWeek.map((date, index) => {
            const dateStr = date.toISOString().split('T')[0];
            const dayPosts = posts[dateStr] || [];
            const isToday = date.toDateString() === new Date().toDateString();

            return (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  isToday ? 'border-blue-200 bg-blue-50' : 'border-gray-100'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      {days[date.getDay()]}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {date.getDate()}
                    </h3>
                  </div>
                  {isToday && (
                    <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
                      Today
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  {dayPosts.map(post => renderPostPreview(post))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedPost && (
        <PostPreviewModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
}

export default ContentCalendar;