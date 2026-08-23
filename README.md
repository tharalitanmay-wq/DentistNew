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

## 🚀 Quick Start Guide (2-Process Setup)

### ⚡ 1-Click Launch (Recommended for Windows)
Simply double-click [`start_app.bat`](file:///c:/Users/admin/tanmay/Dentistnew/start_app.bat) in the project root directory or run:
```cmd
.\start_app.bat
```
This automatically builds the Admin dashboard static export and starts the 2 processes:
- **Backend API & Admin CMS**: http://localhost:5000 (Admin at `http://localhost:5000/admin`)
- **Frontend Website**: http://localhost:3000

---

### Production PM2 Launch

#### Option A: Quick 1-Command PM2 Launch (Recommended)
```bash
# 1. Build Admin export inside admin/
cd admin && npm install && npm run build && cd ..

# 2. Build Frontend inside frontend/
cd frontend && npm install && npm run build && cd ..

# 3. Start both Backend & Frontend via PM2 ecosystem configuration
pm2 start ecosystem.config.js

# 4. Save PM2 configuration to survive server reboots
pm2 save
```

#### Option B: Manual PM2 Command Launch
```bash
# 1. Build Admin export inside admin/
cd admin && npm install && npm run build

# 2. Build Frontend inside frontend/
cd ../frontend && npm install && npm run build

# 3. Start Backend with PM2
cd ../backend
pm2 start server.js --name "backend"

# 4. Start Frontend with PM2
cd ../frontend
pm2 start npm --name "frontend" -- run start

# 5. Save PM2 configuration
pm2 save
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

