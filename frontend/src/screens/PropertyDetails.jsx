import React from 'react';
import { MapPin, Star, Wifi, Coffee, Wind, Tv, Check, ChevronLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function PropertyDetails({ onNavigate, propertyId }) {
  const { hotels, searchParams, showAlert } = useApp();
  const hotel = hotels.find(h => h.id.toString() === propertyId);

  if (!hotel) return <div className="p-8">Property not found.</div>;

  // Date parsing
  const dIn = new Date(searchParams.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const dOut = new Date(searchParams.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  
  // Diff days
  const diffTime = Math.abs(new Date(searchParams.checkOut) - new Date(searchParams.checkIn));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

  const roomTotal = hotel.price * diffDays;
  const taxes = Math.floor(roomTotal * 0.12);
  const finalTotal = roomTotal + taxes;

  const amenities = [
    { icon: <Wifi size={18}/>, label: 'Free High-speed WiFi' },
    { icon: <Coffee size={18}/>, label: 'Breakfast Included' },
    { icon: <Wind size={18}/>, label: 'Air Conditioning' },
    { icon: <Tv size={18}/>, label: 'Flat-screen TV' },
  ];

  const handleReserve = () => {
    if (!searchParams.checkIn || !searchParams.checkOut || diffDays < 1) {
       showAlert('Please ensure valid dates are selected in Explorer first.', 'error');
       return;
    }
    onNavigate(`booking-flow/${hotel.id}`);
  };

  return (
    <div className="screen-container animate-fade-in" style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <button className="btn btn-ghost mb-4 pl-0 text-primary" onClick={() => onNavigate('search-results')}>
         <ChevronLeft size={20} /> Back to Search Results
      </button>

      <div className="d-flex justify-between align-end mb-6">
        <div>
          <div className="d-flex align-center gap-2 mb-2">
            <h1 className="screen-title" style={{ fontSize: '2rem' }}>{hotel.name}</h1>
            <div className="d-flex gap-1 bg-primary text-white p-1 rounded" style={{ background: 'var(--primary-color)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
              {hotel.rating} <Star size={12} fill="white" />
            </div>
          </div>
          <p className="text-secondary d-flex align-center gap-2"><MapPin size={16} />{hotel.location}, {hotel.city} • Excellent Location - Show map</p>
        </div>
        <div className="text-right">
           <p className="text-2xl font-bold" style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--primary-color)' }}>${hotel.price}</p>
           <p className="text-sm text-secondary">per night</p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid-2 gap-4 mb-8" style={{ height: '400px' }}>
        <div style={{ borderRadius: 'var(--border-radius-lg)', overflow: 'hidden', height: '100%' }}>
          <img 
            src={hotel.images[0]} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', background: 'var(--surface-hover)' }} 
            alt="Main"
            onError={(e) => { e.target.src = `https://picsum.photos/800/600?random=${hotel.id}-1`; }}
          />
        </div>
        <div className="d-flex flex-col gap-4" style={{ height: '100%' }}>
          <div style={{ flex: 1, borderRadius: 'var(--border-radius-lg)', overflow: 'hidden' }}>
            <img 
              src={hotel.images[1]} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', background: 'var(--surface-hover)' }} 
              alt="Room"
              onError={(e) => { e.target.src = `https://picsum.photos/600/400?random=${hotel.id}-2`; }}
            />
          </div>
          <div style={{ flex: 1, borderRadius: 'var(--border-radius-lg)', overflow: 'hidden' }}>
            <img 
              src={hotel.images[2]} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', background: 'var(--surface-hover)' }} 
              alt="View"
              onError={(e) => { e.target.src = `https://picsum.photos/600/400?random=${hotel.id}-3`; }}
            />
          </div>
        </div>
      </div>

      <div className="d-flex gap-8">
        <div className="flex-1">
           <div className="card mb-6">
              <h3 className="mb-4">About this property</h3>
              <p className="text-secondary lh-lg" style={{ lineHeight: 1.6 }}>{hotel.description}</p>
           </div>
           
           <div className="card mb-6">
              <h3 className="mb-4">Popular Amenities</h3>
              <div className="grid-2">
                 {amenities.map(a => (
                    <div key={a.label} className="d-flex align-center gap-3 mb-3 text-secondary">
                      {a.icon}
                      <span>{a.label}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
        
        <div style={{ width: '350px' }}>
           <div className="card" style={{ position: 'sticky', top: '2rem', border: '2px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}>
             <h3 className="mb-4">Reserve your stay</h3>
             <div className="d-flex justify-between mb-2 text-sm">
                <span className="text-secondary">Check-in</span>
                <span style={{ fontWeight: 600 }}>{dIn}</span>
             </div>
             <div className="d-flex justify-between mb-4 text-sm pb-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
                <span className="text-secondary">Check-out</span>
                <span style={{ fontWeight: 600 }}>{dOut}</span>
             </div>
             <div className="d-flex justify-between mb-2 text-sm text-secondary">
                <span>${hotel.price} x {diffDays} nights</span>
                <span>${roomTotal}</span>
             </div>
             <div className="d-flex justify-between mb-4 text-sm text-secondary pb-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
                <span>Taxes & Fees</span>
                <span>${taxes}</span>
             </div>
             <div className="d-flex justify-between mb-6">
                <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>Total</span>
                <span style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--primary-color)' }}>${finalTotal}</span>
             </div>
             <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleReserve}>
               Proceed to Booking
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}
