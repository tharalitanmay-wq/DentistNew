# Lumina Dental Studio — Luxury Full-Stack Dental Platform

A modern, luxury, full-stack Dental Studio web application built with Next.js, React, TypeScript, Node.js, Express, MySQL (Sequelize ORM), and animated using Framer Motion, GSAP, and React Bits components.

---

## 🌟 Key Features

- **Luxury Modern Aesthetic**: High-contrast light luxury theme, glassmorphism cards, glowing borders, custom magnetic cursor & micro-animations.
- **React Bits Integrations**:
  - `<GooeyNav />`: Desktop navigation bar with liquid active pill indicator & particle physics.
  - `<SpecularButton />`: Specular rim shine dynamic canvas buttons for CTAs.
  - `<PixelCard />`: Interactive HTML5 canvas pixel grid shimmer effect on dental treatment cards.
  - `<ModelViewer />`: Interactive 3D rotating metallic Stethoscope & Clinical equipment viewer powered by WebGL/Canvas 3D.
- **Interactive Dental Tools**:
  - **Before & After Smile Slider**: Interactive dual-handle image comparison slider.
  - **Treatment Cost Estimator**: Interactive calculator with insurance deduction and 0% APR financing breakout.
  - **AI Dental Assistant**: Floating AI concierge chatbot drawer for instant triage & Q&A.
  - **Google Reviews Widget**: 5.0★ verified patient rating showcase.
- **Full-Stack CMS Platform**:
  - **Client Application (`frontend/`)**: Next.js App Router client website.
  - **Backend Server (`backend/`)**: REST API server with MySQL (Sequelize), JWT authentication, Multer file uploads, rate limiting, and in-memory fallback mode.
  - **Admin Panel (`admin/`)**: Full CMS dashboard for managing appointments, doctors, services, blogs, and site settings.

---

## 🚀 Quick Start Guide

### ⚡ 1-Click Launch (Recommended for Windows)
Simply double-click [`start_app.bat`](file:///c:/Users/admin/tanmay/Dentistnew/start_app.bat) in the project root directory or run:
```cmd
.\start_app.bat
```
This automatically opens 3 separate terminal windows for Backend, Frontend, and Admin CMS.

---

### Manual Launch

#### 1. Database Setup (MySQL)
Ensure your MySQL server is running (e.g. via XAMPP, MySQL Workbench, Docker, or native service), then configure credentials in `backend/.env`:
```env
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=pearl_dental
```

#### 2. Backend Server (Port 5000)
```bash
cd backend
npm install

# (Optional) Seed initial data into MySQL database
npm run seed

# Run Backend
npm run dev
```

#### 3. Frontend Client App (Port 3000)
```bash
cd frontend
npm install
npm run dev
```

#### 4. Admin CMS Panel (Port 3001)
```bash
cd admin
npm install
npm run dev
```

---

## 📁 Project Structure

```
Dentistnew/
├── backend/            # Express REST API, MySQL (Sequelize) models & seed data
├── frontend/           # Next.js (App Router) luxury client application
├── admin/              # Next.js Admin Panel CMS
├── .gitignore          # Root Git ignore rule set
└── README.md           # Project documentation
```

