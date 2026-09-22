# Pearl Dental™ (DentistNew) — Comprehensive Platform Documentation

---

<!-- ========================================== PAGE 1 ========================================== -->
# PAGE 1: System Overview, Architecture & Core Features

## 1. Executive Summary & Brand Identity
**Pearl Dental™** (*Lumina Dental Studio*) is an enterprise-grade, luxury full-stack dental healthcare platform. It provides patients with a world-class digital experience — ranging from interactive cosmetic smile transformations and cost estimations to live waiting queue tracking and an accredited 5-step concierge appointment booking engine.

```
+---------------------------------------------------------------------------------------+
|                                    PEARL DENTAL PLATFORM                               |
+------------------------------------+--------------------------------------------------+
| Client Web Portal (Port 3000)      | Next.js 14 (App Router), Tailwind CSS, Framer   |
| API Backend & Admin (Port 5000)    | Express.js, Sequelize (MySQL) + In-Memory Fallback|
| Integrated Admin CMS (/admin)      | Static Next.js Export served from Backend         |
| Cloud Deployment                   | AWS EC2 (Ubuntu), PM2 Process Manager, SSL       |
+------------------------------------+--------------------------------------------------+
```

---

## 2. System Architecture & Directory Layout
The codebase is structured into three self-contained yet tightly integrated tiers:

```
DentistNew/
├── frontend/                     # Patient-Facing Next.js 14 Application (Port 3000)
│   ├── src/app/                  # App Router: Home, Appointment, Gallery, Dashboard, Login, Register
│   ├── src/components/           # Reusable UI: BeforeAfterSlider, LiveClinicQueue, CostEstimator, Navbar
│   ├── src/context/              # ThemeContext (Light/Dark Engine), AuthContext (JWT & 2FA State)
│   └── public/                   # Static clinical photography, badges, and transformation assets
│
├── backend/                      # Express.js REST API Server (Port 5000)
│   ├── config/db.js              # Resilient MySQL connection with automatic in-memory fallback
│   ├── controllers/              # Business logic: authController, appointmentController, queueController
│   ├── middleware/               # JWT Auth, Role-Based Access Control, Multer File Upload, Rate Limiting
│   ├── routes/                   # Clean REST routes: /api/auth, /api/appointments, /api/queue, etc.
│   └── uploads/                  # Secure storage for patient-submitted clinical X-rays and reports
│
├── admin/                        # Dedicated Admin Panel CMS
│   ├── src/app/                  # Admin routes: Appointments approval, Queue management, CMS editor
│   └── out/                      # Exported static build, served natively by Express at /admin
│
├── ecosystem.config.js           # PM2 multi-process configuration for 24/7 server uptime
├── start_app.bat                 # 1-Click local startup script for Windows developers
└── DOCUMENTATION.md              # Official technical documentation
```

---

## 3. Core Modules & Patient Experience

### A. Concierge 5-Step Booking Engine (`/appointment`)
A structured clinical booking stepper ensuring effortless scheduling:
1. **Specialist Selection**: Choose between Cosmetic Dentists, Implant Specialists, and Orthodontists.
2. **Procedure Customization**: High-contrast selectable treatment cards (Porcelain Veneers, 3D Implants, Invisalign).
3. **Date & Time Slot Picker**: Real-time calendar date picker with interactive time slot buttons.
4. **Patient Information & Encrypted Uploads**: Form for personal details, medical notes, and digital X-ray / CBCT scan attachments (`.pdf`, `.jpg`, `.png`).
5. **Real-time Status Tracking**: Instant confirmation screen directing patients to their authenticated portal.

### B. Interactive Before & After Smile Slider (`<BeforeAfterSlider />`)
- **Dual-Image Comparative Engine**: High-performance interactive slider overlay showing real dental treatment results.
- **Photorealistic Macro Clinical Photography**: 1:1 pixel-matched before & after clinical photography for **10 Upper Porcelain Veneers** and **Laser Teeth Whitening**.
- **Display Modes**: Toggleable between interactive drag slider mode and side-by-side comparative mode.

### C. Live Clinic Waiting Queue (`/queue` & `<LiveClinicQueue />`)
- **Real-Time Patient Tracker**: Auto-polling queue tracker displaying assigned queue tokens (e.g. `LUM-8821`), attending specialist, estimated wait times, and live status (`With Doctor`, `Next in Line`, `Waiting`).
- **Patient Privacy Shield**: Automatically masks patient names and displays anonymized IDs for HIPAA compliance.

### D. Intelligent AI Dental Assistant (`<AiAssistantModal />`)
- Floating digital concierge available on all pages.
- Provides immediate answers regarding treatment procedures, post-op recovery guidance, pricing estimates, and emergency triage.

### E. Dynamic Lighting & Accessibility Engine
- **Universal Dual Theme**: Tailored HSL color palette switching between ultra-crisp Light Mode (`bg-slate-50`, `#0f172a` typography) and luxury Dark Mode (`slate-900/90`, neon cyan accents).
- **Zero Legibility Drop**: All labels, form controls, and typography utilize strict high-contrast classes.

---

<!-- ========================================== PAGE 2 ========================================== -->
# PAGE 2: Technical Specifications, API Reference, Security & Deployment

## 1. REST API Specification

| HTTP Method | Endpoint | Access Level | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Registers a new patient account with encrypted password hashing |
| `POST` | `/api/auth/login` | Public | Authenticates credentials; returns JWT token and user profile |
| `POST` | `/api/auth/admin-login` | Staff / Admin | Authenticates Master Admin and Clinic staff into Admin CMS |
| `GET` | `/api/appointments/my` | Authenticated | Fetches appointment history and upcoming bookings for current patient |
| `POST` | `/api/appointments` | Public / Patient | Creates new appointment request with optional medical file attachment |
| `GET` | `/api/appointments/all` | Admin / Staff | Retrieves all clinic appointments for status approval or rescheduling |
| `PUT` | `/api/appointments/:id` | Admin / Staff | Updates booking status (`Pending`, `Confirmed`, `Completed`, `Cancelled`) |
| `GET` | `/api/queue` | Public | Returns real-time clinic waiting queue and consultation timeline |
| `GET` | `/api/health` | Public | Status probe verifying backend uptime and timestamp |

---

## 2. Security, Privacy & Fault Tolerance

```
[ Incoming Request ]
        |
        v
[ Next.js Rewrite (Port 3000) ] ---> Passes x-forwarded-for headers
        |
        v
[ Express.js Backend (Port 5000) ]
        |---> app.set('trust proxy', true) [Accurate Client IP Resolution]
        |---> Helmet.js [HTTP Header Security, XSS & Clickjacking Shield]
        |---> CORS [Configured origin headers]
        |---> Smart Rate Limiter [Exempts internal proxy, health checks & bookings]
        v
[ Database Handler (Sequelize) ]
        |---> Connection Check Success -> MySQL Database
        |---> Connection Failure       -> In-Memory Resilient Store (Zero Downtime)
```

1. **Smart Rate Limiting (`express-rate-limit`)**:
   - Proxy-aware client IP extraction using `app.set('trust proxy', true)`.
   - Explicit exclusion of internal proxy rewrites (`127.0.0.1`), health probes, patient bookings, and live queue polling to prevent accidental patient lockouts.
2. **Dual-Layer Database Resilience**:
   - The backend natively connects to MySQL via Sequelize.
   - If MySQL is stopped or undergoing maintenance, the backend automatically transitions to an in-memory data store with pre-seeded demo records, ensuring **100% continuous uptime**.
3. **Medical Data Encryption**:
   - File uploads are validated through Multer with strict MIME-type checking (`.pdf`, `.jpg`, `.jpeg`, `.png`).
   - Authentication is guarded by bcrypt password hashing (salt factor 10) and signed JWT tokens with 7-day expiration.

---

## 3. Server Operations & Production Deployment (AWS EC2)

### A. Process Architecture (PM2)
The production platform runs on AWS EC2 Ubuntu under PM2 supervision:
- **Process `0` (`dentist-backend`)**: Node.js API server on port `5000`. Also serves the compiled Admin CMS static export at `/admin`.
- **Process `1` (`dentist-frontend`)**: Next.js production server on port `3000`.

### B. Standard Update & Deployment Routine
When updates are committed to GitHub, execute the following commands in the server terminal:

```bash
# 1. Navigate to project root & pull latest source code
cd ~/DentistNew
git pull origin main

# 2. Rebuild the frontend application
cd frontend
npm run build

# 3. Restart processes via PM2
pm2 restart 1          # Reload frontend process
pm2 restart 0          # Reload backend process (clears rate limit counters & applies API updates)

# 4. Verify process health
pm2 status
```

### C. Admin CMS Access & Default Credentials
- **Live Admin Portal**: `http://<SERVER_IP>:5000/admin` *(or `http://<SERVER_IP>:3000/secret-admin`)*
- **Admin Email**: `admin@pearldental.com` *(or `admin@luminadental.com`)*
- **Admin Password**: `AdminPass123!` *(or `admin123password`)*
- **Patient Demo Login**: `patient@example.com` / `AdminPass123!`

---
*Documentation compiled & certified for Pearl Dental™ / DentistNew platform.*
