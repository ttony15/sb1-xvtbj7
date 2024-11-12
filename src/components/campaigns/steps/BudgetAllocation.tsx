import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { DollarSign, PieChart, TrendingUp } from 'lucide-react';

interface Props {
  register: UseFormRegister<any>;
  errors: any;
}

const budgetRanges = [
  { min: 1000, max: 5000 },
  { min: 5000, max: 10000 },
  { min: 10000, max: 25000 },
  { min: 25000, max: 50000 },
  { min: 50000, max: null }
];

const channels = [
  { id: 'social', label: 'Social Media', defaultAllocation: 40 },
  { id: 'content', label: 'Content Creation', defaultAllocation: 30 },
  { id: 'ads', label: 'Paid Advertising', defaultAllocation: 20 },
  { id: 'other', label: 'Other', defaultAllocation: 10 }
];

function BudgetAllocation({ register, errors }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Budget Allocation</h2>
        <p className="text-sm text-gray-500">Set your campaign budget and allocation</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Total Budget
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              {...register('budget.total')}
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter budget amount"
            />
          </div>
          {errors?.total && (
            <p className="mt-1 text-sm text-red-600">{errors.total.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Currency
          </label>
          <select
            {...register('budget.currency')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="AUD">AUD - Australian Dollar</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Budget Allocation
          </label>
          <div className="space-y-4">
            {channels.map((channel) => (
              <div key={channel.id}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{channel.label}</span>
                  <span className="text-sm text-gray-900">
                    <input
                      type="number"
                      {...register(`budget.allocation.${channel.id}`)}
                      defaultValue={channel.defaultAllocation}
                      className="w-20 px-2 py-1 border border-gray-300 rounded-lg text-right"
                    />
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${channel.defaultAllocation}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium text-blue-900">Budget Recommendations</h3>
          </div>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
              Recommended daily budget: $100-$200
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
              Optimal allocation for your goals
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
              Based on similar successful campaigns
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BudgetAllocation;