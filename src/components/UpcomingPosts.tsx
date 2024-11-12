import React from 'react';
import { Instagram, Twitter, Facebook, Clock, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function UpcomingPosts() {
  const navigate = useNavigate();
  
  const posts = [
    {
      id: 1,
      platform: 'instagram',
      title: 'Product Launch Announcement',
      time: '2:00 PM',
      date: 'Today',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 2,
      platform: 'twitter',
      title: 'Tech Talk Series #3',
      time: '10:00 AM',
      date: 'Tomorrow'
    },
    {
      id: 3,
      platform: 'facebook',
      title: 'Customer Success Story',
      time: '3:00 PM',
      date: 'Mar 18',
      image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
  ];

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
    <div className="bg-white rounded-xl border border-gray-200 p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="font-semibold text-gray-900">Upcoming Posts</h2>
        </div>
        <button 
          onClick={() => navigate('/calendar')}
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100"
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
  );
}

export default UpcomingPosts;