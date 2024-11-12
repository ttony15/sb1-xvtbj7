import React, { useState, useMemo } from 'react';
import { Image, Link, Plus, FolderPlus, Search, Upload, Globe, FileText, Trash2, ExternalLink, BookOpen, 
  X, AlertCircle, Download, Eye, Share2, Filter, MoreVertical, Edit } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  type: 'file' | 'link' | 'image' | 'document';
  category: string;
  description: string;
  url?: string;
  fileType?: string;
  addedAt: string;
  size?: string;
  author?: string;
  tags: string[];
  views: number;
  downloads: number;
  shares: number;
}

interface Category {
  id: string;
  name: string;
  count: number;
  icon: any;
}

function Library() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [resourceType, setResourceType] = useState<'file' | 'link' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const categories: Category[] = [
    { id: 'all', name: 'All Resources', count: 8, icon: Globe },
    { id: 'company', name: 'Company Info', count: 3, icon: FileText },
    { id: 'product', name: 'Product Details', count: 2, icon: BookOpen },
    { id: 'brand', name: 'Brand Guidelines', count: 1, icon: Image },
    { id: 'market', name: 'Market Research', count: 2, icon: FileText }
  ];

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Company Overview 2024',
      type: 'document',
      category: 'company',
      description: 'Comprehensive overview of company mission, values, and achievements',
      fileType: 'pdf',
      addedAt: '2024-03-14',
      size: '2.4 MB',
      author: 'Marketing Team',
      tags: ['company', 'overview', '2024'],
      views: 245,
      downloads: 78,
      shares: 34
    },
    {
      id: '2',
      title: 'Brand Style Guide',
      type: 'file',
      category: 'brand',
      description: 'Official brand guidelines including logos, colors, and typography',
      fileType: 'pdf',
      addedAt: '2024-03-13',
      size: '5.1 MB',
      author: 'Design Team',
      tags: ['brand', 'design', 'guidelines'],
      views: 189,
      downloads: 56,
      shares: 23
    },
    {
      id: '3',
      title: 'Product Documentation',
      type: 'link',
      category: 'product',
      description: 'Technical documentation and API references',
      url: 'https://docs.example.com',
      addedAt: '2024-03-12',
      author: 'Technical Team',
      tags: ['documentation', 'technical', 'api'],
      views: 567,
      downloads: 0,
      shares: 89
    }
  ];

  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [resources, searchQuery, activeCategory]);

  const handleAddResource = () => {
    setShowAddModal(true);
    setResourceType(null);
    setError(null);
  };

  const handleResourceUpload = async (files: FileList | null) => {
    if (!files?.length) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Here you would typically upload the file to your server
      // For now, we'll simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Close modal after successful upload
      setShowAddModal(false);
    } catch (error) {
      setError('Failed to upload file. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const ResourceModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full mx-4">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">Add Resource</h3>
            <button
              onClick={() => setShowAddModal(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {error && (
          <div className="mx-6 mt-4 p-4 bg-red-50 rounded-lg">
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          </div>
        )}
        
        {!resourceType ? (
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setResourceType('file')}
                className="p-6 text-center border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <Upload className="w-8 h-8 mx-auto mb-3 text-gray-600" />
                <h3 className="font-medium text-gray-900">Upload File</h3>
                <p className="text-sm text-gray-500 mt-1">PDF, DOCX, or media files</p>
              </button>
              
              <button
                onClick={() => setResourceType('link')}
                className="p-6 text-center border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <Globe className="w-8 h-8 mx-auto mb-3 text-gray-600" />
                <h3 className="font-medium text-gray-900">Add Link</h3>
                <p className="text-sm text-gray-500 mt-1">URLs to external resources</p>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter resource title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select category</option>
                  {categories.filter(c => c.id !== 'all').map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter resource description"
                />
              </div>
              
              {resourceType === 'file' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">File</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                          <span>Upload a file</span>
                          <input
                            type="file"
                            className="sr-only"
                            onChange={(e) => handleResourceUpload(e.target.files)}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PDF, DOCX, or media files up to 10MB</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                  <input
                    type="url"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter resource URL"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter tags (comma-separated)"
                />
              </div>
            </form>
          </div>
        )}
        
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={() => {
              setResourceType(null);
              setShowAddModal(false);
            }}
            className="px-4 py-2 text-gray-700 hover:text-gray-900"
          >
            Cancel
          </button>
          {resourceType && (
            <button
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Adding...' : 'Add Resource'}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const ResourcePreview = ({ resource }: { resource: Resource }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-3xl w-full mx-4">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {resource.type === 'document' && <FileText className="w-6 h-6 text-blue-600" />}
              {resource.type === 'link' && <Globe className="w-6 h-6 text-green-600" />}
              {resource.type === 'image' && <Image className="w-6 h-6 text-purple-600" />}
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{resource.title}</h3>
                <p className="text-sm text-gray-500">{resource.category}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedResource(null)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
            <p className="text-gray-600">{resource.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Details</h4>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Added</dt>
                  <dd className="text-gray-900">{resource.addedAt}</dd>
                </div>
                {resource.size && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Size</dt>
                    <dd className="text-gray-900">{resource.size}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-gray-500">Author</dt>
                  <dd className="text-gray-900">{resource.author}</dd>
                </div>
                {resource.fileType && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Type</dt>
                    <dd className="text-gray-900">{resource.fileType.toUpperCase()}</dd>
                  </div>
                )}
              </dl>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Statistics</h4>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Views</dt>
                  <dd className="text-gray-900">{resource.views}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Downloads</dt>
                  <dd className="text-gray-900">{resource.downloads}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Shares</dt>
                  <dd className="text-gray-900">{resource.shares}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {resource.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex justify-end gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            {resource.type !== 'link' && (
              <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                <Download className="w-4 h-4" />
                Download
              </button>
            )}
            {resource.url && (
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <ExternalLink className="w-4 h-4" />
                Open Link
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Company Library</h1>
          <p className="text-gray-500">Manage and organize company information</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleAddResource}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Resource
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-3">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
            <nav className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm ${
                    activeCategory === category.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <category.icon className="w-4 h-4" />
                    <span>{category.name}</span>
                  </div>
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {category.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-9">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Resources</h3>
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>

            {filteredResources.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
                <p className="text-gray-500">
                  {searchQuery
                    ? `No resources match "${searchQuery}"`
                    : 'Get started by adding your first resource'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredResources.map((resource) => (
                  <div
                    key={resource.id}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedResource(resource)}
                  >
                    <div className={`p-2 rounded-lg ${
                      resource.type === 'document' ? 'bg-blue-100' :
                      resource.type === 'link' ? 'bg-green-100' :
                      'bg-purple-100'
                    }`}>
                      {resource.type === 'document' && <FileText className="w-5 h-5 text-blue-600" />}
                      {resource.type === 'link' && <Globe className="w-5 h-5 text-green-600" />}
                      {resource.type === 'image' && <Image className="w-5 h-5 text-purple-600" />}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{resource.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">{resource.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Eye className="w-4 h-4" />
                          <span>{resource.views}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Download className="w-4 h-4" />
                          <span>{resource.downloads}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Share2 className="w-4 h-4" />
                          <span>{resource.shares}</span>
                        </div>
                        <span className="text-sm text-gray-500">{resource.addedAt}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAddModal && <ResourceModal />}
      {selectedResource && <ResourcePreview resource={selectedResource} />}
    </div>
  );
}

export default Library;