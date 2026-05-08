# LaxmiAuto Machine Repair - Full Stack Portal

This is a modern service booking portal for LaxmiAuto Machine Repair.

## 🚀 Live Deployment (One-Click)

To host this project for free, click the buttons below:

### 1. Deploy Backend (Render)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/kashamrokaya-cyber/Laxmiautomachine)

*   **Set Root Directory**: `backend`
*   **Environment Variables**:
    *   `MONGODB_URI`: Use your connection string from MongoDB Atlas.
    *   `JWT_SECRET`: Any random secret string.

### 2. Deploy Frontend (Vercel)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kashamrokaya-cyber/Laxmiautomachine&root-directory=frontend)

*   **Environment Variables**:
    *   `VITE_API_URL`: Use your new Render backend URL.

---

## Features
- **Modern Landing Page**: Built with React, Tailwind CSS, and Framer Motion.
- **Real-time Bookings**: Using Socket.io for instant admin notifications.
- **Admin Dashboard**: Secure management of service requests.
- **Archive System**: Move completed requests to history.
- **Permanent Deletion**: Clean up archived records.

## Local Development

### 1. Setup Backend
```bash
cd backend
npm install
node server.js
```

### 2. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```
