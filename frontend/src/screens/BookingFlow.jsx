import React, { useState } from 'react';
import { CreditCard, CheckCircle, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function BookingFlow({ onNavigate, propertyId }) {
  const { hotels, searchParams, bookings, addBooking, showAlert, currentUser } = useApp();
  const hotel = hotels.find(h => h.id.toString() === propertyId);
  const [step, setStep] = useState(1);
  const [confirmedId, setConfirmedId] = useState(null);

  // Form State
  const [guestDetails, setGuestDetails] = useState({ firstName: currentUser ? currentUser.name : '', lastName: '', email: currentUser ? currentUser.email : '' });
  const [paymentDetails, setPaymentDetails] = useState({ card: '', expiry: '', cvc: '' });

  if (!hotel) return <div className="p-8">Property not valid for booking.</div>;

  // Calcs
  const diffTime = Math.abs(new Date(searchParams.checkOut) - new Date(searchParams.checkIn));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  const roomTotal = hotel.price * diffDays;
  const taxes = Math.floor(roomTotal * 0.12);
  const finalTotal = roomTotal + taxes;

  const handleNextStep1 = () => {
    if (!guestDetails.firstName || !guestDetails.lastName || !guestDetails.email) {
      showAlert('Please enter all guest details.', 'error');
      return;
    }
    setStep(2);
  };

  const handleConfirmPay = () => {
    if (!paymentDetails.card || !paymentDetails.expiry || !paymentDetails.cvc) {
      showAlert('Payment details incomplete.', 'error');
      return;
    }

    // Overlap validation
    const overlap = bookings.some(b => 
      b.hotelId === hotel.id && 
      b.status === 'Confirmed' &&
      new Date(searchParams.checkIn) <= new Date(b.checkOut) && 
      new Date(searchParams.checkOut) >= new Date(b.checkIn)
    );

    if (overlap) {
      showAlert('You already have an active overlapping booking for this property.', 'warning');
      return;
    }

    // Complete Booking
    const newBooking = {
      hotelId: hotel.id,
      hotelName: hotel.name,
      hotelImage: hotel.images[0],
      checkIn: searchParams.checkIn,
      checkOut: searchParams.checkOut,
      guests: searchParams.guests,
      guestName: `${guestDetails.firstName} ${guestDetails.lastName}`,
      totalCost: finalTotal,
      createdAt: new Date().toISOString()
    };

    addBooking(newBooking);
    // Note: addBooking sets id randomly starting with STAY- inside context, 
    // to keep it simple here we just mock the view
    setConfirmedId('STAY-924X');
    setStep(3);
  };

  return (
    <div className="screen-container animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="screen-header text-center mb-8">
        <h1 className="screen-title">Complete your booking</h1>
        <div className="d-flex justify-center mt-4">
           {/* Custom Stepper */}
           <div className="d-flex align-center gap-4">
              <div className="d-flex align-center gap-2">
                 <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: step >= 1 ? 'var(--primary-color)' : 'var(--border-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</div>
                 <span style={{ fontWeight: step >= 1 ? 600 : 400 }}>Your Details</span>
              </div>
              <div style={{ width: '40px', height: '2px', background: step >= 2 ? 'var(--primary-color)' : 'var(--border-color)' }}></div>
              <div className="d-flex align-center gap-2">
                 <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: step >= 2 ? 'var(--primary-color)' : 'var(--border-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>2</div>
                 <span style={{ fontWeight: step >= 2 ? 600 : 400 }}>Payment</span>
              </div>
              <div style={{ width: '40px', height: '2px', background: step >= 3 ? 'var(--primary-color)' : 'var(--border-color)' }}></div>
              <div className="d-flex align-center gap-2">
                 <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: step >= 3 ? 'var(--success)' : 'var(--border-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>3</div>
                 <span style={{ fontWeight: step >= 3 ? 600 : 400 }}>Confirmation</span>
              </div>
           </div>
        </div>
      </div>

      <div className="card">
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="mb-4">Guest Details</h2>
            <div className="grid-2">
               <div className="form-group">
                 <label className="form-label">First Name</label>
                 <input type="text" className="form-input" value={guestDetails.firstName} onChange={e => setGuestDetails({...guestDetails, firstName: e.target.value})} placeholder="Jane" />
               </div>
               <div className="form-group">
                 <label className="form-label">Last Name</label>
                 <input type="text" className="form-input" value={guestDetails.lastName} onChange={e => setGuestDetails({...guestDetails, lastName: e.target.value})} placeholder="Doe" />
               </div>
               <div className="form-group" style={{ gridColumn: 'span 2' }}>
                 <label className="form-label">Email Address</label>
                 <input type="email" className="form-input" value={guestDetails.email} onChange={e => setGuestDetails({...guestDetails, email: e.target.value})} placeholder="jane.doe@example.com" />
                 <p className="text-xs text-muted mt-1">Confirmation email will be sent here.</p>
               </div>
            </div>
            <div className="mt-6 pt-6 border-t" style={{ borderTop: '1px solid var(--border-color)' }}>
               <button className="btn btn-primary" onClick={handleNextStep1}>Next: Payment Details</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <h2 className="mb-4 d-flex align-center gap-2"><CreditCard /> Secure Payment</h2>
            
            <div className="p-4 mb-4" style={{ background: 'var(--surface-hover)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
               <div className="d-flex justify-between mb-2">
                 <span>{hotel.name} ({diffDays} nights)</span>
                 <span>${roomTotal}</span>
               </div>
               <div className="d-flex justify-between mb-2">
                 <span>Taxes & Fees</span>
                 <span>${taxes}</span>
               </div>
               <div className="d-flex justify-between mt-2 pt-2 text-primary" style={{ borderTop: '1px dashed var(--border-color)', fontWeight: 700, fontSize: '1.2rem' }}>
                 <span>Total Amount</span>
                 <span>${finalTotal}</span>
               </div>
            </div>

            <div className="form-group">
               <label className="form-label">Card Number</label>
               <input type="text" className="form-input" placeholder="•••• •••• •••• 4242" value={paymentDetails.card} onChange={e => setPaymentDetails({...paymentDetails, card: e.target.value})} />
            </div>
            <div className="grid-2">
               <div className="form-group">
                 <label className="form-label">Expiry Date</label>
                 <input type="text" className="form-input" placeholder="MM/YY" value={paymentDetails.expiry} onChange={e => setPaymentDetails({...paymentDetails, expiry: e.target.value})} />
               </div>
               <div className="form-group">
                 <label className="form-label">CVC</label>
                 <input type="text" className="form-input" placeholder="123" value={paymentDetails.cvc} onChange={e => setPaymentDetails({...paymentDetails, cvc: e.target.value})} />
               </div>
            </div>

            <div className="d-flex align-center gap-2 text-success mb-6">
               <ShieldCheck size={18} />
               <span className="text-sm">Your payment is encrypted and secure.</span>
            </div>

            <div className="d-flex justify-between mt-6 pt-6" style={{ borderTop: '1px solid var(--border-color)' }}>
               <button className="btn btn-secondary" onClick={() => setStep(1)}>Back</button>
               <button className="btn btn-primary" onClick={handleConfirmPay}>Confirm & Pay ${finalTotal}</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center animate-fade-in py-8">
            <CheckCircle size={64} color="var(--success)" style={{ margin: '0 auto', marginBottom: '1rem' }} />
            <h2 className="mb-2" style={{ fontSize: '2rem' }}>Booking Confirmed!</h2>
            <p className="text-secondary mb-6">Your itinerary has been sent to {guestDetails.email}</p>
            
            <div className="p-4 mx-auto mb-6" style={{ background: 'var(--surface-hover)', borderRadius: '8px', border: '1px solid var(--border-color)', maxWidth: '400px', textAlign: 'left' }}>
               <h4 className="mb-2">Confirmation #{confirmedId}</h4>
               <p className="text-sm text-secondary">Check-in: {new Date(searchParams.checkIn).toLocaleDateString()}</p>
               <p className="text-sm text-secondary">Checkout: {new Date(searchParams.checkOut).toLocaleDateString()}</p>
            </div>

            <button className="btn btn-gold" onClick={() => onNavigate('dashboard')}>Return to Dashboard</button>
          </div>
        )}
      </div>
    </div>
  );
}
