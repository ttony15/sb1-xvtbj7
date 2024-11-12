import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

function Dashboard() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    const path = location.pathname.slice(1);
    return path || 'dashboard';
  });
  const navigate = useNavigate();

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    switch (tabId) {
      case 'dashboard':
        navigate('/');
        break;
      case 'create':
        navigate('/create');
        break;
      case 'calendar':
        navigate('/calendar');
        break;
      case 'campaigns':
        navigate('/campaigns');
        break;
      case 'social':
        navigate('/social');
        break;
      case 'performance':
        navigate('/analytics');
        break;
      case 'library':
        navigate('/library');
        break;
      case 'insights':
        navigate('/insights');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;