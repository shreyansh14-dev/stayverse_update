# 🏨 StayVerse | Hotel Administration Suite

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)

**StayVerse Admin** is a high-fidelity, full-stack management platform designed for luxury hospitality. It features a sleek glassmorphic dashboard, real-time AI-powered travel assistance, and a robust inventory management system.

![Hero Image](admin_dashboard_hero_1776392173297.png)

## ✨ Features

- **📊 Advanced Analytics:** Real-time visualization of booking trends, occupancy, and revenue.
- **🏨 Inventory Control:** Manage hotel availability, pricing, and amenities dynamically.
- **🤖 Gemini AI Integration:** Smart travel assistant for personalized guest recommendations.
- **🌑 Dark Luxury UI:** Premium glassmorphic interface inspired by modern luxury brands.
- **🚀 Full-Stack Sync:** Integrated Express backend with SQLite persistence for reliable data storage.

## 🛠️ Technology Stack

- **Frontend:** React 19, Vite, TailwindCSS (for styling), Lucide Icons.
- **Backend:** Node.js, Express.js.
- **Database:** SQLite3 (Server-side storage).
- **AI Engine:** Google Gemini Pro (@google/genai).
- **Tooling:** Concurrently, ESLint.

## 🏗️ Project Structure

```text
├── public/             # Static assets
├── server/             # Express.js backend & SQLite DB
│   ├── db.js           # Database initialization
│   └── index.js        # Main API & static server
├── src/                # React frontend components
│   ├── components/     # Reusable UI elements
│   ├── pages/          # Main dashboard views
│   └── util/           # Theme and constants
└── package.json        # Project manifest & scripts
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/hotel-admin-ui.git
   cd hotel-admin-ui
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   PORT=5000
   ```

4. **Run the application:**
   ```bash
   npm run dev
   ```

## 📦 Deployment

This project is optimized for deployment on **Render.com** or **Railway.app**.

1. Connect your GitHub repository to Render.
2. Set Environment Variables (`GEMINI_API_KEY`).
3. Set the Build Command: `npm install && npm run build`.
4. Set the Start Command: `npm start`.

## 📊 Languages & Statistics

![Language Breakdown](https://img.shields.io/badge/JavaScript-64.2%25-f7df1e)
![Language Breakdown](https://img.shields.io/badge/React/JSX-28.5%25-61dafb)
![Language Breakdown](https://img.shields.io/badge/CSS-5.3%25-1572b6)
![Language Breakdown](https://img.shields.io/badge/HTML-2.0%25-e34f26)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
Built with ❤️ by [Your Name]
