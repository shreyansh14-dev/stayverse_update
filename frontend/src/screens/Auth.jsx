import React, { useState } from 'react';
import { Hotel, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Auth({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, showAlert } = useApp();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showAlert('Please enter both email and password.', 'error');
      return;
    }
    if (password.length < 6) {
      showAlert('Password must be at least 6 characters.', 'error');
      return;
    }
    
    // Simulate login success
    login({ email, name: email.split('@')[0] });
    onLogin();
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: 'var(--bg-color)', overflow: 'hidden' }}>
      <div style={{ flex: 1.2, position: 'relative', display: 'none', '@media (min-width: 768px)': { display: 'block' } }} className="hide-on-mobile">
        <img 
          src="https://images.unsplash.com/photo-1542314831-c6a4d27488c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          alt="Luxury Hotel" 
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }}></div>
        <div style={{ position: 'absolute', bottom: '10%', left: '8%', color: 'white', maxWidth: '500px', zIndex: 10 }}>
          <div style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', display: 'inline-flex', padding: '0.5rem 1rem', borderRadius: '30px', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.3)' }}>
             <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>StayVerse Gen-2</span>
          </div>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: '#fff', lineHeight: 1.1, fontWeight: 700 }}>Discover<br/>true luxury.</h1>
          <p style={{ fontSize: '1.15rem', opacity: 0.9, lineHeight: 1.6 }}>Join the world's most exclusive travel platform and explore premium stays, executive flights, and exotic rides seamlessly.</p>
        </div>
      </div>
      
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-color)', padding: '2rem' }}>
        <div style={{ width: '100%', maxWidth: '420px', animation: 'fadeIn 0.5s ease-out' }}>
          <div className="d-flex flex-col gap-2 mb-8">
            <div style={{ background: 'var(--gradient-gold)', padding: '0.75rem', borderRadius: '12px', boxShadow: 'var(--shadow-md)', display: 'inline-flex', width: '56px', height: '56px', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
               <Hotel size={32} color="#000" />
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Welcome back</h2>
            <p className="text-muted">Enter your details to access your dashboard.</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="d-flex bg-white rounded-lg p-1 border mb-8" style={{ borderRadius: '8px', background: 'var(--bg-color)', border: '1px solid var(--border-color)', padding: '4px' }}>
              <button 
                type="button" 
                className={`btn text-sm flex-1 ${!isRegister ? 'bg-white font-semibold shadow-sm' : 'btn-ghost'}`} 
                style={!isRegister ? { background: 'var(--surface-color)', color: 'var(--primary-color)', boxShadow: 'var(--shadow-sm)', borderRadius: '6px' } : { borderRadius: '6px' }} 
                onClick={() => setIsRegister(false)}
              >Log In</button>
              <button 
                type="button" 
                className={`btn text-sm flex-1 ${isRegister ? 'bg-white font-semibold shadow-sm' : 'btn-ghost'}`} 
                style={isRegister ? { background: 'var(--surface-color)', color: 'var(--primary-color)', boxShadow: 'var(--shadow-sm)', borderRadius: '6px' } : { borderRadius: '6px' }} 
                onClick={() => setIsRegister(true)}
              >Register</button>
            </div>

            <div className="form-group mb-5">
              <label className="form-label text-xs uppercase" style={{ letterSpacing: '0.05em', fontWeight: 600 }}>Email Address</label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="jane.doe@example.com" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
                style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.8rem 1rem', background: 'var(--bg-color)', width: '100%', outline: 'none' }} 
              />
            </div>
            
            <div className="form-group mb-8">
              <div className="d-flex justify-between align-center mb-1">
                <label className="form-label text-xs uppercase mb-0" style={{ letterSpacing: '0.05em', fontWeight: 600 }}>Password</label>
                {!isRegister && <a href="#" className="text-xs" style={{ color: 'var(--primary-color)' }} onClick={(e) => { e.preventDefault(); showAlert('Password recovery sent!', 'info'); }}>Forgot password?</a>}
              </div>
              <input 
                type="password" 
                className="form-input" 
                placeholder="••••••••" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
                style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.8rem 1rem', background: 'var(--bg-color)', width: '100%', outline: 'none' }} 
              />
            </div>
            
            <button type="submit" className="btn-gold d-flex justify-between align-center px-6" style={{ height: '54px', width: '100%', borderRadius: '8px', fontSize: '1rem' }}>
              <span style={{ fontWeight: 600 }}>{isRegister ? 'Create Account' : 'Sign In'}</span>
              <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
