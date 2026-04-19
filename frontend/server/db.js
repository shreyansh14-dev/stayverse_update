import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function openDb() {
  const dbPath = process.env.DATABASE_PATH || path.join(__dirname, 'database.sqlite');
  return open({
    filename: dbPath,
    driver: sqlite3.Database
  });
}

const INDIAN_CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Surat', 'Pune', 'Jaipur',
  'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara',
  'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivli', 'Vasai-Virar', 'Varanasi',
  'Srinagar', 'Aurangabad', 'Dhanbad', 'Amritsar', 'Navi Mumbai', 'Allahabad', 'Howrah', 'Ranchi', 'Gwalior', 'Jabalpur',
  'Coimbatore', 'Vijayawada', 'Jodhpur', 'Madurai', 'Raipur', 'Kota', 'Guwahati', 'Chandigarh', 'Solapur', 'Hubli-Dharwad',
  'Bareilly', 'Moradabad', 'Mysore', 'Gurgaon', 'Aligarh', 'Jalandhar', 'Tiruchirappalli', 'Bhubaneswar', 'Salem', 'Mira-Bhayandar',
  'Warangal', 'Thiruvananthapuram', 'Guntur', 'Bhiwandi', 'Saharanpur', 'Gorakhpur', 'Bikaner', 'Amravati', 'Noida', 'Jamshedpur',
  'Bhilai', 'Cuttack', 'Firozabad', 'Kochi', 'Bhavnagar', 'Dehradun', 'Durgapur', 'Asansol', 'Nanded', 'Kolhapur',
  'Ajmer', 'Gulbarga', 'Jamnagar', 'Ujjain', 'Loni', 'Siliguri', 'Jhansi', 'Ulhasnagar', 'Nellore', 'Jammu',
  'Sangli-Miraj & Kupwad', 'Belgaum', 'Mangalore', 'Ambattur', 'Tirunelveli', 'Malegaon', 'Gaya', 'Jalgaon', 'Udaipur', 'Maheshtala'
];

const HOTEL_TYPES = ['Hotels', 'Resorts', 'Apartments', 'Villas', 'Boutique', 'Palace'];
const DESCRIPTION_PREFIXES = [
  "Experience world-class luxury in the heart of", 
  "A perfect relaxing getaway situated beautifully in",
  "Charming and incredibly cozy stays right inside",
  "Unrivaled 5-star experience with stunning sunset views at",
  "Dive into premium hospitality designed exclusively for you in"
];
const FEATURES_SET = [
  ['Free WiFi', 'Swimming Pool', 'Spa & Wellness'],
  ['Free Breakfast', 'Restaurant', 'Airport Transfer'],
  ['Fitness Center', 'City View', 'Executive Lounge'],
  ['Private Pool', 'Ocean View', 'All Inclusive'],
  ['Boutique', 'Free WiFi', 'Pet Friendly']
];
const IMAGE_SETS = [
  [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 
    'https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  ],
  [
    'https://images.unsplash.com/photo-1542314831-c6a4d27488c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  ],
  [
    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1e5250adcd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  ],
  [
    'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  ],
  [
    'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1582610116397-edb318620f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  ]
];

export async function initDb() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    );
    CREATE TABLE IF NOT EXISTS hotels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      location TEXT,
      city TEXT,
      type TEXT,
      price INTEGER,
      rating REAL,
      reviews INTEGER,
      image TEXT,
      features TEXT,
      description TEXT,
      images TEXT
    );
    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      hotelId INTEGER,
      userId INTEGER,
      checkIn TEXT,
      checkOut TEXT,
      guests INTEGER,
      totalPrice INTEGER,
      status TEXT,
      FOREIGN KEY (hotelId) REFERENCES hotels(id),
      FOREIGN KEY (userId) REFERENCES users(id)
    );
  `);
  
  const hotelCount = await db.get('SELECT COUNT(*) as count FROM hotels');
  if (hotelCount.count === 0) {
    const stmt = await db.prepare(`INSERT INTO hotels (name, location, city, type, price, rating, reviews, image, features, description, images) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    
    // Generate exactly 8 hotels for all 100 cities
    for (const city of INDIAN_CITIES) {
      for (let i = 1; i <= 8; i++) {
        const type = HOTEL_TYPES[Math.floor(Math.random() * HOTEL_TYPES.length)];
        const nameOption = i === 1 ? 'Grand' : i === 2 ? 'Royal' : i === 3 ? 'Boutique' : i === 4 ? 'Palace of' : i === 5 ? 'Imperial' : i === 6 ? 'Central' : i === 7 ? 'Premium' : 'Elite';
        const name = `${nameOption} ${city} ${type}`;
        const location = `Downtown ${city}`;
        const price = Math.floor(Math.random() * 800) + 120; // 120 to 920
        const rating = (Math.random() * 1.5 + 3.5).toFixed(1); // 3.5 to 5.0
        const reviews = Math.floor(Math.random() * 3000) + 50; 
        const imageSet = IMAGE_SETS[i % IMAGE_SETS.length];
        const image = imageSet[0];
        const features = JSON.stringify(FEATURES_SET[Math.floor(Math.random() * FEATURES_SET.length)]);
        const description = `${DESCRIPTION_PREFIXES[Math.floor(Math.random() * DESCRIPTION_PREFIXES.length)]} ${city}. Enjoy premium amenities tailored strictly for luxury.`;
        const images = JSON.stringify(imageSet);

        await stmt.run([name, location, city, type, price, rating, reviews, image, features, description, images]);
      }
    }
    await stmt.finalize();
    console.log(`✅ DB Successfully seeded with 100 Indian Cities (800 Hotels)!`);
  }
}
