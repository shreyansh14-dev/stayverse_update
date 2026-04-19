import React from 'react';
import { Crown, Sparkles, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Profile({ onNavigate }) {
  const { currentUser, bookings } = useApp();
  
  const validBookings = bookings ? bookings.filter(b => b.status !== 'Cancelled') : [];
  const totalBookings = validBookings.length;
  const level = totalBookings > 5 ? 2 : 1;
  const nextTarget = level === 1 ? 6 : 15;
  const staysNeeded = nextTarget - totalBookings;
  const progressPercent = Math.min(100, Math.max(0, ((totalBookings / nextTarget) * 100)));

  return (
    <div className="screen-container animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="screen-header">
        <h1 className="screen-title">Loyalty & Profile</h1>
        <p className="screen-desc">Manage your account and view your StayVerse Genius rewards.</p>
      </div>
      
      <div className="card mb-6" style={{ background: 'var(--gradient-primary)', color: 'white' }}>
         <div className="d-flex justify-between align-center mb-6">
            <div>
               <h2 className="d-flex align-center gap-2 mb-1"><Sparkles color="var(--secondary-color)" /> Genius Level {level}</h2>
               <p style={{ color: 'rgba(255,255,255,0.8)' }}>You've unlocked exceptional travel rewards.</p>
            </div>
            <Crown size={48} color="var(--secondary-color)" />
         </div>

         {/* Progress Bar */}
         <div className="mb-2 d-flex justify-between text-sm" style={{ fontWeight: 600 }}>
            <span>Level {level}</span>
            <span>{staysNeeded > 0 ? `${staysNeeded} stays to Level ${level + 1}` : 'Genius Max!'}</span>
         </div>
         <div style={{ height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px', overflow: 'hidden', marginBottom: '1.5rem' }}>
            <div style={{ width: `${progressPercent}%`, height: '100%', background: 'var(--secondary-color)', transition: 'width 0.5s' }}></div>
         </div>

         <div className="grid-3 gap-4">
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px' }}>
               <CheckCircle size={18} className="mb-2 text-gold" style={{ color: 'var(--secondary-color)' }} />
               <h4 style={{ fontSize: '0.9rem' }}>10-15% Discounts</h4>
               <p className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>On participating properties</p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px' }}>
               <CheckCircle size={18} className="mb-2 text-gold" style={{ color: 'var(--secondary-color)' }} />
               <h4 style={{ fontSize: '0.9rem' }}>Free Breakfasts</h4>
               <p className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>On select stays</p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', opacity: 0.5 }}>
               <Crown size={18} className="mb-2" />
               <h4 style={{ fontSize: '0.9rem' }}>Room Upgrades</h4>
               <p className="text-xs">Unlocks at Level 3</p>
            </div>
         </div>
      </div>

      <div className="grid-2">
         <div className="card">
            <h3 className="mb-4">Personal Details</h3>
            <div className="d-flex flex-col gap-4">
               <div>
                  <label className="text-xs text-muted block mb-1">Full Name</label>
                  <p style={{ fontWeight: 500 }}>{currentUser ? currentUser.name : 'Unknown User'}</p>
               </div>
               <div>
                  <label className="text-xs text-muted block mb-1">Email</label>
                  <p style={{ fontWeight: 500 }}>{currentUser ? currentUser.email : 'No email registered'}</p>
               </div>
               <div>
                  <label className="text-xs text-muted block mb-1">Phone</label>
                  <p className="text-muted">Not provided</p>
               </div>
            </div>
            <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
               <button className="btn btn-secondary text-sm">Edit Details</button>
            </div>
         </div>
         <div className="card">
            <h3 className="mb-4">Payment Methods</h3>
            <div className="d-flex align-center justify-between p-3 mb-2" style={{ border: '1px solid var(--border-color)', borderRadius: '8px' }}>
               <div className="d-flex align-center gap-3">
                  <div style={{ background: 'var(--surface-hover)', padding: '4px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>VISA</div>
                  <span>•••• 4242</span>
               </div>
               <span className="badge badge-secondary">Default</span>
            </div>
            <button className="btn btn-ghost text-primary text-sm mt-2">+ Add new card</button>
         </div>
      </div>
    </div>
  );
}
