import React from 'react';
import { Briefcase, Settings2, Users } from 'lucide-react';

export default function Management({ onNavigate }) {
  return (
    <div className="screen-container animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div className="screen-header">
        <h1 className="screen-title d-flex align-center gap-2"><Briefcase color="var(--primary-color)" /> Host Management</h1>
        <p className="screen-desc">Manage your property listings, availability, and view guest details.</p>
      </div>

      <div className="grid-3 mb-6">
        <div className="card">
          <div className="d-flex align-center gap-3 mb-2">
            <div style={{ background: 'var(--surface-hover)', padding: '0.5rem', borderRadius: '8px' }}><Settings2 size={24} color="var(--primary-color)" /></div>
            <h3 style={{ fontSize: '1.25rem' }}>Properties</h3>
          </div>
          <p className="text-secondary text-sm mb-4">View and edit your 2 active properties.</p>
          <button className="btn btn-secondary text-sm w-100" style={{ width: '100%' }}>Manage Listings</button>
        </div>

        <div className="card">
          <div className="d-flex align-center gap-3 mb-2">
            <div style={{ background: 'var(--surface-hover)', padding: '0.5rem', borderRadius: '8px' }}><Users size={24} color="var(--success)" /></div>
            <h3 style={{ fontSize: '1.25rem' }}>Guests</h3>
          </div>
          <p className="text-secondary text-sm mb-4">12 upcoming reservations this week.</p>
          <button className="btn btn-secondary text-sm w-100" style={{ width: '100%' }}>View Guest List</button>
        </div>

        <div className="card bg-primary text-white" style={{ background: 'var(--gradient-primary)', color: 'white' }}>
          <h3 className="mb-2">Monthly Revenue</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700 }} className="mb-2">$14,250</p>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>+12% from last month. Keep it up!</p>
        </div>
      </div>

      <div className="card">
         <h3 className="mb-4">Recent Bookings</h3>
         <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
               <tr style={{ background: 'var(--surface-hover)', textAlign: 'left' }}>
                 <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', fontWeight: 600 }}>Guest</th>
                 <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', fontWeight: 600 }}>Property</th>
                 <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', fontWeight: 600 }}>Dates</th>
                 <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', fontWeight: 600 }}>Status</th>
                 <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', fontWeight: 600 }}>Value</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                 <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>John Smith</td>
                 <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Grand Plaza Hotel</td>
                 <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }} className="text-secondary text-sm">Oct 14 - Oct 16</td>
                 <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}><span className="badge badge-success">Confirmed</span></td>
                 <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', fontWeight: 600 }}>$480</td>
               </tr>
               <tr>
                 <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Sarah Jenkins</td>
                 <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Le Meurice Luxury</td>
                 <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }} className="text-secondary text-sm">Oct 16 - Oct 18</td>
                 <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}><span className="badge badge-warning">Pending</span></td>
                 <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', fontWeight: 600 }}>$1,100</td>
               </tr>
            </tbody>
         </table>
      </div>
    </div>
  );
}
