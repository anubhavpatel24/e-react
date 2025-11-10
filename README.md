# 🛍️ Full-Stack E-commerce Application

A complete e-commerce platform built with **NestJS**, **React**, **MongoDB**, and **Tailwind CSS**.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (already configured)

### Installation

**1. Install Backend Dependencies:**
```bash
cd backend
npm install
```

**2. Install Frontend Dependencies:**
```bash
cd frontend
npm install
```

### Running the Application

**Terminal 1 - Backend Server:**
```bash
cd backend
npm run dev
```
Server runs on: `http://localhost:5000`

**Terminal 2 - Frontend Server:**
```bash
cd frontend
npm run dev
```
App runs on: `http://localhost:5173`

## ✨ Features

### Customer Features
- 🛒 Product browsing with filters & search
- 🎨 Dark/Light mode toggle
- 🛍️ Shopping cart management
- 👤 User authentication
- 📱 Fully responsive design

### Admin Panel (`/admin`)
- 📊 Dashboard with real-time statistics
- 📦 Product management (CRUD)
- 👥 User management
- 📋 Order management
- ⚡ Auto-refresh every 5 seconds

### Seller Panel (`/seller`)
- 📊 Sales dashboard
- 📦 Product management
- 📋 Order tracking
- ⚡ Real-time updates

## 🛠️ Tech Stack

### Backend
- **NestJS** - Node.js framework
- **MongoDB** - Database (Atlas)
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React** - UI library
- **React Router** - Routing
- **React Query** - Data fetching & caching
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP client

## 📁 Project Structure

```
Ecommerce/
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── products/
│   │   │   ├── cart/
│   │   │   └── orders/
│   │   ├── common/
│   │   └── config/
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── utils/
│   └── package.json
└── README.md
```

## 🔐 Environment Variables

Backend `.env` is already configured with:
- MongoDB Atlas connection
- JWT secret
- CORS settings
- Port configuration

## 🌐 Access Points

- **Home:** http://localhost:5173/
- **Products:** http://localhost:5173/products
- **Cart:** http://localhost:5173/cart
- **Login:** http://localhost:5173/login
- **Register:** http://localhost:5173/register
- **Admin Panel:** http://localhost:5173/admin
- **Seller Panel:** http://localhost:5173/seller

## 🎯 Key Features

✅ **Real-time Updates** - Auto-refresh every 5 seconds  
✅ **Dark Mode** - Persistent theme switching  
✅ **Full CRUD** - Complete Create, Read, Update, Delete operations  
✅ **Responsive Design** - Works on all devices  
✅ **Secure Authentication** - JWT-based auth  
✅ **MongoDB Integration** - Cloud database ready  
✅ **Beautiful UI** - Modern design with animations  

## 📝 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create product (Auth required)
- `PUT /products/:id` - Update product (Auth required)
- `DELETE /products/:id` - Delete product (Auth required)

### Cart
- `GET /cart` - Get user cart
- `POST /cart/items` - Add item to cart
- `PUT /cart/items/:id` - Update cart item
- `DELETE /cart/items/:id` - Remove from cart

### Orders
- `GET /orders` - Get all orders
- `POST /orders` - Create order
- `PUT /orders/:id/status` - Update order status

## 🎨 Color Scheme

The app uses a red-based primary color scheme with full dark mode support:
- Primary: Red (#ef4444)
- Background Light: Gray 50
- Background Dark: Gray 900

## 🔧 Troubleshooting

**TypeScript Errors in IDE?**
- Run `npm install` in backend folder
- Errors will disappear once dependencies are installed

**MongoDB Connection Issues?**
- Check `.env` file has correct MongoDB URI
- Ensure MongoDB Atlas cluster is running

**Port Already in Use?**
- Change PORT in `backend/.env`
- Change port in `frontend/vite.config.js`

## 📄 License

MIT

## 👨‍💻 Author

Built with ❤️ using modern web technologies
