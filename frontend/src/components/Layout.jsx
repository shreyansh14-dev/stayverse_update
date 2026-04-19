import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ children, currentView, onNavigate }) {
  return (
    <div className="layout-container d-flex">
      <Sidebar currentView={currentView} onNavigate={onNavigate} />
      <div className="main-wrapper">
        <Header onLogout={() => onNavigate('auth')} />
        <main className="main-content">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
