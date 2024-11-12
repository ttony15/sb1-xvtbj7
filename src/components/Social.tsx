import React, { useState } from 'react';
import { Search, Bell, Filter, MessageSquare, AtSign, MessageCircle, ThumbsUp, Share2, Flag } from 'lucide-react';

function Social() {
  const [activeTab, setActiveTab] = useState('mentions');

  const mentions = [
    {
      id: 1,
      user: {
        name: 'Sarah Wilson',
        handle: '@sarahw',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      content: "Just tried @YourCompany's new feature and it's a game changer! The automation saved me hours of work. 🚀",
      timestamp: '5m ago',
      stats: {
        likes: 45,
        comments: 12,
        shares: 8
      },
      platform: 'twitter'
    },
    {
      id: 2,
      user: {
        name: 'Alex Thompson',
        handle: '@alexthompson',
        avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      content: '@YourCompany Great work on the latest update! The new analytics dashboard is exactly what we needed.',
      timestamp: '15m ago',
      stats: {
        likes: 23,
        comments: 5,
        shares: 3
      },
      platform: 'twitter'
    }
  ];

  const comments = [
    {
      id: 1,
      user: {
        name: 'David Chen',
        handle: '@davidc',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      content: 'This is incredible! How do you handle large-scale deployments?',
      timestamp: '10m ago',
      stats: {
        likes: 34,
        replies: 8
      },
      postTitle: 'Introducing our new deployment pipeline'
    },
    {
      id: 2,
      user: {
        name: 'Emily Rodriguez',
        handle: '@emilyr',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      content: 'The documentation is super clear. Thanks for making it so easy to understand!',
      timestamp: '25m ago',
      stats: {
        likes: 19,
        replies: 3
      },
      postTitle: 'Updated API Documentation'
    }
  ];

  const messages = [
    {
      id: 1,
      user: {
        name: 'Michael Brown',
        handle: '@michaelb',
        avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      content: "Hi, I'm interested in enterprise pricing for my team of 50 people. Could you provide more information?",
      timestamp: '2m ago',
      status: 'unread',
      platform: 'twitter'
    },
    {
      id: 2,
      user: {
        name: 'Lisa Wang',
        handle: '@lisaw',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      content: 'Thanks for the quick response! Looking forward to the demo tomorrow.',
      timestamp: '1h ago',
      status: 'read',
      platform: 'twitter'
    }
  ];

  const tabs = [
    { id: 'mentions', label: 'Mentions', icon: AtSign, count: mentions.length },
    { id: 'comments', label: 'Comments', icon: MessageCircle, count: comments.length },
    { id: 'messages', label: 'Messages', icon: MessageSquare, count: messages.length }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'mentions':
        return (
          <div className="space-y-4">
            {mentions.map((mention) => (
              <div key={mention.id} className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <img src={mention.user.avatar} alt="" className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{mention.user.name}</p>
                        <p className="text-sm text-gray-500">{mention.user.handle}</p>
                      </div>
                      <span className="text-sm text-gray-500">{mention.timestamp}</span>
                    </div>
                    <p className="mt-2 text-gray-600">{mention.content}</p>
                    <div className="mt-3 flex items-center gap-6">
                      <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm">{mention.stats.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">{mention.stats.comments}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                        <Share2 className="w-4 h-4" />
                        <span className="text-sm">{mention.stats.shares}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'comments':
        return (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <img src={comment.user.avatar} alt="" className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{comment.user.name}</p>
                        <p className="text-sm text-gray-500">on {comment.postTitle}</p>
                      </div>
                      <span className="text-sm text-gray-500">{comment.timestamp}</span>
                    </div>
                    <p className="mt-2 text-gray-600">{comment.content}</p>
                    <div className="mt-3 flex items-center gap-6">
                      <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm">{comment.stats.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">{comment.stats.replies}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                        <Flag className="w-4 h-4" />
                        <span className="text-sm">Report</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'messages':
        return (
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <img src={message.user.avatar} alt="" className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{message.user.name}</p>
                        <p className="text-sm text-gray-500">{message.user.handle}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {message.status === 'unread' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            New
                          </span>
                        )}
                        <span className="text-sm text-gray-500">{message.timestamp}</span>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-600">{message.content}</p>
                    <div className="mt-3">
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Social Inbox</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search messages..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="p-2 relative bg-white border border-gray-200 rounded-lg">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600">Filter</span>
            </button>
          </div>
        </div>

        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
              <span className="ml-1.5 py-0.5 px-2 rounded-full text-xs bg-gray-100">
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {renderContent()}
    </div>
  );
}

export default Social;