import React, { useState } from 'react';
import { Search, Book, Lightbulb, MessageSquare, ArrowRight } from 'lucide-react';

function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState('');

  const suggestions = [
    {
      id: 1,
      title: "Best Time to Post",
      description: "AI-powered analysis suggests posting between 3-4 PM for maximum engagement.",
      icon: Lightbulb,
      category: "Analytics Insight"
    },
    {
      id: 2,
      title: "Content Strategy",
      description: "Your audience engages most with video content. Consider increasing video posts.",
      icon: MessageSquare,
      category: "Content Strategy"
    },
    {
      id: 3,
      title: "Trending Topics",
      description: "Tech innovation and sustainability are trending in your industry.",
      icon: Book,
      category: "Trends"
    }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Knowledge Base</h1>
        <p className="text-gray-600">AI-powered insights and recommendations</p>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search insights..."
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {suggestions.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <item.icon className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {item.category}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <button className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium">
              Learn more
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-2">Need more specific insights?</h3>
        <p className="mb-4 opacity-90">Our AI can analyze your content performance and provide personalized recommendations.</p>
        <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
          Get Custom Analysis
        </button>
      </div>
    </div>
  );
}

export default KnowledgeBase;