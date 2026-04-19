import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [hotels, setHotels] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [alert, setAlert] = useState(null);
  
  const [searchParams, setSearchParams] = useState({
    destination: 'Paris',
    checkIn: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    checkOut: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0], // +5 days
    guests: 2
  });

  // Load User from Local Storage on mount for persistence across sessions
  useEffect(() => {
    const saved = localStorage.getItem('stayverse_user');
    if (saved) {
      const user = JSON.parse(saved);
      setCurrentUser(user);
    }
  }, []);

  // Fetch Hotels 
  useEffect(() => {
    fetch('/api/hotels')
      .then(res => res.json())
      .then(data => setHotels(data))
      .catch(err => console.error("Error fetching hotels:", err));
  }, []);

  // Fetch Bookings whenever currentUser changes
  useEffect(() => {
    if (currentUser) {
      fetch(`/api/bookings?userId=${currentUser.id}`)
        .then(res => res.json())
        .then(data => setBookings(data))
        .catch(err => console.error("Error fetching bookings:", err));
    } else {
      setBookings([]);
    }
  }, [currentUser]);

  const login = async (userData) => {
    // Send to backend to ensure they exist in SQLite
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const dbUser = await res.json();
      setCurrentUser(dbUser);
      localStorage.setItem('stayverse_user', JSON.stringify(dbUser));
      showAlert('Successfully logged in!', 'success');
    } catch (err) {
      console.error(err);
      showAlert('Login failed. Please try again.', 'error');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('stayverse_user');
    showAlert('Logged out safely.', 'success');
  };

  const addBooking = async (bookingData) => {
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...bookingData,
          userId: currentUser.id
        })
      });
      const newBooking = await res.json();
      
      // We refetch all bookings or manually prepend it
      setBookings([newBooking, ...bookings]);
      showAlert('Booking completed successfully!', 'success');
    } catch(err) {
      console.error(err);
      showAlert('Failed to process booking.', 'error');
    }
  };

  const cancelBooking = async (id) => {
    try {
      await fetch(`/api/bookings/${id}/cancel`, { method: 'PUT' });
      setBookings(bookings.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b));
      showAlert('Booking cancelled.', 'warning');
    } catch(err) {
      console.error(err);
      showAlert('Failed to cancel booking.', 'error');
    }
  };

  const showAlert = (message, type = 'info') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const updateSearch = async (params) => {
    setSearchParams(params);
    try {
      const res = await fetch('/api/hotels/ensure', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city: params.destination })
      });
      if (res.ok) {
        const newHotels = await res.json();
        if (newHotels && newHotels.length > 0) {
           setHotels(prev => {
              const existingIds = new Set(prev.map(h => h.id));
              const uniqueNew = newHotels.filter(h => !existingIds.has(h.id));
              return [...uniqueNew, ...prev];
           });
        }
      }
    } catch(e) { console.error(e); }
  };

  return (
    <AppContext.Provider value={{
      hotels, bookings, currentUser, searchParams, alert,
      login, logout, addBooking, cancelBooking, updateSearch, showAlert
    }}>
      {alert && (
        <div style={{
          position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
          zIndex: 9999, padding: '12px 24px', borderRadius: '8px',
          background: alert.type === 'success' ? '#10B981' : alert.type === 'warning' ? '#F59E0B' : alert.type === 'error' ? '#EF4444' : '#3B82F6',
          color: 'white', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          {alert.message}
        </div>
      )}
      {children}
    </AppContext.Provider>
  );
};
