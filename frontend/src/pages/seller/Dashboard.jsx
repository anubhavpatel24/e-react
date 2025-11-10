import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag } from 'lucide-react';
import SellerOverview from './SellerOverview';
import SellerProducts from './SellerProducts';
import SellerOrders from './SellerOrders';

const Dashboard = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { path: '/seller', icon: LayoutDashboard, label: 'Overview', exact: true },
    { path: '/seller/products', icon: Package, label: 'My Products' },
    { path: '/seller/orders', icon: ShoppingBag, label: 'Orders' },
  ];

  const isActive = (path, exact) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white dark:bg-gray-800 min-h-screen transition-all duration-300 border-r border-gray-200 dark:border-gray-700`}>
          <div className="p-6">
            <h2 className={`font-bold text-xl text-gray-900 dark:text-white ${!isSidebarOpen && 'hidden'}`}>
              Seller Panel
            </h2>
            {!isSidebarOpen && <Package className="text-primary-500" size={24} />}
          </div>

          <nav className="mt-6">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-6 py-3 transition-colors ${
                  isActive(item.path, item.exact)
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border-r-4 border-primary-600'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon size={20} />
                {isSidebarOpen && <span className="font-medium">{item.label}</span>}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<SellerOverview />} />
            <Route path="/products" element={<SellerProducts />} />
            <Route path="/orders" element={<SellerOrders />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
