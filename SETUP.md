# E-commerce Application Setup Guide

## Quick Setup Instructions

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Install Frontend Dependencies
```bash
cd frontend
npm install
```

### Step 3: Run Backend Server (Terminal 1)
```bash
cd backend
npm run dev
```
Backend will run on: http://localhost:5000

### Step 4: Run Frontend Server (Terminal 2)
```bash
cd frontend
npm run dev
```
Frontend will run on: http://localhost:5173

## Note About Current Errors

The TypeScript errors you see are normal and will disappear after running `npm install` in the backend folder. These errors occur because:

1. `@nestjs/common` - Not installed yet
2. `@nestjs/mongoose` - Not installed yet
3. `mongoose` - Not installed yet
4. `bcryptjs` - Not installed yet

All these packages are listed in `package.json` and will be installed automatically.

## MongoDB Connection

Your MongoDB Atlas connection is already configured in `backend/.env`:
- Database: ecommerce
- Cluster: ecommerce.wxc67mj.mongodb.net

## Access Points

- **Home:** http://localhost:5173/
- **Products:** http://localhost:5173/products
- **Admin Panel:** http://localhost:5173/admin
- **Seller Panel:** http://localhost:5173/seller
- **Login:** http://localhost:5173/login

## Features

✅ Full CRUD operations
✅ Real-time updates (auto-refresh every 5 seconds)
✅ Dark mode support
✅ Admin & Seller dashboards
✅ Shopping cart
✅ User authentication
✅ MongoDB integration
