import React, { useState } from 'react';
import Auth from './screens/Auth';
import Layout from './components/Layout';
import UserDashboard from './screens/UserDashboard';
import Explore from './screens/Explore';
import SearchResults from './screens/SearchResults';
import PropertyDetails from './screens/PropertyDetails';
import BookingFlow from './screens/BookingFlow';
import Profile from './screens/Profile';
import AIAssistant from './screens/AIAssistant';
import Management from './screens/Management';
import History from './screens/History';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('auth');

  // Simple parameter extraction (e.g. property-details/1)
  const viewPath = currentView.split('/')[0];
  const viewParam = currentView.split('/')[1];

  if (viewPath === 'auth') {
    return <Auth onLogin={() => setCurrentView('dashboard')} />;
  }

  const renderView = () => {
    switch(viewPath) {
      case 'dashboard': return <UserDashboard onNavigate={setCurrentView} />;
      case 'explore': return <Explore onNavigate={setCurrentView} />;
      case 'search-results': return <SearchResults onNavigate={setCurrentView} />;
      case 'property-details': return <PropertyDetails onNavigate={setCurrentView} propertyId={viewParam} />;
      case 'booking-flow': return <BookingFlow onNavigate={setCurrentView} propertyId={viewParam} />;
      case 'profile': return <Profile onNavigate={setCurrentView} />;
      case 'assistant': return <AIAssistant onNavigate={setCurrentView} />;
      case 'management': return <Management onNavigate={setCurrentView} />;
      case 'history': return <History onNavigate={setCurrentView} />;
      default: return <UserDashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <Layout currentView={viewPath} onNavigate={setCurrentView}>
      {renderView()}
    </Layout>
  );
}

export default App;
