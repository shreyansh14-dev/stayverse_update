import React from 'react';
import { Users, DollarSign, BedDouble, TrendingUp, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Dashboard({ onNavigate }) {
  const { bookings } = useApp();
  
  const validBookings = bookings.filter(b => b.status !== 'Cancelled');
  const revenue = validBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
  const totalGuests = validBookings.reduce((sum, b) => sum + (b.guests || 0), 0);

  const chartData = validBookings.length === 0 
    ? [0, 0, 0, 0, 0, 0, 0] 
    : [20, 35, 10, 45, Math.min(100, validBookings.length * 15 + 10), Math.min(100, validBookings.length * 25), Math.min(100, validBookings.length * 10)];


  const stats = [
    { label: 'Total Revenue', value: `$${revenue}`, change: 'Live', icon: <DollarSign size={24} color="#10B981" />, trend: 'up' },
    { label: 'Total Bookings', value: bookings.length.toString(), change: 'Live', icon: <TrendingUp size={24} color="#0056D2" />, trend: 'up' },
    { label: 'Active Guests', value: totalGuests.toString(), change: 'Live', icon: <Users size={24} color="#8B5CF6" />, trend: 'up' },
    { label: 'Available Rooms', value: '782+', change: 'Live', icon: <BedDouble size={24} color="#F59E0B" />, trend: 'up' },
  ];

  return (
    <div>
      <div className="screen-header d-flex justify-between align-center">
        <div>
          <h1 className="screen-title">Dashboard Overview</h1>
          <p className="screen-desc">Welcome back! Here's what's happening today.</p>
        </div>
        <button className="btn-primary" onClick={() => onNavigate('booking')}>
          New Booking
        </button>
      </div>

      <div className="grid-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', marginBottom: '2rem' }}>
        {stats.map((stat, idx) => (
          <div key={idx} className="card d-flex flex-column gap-2 hover-lift" style={{ cursor: 'pointer' }}>
            <div className="d-flex justify-between align-center">
              <div className="brand-icon" style={{ background: `${stat.icon.props.color}15` }}>
                {stat.icon}
              </div>
              <span className={`badge ${stat.trend === 'up' ? 'badge-success' : 'badge-warning'}`}>
                {stat.change}
              </span>
            </div>
            <div style={{ marginTop: '0.5rem' }}>
              <p className="form-label" style={{ marginBottom: '0.25rem' }}>{stat.label}</p>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700 }}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="d-flex justify-between align-center" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem' }}>Booking Trends</h3>
            <button className="btn-ghost text-sm">View details</button>
          </div>
          {/* Simple Visual Chart representation using CSS flex bars */}
          <div className="d-flex align-center justify-between" style={{ height: '200px', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', alignItems: 'flex-end', gap: '8px' }}>
            {chartData.map((h, i) => (
              <div key={i} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '100%', height: `${h}%`, backgroundColor: i === 5 && h > 0 ? 'var(--primary-color)' : 'rgba(0,86,210,0.2)', borderRadius: '4px 4px 0 0', transition: 'height 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
                <span className="text-secondary" style={{ fontSize: '0.75rem' }}>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="d-flex justify-between align-center" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem' }}>Recent Activity</h3>
          </div>
          <div className="d-flex flex-column gap-4">
            {bookings.length === 0 ? (
               <p className="text-secondary text-sm">No recent activity on your profile. Make a booking to see it here!</p>
            ) : (
               bookings.slice(0, 4).map((b, i) => (
                 <div key={b.id} className="d-flex gap-4">
                   <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: b.status === 'Cancelled' ? 'var(--error)' : 'var(--success)', marginTop: '6px' }}></div>
                   <div>
                     <h4 style={{ fontSize: '0.95rem' }}>{b.status === 'Cancelled' ? 'Cancelled Booking' : 'New Booking'}: #{b.id.substring(0, 8)}</h4>
                     <p className="text-secondary text-sm">{b.guests} Guests • {b.checkIn} to {b.checkOut}</p>
                     <span className="text-muted text-sm">{b.hotelId ? 'Hotel ID ' + b.hotelId : 'Live Booking'}</span>
                   </div>
                 </div>
               ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
