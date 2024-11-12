import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Filter, Instagram, Twitter, Facebook, Clock, Target, X, MessageCircle, Heart, Share2, Globe, Edit } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  content: string;
  platform: 'instagram' | 'twitter' | 'facebook';
  time: string;
  status: string;
  image?: string;
  stats?: {
    likes?: number;
    comments?: number;
    shares?: number;
  };
  campaign?: {
    id: string;
    name: string;
    progress: number;
  };
}

interface PostPreviewModalProps {
  post: Post;
  onClose: () => void;
  onEdit: (post: Post) => void;
}

const PostPreviewModal: React.FC<PostPreviewModalProps> = ({ post, onClose, onEdit }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    // Navigate to create page with post data for editing
    navigate('/create', { 
      state: { 
        mode: 'edit',
        post: {
          ...post,
          // Add any additional fields needed for editing
          originalId: post.id,
          scheduledTime: post.time,
          mediaUrl: post.image
        }
      }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {getPlatformIcon(post.platform)}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{post.time}</span>
                  <span>•</span>
                  <span className="capitalize">{post.status}</span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {post.campaign && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
                 onClick={() => {
                   navigate(`/campaigns/${post.campaign.id}`);
                   onClose();
                 }}>
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

          {post.image && (
            <div className="relative mb-4 rounded-lg overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          <p className="text-gray-600 mb-4 whitespace-pre-wrap">{post.content}</p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-4">
              {post.stats && (
                <>
                  <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{post.stats.likes || 0}</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{post.stats.comments || 0}</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm">{post.stats.shares || 0}</span>
                  </button>
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

const Calendar = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const posts: Record<string, Post[]> = {
    '2024-03-15': [
      {
        id: '1',
        title: 'Product Launch Announcement',
        content: '🚀 Exciting news! Get ready for our biggest product launch yet. Stay tuned for something that will revolutionize your workflow.',
        platform: 'instagram',
        time: '10:00 AM',
        status: 'scheduled',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        stats: {
          likes: 45,
          comments: 12,
          shares: 8
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
        content: '🧵 1/5 Starting our new tech talk series! Today we dive deep into our architecture.',
        platform: 'twitter',
        time: '2:00 PM',
        status: 'scheduled',
        stats: {
          likes: 23,
          comments: 5,
          shares: 3
        },
        campaign: {
          id: 'tech-talks-2024',
          name: 'Tech Talks 2024',
          progress: 30
        }
      }
    ],
    '2024-03-16': [
      {
        id: '3',
        title: 'Customer Success Story',
        content: 'See how Company X achieved 200% growth using our platform! Full case study in the link below.',
        platform: 'facebook',
        time: '11:00 AM',
        status: 'scheduled',
        image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        stats: {
          likes: 34,
          comments: 8,
          shares: 15
        },
        campaign: {
          id: 'success-stories-2024',
          name: 'Success Stories 2024',
          progress: 45
        }
      }
    ]
  };

  const handleEditPost = (post: Post) => {
    navigate('/create', { 
      state: { 
        mode: 'edit',
        post: {
          ...post,
          originalId: post.id,
          scheduledTime: post.time,
          mediaUrl: post.image
        }
      }
    });
  };

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Previous month days
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: 0, isCurrentMonth: false });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true });
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ day: i, isCurrentMonth: false });
    }

    return days;
  };

  const formatDate = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return date.toISOString().split('T')[0];
  };

  const getPostsForDay = (day: number) => {
    if (day === 0) return [];
    const dateStr = formatDate(day);
    return posts[dateStr] || [];
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
      <div className="flex items-center gap-2 text-xs text-gray-500">
        {post.stats && (
          <>
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              {post.stats.likes}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              {post.stats.comments}
            </span>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Calendar</h1>
          <p className="text-gray-500">{currentMonth} {currentYear}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-white rounded-lg border border-gray-200 p-1">
            <button className="px-4 py-2 bg-gray-100 text-gray-900 rounded-md text-sm font-medium">
              Month
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-900 rounded-md text-sm font-medium">
              Week
            </button>
          </div>
          <button 
            onClick={() => navigate('/create')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <CalendarIcon className="w-4 h-4" />
            New Post
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">Filter</span>
          </button>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-pink-50 text-pink-600 rounded-lg hover:opacity-80">
              <Instagram className="w-4 h-4" />
            </button>
            <button className="p-2 bg-blue-50 text-blue-400 rounded-lg hover:opacity-80">
              <Twitter className="w-4 h-4" />
            </button>
            <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:opacity-80">
              <Facebook className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button 
            onClick={() => setCurrentDate(new Date())}
            className="px-4 py-2 text-sm font-medium text-gray-900"
          >
            Today
          </button>
          <button 
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-7 gap-4 mb-4">
          {days.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-600">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-4">
          {getCalendarDays().map((day, index) => {
            const dayPosts = getPostsForDay(day.day);
            const isToday = day.isCurrentMonth && day.day === new Date().getDate() && 
                           currentDate.getMonth() === new Date().getMonth() && 
                           currentDate.getFullYear() === new Date().getFullYear();

            return (
              <div
                key={index}
                className={`min-h-[160px] p-2 border rounded-lg ${
                  isToday
                    ? 'border-blue-200 bg-blue-50'
                    : day.isCurrentMonth
                    ? 'border-gray-100'
                    : 'border-gray-50 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium ${
                    day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {day.day || ''}
                  </span>
                  {dayPosts.length > 0 && (
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      {dayPosts.length}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  {dayPosts.map((post) => renderPostPreview(post))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedPost && (
        <PostPreviewModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onEdit={handleEditPost}
        />
      )}
    </div>
  );
};

export default Calendar;