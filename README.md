# 🏨 StayVerse | Travel & Luxury Booking Platform

[![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)

**StayVerse** is a premium, full-stack travel platform designed for modern explorers. It features a robust **Java (Spring Boot) backend**, a responsive **Bootstrap 5 frontend**, and an integrated booking ecosystem for **Hotels, Flights, and Car Rentals**.

![Hero Image](hero.png)

## ✨ Core Features

-   **🌍 Unified Booking Ecosystem**: Seamlessly search and book Hotels, Flights, and Car Rentals in one interface.
-   **☕ Java Spring Boot Backend**: High-performance backend with JPA, SQLite persistence, and RESTful API architecture.
-   **🎨 Premium Bootstrap 5 UI**: Clean, bold, and professional design using the Bootstrap grid and component system.
-   **📊 Smart Dashboard**: Comprehensive "My Trips" overview with categorized trip management and real-time analytics.
-   **🇮🇳 Localized Experience**: All prices displayed in **INR (₹)** with Indian localized formatting.
-   **🤖 Gemini AI Integration**: Smart travel assistant for personalized itineraries and guest support.

## 🛠️ Technology Stack

-   **Backend:** Java 17, Spring Boot 3, Spring Data JPA, Maven.
*   **Database:** SQLite3 (Server-side persistence).
-   **Frontend:** React 19, Vite, **Bootstrap 5**, Lucide Icons.
-   **AI Engine:** Google Gemini Pro.

## 🏗️ Project Structure

```text
├── backend-java/       # Spring Boot Backend (Java)
│   ├── src/            # Controllers, Models, Repositories
│   └── pom.xml         # Maven dependencies
├── src/                # React Frontend (JavaScript)
│   ├── screens/        # Explore, Search Results, Booking Flow, Dashboard
│   ├── context/        # Global State Management
│   └── index.css       # Bold Design Tokens
├── server/             # Legacy Node.js backend (Optional)
├── database.sqlite     # Unified SQLite database
└── package.json        # Frontend manifest
```

## 🚀 Getting Started

### Prerequisites
-   [Java JDK 17+](https://www.oracle.com/java/technologies/downloads/)
-   [Node.js](https://nodejs.org/) (v16+)
-   [Maven](https://maven.apache.org/)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/shreyansh14-dev/stayverse.git
    cd stayverse
    ```

2.  **Start the Java Backend:**
    ```bash
    cd backend-java
    mvn spring-boot:run
    ```

3.  **Start the Frontend:**
    ```bash
    # From the root directory
    npm install
    npm run dev
    ```

## 📦 Deployment
This project is architected for deployment on platforms like **Render** or **Heroku**.
*   **Java Service**: Deploy the `backend-java` folder as a Web Service.
*   **Static Site**: Build the React app (`npm run build`) and host it.

---
Built with ❤️ by **StayVerse Development Team**
