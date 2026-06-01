# Pizza Palace

A full-stack online food ordering platform built with the **MERN stack** (MongoDB, Express.js, React, Node.js) per the SRS v1.0 specification.

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React, Tailwind CSS, React Router, Context API, Framer Motion |
| Backend  | Node.js, Express.js, JWT, bcryptjs  |
| Database | MongoDB + Mongoose                  |

## Features

- JWT authentication with role-based access (customer / admin)
- Pizza catalogue with category filter and search
- Shopping cart with localStorage persistence
- Order placement and status tracking
- Admin dashboard — pizza CRUD, order management
- Responsive UI with toast notifications and skeleton loaders

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run seed    # seeds pizzas + admin user
npm run dev     # http://localhost:5000
```

**Default admin:** `admin@pizzapalace.com` / `admin123`

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev     # http://localhost:5173
```

## API Base URL

```
http://localhost:5000/api
```

Auth header: `Authorization: Bearer <token>`

## Project Structure

```
Pizza Palace/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── seed.js
└── frontend/
    └── src/
        ├── api/
        ├── components/
        ├── context/
        └── pages/
```

## Deployment (Live URL)

Deploy stack: **Vercel** (frontend) + **Render** (backend) + **MongoDB Atlas** (database).

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Pizza Palace MERN project"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/pizza-palace.git
git push -u origin main
```

### Step 2 — MongoDB Atlas (free)

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas) → create free **M0** cluster
2. **Database Access** → Add user (username + password)
3. **Network Access** → Add IP → **Allow Access from Anywhere** (`0.0.0.0/0`)
4. **Connect** → Drivers → copy connection string:
   ```
   mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/pizza-palace?retryWrites=true&w=majority
   ```

**Seed the cloud database** (run once on your PC):

```bash
cd backend
# Temporarily set MONGO_URI in .env to your Atlas URL, then:
npm run seed
```

Admin login after seed: `admin@pizzapalace.com` / `admin123`

### Step 3 — Render (backend)

1. [render.com](https://render.com) → **New +** → **Web Service**
2. Connect your GitHub repo
3. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Health Check Path:** `/api/health`
4. **Environment Variables:**

   | Key | Value |
   |-----|-------|
   | `MONGO_URI` | Your Atlas connection string |
   | `JWT_SECRET` | Long random string (32+ chars) |
   | `NODE_ENV` | `production` |
   | `CLIENT_URL` | `http://localhost:5173` *(update after Vercel deploy)* |

5. Deploy → copy your URL, e.g. `https://pizza-palace-api.onrender.com`
6. Test: open `https://YOUR-API.onrender.com/api/health`

> Render free tier sleeps after 15 min idle — first request may take ~30 seconds.

Or use the included `render.yaml` blueprint: **New +** → **Blueprint** → select repo.

### Step 4 — Vercel (frontend)

1. [vercel.com](https://vercel.com) → **Add New Project** → import GitHub repo
2. Settings:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. **Environment Variable:**

   | Key | Value |
   |-----|-------|
   | `VITE_API_URL` | `https://YOUR-API.onrender.com/api` |

4. Deploy → copy URL, e.g. `https://pizza-palace.vercel.app`

### Step 5 — Connect frontend ↔ backend

Go back to **Render** → your service → **Environment** → update:

```
CLIENT_URL=https://pizza-palace.vercel.app,http://localhost:5173
```

Save → Render redeploys automatically.

### Step 6 — Verify

1. Open your Vercel URL
2. Register / login
3. Browse menu → add to cart → checkout → place order
4. Check **My Orders** for live tracking

### Optional — Razorpay (live payments)

Add to Render env vars:
```
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=your_secret
```

Without keys, demo payment mode works automatically.

## Deployment Targets (SRS)

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## License

Student academic project — 2026
