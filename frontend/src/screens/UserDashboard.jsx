import React from 'react';
import { Compass, CalendarDays, Wallet, TrendingUp, Plane, BedDouble, Car } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function UserDashboard({ onNavigate }) {
  const { currentUser, bookings } = useApp();
  
  const validBookings = bookings ? bookings.filter(b => b.status !== 'Cancelled') : [];
  const revenue = validBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
  const totalBookings = validBookings.length;
  const level = totalBookings > 5 ? 2 : 1;
  
  return (
    <div className="screen-container animate-fade-in">
      <div className="screen-header d-flex justify-between align-center">
        <div>
          <h1 className="screen-title">Welcome back, {currentUser ? currentUser.name : 'there'} 👋</h1>
          <p className="screen-desc">Here is what is happening with your travel plans today.</p>
        </div>
        <button className="btn btn-primary" onClick={() => onNavigate('explore')}>
          <Compass size={18} /> Plan a Trip
        </button>
      </div>

      <div className="grid-3 mb-6">
        <div className="card d-flex flex-col gap-2">
          <div className="d-flex justify-between align-center text-muted">
             <span className="text-sm" style={{ fontWeight: 600 }}>Total Bookings</span>
             <CalendarDays size={18} />
          </div>
          <div className="d-flex align-center gap-2">
            <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{totalBookings}</span>
            <span className="badge badge-success">+0 this month</span>
          </div>
        </div>
        <div className="card d-flex flex-col gap-2">
          <div className="d-flex justify-between align-center text-muted">
             <span className="text-sm" style={{ fontWeight: 600 }}>Total Spending</span>
             <Wallet size={18} />
          </div>
          <div className="d-flex align-center gap-2">
            <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>${revenue}</span>
            <span className="badge badge-secondary">Live computation</span>
          </div>
        </div>
        <div className="card d-flex flex-col gap-2" style={{ background: 'var(--gradient-primary)', color: 'white', borderColor: 'transparent' }}>
          <div className="d-flex justify-between align-center" style={{ color: 'rgba(255,255,255,0.8)' }}>
             <span className="text-sm" style={{ fontWeight: 600 }}>Genius Status</span>
             <TrendingUp size={18} />
          </div>
          <div className="d-flex align-center justify-between">
            <span style={{ fontSize: '2rem', fontWeight: 700 }}>Level {level}</span>
            <span className="badge badge-gold" style={{ background: 'var(--gradient-gold)', color: '#000' }}>{level * 5}% Off Stays</span>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 className="mb-4">Upcoming Trips</h3>
          {validBookings.length === 0 ? (
             <div style={{ padding: '2rem', textAlign: 'center', background: 'var(--surface-color)', borderRadius: '8px' }}>
                <Plane size={32} color="var(--border-focus)" style={{ marginBottom: '1rem' }} />
                <p className="text-secondary">You have no upcoming trips. Experience luxury by planting an adventure.</p>
             </div>
          ) : (
             validBookings.slice(0, 2).map((b, i) => (
               <div key={b.id} style={{ background: 'var(--surface-hover)', borderRadius: 'var(--border-radius-sm)', padding: '1rem', marginBottom: '8px' }} className="d-flex align-center justify-between">
                  <div className="d-flex align-center gap-4">
                    <div style={{ 
                      background: b.bookingType === 'flight' ? 'rgba(59, 130, 246, 0.1)' : 
                                  b.bookingType === 'car' ? 'rgba(16, 185, 129, 0.1)' : 
                                  'rgba(245, 158, 11, 0.1)', 
                      padding: '0.75rem', 
                      borderRadius: '8px' 
                    }}>
                      {b.bookingType === 'flight' ? <Plane color="#3b82f6" size={24} /> :
                       b.bookingType === 'car' ? <Car color="#10b981" size={24} /> :
                       <BedDouble color="var(--warning)" size={24} />}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem' }}>
                        {b.bookingType === 'flight' ? 'Flight' : 
                         b.bookingType === 'car' ? 'Car Rental' : 
                         'Hotel Stay'} #{b.id.includes('-') ? b.id.split('-')[1].substring(0,5) : b.id.substring(0,5)}
                      </h4>
                      <p className="text-sm text-muted">
                        {b.bookingType === 'hotel' ? `${b.checkIn} - ${b.checkOut}` : 'Confirmed Travel'} 
                        • {b.guests} {b.guests === 1 ? 'Guest' : 'Guests'}
                      </p>
                    </div>
                  </div>
                  <button className="btn-ghost text-primary text-sm" style={{ fontWeight: 600 }}>View</button>
               </div>
            ))
          )}
        </div>

        <div className="card">
          <h3 className="mb-4">Spending Analytics</h3>
          <div style={{ height: '180px', display: 'flex', alignItems: 'flex-end', gap: '12px', paddingBottom: '20px', borderBottom: '1px solid var(--border-color)' }}>
             {(validBookings.length === 0 ? [0,0,0,0,0,0] : [10, 15, 5, Math.min(100, validBookings.length * 15), Math.min(100, validBookings.length * 20), Math.min(100, validBookings.length * 30)]).map((h, i) => (
                <div key={i} style={{ flex: 1, backgroundColor: i === 5 && h > 0 ? 'var(--primary-color)' : 'var(--border-focus)', height: `${h}%`, borderRadius: '4px 4px 0 0', position: 'relative', transition: 'height 0.5s' }}>
                </div>
             ))}
          </div>
          <div className="d-flex justify-between text-xs text-muted mt-2">
            <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span>
          </div>
        </div>
      </div>
    </div>
  );
}
