import React from 'react';
import { Calendar, Trash2, Home, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function History({ onNavigate }) {
  const { bookings, cancelBooking } = useApp();

  return (
    <div className="screen-container animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div className="screen-header d-flex justify-between align-center">
        <div>
          <h1 className="screen-title d-flex align-center gap-2"><Calendar color="var(--primary-color)" /> My Trips</h1>
          <p className="screen-desc">View and manage your upcoming and past reservations.</p>
        </div>
        <button className="btn btn-primary" onClick={() => onNavigate('explore')}>Book a new trip</button>
      </div>

      <div className="d-flex flex-col gap-4">
        {bookings.length === 0 ? (
           <div className="card text-center py-8">
              <Home size={48} color="var(--border-focus)" className="mb-4 mx-auto" />
              <h3>No bookings yet.</h3>
              <p className="text-secondary mt-2 mb-6">Looks like you haven't booked any trips recently.</p>
              <button className="btn btn-primary" onClick={() => onNavigate('explore')}>Start Exploring</button>
           </div>
        ) : (
          bookings.map(booking => (
            <div key={booking.id} className="card d-flex gap-6 p-4" style={{ opacity: booking.status === 'Cancelled' ? 0.6 : 1 }}>
              <div style={{ width: '200px', height: '140px', borderRadius: '8px', background: `url(${booking.hotelImage}) center/cover` }}></div>
              <div className="flex-1 d-flex flex-col justify-between">
                 <div className="d-flex justify-between align-start">
                    <div>
                       <div className="d-flex align-center gap-2 mb-1">
                          <span className={`badge ${booking.status === 'Confirmed' ? 'badge-success' : 'badge-secondary'}`}>{booking.status}</span>
                          <span className="text-sm text-secondary">ID: {booking.id}</span>
                       </div>
                       <h3 style={{ fontSize: '1.25rem' }}>{booking.hotelName}</h3>
                       <p className="text-secondary text-sm mt-1">{new Date(booking.checkIn).toLocaleDateString()} — {new Date(booking.checkOut).toLocaleDateString()} • {booking.guests} Guests</p>
                    </div>
                    <div className="text-right">
                       <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>${booking.totalCost}</p>
                       <p className="text-xs text-secondary mt-1">Booked on {new Date(booking.createdAt).toLocaleDateString()}</p>
                    </div>
                 </div>
                 
                 <div className="d-flex align-center gap-3 pt-4 mt-2" style={{ borderTop: '1px solid var(--border-color)' }}>
                    <button className="btn btn-secondary text-sm" onClick={() => onNavigate(`property-details/${booking.hotelId}`)}>
                       <ExternalLink size={14} /> View Property
                    </button>
                    {booking.status === 'Confirmed' && (
                       <button className="btn focus:border-red-500 text-sm" style={{ color: '#EF4444', border: '1px solid currentColor', background: 'transparent' }} onClick={() => {
                          if (window.confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
                            cancelBooking(booking.id);
                          }
                       }}>
                          <Trash2 size={14} /> Cancel Booking
                       </button>
                    )}
                 </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
