<div align="center">

<!-- Animated Banner -->
<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:1a1a2e,50:16213e,100:0f3460&height=200&section=header&text=FundRaiser&fontSize=80&fontColor=e94560&animation=fadeIn&fontAlignY=38&desc=Smart%20Contribution%20Platform&descAlignY=60&descColor=a8b2d8"/>

<p>
  <img src="https://github.com/alamrumman/Fund-raiser-app/actions/workflows/ci.yml/badge.svg" alt="CI"/>
  <img src="https://img.shields.io/badge/Node.js-18-339933?style=flat&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/React-Vite-61DAFB?style=flat&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/license-ISC-blue?style=flat" alt="License"/>
</p>

<p>
  <a href="https://fund-raiser-app-1.onrender.com">
    <img src="https://img.shields.io/badge/🚀%20Live%20Demo-Visit%20App-e94560?style=for-the-badge&logo=render&logoColor=white" alt="Live Demo"/>
  </a>
</p>

<br/>

> **No spreadsheets. No confusion. No manual records.**
> Just seamless, automated digital contributions — powered by UPI and secured end-to-end.

<br/>

</div>

---

## 〔 What is FundRaiser? 〕

FundRaiser is a **production-grade, full-stack fundraising platform** built for real organizational use. It eliminates the chaos of manual payment tracking by connecting contributors directly to a payment gateway — automatically recording every transaction, verifying every payment, and surfacing everything in a live admin dashboard.

Built with the **MERN stack**, deployed on **Render**, and battle-tested with real payments.

---

## 〔 Features 〕

<table>
<tr>
<td width="50%">

### 💳 Smart Payment System
- UPI Intent via Paytm / GPay
- QR Code payment option
- Secure gateway integration
- Auto-redirect after payment
- Fallback **Check Status API** polling
- Webhook validation

</td>
<td width="50%">

### 📊 Admin Dashboard
- Real-time contribution tracking
- Year-wise filtering
- Detailed contributor records
- Export-ready structured data
- Payment status logs

> 🔐 Protected via **IMB merchant authentication** — only the authorized merchant account can access records.

</td>
</tr>
<tr>
<td width="50%">

### 🔐 Secure Architecture
- Backend-only payment verification
- Webhook signature validation
- Order ID persistence via URL params
- Double-click prevention with `useRef` lock
- Secure redirect fallback routing

</td>
<td width="50%">

### ⚙️ CI/CD Pipeline
- Automated tests on every push
- GitHub Actions workflow
- Deploy only when tests pass
- Render auto-deployment via webhook

</td>
</tr>
</table>

---

## 〔 Payment Flow 〕

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   User fills details → Backend creates order        │
│           ↓                                         │
│   Redirected to IMB Payment Page                    │
│           ↓                                         │
│   Pays via UPI Intent or QR Code                    │
│           ↓                                         │
│   ┌───────────────────┐                             │
│   │  Gateway Redirect │                             │
│   └────────┬──────────┘                             │
│            ↓                                        │
│   Frontend verifies via:                            │
│   • Webhook confirmation                            │
│   • Check Status API fallback                       │
│            ↓                                        │
│   ✅ Payment Confirmed & Recorded                   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 〔 Tech Stack 〕

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js · Tailwind CSS · Axios |
| **Backend** | Node.js · Express.js |
| **Database** | MongoDB · Mongoose |
| **Payment** | IMB Gateway · Webhooks · UPI |
| **Media** | Cloudinary |
| **DevOps** | GitHub Actions · Render |

---

## 〔 Project Structure 〕

```
Fund-raiser-app/
├── Client/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── Pages/            # Route-level pages
│   │   ├── utils/            # Helper functions
│   │   └── hooks/            # Custom React hooks
│   └── public/
│
└── Server/
    ├── Controllers/          # Business logic
    ├── Routes/               # API endpoints
    ├── Models/               # Mongoose schemas
    ├── Middleware/           # Auth, error handling
    ├── utils/                # Shared utilities
    └── tests/                # Jest unit tests
```

---

## 〔 Getting Started 〕

### Prerequisites
- Node.js v18+
- MongoDB instance
- IMB merchant account

### 1 · Clone

```bash
git clone https://github.com/alamrumman/Fund-raiser-app.git
cd Fund-raiser-app
```

### 2 · Backend

```bash
cd Server
npm install
```

Create `.env`:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
IMB_USER_TOKEN=your_imb_token
API_SECRET=your_cloudinary_secret
API_KEY=your_cloudinary_key
CLOUD_NAME=your_cloudinary_name
FRONTEND_URL=http://localhost:5173
```

```bash
npm run dev
```

### 3 · Frontend

```bash
cd Client
npm install
npm run dev
```

---

## 〔 Environment Variables 〕

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB connection string |
| `PORT` | Server port (default: 5000) |
| `IMB_USER_TOKEN` | IMB payment gateway token |
| `API_SECRET` | Cloudinary API secret |
| `API_KEY` | Cloudinary API key |
| `CLOUD_NAME` | Cloudinary cloud name |
| `FRONTEND_URL` | Allowed frontend origin |

---

## 〔 Running Tests 〕

```bash
cd Server
npm test
```

```
PASS  tests/amountMapping.test.js
  getAmountForYear
    ✓ first year should return 200
    ✓ second year should return 250
    ✓ third year should return 300
    ✓ invalid year should return null
    ✓ empty string should return null

Tests: 5 passed, 5 total
```

---

## 〔 Roadmap 〕

- [ ] Razorpay / Cashfree support
- [ ] PDF receipt generation
- [ ] Email confirmation system
- [ ] Enhanced analytics dashboard
- [ ] Multi-event fundraising
- [ ] Mobile app

---

<div align="center">

## 〔 Author 〕

**Md Rumman Alam**
Full Stack Developer

<br/>

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:1a1a2e,50:16213e,100:0f3460&height=100&section=footer"/>

</div>
