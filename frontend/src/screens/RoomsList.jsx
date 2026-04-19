import React from 'react';
import { Maximize, Users, Wifi } from 'lucide-react';

export default function RoomsList({ onNavigate }) {
  const rooms = [
    { id: 101, type: 'Standard Room', price: 120, status: 'Available', img: '/standard.png', features: ['1 Queen Bed', '2 Guests', 'Free Wifi'] },
    { id: 204, type: 'Deluxe Room', price: 250, status: 'Booked', img: '/deluxe.png', features: ['1 King Bed', 'City View', 'Lounge Area'] },
    { id: 401, type: 'Luxury Suite', price: 450, status: 'Available', img: '/suite.png', features: ['Panoramic View', 'Separate Living', 'Premium setup'] },
    { id: 102, type: 'Standard Room', price: 120, status: 'Maintenance', img: '/standard.png', features: ['1 Queen Bed', '2 Guests', 'Free Wifi'] }
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Available': return 'badge-success';
      case 'Booked': return 'badge-info';
      case 'Maintenance': return 'badge-danger';
      default: return 'badge-warning';
    }
  };

  return (
    <div>
      <div className="screen-header d-flex justify-between align-center">
        <div>
          <h1 className="screen-title">Room Listing</h1>
          <p className="screen-desc">Manage your property's rooms and layouts.</p>
        </div>
        <div className="d-flex gap-2">
          <input type="text" className="form-input" placeholder="Filter by type..." style={{ width: '200px' }} />
        </div>
      </div>

      <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
        {rooms.map(room => (
          <div key={room.id} className="card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '200px', backgroundColor: '#e5e7eb', position: 'relative' }}>
              <img src={room.img} alt={room.type} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                <span className={`badge ${getStatusBadge(room.status)} shadow-sm`}>{room.status}</span>
              </div>
            </div>
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div className="d-flex justify-between align-center" style={{ marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.1rem' }}>Room {room.id} - {room.type}</h3>
              </div>
              <p className="text-secondary" style={{ marginBottom: '1rem', flex: 1 }}>{room.features.join(' • ')}</p>
              
              <div className="d-flex justify-between align-center" style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                <div>
                  <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary-color)' }}>${room.price}</span>
                  <span className="text-secondary text-sm"> / night</span>
                </div>
                {room.status === 'Available' ? (
                  <button className="btn-primary" style={{ padding: '0.5rem 1rem' }} onClick={() => onNavigate('booking')}>
                    Book Now
                  </button>
                ) : (
                  <button className="btn-secondary" style={{ padding: '0.5rem 1rem' }} disabled>
                    View Details
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
