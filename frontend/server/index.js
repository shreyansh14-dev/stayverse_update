import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { openDb, initDb } from './db.js';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize AI if key is present
const geminiApiKey = process.env.GEMINI_API_KEY || ''; // Can be empty if not provided by user
let aiClient = null;
if (geminiApiKey) {
  aiClient = new GoogleGenAI({ apiKey: geminiApiKey });
}

// Ensure DB is initialized
initDb().catch(console.error);

app.post('/api/hotels/ensure', async (req, res) => {
  const { city } = req.body;
  if (!city) return res.json([]);
  
  const db = await openDb();
  const countRes = await db.get('SELECT COUNT(*) as count FROM hotels WHERE LOWER(city) = LOWER(?)', [city]);
  if (countRes.count > 0) return res.json([]);

  const HOTEL_TYPES = ['Hotels', 'Resorts', 'Apartments', 'Villas', 'Boutique', 'Palace'];
  const DESC_PREFIX = ["Experience world-class luxury in the heart of", "A perfect relaxing getaway situated beautifully in", "Charming and incredibly cozy stays right inside", "Unrivaled 5-star experience with stunning sunset views at", "Dive into premium hospitality designed exclusively for you in"];
  const FEATURES = [['Free WiFi', 'Swimming Pool', 'Spa & Wellness'], ['Free Breakfast', 'Restaurant', 'Airport Transfer'], ['Fitness Center', 'City View', 'Executive Lounge'], ['Private Pool', 'Ocean View', 'All Inclusive'], ['Boutique', 'Free WiFi', 'Pet Friendly']];
  
  const stmt = await db.prepare(`INSERT INTO hotels (name, location, city, type, price, rating, reviews, image, features, description, images) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  
  for (let i = 1; i <= 8; i++) {
     const type = HOTEL_TYPES[Math.floor(Math.random() * HOTEL_TYPES.length)];
     const nameOption = i === 1 ? 'Grand' : i === 2 ? 'Royal' : i === 3 ? 'Boutique' : i === 4 ? 'Palace of' : i === 5 ? 'Imperial' : i === 6 ? 'Central' : i === 7 ? 'Premium' : 'Elite';
     const name = `${nameOption} ${city} ${type}`;
     const location = `Downtown ${city}`;
     const price = Math.floor(Math.random() * 800) + 120;
     const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
     const reviews = Math.floor(Math.random() * 3000) + 50; 
     const imageSet = [
      'https://images.unsplash.com/photo-1542314831-c6a4d27488c0?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=80'
     ];
     const features = JSON.stringify(FEATURES[Math.floor(Math.random() * FEATURES.length)]);
     const description = `${DESC_PREFIX[Math.floor(Math.random() * DESC_PREFIX.length)]} ${city}. Enjoy premium amenities tailored strictly for luxury.`;
     const images = JSON.stringify(imageSet);

     await stmt.run([name, location, city, type, price, rating, reviews, imageSet[0], features, description, images]);
  }
  await stmt.finalize();

  const newHotels = await db.all('SELECT * FROM hotels WHERE LOWER(city) = LOWER(?)', [city]);
  res.json(newHotels.map(h => ({ ...h, features: JSON.parse(h.features), images: JSON.parse(h.images) })));
});

app.get('/api/hotels', async (req, res) => {
  const db = await openDb();
  let hotels = await db.all('SELECT * FROM hotels');
  // parse JSON strings
  hotels = hotels.map(h => ({
    ...h,
    features: JSON.parse(h.features),
    images: JSON.parse(h.images)
  }));
  res.json(hotels);
});

app.post('/api/auth/login', async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email required' });
  const db = await openDb();
  let user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
  if (!user) {
    const result = await db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    user = await db.get('SELECT * FROM users WHERE id = ?', [result.lastID]);
  }
  res.json(user);
});

app.get('/api/bookings', async (req, res) => {
  const userId = req.query.userId;
  const db = await openDb();
  let query = `
    SELECT b.*, h.name as hotelName, h.image as hotelImage, h.location as hotelLocation, h.city as hotelCity 
    FROM bookings b 
    JOIN hotels h ON b.hotelId = h.id 
    ORDER BY b.id DESC
  `;
  let params = [];
  if (userId) {
    query = `
      SELECT b.*, h.name as hotelName, h.image as hotelImage, h.location as hotelLocation, h.city as hotelCity 
      FROM bookings b 
      JOIN hotels h ON b.hotelId = h.id 
      WHERE b.userId = ? 
      ORDER BY b.id DESC
    `;
    params = [userId];
  }
  const bookings = await db.all(query, params);
  res.json(bookings);
});

app.post('/api/bookings', async (req, res) => {
  const { hotelId, userId, checkIn, checkOut, guests, totalPrice } = req.body;
  const db = await openDb();
  const id = 'STAY-' + Math.random().toString(36).substr(2, 6).toUpperCase();
  await db.run(
    'INSERT INTO bookings (id, hotelId, userId, checkIn, checkOut, guests, totalPrice, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [id, hotelId, userId, checkIn, checkOut, guests, totalPrice, 'Confirmed']
  );
  const newBooking = await db.get('SELECT * FROM bookings WHERE id = ?', [id]);
  res.json(newBooking);
});

app.put('/api/bookings/:id/cancel', async (req, res) => {
  const { id } = req.params;
  const db = await openDb();
  await db.run('UPDATE bookings SET status = ? WHERE id = ?', ['Cancelled', id]);
  res.json({ success: true, id });
});

app.post('/api/chat', async (req, res) => {
  const { messages, context } = req.body;

  if (!aiClient) {
    const userMsg = messages[messages.length - 1].content.toLowerCase();
    let fallback = '';
    
    const cityMatch = userMsg.match(/(?:to|in|for)\s+([a-z\s]+)(?:$|\s|\.|\!|\?)/);
    let extractedCity = cityMatch ? cityMatch[1].trim() : null;

    if (!extractedCity && userMsg.trim().split(/\\s+/).length <= 2) {
       extractedCity = userMsg.trim().replace(/[^a-z\\s]/g, '');
    }

    const stopWords = ['hi', 'hello', 'hey', 'book', 'find', 'plan', 'trip', 'a trip', 'my trip', 'cancel', 'refund', 'price', 'cost', 'cheap', 'flight', 'car', 'suggest', 'recommend', 'where', 'help', 'yes', 'no', 'thanks', 'ok'];

    if (extractedCity && extractedCity.length > 2 && !stopWords.includes(extractedCity)) {
       const capCity = extractedCity.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
       fallback = `A trip to **${capCity}** sounds like an exceptional idea! We have just updated our global registry. If you head over to the **Explore & Book** tab and search for "${capCity}", I will instantly generate the best luxury availability specifically tailored for your dates.`;
    } else if (userMsg.includes('hello') || userMsg.includes('hi')) {
       fallback = `Hi ${context?.userName || 'there'}! I am the StayVerse Offline Travel Assistant. How can I assist you with your bookings today?`;
    } else if (userMsg.includes('suggest') || userMsg.includes('recommend') || userMsg.includes('where')) {
       fallback = `I highly recommend checking out globally trending destinations like **Paris**, **Tokyo**, or **Dubai**! Just head over to the **Explore** tab, search for them, and I'll generate live availability on the fly.`;
    } else if (userMsg.includes('cancel') || userMsg.includes('refund')) {
       fallback = 'To cancel an active booking, please visit the "My Trips" section via the sidebar. Cancellations are processed immediately. Refunds follow property policy timelines.';
    } else if (userMsg.includes('book') || userMsg.includes('reserve')) {
       fallback = `Ready to book your trip to ${context?.destination || 'your dream destination'}? Head over to the **Explore & Book** tab to finalize your travel dates and snag the best hotels, flights, or car rentals!`;
    } else if (userMsg.includes('price') || userMsg.includes('cost') || userMsg.includes('cheap')) {
       fallback = 'We pride ourselves on offering luxury at competitive prices! Sort by "Lowest Price" in the Explore tab. All our Gen-2 properties include a complimentary 10% discount.';
    } else if (userMsg.includes('flight') || userMsg.includes('car')) {
       fallback = 'We now fully support Flights and Car Rentals! Jump into the "Explore & Book" section and cycle the tabs at the top to secure your flights and transportation.';
    } else {
       const GENERIC_REPLIES = [
         "That sounds like a fascinating journey! While I am currently operating without a live connection to analyze the deep specifics, my core engine suggests checking our Explore tab to map out some initial dates.",
         "I love where your head is at! Travel is all about discovery. I'm running in an offline capacity right now so I can't generate a highly customized breakdown, but I can definitely help you secure a luxury suite in any city you search across the globe.",
         "Very interesting question! To give you a hyper-tailored travel itinerary, I would need a live GenAI connection. However, if you're looking for recommendations, I'd suggest starting an open search on our Explore page to see what catches your eye!",
         "I hear you! Planning details like that can be quite the adventure. My offline logic matrix limits me from diving into hyper-specific conversational details, but if you give me a destination like 'Dubai' or 'Tokyo', I'll jump right on it.",
         "That's a wonderful thought! I'm currently running in a simplified offline mode, so I can't break down the exact logistics of that for you natively. But test me out—ask me to suggest a trip or check your local reservations!"
       ];
       fallback = GENERIC_REPLIES[Math.floor(Math.random() * GENERIC_REPLIES.length)];
    }

    return res.json({ response: fallback });
  }

  try {
    const sysPrompt = `You are an incredibly helpful, friendly, and professional AI travel assistant for an exclusive platform called StayVerse. 
    The user's name is ${context?.userName || 'User'}. They are currently looking to travel to ${context?.destination || 'a wonderful destination'}. 
    Always output formatting in clean Markdown text. Be concise, polite, luxurious, and offer genuinely good travel advice and recommendations.`;
    
    const formattedMessages = messages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n');
    const fullPrompt = `${sysPrompt}\n\nChat History:\n${formattedMessages}\nAssistant:`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
    });
    
    res.json({ response: response.text });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Failed to generate response due to API error. Check your API key or connectivity.' });
  }
});

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
