import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Plane, Car, Building } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Explore({ onNavigate }) {
  const { searchParams, updateSearch, showAlert, hotels } = useApp();
  const [activeTab, setActiveTab] = useState('stays'); // 'stays', 'flights', 'cars'
  
  // Stays State
  const [destination, setDestination] = useState(searchParams.destination);
  const [checkIn, setCheckIn] = useState(searchParams.checkIn);
  const [checkOut, setCheckOut] = useState(searchParams.checkOut);
  const [guests, setGuests] = useState(searchParams.guests);

  // Flight State
  const [flightFrom, setFlightFrom] = useState('');
  const [flightTo, setFlightTo] = useState('');
  const [flightDepart, setFlightDepart] = useState('');
  const [flightResults, setFlightResults] = useState([]);

  // Car State
  const [carLocation, setCarLocation] = useState('');
  const [carType, setCarType] = useState('Sedan');
  const [carResults, setCarResults] = useState([]);

  const handleSearchStays = async () => {
    if (!destination.trim()) {
      showAlert('Please enter a destination to search.', 'error');
      return;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      showAlert('Check-out date must be after Check-in date.', 'error');
      return;
    }
    showAlert(`Searching global registry for ${destination}...`, 'info');
    await updateSearch({ destination, checkIn, checkOut, guests });
    onNavigate('search-results');
  };

  const handleSearchFlights = async () => {
    if (!flightFrom || !flightTo) return showAlert('Please enter departure and arrival locations.', 'error');
    showAlert('Scanning 1,000+ airlines for the best route...', 'info');
    try {
      const resp = await fetch(`/api/flights/search?from=${flightFrom}&to=${flightTo}`);
      const data = await resp.json();
      setFlightResults(data);
      showAlert(`Found ${data.length} available flights!`, 'success');
    } catch (e) {
      showAlert('Failed to fetch flight data.', 'error');
    }
  };

  const handleSearchCars = async () => {
    if (!carLocation) return showAlert('Please enter a pick-up location.', 'error');
    showAlert('Finding available vehicles...', 'info');
    setCarResults([]);
    try {
      const resp = await fetch(`/api/cars/search?location=${carLocation}`);
      const data = await resp.json();
      setCarResults(data);
      showAlert(`Found ${data.length} premium vehicles near ${carLocation}!`, 'success');
    } catch (e) {
      showAlert('Failed to fetch car rental data.', 'error');
    }
  };

  return (
    <div className="screen-container animate-fade-in">
      <div className="screen-header">
        <h1 className="screen-title">Where to next?</h1>
        <p className="screen-desc">Find exclusive deals on hotels, flights, and luxury transport.</p>
      </div>
      
      <div className="card" style={{ marginBottom: '2rem', padding: '0' }}>
        <div className="d-flex flex-wrap" style={{ borderBottom: '1px solid var(--border-color)', padding: '1rem', gap: '1rem' }}>
          <button 
            className={`btn ${activeTab === 'stays' ? 'btn-primary' : 'btn-ghost'}`} 
            style={{ borderRadius: '999px' }} 
            onClick={() => setActiveTab('stays')}
          ><Building size={16}/> Stays</button>
          
          <button 
            className={`btn ${activeTab === 'flights' ? 'btn-primary' : 'btn-ghost'}`} 
            style={{ borderRadius: '999px' }} 
            onClick={() => setActiveTab('flights')}
          ><Plane size={16}/> Flights</button>
          
          <button 
            className={`btn ${activeTab === 'cars' ? 'btn-primary' : 'btn-ghost'}`} 
            style={{ borderRadius: '999px' }} 
            onClick={() => setActiveTab('cars')}
          ><Car size={16}/> Car Rentals</button>
        </div>
        
        <div className="p-4" style={{ padding: '2rem' }}>
          {activeTab === 'stays' && (
            <div className="d-flex gap-4 align-center flex-wrap">
              <div className="form-group mb-0 flex-1">
                <label className="form-label text-xs">Destination</label>
                <div className="d-flex align-center gap-2" style={{ border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem 1rem' }}>
                  <MapPin size={18} color="var(--primary-color)"/>
                  <input className="search-input" list="destinations-list" style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent' }} placeholder="City, Airport, or Landmark" value={destination} onChange={e => setDestination(e.target.value)} />
                  <datalist id="destinations-list">
                    {[...new Set(useApp().hotels?.map(h => h.city) || [])].map(city => (
                      <option value={city} key={city} />
                    ))}
                  </datalist>
                </div>
              </div>
              
              <div className="form-group mb-0 flex-1">
                <label className="form-label text-xs">Check In</label>
                <div className="d-flex align-center gap-2" style={{ border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem 1rem' }}>
                  <Calendar size={18} color="var(--primary-color)"/>
                  <input type="date" className="search-input" style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent' }} value={checkIn} onChange={e => setCheckIn(e.target.value)} />
                </div>
              </div>

              <div className="form-group mb-0 flex-1">
                <label className="form-label text-xs">Check Out</label>
                <div className="d-flex align-center gap-2" style={{ border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem 1rem' }}>
                  <Calendar size={18} color="var(--primary-color)"/>
                  <input type="date" className="search-input" style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent' }} value={checkOut} onChange={e => setCheckOut(e.target.value)} />
                </div>
              </div>

              <div className="form-group mb-0 flex-1">
                <label className="form-label text-xs">Travelers</label>
                <div className="d-flex align-center gap-2" style={{ border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem 1rem' }}>
                  <Users size={18} color="var(--primary-color)"/>
                  <input type="number" min="1" className="search-input" style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent' }} value={guests} onChange={e => setGuests(e.target.value)} />
                </div>
              </div>
              
              <div className="form-group mb-0 mt-4">
                <button className="btn btn-gold pr-4 pl-4" onClick={handleSearchStays} style={{ height: '48px', width: '120px' }}>Search</button>
              </div>
            </div>
          )}

          {activeTab === 'flights' && (
            <div className="d-flex gap-4 align-center flex-wrap animate-fade-in">
              <div className="form-group mb-0 flex-1">
                <label className="form-label text-xs">From Where?</label>
                <div className="d-flex align-center gap-2" style={{ border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem 1rem' }}>
                  <Plane size={18} color="var(--primary-color)"/>
                  <input className="search-input" placeholder="Origin City or Airport" style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent' }} value={flightFrom} onChange={e => setFlightFrom(e.target.value)} />
                </div>
              </div>
              <div className="form-group mb-0 flex-1">
                <label className="form-label text-xs">To Where?</label>
                <div className="d-flex align-center gap-2" style={{ border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem 1rem' }}>
                  <MapPin size={18} color="var(--primary-color)"/>
                  <input className="search-input" placeholder="Destination City" style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent' }} value={flightTo} onChange={e => setFlightTo(e.target.value)} />
                </div>
              </div>
              <div className="form-group mb-0 flex-1">
                <label className="form-label text-xs">Departure Date</label>
                <div className="d-flex align-center gap-2" style={{ border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem 1rem' }}>
                  <Calendar size={18} color="var(--primary-color)"/>
                  <input type="date" className="search-input" style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent' }} value={flightDepart} onChange={e => setFlightDepart(e.target.value)} />
                </div>
              </div>
              <div className="form-group mb-0 mt-4">
                <button className="btn btn-gold pr-4 pl-4" onClick={handleSearchFlights} style={{ height: '48px', width: '160px' }}>Find Flights</button>
              </div>
            </div>
          )}

          {activeTab === 'cars' && (
            <div className="d-flex gap-4 align-center flex-wrap animate-fade-in">
              <div className="form-group mb-0 flex-1">
                <label className="form-label text-xs">Pick-up Location</label>
                <div className="d-flex align-center gap-2" style={{ border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem 1rem' }}>
                  <MapPin size={18} color="var(--primary-color)"/>
                  <input className="search-input" placeholder="Airport or City" style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent' }} value={carLocation} onChange={e => setCarLocation(e.target.value)} />
                </div>
              </div>
              <div className="form-group mb-0 flex-1">
                <label className="form-label text-xs">Vehicle Type</label>
                <div className="d-flex align-center gap-2" style={{ border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem 1rem' }}>
                  <Car size={18} color="var(--primary-color)"/>
                  <select className="search-input" style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent' }} value={carType} onChange={e => setCarType(e.target.value)}>
                     <option>Sedan</option>
                     <option>SUV</option>
                     <option>Luxury</option>
                     <option>Convertible</option>
                  </select>
                </div>
              </div>
              <div className="form-group mb-0 mt-4">
                <button className="btn btn-gold pr-4 pl-4" onClick={handleSearchCars} style={{ height: '48px', width: '160px' }}>Find Cars</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {flightResults.length > 0 && activeTab === 'flights' && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Available Flights from {flightFrom} to {flightTo}</h2>
          <div className="d-flex flex-column gap-3">
            {flightResults.map(flight => (
              <div key={flight.id} className="card d-flex justify-between align-center p-4">
                <div className="d-flex align-center gap-4">
                  <div style={{ padding: '0.75rem', background: 'var(--surface-hover)', borderRadius: '12px' }}>
                    <Plane size={24} color="var(--primary-color)" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem' }}>{flight.airline}</h3>
                    <p className="text-secondary text-sm">{flight.classType} • Departure: {flight.departureTime}</p>
                  </div>
                </div>
                <div className="text-right d-flex align-center gap-4">
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '1.25rem', fontWeight: 700 }}>₹{flight.price}</p>
                    <p className="text-xs text-secondary">Incl. taxes & fees</p>
                  </div>
                  <button className="btn btn-primary" onClick={async () => {
                    if (!currentUser) return showAlert('Please login to book a flight.', 'error');
                    try {
                      const res = await fetch('/api/bookings', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          userId: currentUser.id,
                          flightId: flight.id,
                          bookingType: 'flight',
                          totalPrice: flight.price,
                          guests: 1,
                          status: 'Confirmed'
                        })
                      });
                      if (res.ok) showAlert(`Flight with ${flight.airline} booked successfully!`, 'success');
                    } catch (e) {
                      showAlert('Failed to book flight.', 'error');
                    }
                  }}>Book Flight</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {carResults.length > 0 && activeTab === 'cars' && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Available Vehicles in {carLocation}</h2>
          <div className="grid-3 gap-4">
            {carResults.map(car => (
              <div key={car.id} className="card d-flex flex-column gap-2">
                <div style={{ padding: '2rem', background: 'var(--bg-color)', borderRadius: '8px', textAlign: 'center' }}>
                  <Car size={48} color="var(--primary-color)" style={{ margin: '0 auto' }} />
                </div>
                <h3>{car.name}</h3>
                <p className="text-secondary text-sm">{car.provider} • {car.seats} Seats • {car.bags} Bags</p>
                <div className="d-flex justify-between align-center mt-4">
                  <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>${car.price}<span className="text-sm text-secondary font-normal">/day</span></span>
                  <button className="btn btn-primary" style={{ padding: '0.4rem 1rem' }} onClick={async () => {
                    if (!currentUser) return showAlert('Please login to reserve a vehicle.', 'error');
                    try {
                      const res = await fetch('/api/bookings', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          userId: currentUser.id,
                          carId: car.id,
                          bookingType: 'car',
                          totalPrice: car.price,
                          guests: 1,
                          status: 'Confirmed'
                        })
                      });
                      if (res.ok) showAlert(`Successfully reserved ${car.name}!`, 'success');
                    } catch (e) {
                      showAlert('Failed to reserve vehicle.', 'error');
                    }
                  }}>Reserve</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Trending Indian Destinations</h2>
      <div className="grid-3 gap-4">
        <div className="card text-center cursor-pointer" onClick={() => { setDestination('Delhi'); setActiveTab('stays'); showAlert('Destination set to Delhi', 'success'); }}>
           <h3>Delhi</h3>
           <p className="text-secondary">India</p>
        </div>
        <div className="card text-center cursor-pointer" onClick={() => { setDestination('Mumbai'); setActiveTab('stays'); showAlert('Destination set to Mumbai', 'success'); }}>
           <h3>Mumbai</h3>
           <p className="text-secondary">India</p>
        </div>
        <div className="card text-center cursor-pointer" onClick={() => { setDestination('Bangalore'); setActiveTab('stays'); showAlert('Destination set to Bangalore', 'success'); }}>
           <h3>Bangalore</h3>
           <p className="text-secondary">India</p>
        </div>
      </div>
    </div>
  );
}
