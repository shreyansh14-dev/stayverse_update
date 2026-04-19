import React from 'react';
import { Bell, Search, User, LogOut, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Header({ onLogout }) {
  const { currentUser } = useApp();
  return (
    <header className="top-header">
      <div className="search-bar d-flex align-center gap-2" style={{ background: 'var(--bg-color)', padding: '0.5rem 1rem', borderRadius: '999px', width: '300px' }}>
        <Search size={16} color="var(--text-muted)" />
        <input type="text" placeholder="Search destinations, hotels, flights..." className="search-input text-sm flex-1" style={{ width: '100%' }} />
      </div>
      
      <div className="header-actions d-flex align-center gap-6">
        <div className="d-flex gap-2">
          <button className="btn-ghost" style={{ position: 'relative' }}>
            <Bell size={20} />
            <span style={{ position: 'absolute', top: '4px', right: '4px', width: '8px', height: '8px', background: 'var(--danger)', borderRadius: '50%' }}></span>
          </button>
        </div>
        
        <div className="user-profile d-flex align-center gap-3">
          <div className="user-info">
            <p className="user-name">{currentUser ? currentUser.name : 'Jane Doe'}</p>
            <div className="d-flex align-center gap-1 justify-end">
              <Sparkles size={12} color="var(--secondary-color)" />
              <p className="user-role">Genius Level 2</p>
            </div>
          </div>
          <div className="avatar">
            <User size={20} />
          </div>
        </div>

        <div className="divider"></div>

        <button className="btn-ghost" onClick={onLogout} title="Log Out">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}
