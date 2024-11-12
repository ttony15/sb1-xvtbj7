import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MessageSquare, 
  Calendar, 
  CheckCircle2, 
  ChevronLeft,
  Megaphone,
  Brain,
  Sparkles
} from 'lucide-react';
import WritezAICreator from './create/WritezAICreator';
import ManualPostCreator from './create/ManualPostCreator';
import ContentCalendar from './ContentCalendar';

function CreatePost() {
  const navigate = useNavigate();
  const [contentType, setContentType] = useState<'post' | 'campaign' | null>(null);
  const [creationMode, setCreationMode] = useState<string | null>(null);

  const handleContentTypeSelect = (type: 'post' | 'campaign') => {
    setContentType(type);
    if (type === 'campaign') {
      navigate('/create/campaign');
    } else {
      setCreationMode('choose');
    }
  };

  const ContentTypeSelector = () => (
    <>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">What would you like to create?</h2>
          <p className="text-gray-500 mt-2">Choose the type of content you want to create</p>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-12">
          <button
            onClick={() => handleContentTypeSelect('post')}
            className={`relative p-6 rounded-xl border-2 transition-all transform hover:scale-[1.02] ${
              contentType === 'post'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-200'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900">Single Post</h3>
                <p className="text-sm text-gray-500">Create individual social media content</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 text-left">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Quick content creation
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Multi-platform posting
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                AI-powered suggestions
              </li>
            </ul>
          </button>

          <button
            onClick={() => handleContentTypeSelect('campaign')}
            className={`relative p-6 rounded-xl border-2 transition-all transform hover:scale-[1.02] ${
              contentType === 'campaign'
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-200'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Megaphone className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900">Campaign</h3>
                <p className="text-sm text-gray-500">Create a full marketing campaign</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 text-left">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                Multiple coordinated posts
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                Campaign analytics
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                Strategic planning tools
              </li>
            </ul>
          </button>
        </div>

        {/* Weekly Content Calendar Preview */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Calendar className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Upcoming Content</h2>
                <p className="text-sm text-gray-500">This week's content schedule</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/calendar')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View Full Calendar
            </button>
          </div>

          <ContentCalendar isFullCalendar={false} />
        </div>
      </div>
    </>
  );

  const CreationModeSelector = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">How would you like to create your post?</h2>
        <p className="text-gray-500 mt-2">Choose your preferred creation method</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <button
          onClick={() => setCreationMode('ai')}
          className="relative p-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl text-white hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-[1.02]"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/10 rounded-lg">
              <Brain className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold">Create with WritezAI</h3>
              <p className="text-sm text-purple-100">AI-powered content creation</p>
            </div>
          </div>
          <p className="text-sm text-purple-100 mb-4">
            Let our AI help you create engaging, optimized content based on your goals
          </p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-200" />
              <span>Smart content suggestions</span>
            </li>
            <li className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-200" />
              <span>Audience-targeted messaging</span>
            </li>
            <li className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-200" />
              <span>Performance optimization</span>
            </li>
          </ul>
        </button>

        <button
          onClick={() => setCreationMode('manual')}
          className="p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-all"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-900">Create Manually</h3>
              <p className="text-sm text-gray-500">Step-by-step content creation</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Write and format your content directly with our standard editor
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-gray-400" />
              <span>Full creative control</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-gray-400" />
              <span>Rich text formatting</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-gray-400" />
              <span>Direct editing</span>
            </li>
          </ul>
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <button
          onClick={() => {
            if (creationMode) {
              setCreationMode(null);
              setContentType(null);
            } else {
              navigate(-1);
            }
          }}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="w-4 h-4" />
          {creationMode ? 'Change Type' : 'Back'}
        </button>
      </div>

      {!contentType && <ContentTypeSelector />}
      {contentType === 'post' && creationMode === 'choose' && <CreationModeSelector />}
      {contentType === 'post' && creationMode === 'ai' && <WritezAICreator onBack={() => setCreationMode('choose')} />}
      {contentType === 'post' && creationMode === 'manual' && <ManualPostCreator onBack={() => setCreationMode('choose')} />}
    </div>
  );
}

export default CreatePost;