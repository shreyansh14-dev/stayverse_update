import React, { useState } from 'react';
import { Filter, Star, MapPin, ChevronRight, ChevronLeft, Check, Heart, ThumbsUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

const HotelCard = ({ hotel, diffDays, onClick }) => {
  let images = [];
  try { images = typeof hotel.images === 'string' ? JSON.parse(hotel.images) : hotel.images; } catch(e) {}
  if (!images || images.length === 0) images = [hotel.image];

  const [imgIndex, setImgIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextImg = (e) => {
    e.stopPropagation();
    setImgIndex((p) => (p + 1) % images.length);
  };
  const prevImg = (e) => {
    e.stopPropagation();
    setImgIndex((p) => (p - 1 + images.length) % images.length);
  };

  return (
    <div className="d-flex p-3 gap-4" 
         style={{ cursor: 'pointer', background: 'var(--surface-color)', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '16px' }} 
         onClick={onClick}
    >
      <div style={{ width: '240px', height: '240px', position: 'relative', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}
           onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
      >
        {images.map((img, i) => (
           <img 
             key={i} src={img || 'https://images.unsplash.com/photo-1542314831-c6a4d27488c0'} alt={hotel.name}
             style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: imgIndex === i ? 1 : 0, transition: 'opacity 0.3s' }}
             onError={(e) => { e.target.src = `https://picsum.photos/600/400?random=${hotel.id}`; }}
           />
        ))}
        {/* Heart Icon */}
        <button style={{ position: 'absolute', top: '8px', right: '8px', width: '32px', height: '32px', borderRadius: '50%', background: '#FFF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', zIndex: 10 }} onClick={(e) => { e.stopPropagation(); }}>
          <Heart size={16} color="#1A1A1A" />
        </button>

        {images.length > 1 && isHovered && (
          <>
            <button style={{ position: 'absolute', left: '4px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.9)', color: '#000', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }} onClick={prevImg}>
               <ChevronLeft size={16} />
            </button>
            <button style={{ position: 'absolute', right: '4px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.9)', color: '#000', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }} onClick={nextImg}>
               <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>
      
      <div className="flex-1 d-flex">
        <div className="flex-1 d-flex flex-col pr-4">
           <div className="d-flex align-center gap-2 mb-1">
              <h3 style={{ fontSize: '1.25rem', color: '#006CE4', fontWeight: 700, margin: 0 }}>{hotel.name}</h3>
              <div className="d-flex" style={{ color: '#FEBB02' }}>
                {[...Array(Math.floor(hotel.rating))].map((_, i) => <Star key={i} size={14} fill="#FEBB02" />)}
              </div>
              <div style={{ background: '#FEBB02', padding: '2px 4px', borderRadius: '4px', display: 'flex' }}><ThumbsUp size={12} color="#FFF" /></div>
           </div>
           
           <p className="text-xs d-flex align-center gap-1 mb-2" style={{ color: '#1A1A1A' }}>
              <a href="#" style={{ color: '#006CE4', textDecoration: 'underline' }}>{hotel.city}</a> • 
              <a href="#" style={{ color: '#006CE4', textDecoration: 'underline' }}>Show on map</a> • 
              <span className="text-muted">1.2 km from center</span>
           </p>
           
           <p className="text-sm mb-2" style={{ color: '#1A1A1A', lineHeight: 1.5 }}>{hotel.description}</p>
        </div>
        
        <div style={{ width: '180px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', flexShrink: 0 }}>
           <div className="d-flex align-center gap-2 text-right">
              <div>
                 <div style={{ fontWeight: 700, fontSize: '1rem', color: '#1A1A1A' }}>Very Good</div>
                 <div className="text-xs" style={{ color: '#595959' }}>{hotel.reviews} reviews</div>
              </div>
              <div style={{ background: '#003B95', color: '#FFF', padding: '6px 8px', borderRadius: '6px', fontWeight: 700, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '32px' }}>
                {hotel.rating}
              </div>
           </div>
           
           <button style={{ background: '#006CE4', color: '#FFF', fontWeight: 600, padding: '8px 16px', borderRadius: '4px', width: '100%', border: 'none', cursor: 'pointer', fontSize: '0.95rem' }} onClick={(e) => { e.stopPropagation(); onClick(); }}>
             Select dates
           </button>
        </div>
      </div>
    </div>
  );
};

export default function SearchResults({ onNavigate }) {
  const { hotels, searchParams } = useApp();
  const [activeFilter, setActiveFilter] = useState('Recommended');
  const [selectedTypes, setSelectedTypes] = useState([]);
  
  // Date handling display
  const dIn = new Date(searchParams.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const dOut = new Date(searchParams.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  
  // Diff days
  const diffTime = Math.abs(new Date(searchParams.checkOut) - new Date(searchParams.checkIn));
  let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays === 0) diffDays = 1;

  // Filter based on destination and checkboxes
  let filteredHotels = hotels.filter(h => h.city.toLowerCase() === searchParams.destination.toLowerCase());
  
  if (selectedTypes.length > 0) {
    filteredHotels = filteredHotels.filter(h => selectedTypes.includes(h.type));
  }

  // Sort
  if (activeFilter === 'Lowest Price') {
    filteredHotels.sort((a, b) => a.price - b.price);
  } else if (activeFilter === 'Highest Rated') {
    filteredHotels.sort((a, b) => b.rating - a.rating);
  }

  const toggleType = (type) => {
    setSelectedTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  const renderFilterSection = (title, options, isTypeFilter) => (
    <div className="mb-6">
      <h4 className="mb-3" style={{ fontSize: '1rem', fontWeight: 700 }}>{title}</h4>
      <div className="d-flex flex-col gap-3">
        {options.map(opt => (
          <label key={opt} className="d-flex align-center gap-3 text-sm cursor-pointer" style={{ cursor: 'pointer', color: 'var(--text-secondary)' }}>
            <input type="checkbox" className="custom-checkbox" onChange={() => isTypeFilter ? toggleType(opt) : null} checked={isTypeFilter ? selectedTypes.includes(opt) : undefined} style={{ width: '18px', height: '18px', accentColor: 'var(--primary-color)' }} />
            <span style={{ fontWeight: 500 }}>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="screen-container animate-fade-in" style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div className="d-flex justify-between align-end mb-6 pb-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.25rem' }}>{searchParams.destination}: {filteredHotels.length} properties found</h1>
          <p className="text-secondary" style={{ fontSize: '1.1rem' }}>{dIn} - {dOut} • {searchParams.guests} Travelers</p>
        </div>
        <div className="d-flex bg-white rounded-lg p-1 border" style={{ borderRadius: '8px', background: 'var(--surface-color)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          {['Recommended', 'Lowest Price', 'Highest Rated'].map(sort => (
            <button 
              key={sort} 
              className={`btn text-sm ${activeFilter === sort ? 'font-semibold' : 'btn-ghost'}`}
              style={activeFilter === sort ? { background: 'var(--bg-color)', color: 'var(--text-primary)', boxShadow: 'var(--shadow-sm)', borderRadius: '6px' } : { borderRadius: '6px' }}
              onClick={() => setActiveFilter(sort)}
            >{sort}</button>
          ))}
        </div>
      </div>

      <div className="d-flex gap-6 relative" style={{ alignItems: 'flex-start' }}>
        <div style={{ width: '280px', flexShrink: 0 }}>
          <div style={{ position: 'sticky', top: '2rem', background: 'var(--surface-color)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div className="d-flex align-center gap-2 mb-6" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
               <Filter size={20} color="var(--primary-color)" />
               <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Filter by</h3>
            </div>
            
            {renderFilterSection('Property Type', ['Hotels', 'Apartments', 'Villas', 'Resorts', 'Boutique'], true)}
            <div style={{ height: '1px', background: 'var(--border-color)', margin: '1.5rem 0' }}></div>
            {renderFilterSection('Star Rating', ['5 Stars', '4 Stars', '3 Stars', 'Unrated'], false)}
            <div style={{ height: '1px', background: 'var(--border-color)', margin: '1.5rem 0' }}></div>
            {renderFilterSection('Amenities', ['Free WiFi', 'Swimming Pool', 'Spa & Wellness', 'Fitness Center', 'Restaurant'], false)}
          </div>
        </div>

        <div className="flex-1 d-flex flex-col">
          {filteredHotels.length === 0 && (
             <div className="text-center py-8" style={{ background: 'var(--surface-color)', borderRadius: '12px', border: '1px dashed var(--border-color)' }}>
               <h3 className="mb-2" style={{ fontSize: '1.5rem', fontWeight: 700 }}>No properties matched</h3>
               <p className="text-secondary">Try removing some filters or searching a different city.</p>
             </div>
          )}
          {filteredHotels.map(hotel => (
            <HotelCard key={hotel.id} hotel={hotel} diffDays={diffDays} onClick={() => onNavigate(`property-details/${hotel.id}`)} />
          ))}
        </div>
      </div>
    </div>
  );
}
