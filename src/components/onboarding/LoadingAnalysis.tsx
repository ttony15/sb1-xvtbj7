import React from 'react';
import { Brain, Sparkles, Target, Users, MessageSquare } from 'lucide-react';

function LoadingAnalysis() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-lg w-full mx-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-4">
            <Brain className="w-8 h-8 text-blue-600 animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyzing Your Data</h2>
          <p className="text-gray-500">Our AI is creating your personalized marketing strategy</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-5 h-5 text-blue-600" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
              </div>
            </div>
            <div className="ml-8">
              <div className="h-3 bg-gray-200 rounded animate-pulse w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-5/6"></div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-purple-600" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
              </div>
            </div>
            <div className="ml-8">
              <div className="h-3 bg-gray-200 rounded animate-pulse w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-4/5"></div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare className="w-5 h-5 text-green-600" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
              </div>
            </div>
            <div className="ml-8">
              <div className="h-3 bg-gray-200 rounded animate-pulse w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-5 h-5 text-pink-600" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
              </div>
            </div>
            <div className="ml-8">
              <div className="h-3 bg-gray-200 rounded animate-pulse w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-ping"></div>
            Generating AI insights...
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingAnalysis;