import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AIAssistant({ onNavigate }) {
  const { currentUser, searchParams } = useApp();
  const userName = currentUser ? currentUser.name : 'there';
  const chatEndRef = useRef(null);

  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Hello ${userName}! I'm your StayVerse AI Travel Assistant. I see you are looking at trips to ${searchParams.destination}. How can I assist you with your travels today?` }
  ]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    const userMsg = query;
    const newMessages = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setQuery('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: newMessages,
          context: { userName, destination: searchParams.destination }
        })
      });
      const data = await res.json();
      
      if (data.error) {
        setMessages(prev => [...prev, { role: 'assistant', content: "An error occurred safely. " + data.error }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting to my service right now." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="screen-container animate-fade-in d-flex flex-col h-100" style={{ maxWidth: '800px', margin: '0 auto', height: 'calc(100vh - 150px)' }}>
      <div className="screen-header mb-4">
        <h1 className="screen-title d-flex align-center gap-2"><Sparkles color="var(--primary-color)" /> AI Travel Assistant</h1>
        <p className="screen-desc">Get personalized recommendations and itinerary planning.</p>
      </div>

      <div className="card flex-1 d-flex flex-col p-0 overflow-hidden" style={{ minHeight: '500px' }}>
        <div className="flex-1 p-6" style={{ overflowY: 'auto', background: 'var(--bg-color)' }}>
           <div className="d-flex flex-col gap-4">
              {messages.map((msg, i) => (
                 <div key={i} className={`d-flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'align-self-end flex-row-reverse' : ''}`} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: msg.role === 'assistant' ? 'var(--gradient-gold)' : 'var(--gradient-primary)', color: msg.role === 'assistant' ? '#000' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                       {msg.role === 'assistant' ? <Bot size={18} /> : <User size={18} />}
                    </div>
                    <div style={{ background: msg.role === 'user' ? 'var(--primary-color)' : 'var(--surface-color)', color: msg.role === 'user' ? 'white' : 'var(--text-primary)', padding: '1rem', borderRadius: '12px', border: msg.role === 'user' ? 'none' : '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                       <p className="text-sm lh-lg">{msg.content}</p>
                    </div>
                 </div>
              ))}
              {isTyping && (
                 <div className="d-flex gap-3 max-w-[80%] align-self-start">
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--gradient-gold)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <Bot size={18} />
                    </div>
                    <div style={{ background: 'var(--surface-color)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                       <p className="text-sm text-secondary">Typing...</p>
                    </div>
                 </div>
              )}
              <div ref={chatEndRef} />
           </div>
        </div>
        
        <div className="p-4" style={{ background: 'var(--surface-color)', borderTop: '1px solid var(--border-color)' }}>
           <form className="d-flex align-center gap-2" onSubmit={handleSend}>
              <input 
                 type="text" 
                 className="form-input mb-0 flex-1" 
                 placeholder="E.g., Can you cancel my trip to Tokyo?" 
                 value={query}
                 onChange={e => setQuery(e.target.value)}
                 style={{ borderRadius: '999px', padding: '0.75rem 1.5rem', background: 'var(--bg-color)' }}
              />
              <button type="submit" className="btn btn-primary" style={{ borderRadius: '50%', width: '48px', height: '48px', padding: 0 }} disabled={isTyping}>
                 <Send size={18} />
              </button>
           </form>
        </div>
      </div>
    </div>
  );
}
