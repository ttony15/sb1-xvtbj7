import React from 'react';
import { Eye, Calendar, Target, Users, DollarSign, Globe, Image as ImageIcon } from 'lucide-react';

interface Props {
  data: any;
}

function CampaignPreview({ data }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Campaign Preview</h2>
        <p className="text-sm text-gray-500">Review your campaign details before creating</p>
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Basic Information</h3>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm text-gray-500">Campaign Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{data.basics?.name}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900">{data.basics?.description}</dd>
            </div>
          </dl>
        </div>

        {/* Schedule */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Schedule</h3>
          <dl className="grid grid-cols-3 gap-4">
            <div>
              <dt className="text-sm text-gray-500">Start Date</dt>
              <dd className="mt-1 text-sm text-gray-900">{data.schedule?.startDate}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">End Date</dt>
              <dd className="mt-1 text-sm text-gray-900">{data.schedule?.endDate}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Timezone</dt>
              <dd className="mt-1 text-sm text-gray-900">{data.schedule?.timezone}</dd>
            </div>
          </dl>
        </div>

        {/* Budget */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Budget</h3>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm text-gray-500">Total Budget</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {data.budget?.currency} {data.budget?.total}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Allocation</dt>
              <dd className="mt-1 space-y-1">
                {Object.entries(data.budget?.allocation || {}).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 capitalize">{key}</span>
                    <span className="text-gray-900">{value}%</span>
                  </div>
                ))}
              </dd>
            </div>
          </dl>
        </div>

        {/* Channels */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Channels</h3>
          <div className="flex flex-wrap gap-2">
            {data.type?.channels?.map((channel: string) => (
              <span
                key={channel}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {channel}
              </span>
            ))}
          </div>
        </div>

        {/* Assets */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Assets</h3>
          <div className="space-y-2">
            {data.assets?.files?.length > 0 && (
              <p className="text-sm text-gray-600">
                {data.assets.files.length} files uploaded
              </p>
            )}
            {data.assets?.links?.length > 0 && (
              <p className="text-sm text-gray-600">
                {data.assets.links.length} links added
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignPreview;