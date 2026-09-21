# ARCEN — Recruitment & Technology Showcase Platform

> High-performance, editorial-grade recruitment and deep-tech showcase web application for **ARCEN**. Built with **React 19**, **Vite 6**, **Tailwind CSS v4**, **Framer Motion 12**, and an **Express / Serverless** multi-recipient email engine.

---

## 📑 Table of Contents

1. [System Architecture](#-system-architecture)
2. [Tech Stack & Dependencies](#-tech-stack--dependencies)
3. [Quick Start & Local Setup](#-quick-start--local-setup)
4. [Environment Variables & Client Email Config](#-environment-variables--client-email-config)
5. [Project Directory & File Structure](#-project-directory--file-structure)
6. [Developer Guides: How to Update Content](#-developer-guides-how-to-update-content)
   - [Add or Edit Open Job Roles (Careers)](#1-add-or-edit-open-job-roles-careers)
   - [Add or Edit Showcase Projects](#2-add-or-edit-showcase-projects)
   - [Update Technology Domains](#3-update-technology-domains)
   - [Modify Hiring Process & Philosophy](#4-modify-hiring-process--philosophy)
   - [Modify Contact & Company Information](#5-modify-contact--company-information)
7. [API Specification & Endpoints](#-api-specification--endpoints)
8. [Motion & Design System Tokens](#-motion--design-system-tokens)
9. [Production Deployment Playbooks](#-production-deployment-playbooks)
   - [Option 1: All-in-One Vercel Deployment (Recommended)](#option-1-all-in-one-vercel-deployment-recommended)
   - [Option 2: Decoupled (Vercel Frontend + Railway/Render Backend)](#option-2-decoupled-vercel-frontend--railwayrender-backend)
   - [Option 3: Standalone VPS / Docker / PM2](#option-3-standalone-vps--docker--pm2)
   - [Custom Domain & DNS Setup](#custom-domain--dns-setup)
10. [Troubleshooting & FAQs](#-troubleshooting--faqs)

---

## 🏛️ System Architecture

```
[ Visitor / Candidate Browser ]
             │
             ├── Static Assets & Hydration (Port 3000 / Vercel CDN)
             │   └── React 19 + Framer Motion + Tailwind v4 Design System
             │
             └── API Requests (/api/apply, /api/contact)
                        │
       ┌────────────────┴────────────────┐
       ▼                                 ▼
[ Local / VPS Express ]         [ Vercel Serverless ]
  `server/index.js`               `api/index.js`
       │                                 │
       └────────────────┬────────────────┘
                        │
                        ▼
               Multer Memory Parser
          (Stream 5MB PDF directly in-memory)
                        │
                        ▼
             Nodemailer SMTP Dispatcher
                        │
       ┌────────────────┴────────────────┐
       ▼                                 ▼
Primary Recipient                 Backup Recipient
(e.g. recruitment@arcen.tech)     (Automatic fallback on error)
```

### Key Architectural Decisions
- **Zero Disk Writes**: Resumes are received and buffered in-memory using `multer.memoryStorage()`. No temporary disk files are created, making it 100% serverless-safe (e.g. AWS Lambda / Vercel Functions).
- **Dual Backend Support**:
  - `server/index.js`: Standalone Node.js Express server for local development, VPS, Docker, or platforms like Railway/Render.
  - `api/index.js` + `vercel.json`: Built-in serverless rewrite allowing the entire app (Frontend + Backend API) to run inside a **single Vercel deployment** without needing a second hosting service.
- **Fail-Safe Email Dispatch**: Form submissions attempt delivery to `PRIMARY_EMAIL`. If delivery fails, it triggers an automatic fallback to `BACKUP_EMAIL`. If SMTP credentials are missing (e.g., in local dev), submissions are logged to the console so no developer is blocked.

---

## 💻 Tech Stack & Dependencies

### Frontend
| Package | Version | Purpose |
| :--- | :--- | :--- |
| **React** | `^19.0.0` | UI component library with concurrent rendering |
| **Vite** | `^6.1.0` | Next-generation frontend build tool and dev server |
| **Tailwind CSS** | `^4.0.7` | Modern CSS framework using `@tailwindcss/vite` |
| **Framer Motion** | `^12.4.7` | Smooth editorial scroll & enter animations |
| **Lucide React** | `^0.475.0` | Lightweight technical and UI icons |

### Backend & Tooling
| Package | Version | Purpose |
| :--- | :--- | :--- |
| **Node.js** | `>= 18.0.0` | Runtime environment (ES Modules enabled via `"type": "module"`) |
| **Express** | `^4.21.2` | REST API framework for form processing |
| **Nodemailer** | `^6.10.0` | SMTP client for HTML & attachment email delivery |
| **Multer** | `^2.4.0` | Multi-part form handler for PDF resume uploads |
| **Dotenv** | `^16.4.7` | Environment configuration manager |
| **CORS** | `^2.8.5` | Cross-Origin Resource Sharing middleware |

---

## 🚀 Quick Start & Local Setup

### 1. Prerequisites
- **Node.js**: `v18.0.0` or higher ([Download Node.js](https://nodejs.org/))
- **npm**: `v9.0.0` or higher (bundled with Node)

Verify your local installation:
```bash
node -v
npm -v
```

### 2. Clone and Install
```bash
git clone <repository-url>
cd arcen-website
npm install
```

### 3. Configure Environment Variables
Copy the template to create your local `.env`:
```bash
cp .env.example .env
```
*(On Windows PowerShell: `Copy-Item .env.example .env`)*

### 4. Running the Development Environment

You can run both frontend and backend concurrently in two separate terminal windows:

#### Terminal 1 — Backend Server (Port 5000):
```bash
npm run server
```
*Console output:*
```
🚀 ARCEN Backend Server running on http://localhost:5000
📧 Target Emails -> Primary: recruitment@arcen.tech | Backup: backup-recruitment@arcen.tech
```

#### Terminal 2 — Frontend Dev Server (Port 3000):
```bash
npm run dev
```
*Console output:*
```
  VITE v6.1.0  ready in 240 ms
  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

Open your browser at **`http://localhost:3000`**.

> **Note**: Vite is configured in `vite.config.js` to automatically proxy all `/api` requests to `http://localhost:5000`. You do not need to configure custom API domains for local work.

---

## 📧 Environment Variables & Client Email Config

All email addresses and SMTP credentials are fully isolated in `.env`. **You never need to edit source code to update emails or credentials.**

### Environment Variables Reference Table

| Variable | Required | Default / Example | Description |
| :--- | :---: | :--- | :--- |
| `PORT` | No | `5000` | Port for the standalone Express backend server. |
| `PRIMARY_EMAIL` | **Yes** | `recruitment@arcen.tech` | Primary inbox where all applications and contact messages are sent. |
| `BACKUP_EMAIL` | No | `backup-recruitment@arcen.tech` | Secondary fallback email in case primary delivery fails. |
| `SMTP_HOST` | No* | `smtp.gmail.com` | SMTP host for sending emails (Gmail, SendGrid, etc.). |
| `SMTP_PORT` | No* | `587` | SMTP port (`587` for TLS, `465` for SSL). |
| `SMTP_SECURE` | No* | `false` | Set to `true` if using port 465; `false` if using 587. |
| `SMTP_USER` | No* | `your-company@gmail.com` | Email account username used to authenticate SMTP. |
| `SMTP_PASS` | No* | `your-16-char-app-password` | App Password or API Key for your SMTP account. |
| `VITE_API_BASE_URL`| No | `""` (empty) | Only needed if hosting frontend on a completely separate domain from backend. |

*\* If SMTP credentials are empty or omitted, the application runs in **Dev Mode**: form submissions are safely accepted, logged with full detail to the terminal, and return a successful JSON response to the user.*

---

### Step-by-Step Guide: Setting Up Live Gmail Delivery

To enable real email delivery using a standard Gmail or Google Workspace account:

1. **Enable 2-Step Verification**:
   - Go to [Google Account Security](https://myaccount.google.com/security).
   - Ensure **2-Step Verification** is switched **ON**.

2. **Generate an App Password**:
   - Visit [Google App Passwords](https://myaccount.google.com/apppasswords).
   - Type `ARCEN Website` as the app name and click **Create**.
   - Google will generate a 16-character code (e.g. `abcd efgh ijkl mnop`).

3. **Update `.env`**:
   ```env
   PRIMARY_EMAIL=recruitment@arcen.tech
   BACKUP_EMAIL=backup-recruitment@arcen.tech
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-company@gmail.com
   SMTP_PASS=abcdefghijklmnop
   ```

4. **Restart Backend**:
   Restart the backend server (`npm run server`) to load the new credentials.

---

## 📂 Project Directory & File Structure

```
arcen-website/
├── api/
│   └── index.js                 # Vercel Serverless Function entry point (/api/*)
├── public/
│   ├── favicon.svg              # Browser favicon
│   └── robots.txt               # Search engine crawlers configuration
├── server/
│   └── index.js                 # Standalone Express Server with Multer & Nodemailer
├── src/
│   ├── components/
│   │   ├── motion/              # Motion Design System (Reusable animation wrappers)
│   │   │   ├── AnimatedButton.jsx   # Micro-interaction button with magnetic feel
│   │   │   ├── LineReveal.jsx       # Animated dividing rule
│   │   │   ├── NumberCounter.jsx    # Smooth viewport-triggered numeric counter
│   │   │   ├── Reveal.jsx           # Spring-based scroll-in element wrapper
│   │   │   ├── SectionHeader.jsx    # Standardized editorial section header
│   │   │   ├── StaggerReveal.jsx    # Orchestrated parent/child stagger container
│   │   │   └── index.js             # Motion components barrel export
│   │   │
│   │   ├── AboutArcen.jsx           # 5-step process visual (Understand -> Explore -> Build...)
│   │   ├── ApplicationFormModal.jsx # Multi-field application modal with PDF drag & drop
│   │   ├── Careers.jsx              # Open opportunities list with direct apply triggers
│   │   ├── ContactSection.jsx       # Contact inquiries form & direct coordinates
│   │   ├── Footer.jsx               # Footer navigation, branding, copyright
│   │   ├── Hero.jsx                 # Editorial headline & interactive 3D particle matrix
│   │   ├── HowWeThink.jsx           # Engineering principles & core philosophy pillars
│   │   ├── Intro.jsx                # High-impact studio mission statement
│   │   ├── LifeAtArcen.jsx          # Studio culture, autonomy, and environment
│   │   ├── LoadingScreen.jsx        # First-load branded cinematic loading sequence
│   │   ├── Navbar.jsx               # Floating header with mobile navigation drawer
│   │   ├── Projects.jsx             # Technical showcase with interactive case-study modal
│   │   ├── RecruitmentProcess.jsx   # 01-05 timeline steps for applicants
│   │   ├── TechnologyDomains.jsx    # 7 Core technical engineering domains
│   │   └── WhoWeAreLookingFor.jsx   # Candidate traits & expectations
│   │
│   ├── App.jsx                  # Main application composition & modal state
│   ├── index.css                # CSS variables, typography, and Tailwind v4 config
│   └── main.jsx                 # React root initialization
│
├── .env                         # Active local environment variables (ignored by git)
├── .env.example                 # Checked-in template for environment variables
├── index.html                   # HTML entry point with Space Grotesk, DM Mono, Inter
├── package.json                 # Dependencies and build scripts
├── vercel.json                  # Vercel serverless routing rewrite rules
└── vite.config.js               # Vite configuration and /api proxy configuration
```

---

## 🛠️ Developer Guides: How to Update Content

### 1. Add or Edit Open Job Roles (Careers)

File: `src/components/Careers.jsx`

All career postings are defined in the `opportunities` array near the top of the file:

```javascript
const opportunities = [
  {
    num: '01',
    role: 'Backend Engineering',
    tags: 'Software · APIs · Systems · Distributed Databases',
    area: 'Backend Engineering' // Must match options in ApplicationFormModal
  },
  {
    num: '08', // Next number
    role: 'Embedded Firmware Engineer',
    tags: 'C/C++ · RTOS · STM32 · Hardware Interfaces · Low Power',
    area: 'Embedded Systems'
  }
];
```

> **Important**: When adding a new `area`, also add it to the `<select>` options in `src/components/ApplicationFormModal.jsx` so applicants can pick it from the dropdown.

---

### 2. Add or Edit Showcase Projects

File: `src/components/Projects.jsx`

Each project card supports an interactive slide-over modal detailing the engineering problem, approach, and outcome:

```javascript
{
  num: '03',
  code: 'SYS-ROBO-03',
  name: 'Autonomous Mobile Robot Fleet Coordination',
  domain: 'Robotics & Control Systems',
  icon: Cpu, // Imported from 'lucide-react'
  image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
  focus: 'Fleet path planning and collision avoidance across warehouse facilities.',
  expertise: 'ROS2, SLAM, sensor fusion, decentralized control topologies.',
  technology: ['ROS2', 'C++', 'Python', 'WebRTC', 'Nav2'],
  application: 'Automated material transport and high-density sorting logistics.'
}
```

---

### 3. Update Technology Domains

File: `src/components/TechnologyDomains.jsx`

Modify the `domains` array. Each domain contains:
- `num`: Two-digit string (e.g. `'01'`)
- `title`: Domain title
- `icon`: Lucide icon component
- `tagline`: Editorial description
- `focus`: Array of 4–5 bullet points
- `svg`: Custom vector badge

---

### 4. Modify Hiring Process & Philosophy

- **5-Step Hiring Workflow**: Edit `steps` array in `src/components/RecruitmentProcess.jsx`.
- **Core Principles & Pillars**: Edit `pillars` array in `src/components/HowWeThink.jsx`.
- **Engineering Process**: Edit steps in `src/components/AboutArcen.jsx`.
- **Candidate Expectations**: Edit cards in `src/components/WhoWeAreLookingFor.jsx`.
- **Culture & Workplace**: Edit cards in `src/components/LifeAtArcen.jsx`.

---

### 5. Modify Contact & Company Information

- **Footer Links & Copyright**: `src/components/Footer.jsx`.
- **Contact Details & Office Location**: `src/components/ContactSection.jsx`.

---

## 📡 API Specification & Endpoints

### 1. Health Check
`GET /api/health`
- **Purpose**: Verify backend uptime and check active target email addresses.
- **Response**:
  ```json
  {
    "status": "ok",
    "primaryEmail": "recruitment@arcen.tech",
    "backupEmail": "backup-recruitment@arcen.tech"
  }
  ```

---

### 2. Candidate Application
`POST /api/apply`
- **Content-Type**: `multipart/form-data`
- **Payload Fields**:
  - `name` *(string, required)*: Candidate's full name.
  - `email` *(string, required)*: Candidate's contact email.
  - `phone` *(string, optional)*: Phone number.
  - `interest` *(string, required)*: Primary engineering domain.
  - `about` *(string, optional)*: Self-description.
  - `whatBuilt` *(string, optional)*: Showcase of projects built.
  - `portfolio` *(string, optional)*: Link to GitHub / Portfolio.
  - `resume` *(file, optional)*: Resume file (PDF only, max 5 MB).
- **Responses**:
  - `200 OK`: `{"success": true, "message": "Application received successfully!"}`
  - `400 Bad Request`: `{"error": "Name, Email, and Area of Interest are required."}` or `{"error": "File size limit exceeded. Maximum file size is 5 MB."}`
  - `500 Internal Error`: `{"error": "Server error processing application."}`

#### Test with cURL:
```bash
curl -X POST http://localhost:5000/api/apply \
  -F "name=Jane Doe" \
  -F "email=jane@example.com" \
  -F "interest=Backend Engineering" \
  -F "whatBuilt=Built high throughput event bus in Go" \
  -F "resume=@/path/to/resume.pdf"
```

---

### 3. Contact Inquiries
`POST /api/contact`
- **Content-Type**: `application/json`
- **Payload Schema**:
  ```json
  {
    "name": "Alex Mercer",
    "email": "alex@example.com",
    "subject": "Studio Partnership Inquiry",
    "message": "We would like to discuss a computer vision collaboration."
  }
  ```
- **Responses**:
  - `200 OK`: `{"success": true, "message": "Thank you for contacting ARCEN!"}`
  - `400 Bad Request`: `{"error": "Name, Email, and Message are required fields."}`
  - `500 Internal Error`: `{"error": "Server error sending message."}`

---

## 🎨 Motion & Design System Tokens

The design follows a minimalist, high-contrast, editorial engineering aesthetic.

### Color Tokens (Defined in `src/index.css`)
| Variable | Value | Usage |
| :--- | :--- | :--- |
| `--bg-primary` | `#F2EFE6` | Main page background (warm ivory / off-white) |
| `--text-primary` | `#11120F` | Main typography & high-contrast borders |
| `--text-secondary`| `#77766F` | Subtitles, labels, and secondary body copy |
| `--accent-coral` | `#D85B46` | Accent highlights, buttons, badges, active states |
| `--bg-dark` | `#171916` | Dark theme sections (Recruitment Process) |
| `--border-subtle`| `rgba(17, 18, 15, 0.14)` | Hairline dividers and grid lines |

### Typography
- **Headings & Display**: `Space Grotesk`, sans-serif (`font-display`)
- **Technical Numerals & Meta**: `DM Mono`, monospace (`font-mono`)
- **Body & Long Copy**: `Inter`, sans-serif

### Reusable Motion Components (`src/components/motion/`)
- `<Reveal direction="up|down|left|right" delay={0.1}>`: Scroll-triggered reveal with smooth cubic-bezier easing.
- `<StaggerContainer stagger={0.08}>` + `<StaggerItem>`: Cascading entry for lists and cards.
- `<LineReveal>`: Elegant expanding horizontal rule.
- `<NumberCounter target={99} prefix="" suffix="%" />`: Animated numeric tally.
- `<AnimatedButton variant="primary|dark|ghost">`: Magnetic hover interaction button.
- `<SectionHeader number="01" label="PROCESS" title="..." />`: Standardized section title.

> **Accessibility**: All motion components automatically detect user OS preference for reduced motion via `useReducedMotion()`. When enabled, slide animations are replaced with gentle opacity transitions.

---

## 🚢 Production Deployment Playbooks

### Option 1: All-in-One Vercel Deployment (Recommended)

Thanks to `vercel.json` and `api/index.js`, you can deploy the complete frontend and backend to Vercel with zero extra server setup:

1. Push your repository to **GitHub / GitLab / Bitbucket**.
2. Go to [Vercel Dashboard](https://vercel.com/new) and **Import Project**.
3. Configure Build Settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add **Environment Variables** in the Vercel project settings:
   - `PRIMARY_EMAIL`: Target recipient inbox (e.g. `recruitment@arcen.tech`)
   - `BACKUP_EMAIL`: Target fallback inbox (e.g. `backup-recruitment@arcen.tech`)
   - `SMTP_HOST`: `smtp.gmail.com`
   - `SMTP_PORT`: `587`
   - `SMTP_SECURE`: `false`
   - `SMTP_USER`: Official sending email account
   - `SMTP_PASS`: 16-character Google App Password
5. Click **Deploy**. Vercel will build the frontend and deploy `api/index.js` as a serverless endpoint.

---

### Option 2: Decoupled (Vercel Frontend + Railway/Render Backend)

If you prefer hosting the Express backend on a dedicated Node service:

1. **Deploy Backend (Railway or Render)**:
   - Point Railway/Render to this repository.
   - Start Command: `node server/index.js`
   - Add `.env` variables in the Railway/Render dashboard.
   - Note your live backend URL (e.g. `https://arcen-api.up.railway.app`).
2. **Deploy Frontend (Vercel)**:
   - In Vercel Project Settings -> Environment Variables, add:
     ```
     VITE_API_BASE_URL=https://arcen-api.up.railway.app
     ```
   - Re-deploy the frontend. The frontend will now direct all `/api/*` calls to your standalone backend.

---

### Option 3: Standalone VPS / Docker / PM2

For deployment on an Ubuntu VPS, AWS EC2, or DigitalOcean Droplet:

1. **Build Frontend**:
   ```bash
   npm run build
   ```
2. **Run Backend with PM2**:
   ```bash
   npm install -g pm2
   pm2 start server/index.js --name arcen-backend
   pm2 save
   pm2 startup
   ```
3. **Nginx Reverse Proxy Configuration**:
   ```nginx
   server {
       listen 80;
       server_name arcen.tech www.arcen.tech;

       # Serve compiled frontend
       location / {
           root /var/www/arcen-website/dist;
           try_files $uri $uri/ /index.html;
       }

       # Proxy API requests to Express server
       location /api/ {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

### Custom Domain & DNS Setup

To link a custom domain (e.g. `arcen.tech`):

1. **In Vercel Domain Settings**:
   - Add domain: `arcen.tech` and `www.arcen.tech`.
2. **At your Domain Registrar (GoDaddy / Namecheap / Cloudflare)**:
   - **Root Domain (`@`)**: Add an **A Record** pointing to `76.76.21.21` (Vercel IP).
   - **Subdomain (`www`)**: Add a **CNAME Record** pointing to `cname.vercel-dns.com`.
3. Vercel automatically generates and renews free Let's Encrypt SSL certificates.

---

## ❓ Troubleshooting & FAQs

### 1. Form submissions return success, but no emails arrive in the inbox
- **Cause**: The server is likely running in **Dev Mode** because `SMTP_USER` and `SMTP_PASS` are not set in `.env`.
- **Solution**: Check the backend terminal console. If it says `SMTP credentials not set in .env. Form submission logged above`, follow the [Gmail SMTP setup guide](#step-by-step-guide-setting-up-live-gmail-delivery).
- **If credentials ARE set**: Ensure you used a Google **App Password**, not your normal Google login password. Verify `PRIMARY_EMAIL` spam / junk folder.

### 2. File upload error: "File size limit exceeded"
- Multer is configured to enforce a **5 MB** ceiling (`5 * 1024 * 1024` bytes) in `server/index.js` and `api/index.js`.
- If larger files must be allowed, edit the `limits.fileSize` property in `server/index.js` and `api/index.js`.

### 3. "Port 5000 is already in use"
- On macOS, AirPlay Receiver uses port 5000 by default (turn off in System Settings -> Sharing -> AirPlay Receiver).
- Alternatively, change `PORT=5001` in your `.env` file and update the proxy target in `vite.config.js`.

### 4. CORS errors during local development
- Ensure you access the frontend via `http://localhost:3000` rather than `http://127.0.0.1:3000` so that the Vite dev proxy correctly maps `/api` requests to backend port `5000`.

---

## 👨‍💻 Maintenance & Contribution Checklist

Before committing or pushing any new code:

- [ ] Check console for React rendering errors or unhandled promises (`F12`).
- [ ] Ensure PDF upload size limits and mime-type filters are preserved.
- [ ] If adding new job roles or technical domains, verify tags fit cleanly on mobile viewports (`375px` - `414px`).
- [ ] Keep `.env` out of version control (`.gitignore` must contain `.env`).
- [ ] Run `npm run build` locally to verify that Vite bundles without syntax or import errors.

---

*ARCEN Technology Platform — Maintained for engineering excellence and seamless client handovers.*
