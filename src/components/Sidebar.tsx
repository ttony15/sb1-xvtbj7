import React, { useState } from 'react';
import { Home, Calendar, BarChart3, Settings, PlusSquare, Layout, LogOut, BookOpen, Target, 
  Users, Zap, MessageSquare, ChevronRight, ChevronLeft, ChevronDown, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['main', 'content', 'analytics']);

  const menuGroups = [
    {
      id: 'main',
      title: "Main",
      items: [
        { icon: Home, label: 'Command Center', id: 'dashboard' },
        { icon: Target, label: 'Campaigns', id: 'campaigns' },
        { icon: Calendar, label: 'Calendar', id: 'calendar' },
      ]
    },
    {
      id: 'content',
      title: "Content",
      items: [
        { icon: PlusSquare, label: 'Create', id: 'create' },
        { icon: MessageSquare, label: 'Social', id: 'social' },
        { icon: BookOpen, label: 'Library', id: 'library' },
      ]
    },
    {
      id: 'analytics',
      title: "Analytics",
      items: [
        { icon: TrendingUp, label: 'Performance', id: 'performance' },
        { icon: Users, label: 'Audience', id: 'audience' },
        { icon: Zap, label: 'AI Insights', id: 'insights' },
      ]
    }
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/signin');
  };

  const handleTabClick = (tabId: string) => {
    if (tabId === 'settings') {
      navigate('/settings');
    } else {
      onTabChange(tabId);
      navigate(tabId === 'dashboard' ? '/' : `/${tabId}`);
    }
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  return (
    <aside 
      className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
              <Layout className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && <span className="text-xl font-bold text-gray-900">Writez</span>}
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-gray-100 rounded-lg"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-500" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4">
          <div className="space-y-6">
            {menuGroups.map((group) => (
              <div key={group.id}>
                {!isCollapsed && (
                  <div 
                    className="flex items-center justify-between px-3 mb-2 cursor-pointer"
                    onClick={() => toggleGroup(group.id)}
                  >
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {group.title}
                    </p>
                    <ChevronDown 
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        expandedGroups.includes(group.id) ? 'transform rotate-180' : ''
                      }`}
                    />
                  </div>
                )}
                <div className={`space-y-1 ${
                  !isCollapsed && !expandedGroups.includes(group.id) ? 'hidden' : ''
                }`}>
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleTabClick(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === item.id
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!isCollapsed && item.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={() => handleTabClick('settings')}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && 'Settings'}
          </button>
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && 'Logout'}
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;