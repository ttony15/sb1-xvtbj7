import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, Target, MessageSquare, Sparkles, Send, ArrowLeft, AlertCircle, Copy, Instagram, 
  Twitter, Facebook, Wand2, Hash, Globe, RefreshCw, Lightbulb, TrendingUp, ChevronRight, 
  X, Users, Calendar, CheckCircle, Eye, Book, Search, Image as ImageIcon, Upload, Camera
} from 'lucide-react';

interface Props {
  onBack?: () => void;
}

interface KnowledgeBase {
  id: string;
  name: string;
  description: string;
  type: 'article' | 'guide' | 'policy' | 'template';
  documentCount: number;
  lastUpdated: string;
}

interface ImageOption {
  id: string;
  type: 'upload' | 'generate' | 'url';
  label: string;
  description: string;
  icon: any;
}

function WritezAICreator({ onBack }: Props) {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['instagram']);
  const [aiPrompt, setAiPrompt] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [showKnowledgeBaseModal, setShowKnowledgeBaseModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedKnowledgeBases, setSelectedKnowledgeBases] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImageOption, setSelectedImageOption] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Mock knowledge bases data
  const knowledgeBases: KnowledgeBase[] = [
    {
      id: 'company-info',
      name: 'Company Information',
      description: 'Core company information, values, and messaging',
      type: 'article',
      documentCount: 15,
      lastUpdated: '2024-03-15'
    },
    {
      id: 'market-research',
      name: 'Market Research',
      description: 'Industry trends and competitive analysis',
      type: 'guide',
      documentCount: 23,
      lastUpdated: '2024-03-14'
    },
    {
      id: 'brand-guidelines',
      name: 'Brand Guidelines',
      description: 'Brand voice, style, and visual guidelines',
      type: 'policy',
      documentCount: 8,
      lastUpdated: '2024-03-13'
    },
    {
      id: 'campaign-templates',
      name: 'Campaign Templates',
      description: 'Previous successful campaign strategies',
      type: 'template',
      documentCount: 12,
      lastUpdated: '2024-03-12'
    }
  ];

  const imageOptions: ImageOption[] = [
    {
      id: 'upload',
      type: 'upload',
      label: 'Upload Image',
      description: 'Upload your own image file',
      icon: Upload
    },
    {
      id: 'generate',
      type: 'generate',
      label: 'Generate with AI',
      description: 'Let AI create an image based on your description',
      icon: Sparkles
    },
    {
      id: 'url',
      type: 'url',
      label: 'Image URL',
      description: 'Use an image from the web',
      icon: Globe
    }
  ];

  const filteredKnowledgeBases = knowledgeBases.filter(kb =>
    kb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    kb.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGenerateContent = async () => {
    try {
      setIsGenerating(true);
      // Simulate AI content generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      setGeneratedContent({
        content: "🚀 Exciting announcement! Get ready for our biggest product launch yet. Stay tuned for something that will revolutionize your workflow.",
        hashtags: ["#Innovation", "#AI", "#Tech", "#ProductivityTools"],
        metrics: {
          engagement: "High",
          reach: "25K-30K",
          sentiment: "Positive"
        }
      });
      setShowPreview(true);
    } catch (error) {
      console.error('Failed to generate content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateImage = async (prompt: string) => {
    try {
      setIsGenerating(true);
      // Simulate AI image generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      setImageUrl('https://source.unsplash.com/random/800x600/?tech');
      setShowImageModal(false);
    } catch (error) {
      console.error('Failed to generate image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveContent = () => {
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate('/calendar');
    }, 1500);
  };

  const ImageModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full mx-4">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ImageIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Add Image</h3>
                <p className="text-sm text-gray-500">Choose how you want to add an image</p>
              </div>
            </div>
            <button
              onClick={() => setShowImageModal(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {imageOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedImageOption(option.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedImageOption === option.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200'
                }`}
              >
                <option.icon className="w-6 h-6 text-blue-600 mb-2" />
                <h4 className="font-medium text-gray-900 mb-1">{option.label}</h4>
                <p className="text-sm text-gray-500">{option.description}</p>
              </button>
            ))}
          </div>

          {selectedImageOption && (
            <div className="space-y-4">
              {selectedImageOption === 'upload' && (
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              )}

              {selectedImageOption === 'generate' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image Description
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe the image you want to generate..."
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                  />
                  <button
                    onClick={() => handleGenerateImage(aiPrompt)}
                    disabled={isGenerating}
                    className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Generate Image</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {selectedImageOption === 'url' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter image URL..."
                  />
                </div>
              )}

              {imageUrl && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Preview</h4>
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="max-h-48 rounded-lg object-cover"
                  />
                </div>
              )}
            </div>
          )}

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => setShowImageModal(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={() => setShowImageModal(false)}
              disabled={!imageUrl}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Add Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const KnowledgeBaseModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full mx-4">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Book className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Knowledge Base</h3>
                <p className="text-sm text-gray-500">Select sources for content generation</p>
              </div>
            </div>
            <button
              onClick={() => setShowKnowledgeBaseModal(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search knowledge bases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredKnowledgeBases.map((kb) => (
              <label
                key={kb.id}
                className="flex items-start p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-blue-50"
              >
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    checked={selectedKnowledgeBases.includes(kb.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedKnowledgeBases([...selectedKnowledgeBases, kb.id]);
                      } else {
                        setSelectedKnowledgeBases(selectedKnowledgeBases.filter(id => id !== kb.id));
                      }
                    }}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{kb.name}</p>
                      <p className="text-sm text-gray-500">{kb.description}</p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {kb.documentCount} documents
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                      {kb.type}
                    </span>
                    <span className="text-xs text-gray-500">
                      Updated {kb.lastUpdated}
                    </span>
                  </div>
                </div>
              </label>
            ))}
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => setShowKnowledgeBaseModal(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={() => setShowKnowledgeBaseModal(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Apply Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const SuccessModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Content Created!</h3>
        <p className="text-gray-500">Your post has been added to the calendar</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">Create with WritezAI</h1>
          <p className="text-gray-500">Let AI help you create engaging content</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Content Creation</h2>
                  <p className="text-sm text-gray-500">Create AI-powered social media content</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Knowledge Base */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Knowledge Base
                  </label>
                  <button
                    onClick={() => setShowKnowledgeBaseModal(true)}
                    className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-2">
                      <Book className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">
                        {selectedKnowledgeBases.length
                          ? `${selectedKnowledgeBases.length} sources selected`
                          : 'All knowledge bases'}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {/* AI Prompt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    AI Prompt
                  </label>
                  <textarea
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe what you want to post about..."
                  />
                </div>

                {/* Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image
                  </label>
                  {imageUrl ? (
                    <div className="relative">
                      <img
                        src={imageUrl}
                        alt="Selected"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => setImageUrl('')}
                        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                      >
                        <X className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowImageModal(true)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50"
                    >
                      <ImageIcon className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">Add Image</span>
                    </button>
                  )}
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

                {/* Generate Button */}
                <button
                  onClick={handleGenerateContent}
                  disabled={isGenerating}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4" />
                      <span>Generate Content</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Eye className="w-6 h-6 text-gray-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Content Preview</h2>
              </div>
              {showPreview && (
                <button
                  onClick={handleSaveContent}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Calendar className="w-4 h-4" />
                  Schedule Post
                </button>
              )}
            </div>

            {showPreview && generatedContent ? (
              <div className="space-y-6">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Post"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-900">{generatedContent.content}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {generatedContent.hashtags.map((hashtag: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {hashtag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Engagement</p>
                    <p className="font-medium text-gray-900">{generatedContent.metrics.engagement}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Reach</p>
                    <p className="font-medium text-gray-900">{generatedContent.metrics.reach}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Sentiment</p>
                    <p className="font-medium text-gray-900">{generatedContent.metrics.sentiment}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[600px] text-gray-400">
                <Eye className="w-12 h-12 mb-4" />
                <p className="text-lg">Content preview will appear here</p>
                <p className="text-sm mt-2">Generate content to see the preview</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showKnowledgeBaseModal && <KnowledgeBaseModal />}
      {showImageModal && <ImageModal />}
      {showSuccessModal && <SuccessModal />}
    </div>
  );
}

export default WritezAICreator;