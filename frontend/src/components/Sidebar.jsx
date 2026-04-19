import React from 'react';
import { Compass, LayoutDashboard, History, Settings, MessageSquare, Briefcase, Crown, Hotel } from 'lucide-react';

export default function Sidebar({ currentView, onNavigate }) {
  const primaryNav = [
    { id: 'dashboard', label: 'My Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'explore', label: 'Explore & Book', icon: <Compass size={20} /> },
    { id: 'assistant', label: 'AI Assistant', icon: <MessageSquare size={20} /> },
  ];

  const secondaryNav = [
    { id: 'history', label: 'My Trips', icon: <History size={20} /> },
    { id: 'profile', label: 'Loyalty & Profile', icon: <Crown size={20} /> },
  ];

  const adminNav = [
    { id: 'management', label: 'Management', icon: <Briefcase size={20} /> },
  ];

  const renderNavGroup = (title, items) => (
    <div className="mb-4">
      {title && <p className="text-xs text-muted mb-2 px-3" style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</p>}
      <nav className="d-flex flex-col gap-1">
        {items.map(item => (
          <button
            key={item.id}
            className={`nav-item ${currentView === item.id || currentView.startsWith(item.id) ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );

  return (
    <aside className="sidebar">
      <div className="sidebar-header d-flex align-center gap-2">
        <div className="brand-icon">
          <Hotel size={24} color="#000" />
        </div>
        <h2 className="brand-text">StayVerse</h2>
      </div>
      
      <div className="sidebar-nav">
        {renderNavGroup('Main Menu', primaryNav)}
        <div className="divider mb-4" style={{ width: '100%', height: '1px' }} />
        {renderNavGroup('Personal', secondaryNav)}
        <div className="divider mb-4" style={{ width: '100%', height: '1px' }} />
        {renderNavGroup('Host Tools', adminNav)}
      </div>
      
      <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color)', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
        <p>© 2026 StayVerse</p>
        <p>Booking System v2.0</p>
      </div>
    </aside>
  );
}
