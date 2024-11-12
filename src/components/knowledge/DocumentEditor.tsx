import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save, FileText, Tag, Folder, Wand2 } from 'lucide-react';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  type: z.enum(['article', 'guide', 'policy', 'template']),
  collectionId: z.string().uuid().optional(),
  tags: z.array(z.string()).optional()
});

type FormData = z.infer<typeof schema>;

interface DocumentEditorProps {
  initialData?: FormData;
  onSave: (data: FormData) => Promise<void>;
  collections: Array<{ id: string; name: string }>;
}

function DocumentEditor({ initialData, onSave, collections }: DocumentEditorProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsSaving(true);
      await onSave(data);
    } catch (error) {
      console.error('Failed to save document:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="h-full flex">
      <div className="flex-1 overflow-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
          <div className="border-b border-gray-200 bg-white px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <FileText className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  {...register('title')}
                  placeholder="Document title"
                  className="text-xl font-semibold text-gray-900 border-0 focus:ring-0 p-0"
                />
              </div>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setShowAiSuggestions(!showAiSuggestions)}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100"
                >
                  <Wand2 className="w-4 h-4" />
                  AI Suggestions
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div className="flex-1 p-6">
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center gap-2">
                      <Folder className="w-4 h-4" />
                      Collection
                    </div>
                  </label>
                  <select
                    {...register('collectionId')}
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select collection</option>
                    {collections.map(collection => (
                      <option key={collection.id} value={collection.id}>
                        {collection.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Type
                    </div>
                  </label>
                  <select
                    {...register('type')}
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="article">Article</option>
                    <option value="guide">Guide</option>
                    <option value="policy">Policy</option>
                    <option value="template">Template</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="relative">
              <textarea
                {...register('content')}
                rows={20}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Start writing..."
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
              )}
            </div>
          </div>
        </form>
      </div>

      {showAiSuggestions && (
        <div className="w-80 border-l border-gray-200 bg-white p-6 overflow-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Suggestions</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Content Improvement</h4>
              <p className="text-sm text-blue-800">
                Consider adding more specific examples to support your main points.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Structure</h4>
              <p className="text-sm text-green-800">
                Breaking this section into bullet points would improve readability.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2">SEO Optimization</h4>
              <p className="text-sm text-purple-800">
                Add more industry-specific keywords to improve visibility.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DocumentEditor;