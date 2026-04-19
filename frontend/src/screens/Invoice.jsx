import React from 'react';
import { Printer, Download, Hotel } from 'lucide-react';

export default function Invoice() {
  return (
    <div>
      <div className="screen-header d-flex justify-between align-center">
        <div>
          <h1 className="screen-title">Invoice #INV-2026-041</h1>
          <p className="screen-desc">Generated on April 15, 2026</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn-secondary">
            <Download size={18} /> Download PDF
          </button>
          <button className="btn-primary" onClick={() => window.print()}>
            <Printer size={18} /> Print Invoice
          </button>
        </div>
      </div>

      <div className="card" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem' }}>
        <div className="d-flex justify-between" style={{ borderBottom: '2px solid var(--border-color)', paddingBottom: '2rem', marginBottom: '2rem' }}>
          <div>
            <div className="d-flex align-center gap-2" style={{ marginBottom: '1rem' }}>
              <Hotel size={28} color="var(--primary-color)" />
              <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-color)' }}>StayVerse</h2>
            </div>
            <p className="text-secondary text-sm">123 Luxury Avenue<br/>Beverly Hills, CA 90210<br/>support@stayverse.com</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <h3 style={{ textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>Invoice</h3>
            <p className="text-primary" style={{ fontWeight: 600, fontSize: '1.25rem', marginTop: '0.5rem' }}>$495.00</p>
            <span className="badge badge-success" style={{ marginTop: '0.5rem' }}>Paid in Full</span>
          </div>
        </div>

        <div className="grid-2" style={{ marginBottom: '3rem' }}>
          <div>
            <h4 className="text-secondary text-sm text-uppercase" style={{ marginBottom: '0.5rem' }}>Billed To</h4>
            <p style={{ fontWeight: 500 }}>John Doe</p>
            <p className="text-secondary text-sm">john.doe@example.com<br/>+1 (555) 123-4567</p>
          </div>
          <div>
            <h4 className="text-secondary text-sm text-uppercase" style={{ marginBottom: '0.5rem' }}>Reservation Details</h4>
            <p className="text-sm"><strong>Check-in:</strong> April 20, 2026</p>
            <p className="text-sm"><strong>Check-out:</strong> April 23, 2026</p>
            <p className="text-sm"><strong>Guests:</strong> 2 Adults</p>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
              <th style={{ padding: '1rem 0', color: 'var(--text-secondary)' }}>Description</th>
              <th style={{ padding: '1rem 0', color: 'var(--text-secondary)', textAlign: 'center' }}>Nights</th>
              <th style={{ padding: '1rem 0', color: 'var(--text-secondary)', textAlign: 'right' }}>Rate</th>
              <th style={{ padding: '1rem 0', color: 'var(--text-secondary)', textAlign: 'right' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '1.5rem 0' }}>
                <p style={{ fontWeight: 500 }}>Luxury Suite - Room 401</p>
                <p className="text-secondary text-sm">Includes complimentary breakfast</p>
              </td>
              <td style={{ padding: '1.5rem 0', textAlign: 'center' }}>3</td>
              <td style={{ padding: '1.5rem 0', textAlign: 'right' }}>$150.00</td>
              <td style={{ padding: '1.5rem 0', textAlign: 'right', fontWeight: 500 }}>$450.00</td>
            </tr>
          </tbody>
        </table>

        <div style={{ width: '300px', marginLeft: 'auto' }}>
          <div className="d-flex justify-between" style={{ padding: '0.5rem 0', color: 'var(--text-secondary)' }}>
            <span>Subtotal</span>
            <span>$450.00</span>
          </div>
          <div className="d-flex justify-between" style={{ padding: '0.5rem 0', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)', marginBottom: '1rem' }}>
            <span>Taxes (10%)</span>
            <span>$45.00</span>
          </div>
          <div className="d-flex justify-between align-center">
            <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>Total</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-color)' }}>$495.00</span>
          </div>
        </div>
        
        <div style={{ marginTop: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <p className="text-sm">Thank you for choosing StayVerse. We hope you enjoy your stay!</p>
        </div>
      </div>
    </div>
  );
}
