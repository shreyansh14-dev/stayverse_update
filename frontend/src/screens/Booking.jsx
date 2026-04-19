import React, { useState } from 'react';
import { Calendar, CreditCard, User } from 'lucide-react';

export default function Booking({ onNavigate }) {
  const [nights, setNights] = useState(1);
  const [roomRate, setRoomRate] = useState(120);

  const subtotal = nights * roomRate;
  const taxes = subtotal * 0.1;
  const total = subtotal + taxes;

  const handleRoomChange = (e) => {
    const rates = { standard: 120, deluxe: 250, suite: 450 };
    setRoomRate(rates[e.target.value] || 120);
  };

  const handleDatesChange = (e) => {
    // Simple mock logic for nights calculation based on random interaction
    setNights(Math.max(1, Math.floor(Math.random() * 5) + 1));
  }

  return (
    <div>
      <div className="screen-header">
        <h1 className="screen-title">Create New Booking</h1>
        <p className="screen-desc">Enter guest details and dates to reserve a room.</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={20} className="text-secondary" /> Guest Information
          </h3>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input type="text" className="form-input" placeholder="John" />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input type="text" className="form-input" placeholder="Doe" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-input" placeholder="john.doe@example.com" />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Phone Number</label>
            <input type="tel" className="form-input" placeholder="+1 (555) 000-0000" />
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={20} className="text-secondary" /> Reservation Details
          </h3>
          <div className="form-group">
            <label className="form-label">Room Type</label>
            <select className="form-input" onChange={handleRoomChange}>
              <option value="standard">Standard Room ($120/night)</option>
              <option value="deluxe">Deluxe Room ($250/night)</option>
              <option value="suite">Luxury Suite ($450/night)</option>
            </select>
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Check-In</label>
              <input type="date" className="form-input" onChange={handleDatesChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Check-Out</label>
              <input type="date" className="form-input" onChange={handleDatesChange} />
            </div>
          </div>

          {/* Pricing Summary */}
          <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--border-radius-sm)' }}>
            <div className="d-flex justify-between" style={{ marginBottom: '0.5rem' }}>
              <span className="text-secondary">Room Rate x {nights} nights</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-between" style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
              <span className="text-secondary">Taxes & Fees (10%)</span>
              <span>${taxes.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-between align-center">
              <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>Total Amount</span>
              <span style={{ fontWeight: 700, fontSize: '1.5rem', color: 'var(--primary-color)' }}>${total.toFixed(2)}</span>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <button className="btn-primary" style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }} onClick={() => onNavigate('invoice')}>
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
