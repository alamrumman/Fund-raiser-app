# 🎯 FundRaiser – Smart Contribution Platform

A modern full-stack fundraising platform built with the **MERN Stack** that enables seamless digital contributions with secure payment integration, QR payments, redirect handling, and real-time status verification.

> 🚀 No manual record keeping
> 🚀 No Excel handling
> 🚀 No payment confusion
> 🚀 Fully automated tracking

---

## 📌 Features

### 💳 Smart Payment System

* UPI Intent (Paytm / GPay)
* QR Code payment option
* Payment Gateway Integration
* Auto redirect after payment
* Fallback **Check Status API** verification
* Secure webhook handling

### 📊 Admin Dashboard

* Real-time contribution tracking
* Year-wise filtering
* Detailed contributor records
* Export-ready structured data
* Payment status logs

### 🔐 Secure Architecture

* Backend payment verification
* Webhook validation
* Order ID persistence using URL search params
* Double-click prevention using `useRef` lock
* Secure redirect fallback routing

---

## 🛠️ Tech Stack

**Frontend**

* React.js
* Tailwind CSS
* Axios

**Backend**

* Node.js
* Express.js
* MongoDB (Mongoose)

**Payment**

* IMB Payment Gateway (or configurable)
* Webhooks
* Redirect URL handling
* Status Check API fallback

---

## 🧩 Payment Flow Architecture

```
User → Click Contribute → Fill Details → Create Order (Backend)
      ↓
Redirect to Payment Page
      ↓
User Pays via:
   - UPI Intent
   - QR Code
      ↓
Gateway Redirect
      ↓
Frontend verifies using:
   - Webhook confirmation
   - Check Status API fallback
      ↓
Payment Success / Failure Page
```

---

## 🔄 Contribution Flow

1. Click **Contribute Now**
2. Fill details (SD, SW, Name, Phone, Year)
3. Click **Contribute**
4. Redirected to secure payment page
5. Complete payment
6. Auto verification & confirmation

---

## 🗂️ Project Structure

```
client/
 ├── components/
 ├── pages/
 ├── utils/
 └── hooks/

server/
 ├── controllers/
 ├── routes/
 ├── models/
 ├── middleware/
 └── config/
```

---

## ⚙️ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/fundraiser-app.git
cd fundraiser-app
```

### 2️⃣ Backend Setup

```bash
cd server
npm install
npm start
```

Create `.env` file:

```
MONGO_URI=
PAYMENT_SECRET=
WEBHOOK_SECRET=
FRONTEND_URL=
```

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🔐 Environment Variables of Backend

| Variable       | Description                 |
| -------------- | -------------------------   |
| MONGO_URI      | MongoDB connection string   |
| PORT           | BY DEFAULT 5000             |
| IMB_USER_TOKEN | Used for connecting gateway |
| API_SECRET     | Cloudinary Api secret       |
| API_KEY        | Cloudinary API key          |
| CLOUD_NAME     | Cloudinary cloud name       |

---

## 📦 Future Improvements

* Razorpay / Cashfree support
* PDF receipt generation
* Email confirmation system
* Admin analytics dashboard
* Multi-event fundraising
* Role-based authentication

---

## 🧠 Architecture Highlights

* Secure direct payment verification
* URL param-based order tracking
* SPA-safe redirect routing
* Fallback status polling logic
* Production-ready scalable backend



## 👨‍💻 Author

**Md Rumman Alam**
Full Stack Developer

---

