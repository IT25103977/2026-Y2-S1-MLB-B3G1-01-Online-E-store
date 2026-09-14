import React, { useState, useEffect, useMemo } from 'react';

// Daraz-inspired Category List with icons and descriptions
const INITIAL_CATEGORIES = [
  { id: 'all', name: 'All Categories', icon: '🛍️', bg: 'bg-orange-50 text-orange-600', description: 'Browse our complete catalog of top-rated products across all departments.' },
  { id: 'mobiles', name: 'Mobiles & Tablets', icon: '📱', bg: 'bg-blue-50 text-blue-600', description: 'Latest flagship smartphones, tablets, mobile power accessories, and devices.' },
  { id: 'laptops', name: 'Laptops & Computers', icon: '💻', bg: 'bg-indigo-50 text-indigo-600', description: 'High performance gaming notebooks, ultrabooks, monitors, and work essentials.' },
  { id: 'electronics', name: 'TV & Home Appliances', icon: '📺', bg: 'bg-purple-50 text-purple-600', description: 'Smart 4K OLED TVs, home audio, power banks, and modern home entertainment.' },
  { id: 'fashion', name: 'Fashion & Beauty', icon: '👗', bg: 'bg-pink-50 text-pink-600', description: 'Apparel, organic cotton streetwear, dermatologist skincare, and beauty care.' },
  { id: 'gadgets', name: 'Audio & Wearables', icon: '🎧', bg: 'bg-amber-50 text-amber-600', description: 'Industry leading noise cancelling headphones, smartwatches, and wireless earbuds.' },
  { id: 'lifestyle', name: 'Sports & Outdoor', icon: '⚽', bg: 'bg-emerald-50 text-emerald-600', description: 'Fitness gear, athletic wear, outdoor sports equipment, and activewear accessories.' }
];

// Product Dataset with Daraz-like attributes (Flash Sales, Express Shipping, Rating, Stock)
const INITIAL_PRODUCTS = [
  {
    id: 'PROD-101',
    name: 'Apple iPhone 15 Pro Max 256GB Natural Titanium',
    category: 'mobiles',
    price: 1199.00,
    originalPrice: 1399.00,
    discountPercent: 14,
    rating: 4.9,
    reviewsCount: 328,
    stock: 18,
    soldCount: 82,
    minStockThreshold: 10,
    isFlashSale: true,
    isExpress: true,
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=60',
    description: 'Flagship smartphone featuring Titanium build, A17 Pro Chip, 48MP main camera, and USB-C port.',
    sku: 'SE-APL-15PM'
  },
  {
    id: 'PROD-101B',
    name: 'Samsung Galaxy S24 Ultra 512GB Titanium Gray',
    category: 'mobiles',
    price: 1299.00,
    originalPrice: 1419.00,
    discountPercent: 8,
    rating: 4.8,
    reviewsCount: 215,
    stock: 12,
    soldCount: 64,
    minStockThreshold: 5,
    isFlashSale: false,
    isExpress: true,
    brand: 'Samsung',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop&q=60',
    description: 'Galaxy AI powered smartphone with built-in S Pen, 200MP camera system, and Snapdragon 8 Gen 3.',
    sku: 'SE-SAM-S24U'
  },
  {
    id: 'PROD-102',
    name: 'ASUS ROG Strix G16 Gaming Laptop 16" 165Hz i7-13650HX',
    category: 'laptops',
    price: 1449.00,
    originalPrice: 1699.00,
    discountPercent: 15,
    rating: 4.8,
    reviewsCount: 145,
    stock: 6,
    soldCount: 44,
    minStockThreshold: 10,
    isFlashSale: true,
    isExpress: true,
    brand: 'ASUS',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60',
    description: 'High performance gaming notebook with RTX 4060 GPU, 16GB DDR5 RAM, and ROG Intelligent Cooling.',
    sku: 'SE-ASU-G16'
  },
  {
    id: 'PROD-102B',
    name: 'Apple MacBook Pro 14" M3 Pro 18GB RAM 512GB SSD',
    category: 'laptops',
    price: 1899.00,
    originalPrice: 1999.00,
    discountPercent: 5,
    rating: 4.9,
    reviewsCount: 188,
    stock: 9,
    soldCount: 38,
    minStockThreshold: 4,
    isFlashSale: false,
    isExpress: true,
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60',
    description: 'Blazing fast Liquid Retina XDR display, M3 Pro chip with 12-core CPU, 18-core GPU and 18hr battery.',
    sku: 'SE-APL-MBP14'
  },
  {
    id: 'PROD-103',
    name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
    category: 'gadgets',
    price: 299.00,
    originalPrice: 399.00,
    discountPercent: 25,
    rating: 4.7,
    reviewsCount: 512,
    stock: 35,
    soldCount: 120,
    minStockThreshold: 15,
    isFlashSale: true,
    isExpress: true,
    brand: 'Sony',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
    description: 'Industry leading noise cancelling head set with 30-hour battery life and multi-point Bluetooth.',
    sku: 'SE-SNY-XM5'
  },
  {
    id: 'PROD-104',
    name: 'Samsung Galaxy Watch 6 Classic 47 Bluetooth Stainless',
    category: 'gadgets',
    price: 279.00,
    originalPrice: 349.00,
    discountPercent: 20,
    rating: 4.6,
    reviewsCount: 98,
    stock: 4,
    soldCount: 46,
    minStockThreshold: 8,
    isFlashSale: false,
    isExpress: false,
    brand: 'Samsung',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60',
    description: 'Classic rotating bezel design with advanced sleep coaching, BIA body composition analysis, and ECG.',
    sku: 'SE-SAM-GW6'
  },
  {
    id: 'PROD-105',
    name: 'Unisex Heavyweight Organic Cotton Hooded Sweatshirt',
    category: 'fashion',
    price: 45.00,
    originalPrice: 65.00,
    discountPercent: 30,
    rating: 4.5,
    reviewsCount: 210,
    stock: 65,
    soldCount: 180,
    minStockThreshold: 20,
    isFlashSale: true,
    isExpress: true,
    brand: 'ShopEase Basics',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&auto=format&fit=crop&q=60',
    description: 'Ultra soft 380 GSM fleece hoodie designed for everyday casual warmth and durable street fashion style.',
    sku: 'SE-FAS-HD1'
  },
  {
    id: 'PROD-106',
    name: 'CeraVe Hydrating Facial Cleanser 473ml Hyaluronic Acid',
    category: 'fashion',
    price: 18.50,
    originalPrice: 24.00,
    discountPercent: 22,
    rating: 4.9,
    reviewsCount: 840,
    stock: 90,
    soldCount: 430,
    minStockThreshold: 25,
    isFlashSale: false,
    isExpress: true,
    brand: 'CeraVe',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop&q=60',
    description: 'Dermatologist recommended non-foaming lotion cleanser with 3 essential ceramides and hyaluronic acid.',
    sku: 'SE-BTY-CRV'
  },
  {
    id: 'PROD-107',
    name: 'Anker 737 Power Bank PowerCore 24000mAh 140W Output',
    category: 'electronics',
    price: 119.99,
    originalPrice: 149.99,
    discountPercent: 20,
    rating: 4.8,
    reviewsCount: 310,
    stock: 22,
    soldCount: 95,
    minStockThreshold: 10,
    isFlashSale: true,
    isExpress: true,
    brand: 'Anker',
    image: 'https://images.unsplash.com/photo-1609592424109-dd9892f1b177?w=500&auto=format&fit=crop&q=60',
    description: 'Ultra powerful 3-port portable charger with smart digital display and GaNPrime fast charging.',
    sku: 'SE-ANK-737'
  },
  {
    id: 'PROD-108',
    name: 'LG 55 Inch 4K UHD Smart OLED TV Cinema HDR WebOS',
    category: 'electronics',
    price: 999.00,
    originalPrice: 1299.00,
    discountPercent: 23,
    rating: 4.9,
    reviewsCount: 175,
    stock: 8,
    soldCount: 32,
    minStockThreshold: 5,
    isFlashSale: false,
    isExpress: false,
    brand: 'LG',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&auto=format&fit=crop&q=60',
    description: 'Self-lit OLED pixels with Dolby Vision IQ, AI Sound Pro, 120Hz refresh rate and G-Sync compatibility.',
    sku: 'SE-LGT-OLED'
  },
  {
    id: 'PROD-109',
    name: 'Pro Fitness Non-Slip Yoga Mat 10mm Extra Thick with Carrying Strap',
    category: 'lifestyle',
    price: 29.99,
    originalPrice: 42.00,
    discountPercent: 28,
    rating: 4.7,
    reviewsCount: 142,
    stock: 40,
    soldCount: 110,
    minStockThreshold: 12,
    isFlashSale: true,
    isExpress: true,
    brand: 'ProFitness',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&auto=format&fit=crop&q=60',
    description: 'High density foam cushion mat for yoga, pilates, stretching, and home fitness workouts.',
    sku: 'SE-SPT-YM10'
  },
  {
    id: 'PROD-110',
    name: 'Garmin Forerunner 265 Running Smartwatch AMOLED Display',
    category: 'lifestyle',
    price: 429.00,
    originalPrice: 449.00,
    discountPercent: 4,
    rating: 4.9,
    reviewsCount: 88,
    stock: 15,
    soldCount: 30,
    minStockThreshold: 6,
    isFlashSale: false,
    isExpress: true,
    brand: 'Garmin',
    image: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?w=500&auto=format&fit=crop&q=60',
    description: 'Colorful AMOLED touchscreen display with advanced training metrics, HRV status, and multi-band GPS.',
    sku: 'SE-SPT-GR265'
  }
];

const INITIAL_ORDERS = [
  {
    id: 'ORD-88219',
    date: '2026-08-18',
    customerName: 'Bimsara J.T',
    customerEmail: 'bimsara@example.com',
    items: [
      { id: 'PROD-101', name: 'Apple iPhone 15 Pro Max 256GB', price: 1199.00, quantity: 1 }
    ],
    totalAmount: 1199.00,
    paymentMethod: 'Credit / Debit Card',
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    shippingAddress: '45 Lake Drive, Colombo 03, Sri Lanka',
    trackingNumber: 'TRK-SL-992014',
    estimatedDelivery: '2026-08-21'
  },
  {
    id: 'ORD-88220',
    date: '2026-08-19',
    customerName: 'Hasaranga R.P',
    customerEmail: 'hasaranga@example.com',
    items: [
      { id: 'PROD-103', name: 'Sony WH-1000XM5 Wireless Headphones', price: 299.00, quantity: 1 }
    ],
    totalAmount: 299.00,
    paymentMethod: 'Cash on Delivery (COD)',
    paymentStatus: 'Pending',
    orderStatus: 'Processing',
    shippingAddress: '12 Kandy Road, Malabe, Sri Lanka',
    trackingNumber: 'TRK-SL-992015',
    estimatedDelivery: '2026-08-22'
  }
];

const INITIAL_TICKETS = [
  {
    id: 'TCK-401',
    customerName: 'Fernando M.M.D',
    email: 'fernando@example.com',
    orderId: 'ORD-88219',
    subject: 'Request for warranty tax invoice',
    category: 'Billing',
    priority: 'Medium',
    status: 'Open',
    createdAt: '2026-08-19 10:15 AM',
    messages: [
      { sender: 'Customer', text: 'Hi, please send me the official tax invoice PDF for order ORD-88219 for warranty claim.', time: '10:15 AM' }
    ]
  }
];

const IconSearch = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const IconCart = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" /></svg>;
const IconStar = ({ filled }) => <svg className={`w-3.5 h-3.5 ${filled ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>;
const IconTruck = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 100-4 2 2 0 000 4zm14 0a2 2 0 100-4 2 2 0 000 4z" /></svg>;
const IconSupport = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const IconBox = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>;
const IconPlus = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>;
const IconTrash = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const IconFire = () => <svg className="w-5 h-5 text-orange-500 fill-orange-500" viewBox="0 0 24 24"><path d="M12 23c-4.97 0-9-3.58-9-8 0-3.07 1.83-5.83 4.2-7.08.38-.2.85.03.92.46.32 2 1.83 2.7 2.88 2.84 1.25.17 2.15-.75 2.15-1.93 0-.61-.26-1.19-.7-1.58-.28-.25-.33-.68-.11-.98C13.5 5.17 15.2 3.8 17 2c.2-.2.53-.17.68.08C19.26 4.67 21 7.92 21 11c0 6.63-4.03 12-9 12z" /></svg>;

export default function App() {
  // Navigation & Role State
  const [activeTab, setActiveTab] = useState('shop'); // shop, track, cart, checkout, support, admin, inventory, proposal
  const [userRole, setUserRole] = useState('Customer'); // Customer, Administrator, Warehouse Staff, Customer Support Staff, Delivery Staff

  // Auth & Profile State
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Guest by default
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [loginTab, setLoginTab] = useState('customer'); // 'customer' or 'admin'

  // Data States
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([
    { ...INITIAL_PRODUCTS[0], quantity: 1 }
  ]);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [tickets, setTickets] = useState(INITIAL_TICKETS);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(2000);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Flash sale timer state (Simulated timer)
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState(null);

  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogin = (role = 'Customer', name = 'Bimsara J.T', email = 'bimsara@example.com') => {
    const userObj = {
      name: name,
      email: email,
      role: role,
      avatar: role === 'Customer'
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      joinedDate: 'August 2026'
    };
    setIsLoggedIn(true);
    setCurrentUser(userObj);
    setUserRole(role);
    setShowAuthModal(false);
    showNotification(`Welcome back, ${name}! Logged in as ${role}`);

    if (role === 'Administrator') setActiveTab('admin');
    else if (role === 'Warehouse Staff') setActiveTab('inventory');
    else if (role === 'Customer Support Staff') setActiveTab('support');
    else if (activeTab === 'admin' || activeTab === 'inventory') setActiveTab('shop');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setUserRole('Customer');
    setShowProfileModal(false);
    if (['admin', 'inventory'].includes(activeTab)) {
      setActiveTab('shop');
    }
    showNotification('Logged out successfully.');
  };

  const addToCart = (product, qty = 1) => {
    if (product.stock <= 0) {
      showNotification('⚠️ Sorry, this item is currently out of stock.');
      return;
    }
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        if (existing.quantity + qty > product.stock) {
          showNotification(`⚠️ Cannot add more. Only ${product.stock} available in stock.`);
          return prevCart;
        }
        showNotification(`🛒 Updated ${product.name.slice(0, 20)}... quantity in cart!`);
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      showNotification(`🎉 Added item to shopping cart!`);
      return [...prevCart, { ...product, quantity: qty }];
    });
  };

  const updateCartQty = (productId, newQty) => {
    const product = products.find((p) => p.id === productId);
    if (newQty > product.stock) {
      showNotification(`⚠️ Stock limit (${product.stock}) reached.`);
      return;
    }
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === productId ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    showNotification('🗑️ Item removed from cart.');
  };

  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const shippingFee = cartSubtotal > 150 || cart.length === 0 ? 0 : 5.00;
  const cartTotal = cartSubtotal + shippingFee;
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesPrice = p.price <= priceRange;
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, searchQuery, selectedCategory, priceRange]);

  const handleRoleChange = (newRole) => {
    setUserRole(newRole);
    if (newRole === 'Administrator') setActiveTab('admin');
    else if (newRole === 'Warehouse Staff') setActiveTab('inventory');
    else if (newRole === 'Customer Support Staff') setActiveTab('support');
    else setActiveTab('shop');
    showNotification(`Active stakeholder view: ${newRole}`);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-slate-800 font-sans antialiased flex flex-col">

      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed top-24 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-slide-in">
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <header className="bg-white sticky top-0 z-40 shadow-sm border-b border-slate-200">

        {/* Daraz Light Top Utilities Bar */}
        <div className="bg-[#fafafa] border-b border-slate-100 text-xs py-1.5 px-4 text-slate-600">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
            <div className="flex items-center gap-4">
              <button onClick={() => setActiveTab('track')} className="hover:text-orange-600 transition flex items-center gap-1">
                <IconTruck /> <span>Track My Order</span>
              </button>
              <button onClick={() => setActiveTab('support')} className="hover:text-orange-600 transition flex items-center gap-1">
                <IconSupport /> <span>Customer Care</span>
              </button>

              {/* Role Switcher Selector - ONLY SHOW IN ADMIN/STAFF LOGIN */}
              {isLoggedIn && userRole !== 'Customer' && (
                <div className="flex items-center gap-1 border-l border-slate-200 pl-3">
                  <span className="text-xs font-bold text-orange-600">Staff Portal:</span>
                  <select
                    value={userRole}
                    onChange={(e) => handleRoleChange(e.target.value)}
                    className="bg-orange-50 text-orange-600 font-bold border border-orange-200 rounded px-2 py-0.5 text-xs focus:outline-none cursor-pointer"
                  >
                    <option value="Administrator">🛠️ Administrator</option>
                    <option value="Warehouse Staff">📦 Warehouse Staff</option>
                    <option value="Customer Support Staff">💬 Support Staff</option>
                    <option value="Delivery Staff">🚚 Delivery Personnel</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Daraz-Style Bright Brand Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">

          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setSelectedCategory('all'); setActiveTab('shop'); }}>
            <div className="w-10 h-10 bg-[#f57224] rounded-xl flex items-center justify-center font-black text-2xl text-white shadow-md">
              S
            </div>
            <div className="leading-none">
              <h1 className="text-2xl font-black tracking-tight text-[#f57224]">
                Shop<span className="text-slate-900">Ease</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest mt-0.5">Online Shopping</p>
            </div>
          </div>

          {/* Large Coral-Bordered Search Bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="flex items-center bg-[#f5f5f5] rounded-xl border-2 border-[#f57224] overflow-hidden shadow-sm">
              <input
                type="text"
                placeholder="Search in ShopEase (e.g. iPhone, Sony, Gaming Laptop, Cleanser)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              <button
                onClick={() => setActiveTab('shop')}
                className="bg-[#f57224] hover:bg-[#e05d10] text-white px-6 py-2.5 font-bold text-sm transition flex items-center justify-center"
              >
                <IconSearch />
              </button>
            </div>
          </div>

          {/* Cart & Profile Photo Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('cart')}
              className="relative p-2.5 text-slate-700 hover:text-[#f57224] bg-slate-100 hover:bg-orange-50 rounded-xl transition"
              title="Shopping Cart"
            >
              <IconCart />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#f57224] text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Top Right Profile Avatar Button */}
            <div className="relative">
              <button
                onClick={() => setShowProfileModal(!showProfileModal)}
                className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 hover:border-orange-300 bg-white hover:bg-orange-50/50 transition focus:outline-none"
              >
                {isLoggedIn && currentUser ? (
                  <>
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-[#f57224]"
                    />
                    <div className="hidden sm:flex flex-col text-left">
                      <span className="text-xs font-bold text-slate-800 line-clamp-1">{currentUser.name}</span>
                      <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                        ● Logged In
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-sm border border-slate-200">
                      👤
                    </div>
                    <div className="hidden sm:flex flex-col text-left">
                      <span className="text-xs font-bold text-slate-800">Guest</span>
                      <span className="text-[10px] text-[#f57224] font-bold">Please Sign In</span>
                    </div>
                  </>
                )}
              </button>

              {/* Profile Card / Dropdown */}
              {showProfileModal && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 p-4 space-y-3">
                  {isLoggedIn && currentUser ? (
                    <>
                      <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                        <img src={currentUser.avatar} alt="" className="w-12 h-12 rounded-full object-cover border-2 border-[#f57224]" />
                        <div className="overflow-hidden">
                          <h4 className="font-bold text-slate-900 text-sm truncate">{currentUser.name}</h4>
                          <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                          <span className={`inline-block mt-1 text-[10px] font-extrabold px-2 py-0.5 rounded ${currentUser.role === 'Customer' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                            }`}>
                            {currentUser.role}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1 text-xs font-semibold text-slate-700">
                        <button
                          onClick={() => { setActiveTab('track'); setShowProfileModal(false); }}
                          className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 flex items-center justify-between"
                        >
                          <span>📦 My Orders & Tracking</span>
                          <span className="text-slate-400">›</span>
                        </button>
                        <button
                          onClick={() => { setActiveTab('support'); setShowProfileModal(false); }}
                          className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 flex items-center justify-between"
                        >
                          <span>💬 Support & Help Tickets</span>
                          <span className="text-slate-400">›</span>
                        </button>

                        {currentUser.role !== 'Customer' && (
                          <button
                            onClick={() => {
                              if (currentUser.role === 'Administrator') setActiveTab('admin');
                              else if (currentUser.role === 'Warehouse Staff') setActiveTab('inventory');
                              else if (currentUser.role === 'Customer Support Staff') setActiveTab('support');
                              setShowProfileModal(false);
                            }}
                            className="w-full text-left px-3 py-2 rounded-xl bg-orange-50 text-orange-600 font-bold hover:bg-orange-100 flex items-center justify-between"
                          >
                            <span>🛠️ Staff Control Desk</span>
                            <span>›</span>
                          </button>
                        )}
                      </div>

                      <div className="pt-2 border-t border-slate-100">
                        <button
                          onClick={handleLogout}
                          className="w-full bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 font-bold py-2 rounded-xl text-xs transition"
                        >
                          Sign Out
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center space-y-3 py-2">
                      <div className="w-12 h-12 bg-orange-50 text-[#f57224] rounded-full mx-auto flex items-center justify-center text-xl font-bold">
                        👤
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Guest Profile</h4>
                        <p className="text-xs text-slate-500 mt-1">Please sign in to view your profile details, orders, and cart history.</p>
                      </div>
                      <button
                        onClick={() => {
                          setShowProfileModal(false);
                          setShowAuthModal(true);
                        }}
                        className="w-full bg-[#f57224] hover:bg-[#e05d10] text-white font-extrabold py-2.5 rounded-xl text-xs shadow transition uppercase tracking-wider"
                      >
                        SIGN IN / REGISTER NOW
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Horizontal Nav Bar */}
        <nav className="bg-white border-t border-slate-100 px-4">
          <div className="max-w-7xl mx-auto flex items-center gap-6 text-xs font-bold text-slate-700 py-2.5 overflow-x-auto">
            <button
              onClick={() => { setSelectedCategory('all'); setActiveTab('shop'); }}
              className={`hover:text-[#f57224] transition ${selectedCategory === 'all' && activeTab === 'shop' ? 'text-[#f57224]' : ''}`}
            >
              All Categories
            </button>
            {INITIAL_CATEGORIES.slice(1).map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat.id); setActiveTab('shop'); }}
                className={`hover:text-[#f57224] transition flex items-center gap-1.5 whitespace-nowrap ${selectedCategory === cat.id ? 'text-[#f57224]' : ''}`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5">

        {activeTab === 'shop' && (
          <div className="space-y-6">

            {/* CONDITIONAL RENDERING: Home Page vs Dedicated Category Page */}
            {selectedCategory === 'all' ? (
              /* HOME PAGE ONLY: Promotional Banner + Flash Sale Deals */
              <>
                {/* Bright Premium Slider / Promo Carousel Banner */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

                  {/* Category Quick Menu Sidebar */}
                  <div className="hidden lg:block bg-white rounded-2xl p-3 border border-slate-200 shadow-sm space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-3 py-1">Top Categories</span>
                    {INITIAL_CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${selectedCategory === cat.id ? 'bg-orange-50 text-[#f57224]' : 'text-slate-700 hover:bg-slate-50'
                          }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{cat.icon}</span>
                          <span>{cat.name}</span>
                        </span>
                        <span className="text-slate-300">›</span>
                      </button>
                    ))}
                  </div>

                  {/* Central Promo Hero Box */}
                  <div className="lg:col-span-3 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden flex flex-col justify-between min-h-[220px]">
                    <div className="max-w-md space-y-3 z-10">
                      <span className="inline-block bg-white/20 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                        ⚡ Mega Shopping Festival 2026
                      </span>
                      <h2 className="text-2xl sm:text-4xl font-black leading-tight drop-shadow-sm">
                        Up to 50% Off <br />
                        Top Tech & Everyday Essentials
                      </h2>
                      <p className="text-white/90 text-xs sm:text-sm font-medium">
                        Fast islandwide delivery with real-time tracking, 100% genuine warranty and secure payment options.
                      </p>
                    </div>

                    <div className="pt-4 z-10 flex gap-3">
                      <button
                        onClick={() => {
                          setSelectedCategory('mobiles');
                        }}
                        className="bg-white text-[#f57224] font-black text-xs px-5 py-2.5 rounded-xl shadow hover:bg-orange-50 transition"
                      >
                        Shop Mobiles Deals
                      </button>

                    </div>

                    <div className="absolute right-0 bottom-0 top-0 w-1/2 bg-white/10 rounded-full blur-2xl transform translate-x-1/3 pointer-events-none" />
                  </div>
                </div>

                {/* Daraz-Style Flash Sale Countdown Strip */}
                <div id="flash-sale-section" className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-3">
                      <IconFire />
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg uppercase tracking-tight">Flash Sale</h3>
                        <p className="text-[11px] text-slate-400">On Sale Now • Limited Quantities</p>
                      </div>
                    </div>

                    {/* Countdown Timer Boxes */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500">Ending in:</span>
                      <div className="flex gap-1 font-mono font-bold text-xs">
                        <span className="bg-[#f57224] text-white px-2 py-1 rounded-md">{String(timeLeft.hours).padStart(2, '0')}h</span>
                        <span className="text-slate-800 font-bold">:</span>
                        <span className="bg-[#f57224] text-white px-2 py-1 rounded-md">{String(timeLeft.minutes).padStart(2, '0')}m</span>
                        <span className="text-slate-800 font-bold">:</span>
                        <span className="bg-[#f57224] text-white px-2 py-1 rounded-md">{String(timeLeft.seconds).padStart(2, '0')}s</span>
                      </div>
                    </div>
                  </div>

                  {/* Flash Items Horizontal Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {products.filter((p) => p.isFlashSale).map((product) => (
                      <div
                        key={product.id}
                        onClick={() => setSelectedProduct(product)}
                        className="bg-white rounded-xl border border-slate-200 p-2.5 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
                      >
                        <div className="relative bg-slate-100 rounded-lg overflow-hidden h-36 sm:h-40 mb-2">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                          <span className="absolute top-2 left-2 bg-[#f57224] text-white text-[10px] font-black px-2 py-0.5 rounded shadow">
                            -{product.discountPercent}%
                          </span>
                        </div>

                        <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-semibold text-slate-800 text-xs line-clamp-2 group-hover:text-[#f57224] transition">
                              {product.name}
                            </h4>
                          </div>

                          <div className="space-y-1 pt-1">
                            <div className="text-[#f57224] font-black text-sm sm:text-base">
                              ${product.price.toFixed(2)}
                            </div>
                            <div className="text-[11px] text-slate-400 line-through">
                              ${product.originalPrice.toFixed(2)}
                            </div>

                            <div className="space-y-1 pt-1">
                              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-[#f57224] h-full rounded-full" style={{ width: `${Math.min(100, (product.soldCount / (product.soldCount + product.stock)) * 100)}%` }} />
                              </div>
                              <span className="text-[10px] text-slate-500 font-semibold block">{product.soldCount} Sold</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* DEDICATED CATEGORY PAGE BANNER VIEW */
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
                {/* Category Breadcrumbs */}
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setSelectedCategory('all')} className="hover:text-[#f57224] font-semibold">Home</button>
                    <span>/</span>
                    <span className="font-bold text-slate-800">Categories</span>
                    <span>/</span>
                    <span className="text-[#f57224] font-bold">{INITIAL_CATEGORIES.find(c => c.id === selectedCategory)?.name}</span>
                  </div>

                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="text-xs font-bold text-[#f57224] hover:underline flex items-center gap-1"
                  >
                    ← Back to All Categories
                  </button>
                </div>

                {/* Category Header Title Block */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-2xl shadow-sm">
                      {INITIAL_CATEGORIES.find(c => c.id === selectedCategory)?.icon}
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                        {INITIAL_CATEGORIES.find(c => c.id === selectedCategory)?.name}
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {INITIAL_CATEGORIES.find(c => c.id === selectedCategory)?.description}
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-100 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700">
                    <strong className="text-[#f57224] font-extrabold">{filteredProducts.length}</strong> Products Found
                  </div>
                </div>
              </div>
            )}

            {/* Catalog Main View with Sidebar Filter & Clean Product Grid */}
            <div className="flex flex-col lg:flex-row gap-6">

              {/* Left Filter Sidebar */}
              <aside className="w-full lg:w-60 space-y-4 flex-shrink-0">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Filters</h3>
                    <button
                      onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setPriceRange(2000); }}
                      className="text-[11px] text-[#f57224] hover:underline font-bold"
                    >
                      Reset
                    </button>
                  </div>

                  {/* Category Switcher List */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Categories</span>
                    {INITIAL_CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold transition ${selectedCategory === cat.id ? 'bg-orange-50 text-[#f57224] font-bold' : 'text-slate-600 hover:bg-slate-50'
                          }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{cat.icon}</span>
                          <span>{cat.name}</span>
                        </span>
                        {selectedCategory === cat.id && <span className="text-[#f57224]">✓</span>}
                      </button>
                    ))}
                  </div>

                  {/* Price Filter Slider */}
                  <div className="space-y-2 border-t border-slate-100 pt-3">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-slate-600">Max Price:</span>
                      <span className="text-[#f57224] font-bold">${priceRange}</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="2000"
                      step="20"
                      value={priceRange}
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                      className="w-full accent-[#f57224] cursor-pointer"
                    />
                  </div>

                  {/* Service Badges Filter */}
                  <div className="border-t border-slate-100 pt-3 space-y-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Service Features</span>
                    <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-[#f57224] rounded" />
                      <span>ShopEase Express Delivery</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-[#f57224] rounded" />
                      <span>Free Shipping Eligible</span>
                    </label>
                  </div>
                </div>
              </aside>

              {/* Right Product Grid */}
              <div className="flex-1 space-y-3">
                <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">
                    Showing <strong className="text-[#f57224]">{filteredProducts.length}</strong> items in <span className="capitalize">{selectedCategory === 'all' ? 'All Categories' : INITIAL_CATEGORIES.find(c => c.id === selectedCategory)?.name}</span>
                  </span>
                  <span className="text-slate-500">Sorted by: <strong className="text-slate-800">Best Match</strong></span>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="bg-white p-12 rounded-2xl text-center border border-slate-200 space-y-3">
                    <p className="text-slate-500 text-sm font-semibold">No items match your filter criteria in this category.</p>
                    <button
                      onClick={() => { setSelectedCategory('all'); setPriceRange(2000); setSearchQuery(''); }}
                      className="bg-[#f57224] text-white font-bold text-xs px-4 py-2 rounded-xl"
                    >
                      View All Products
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group"
                      >
                        {/* Image & Badges */}
                        <div
                          className="relative bg-slate-100 h-44 cursor-pointer overflow-hidden"
                          onClick={() => setSelectedProduct(product)}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          />
                          {product.isExpress && (
                            <span className="absolute top-2 left-2 bg-teal-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase">
                              Express
                            </span>
                          )}
                          {product.stock <= 5 && product.stock > 0 && (
                            <span className="absolute top-2 right-2 bg-amber-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded">
                              Only {product.stock} Left
                            </span>
                          )}
                          {product.stock === 0 && (
                            <span className="absolute top-2 right-2 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded">
                              Out of Stock
                            </span>
                          )}
                        </div>

                        {/* Card Info */}
                        <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                              {product.brand}
                            </span>
                            <h4
                              onClick={() => setSelectedProduct(product)}
                              className="font-bold text-slate-800 text-xs hover:text-[#f57224] cursor-pointer line-clamp-2 transition leading-tight"
                            >
                              {product.name}
                            </h4>
                          </div>

                          {/* Ratings */}
                          <div className="flex items-center gap-1">
                            <div className="flex text-amber-400">
                              {[...Array(5)].map((_, i) => (
                                <IconStar key={i} filled={i < Math.floor(product.rating)} />
                              ))}
                            </div>
                            <span className="text-[10px] font-bold text-slate-500">
                              ({product.reviewsCount})
                            </span>
                          </div>

                          {/* Price & Cart Add Button */}
                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                            <div>
                              <span className="text-base font-black text-[#f57224]">${product.price.toFixed(2)}</span>
                            </div>
                            <button
                              onClick={() => addToCart(product)}
                              disabled={product.stock === 0}
                              className="bg-[#f57224] hover:bg-[#e05d10] disabled:bg-slate-200 text-white font-bold text-xs p-2 rounded-xl transition flex items-center justify-center shadow-sm"
                              title="Add to Cart"
                            >
                              <IconCart />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {selectedProduct && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white max-w-2xl w-full rounded-3xl shadow-2xl overflow-hidden relative border border-slate-200">
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition"
              >
                ✕
              </button>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="h-64 sm:h-full bg-slate-100">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-[#f57224] uppercase tracking-wider">{selectedProduct.brand} • {selectedProduct.category}</span>
                    <h3 className="text-base font-extrabold text-slate-900 leading-snug">{selectedProduct.name}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{selectedProduct.description}</p>
                    <div className="pt-2">
                      <span className="text-2xl font-black text-[#f57224]">${selectedProduct.price.toFixed(2)}</span>
                      {selectedProduct.originalPrice && (
                        <span className="text-xs text-slate-400 line-through ml-2">${selectedProduct.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-slate-600">
                      Stock Level: {selectedProduct.stock > 0 ? (
                        <span className="text-emerald-600 font-bold">In Stock ({selectedProduct.stock} available)</span>
                      ) : (
                        <span className="text-red-600 font-bold">Out of Stock</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => {
                        addToCart(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      disabled={selectedProduct.stock === 0}
                      className="w-full bg-[#f57224] hover:bg-[#e05d10] text-white font-bold py-3 rounded-xl transition text-sm flex items-center justify-center gap-2 shadow-md"
                    >
                      <IconCart /> Add to Shopping Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Auth Modal (Sign In / Register / Staff Login) */}
        {showAuthModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white max-w-md w-full rounded-3xl shadow-2xl overflow-hidden relative border border-slate-200 p-6 space-y-5">
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition"
              >
                ✕
              </button>

              <div className="text-center space-y-1">
                <div className="w-12 h-12 bg-orange-50 text-[#f57224] rounded-2xl mx-auto flex items-center justify-center font-black text-2xl shadow-sm">
                  S
                </div>
                <h3 className="text-xl font-black text-slate-900">Sign In to ShopEase</h3>
                <p className="text-xs text-slate-500">Access your orders, quick checkout, and support desk</p>
              </div>

              {/* Login Type Tabs */}
              <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-bold">
                <button
                  onClick={() => setLoginTab('customer')}
                  className={`flex-1 py-2 rounded-lg transition ${loginTab === 'customer' ? 'bg-white text-[#f57224] shadow-sm' : 'text-slate-600'}`}
                >
                  👤 Customer Sign In
                </button>
                <button
                  onClick={() => setLoginTab('admin')}
                  className={`flex-1 py-2 rounded-lg transition ${loginTab === 'admin' ? 'bg-white text-[#f57224] shadow-sm' : 'text-slate-600'}`}
                >
                  🛠️ Staff / Admin Portal
                </button>
              </div>

              {loginTab === 'customer' ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    handleLogin('Customer', formData.get('name') || 'Bimsara J.T', formData.get('email') || 'bimsara@example.com');
                  }}
                  className="space-y-3"
                >
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Full Name</label>
                    <input name="name" defaultValue="Bimsara J.T" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#f57224]" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Email Address</label>
                    <input name="email" type="email" defaultValue="bimsara@example.com" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#f57224]" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Password</label>
                    <input type="password" defaultValue="••••••••" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#f57224]" />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#f57224] hover:bg-[#e05d10] text-white font-extrabold py-3 rounded-xl shadow transition text-xs uppercase tracking-wider mt-2"
                  >
                    SIGN IN AS CUSTOMER
                  </button>

                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={() => handleLogin('Customer', 'Guest Customer', 'guest@shopease.lk')}
                      className="text-xs text-slate-500 hover:text-[#f57224] font-semibold underline"
                    >
                      Quick Demo: Continue as Customer
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-slate-500 text-center">Select staff role to login and access administrative controls:</p>

                  <div className="space-y-2">
                    <button
                      onClick={() => handleLogin('Administrator', 'System Admin', 'admin@shopease.lk')}
                      className="w-full bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-300 p-3 rounded-xl text-left transition flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-xs text-slate-900 block">🛠️ System Administrator</span>
                        <span className="text-[10px] text-slate-400">Full catalog management & sales analytics</span>
                      </div>
                      <span className="text-xs font-extrabold text-[#f57224]">Login →</span>
                    </button>

                    <button
                      onClick={() => handleLogin('Warehouse Staff', 'Fernando M.M.D', 'warehouse@shopease.lk')}
                      className="w-full bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-300 p-3 rounded-xl text-left transition flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-xs text-slate-900 block">📦 Warehouse Staff</span>
                        <span className="text-[10px] text-slate-400">Stock audit control & restock management</span>
                      </div>
                      <span className="text-xs font-extrabold text-[#f57224]">Login →</span>
                    </button>

                    <button
                      onClick={() => handleLogin('Customer Support Staff', 'Bimsara Support', 'support@shopease.lk')}
                      className="w-full bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-300 p-3 rounded-xl text-left transition flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-xs text-slate-900 block">💬 Customer Support Officer</span>
                        <span className="text-[10px] text-slate-400">Ticket resolutions & customer care</span>
                      </div>
                      <span className="text-xs font-extrabold text-[#f57224]">Login →</span>
                    </button>

                    <button
                      onClick={() => handleLogin('Delivery Staff', 'Hasaranga Logistics', 'delivery@shopease.lk')}
                      className="w-full bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-300 p-3 rounded-xl text-left transition flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-xs text-slate-900 block">🚚 Delivery Personnel</span>
                        <span className="text-[10px] text-slate-400">Order shipment & package delivery tracking</span>
                      </div>
                      <span className="text-xs font-extrabold text-[#f57224]">Login →</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'cart' && (
          <div className="max-w-4xl mx-auto space-y-5">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <IconCart /> Shopping Cart Management
              </h2>
              <span className="text-xs font-bold text-slate-500">{cartItemCount} Items Selected</span>
            </div>

            {cart.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 bg-orange-50 text-[#f57224] rounded-2xl mx-auto flex items-center justify-center text-3xl">
                  🛒
                </div>
                <h3 className="text-base font-bold text-slate-800">There are no items in this cart</h3>
                <p className="text-slate-400 text-xs">Explore products and add them to your cart.</p>
                <button
                  onClick={() => setActiveTab('shop')}
                  className="bg-[#f57224] hover:bg-[#e05d10] text-white font-bold px-6 py-2.5 rounded-xl text-xs transition shadow-md"
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Items List */}
                <div className="lg:col-span-2 space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 justify-between"
                    >
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover bg-slate-100" />
                      <div className="flex-1 space-y-1">
                        <h4 className="font-bold text-slate-800 text-xs line-clamp-2">{item.name}</h4>
                        <p className="text-xs font-black text-[#f57224]">${item.price.toFixed(2)}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                        <button
                          onClick={() => updateCartQty(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-xs font-bold text-slate-800">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQty(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 text-xs font-bold"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-black text-slate-900 text-sm block">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 text-xs mt-1 flex items-center gap-1 ml-auto font-semibold"
                        >
                          <IconTrash /> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Checkout Order Summary */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm h-fit space-y-4">
                  <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-3">Order Summary</h3>
                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-bold text-slate-900">${cartSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping Fee</span>
                      <span className="font-bold text-slate-900">
                        {shippingFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `$${shippingFee.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex justify-between text-sm font-black text-slate-900">
                      <span>Total Amount</span>
                      <span className="text-[#f57224] text-base">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('checkout')}
                    className="w-full bg-[#f57224] hover:bg-[#e05d10] text-white font-extrabold py-3 rounded-xl shadow-md transition text-xs flex items-center justify-center gap-2 uppercase tracking-wider"
                  >
                    PROCEED TO CHECKOUT →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'checkout' && (
          <div className="max-w-3xl mx-auto space-y-5">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-black text-slate-900">Checkout & Payment Gateway</h2>
              <p className="text-xs text-slate-500">Provide delivery location and select preferred payment channel</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const newOrder = {
                  id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
                  date: new Date().toISOString().split('T')[0],
                  customerName: formData.get('fullName'),
                  customerEmail: formData.get('email'),
                  items: [...cart],
                  totalAmount: cartTotal,
                  paymentMethod: formData.get('paymentMethod'),
                  paymentStatus: formData.get('paymentMethod') === 'Cash on Delivery (COD)' ? 'Pending' : 'Paid',
                  orderStatus: 'Placed',
                  shippingAddress: formData.get('address'),
                  trackingNumber: `TRK-SL-${Math.floor(100000 + Math.random() * 900000)}`,
                  estimatedDelivery: '2026-08-23'
                };

                // Deduct stock automatically (FR-08)
                setProducts((prev) =>
                  prev.map((prod) => {
                    const cartItem = cart.find((item) => item.id === prod.id);
                    if (cartItem) {
                      return {
                        ...prod,
                        stock: Math.max(0, prod.stock - cartItem.quantity),
                        soldCount: prod.soldCount + cartItem.quantity
                      };
                    }
                    return prod;
                  })
                );

                setOrders([newOrder, ...orders]);
                setCart([]);
                showNotification(`🎉 Order ${newOrder.id} successfully placed!`);
                setActiveTab('track');
              }}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6"
            >
              {/* Shipping Details */}
              <div className="space-y-3">
                <h3 className="text-xs font-black text-[#f57224] uppercase tracking-wider">1. Delivery Address</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Full Name</label>
                    <input
                      required
                      name="fullName"
                      defaultValue="Bimsara J.T"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#f57224]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Email Address</label>
                    <input
                      required
                      type="email"
                      name="email"
                      defaultValue="bimsara@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#f57224]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Street Address & City</label>
                    <input
                      required
                      name="address"
                      defaultValue="No 100, SLIIT Campus Road, Malabe, Sri Lanka"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#f57224]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <h3 className="text-xs font-black text-[#f57224] uppercase tracking-wider">2. Payment Method</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 bg-slate-50 cursor-pointer hover:border-[#f57224] transition">
                    <input type="radio" name="paymentMethod" value="Credit / Debit Card" defaultChecked className="accent-[#f57224]" />
                    <div>
                      <span className="font-bold text-xs text-slate-900 block">💳 Credit / Debit Card</span>
                      <span className="text-[10px] text-slate-400">Visa, MasterCard, Amex</span>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 bg-slate-50 cursor-pointer hover:border-[#f57224] transition">
                    <input type="radio" name="paymentMethod" value="Cash on Delivery (COD)" className="accent-[#f57224]" />
                    <div>
                      <span className="font-bold text-xs text-slate-900 block">💵 Cash on Delivery (COD)</span>
                      <span className="text-[10px] text-slate-400">Pay cash upon parcel delivery</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Total Summary */}
              <div className="p-4 bg-orange-50 rounded-2xl flex items-center justify-between border border-orange-100">
                <div>
                  <span className="text-xs text-orange-800 font-semibold block">Total Payment</span>
                  <span className="text-xl font-black text-[#f57224]">${cartTotal.toFixed(2)}</span>
                </div>
                <button
                  type="submit"
                  className="bg-[#f57224] hover:bg-[#e05d10] text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-md transition uppercase tracking-wider"
                >
                  PLACE ORDER NOW
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'track' && (
          <div className="max-w-4xl mx-auto space-y-5">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <IconTruck /> Real-Time Order Tracking
              </h2>
              <p className="text-xs text-slate-500">Track package fulfillment status from placement to doorstep delivery</p>
            </div>

            {orders.length === 0 ? (
              <p className="text-center text-slate-500 py-8 text-xs font-semibold">No active orders found.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const statusSteps = ['Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
                  const currentStepIndex = statusSteps.indexOf(order.orderStatus);

                  return (
                    <div key={order.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-5">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                        <div>
                          <span className="text-xs text-[#f57224] font-black uppercase tracking-wider">{order.id}</span>
                          <h4 className="font-bold text-slate-900 text-sm">Customer: {order.customerName}</h4>
                          <span className="text-xs text-slate-400">Placed on {order.date} • Tracking ID: {order.trackingNumber}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-base font-black text-slate-900">${order.totalAmount.toFixed(2)}</span>
                          <span className="text-xs text-emerald-600 font-bold block">{order.paymentMethod}</span>
                        </div>
                      </div>

                      {/* Timeline Bar */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">Shipment Status</label>
                        <div className="grid grid-cols-5 gap-1 text-center">
                          {statusSteps.map((step, idx) => (
                            <div key={step} className="space-y-1">
                              <div
                                className={`h-2 rounded-full transition-all ${idx <= currentStepIndex ? 'bg-[#f57224]' : 'bg-slate-200'
                                  }`}
                              />
                              <span className={`text-[10px] font-bold block ${idx <= currentStepIndex ? 'text-[#f57224]' : 'text-slate-400'}`}>
                                {step}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Delivery Controls (For Delivery/Admin View) */}
                      {(userRole === 'Administrator' || userRole === 'Delivery Staff') && (
                        <div className="bg-slate-50 p-3 rounded-2xl flex flex-wrap items-center justify-between gap-2 border border-slate-200">
                          <span className="text-xs font-bold text-slate-700">Update Status (Staff Role):</span>
                          <div className="flex gap-1.5">
                            {statusSteps.map((step) => (
                              <button
                                key={step}
                                onClick={() => {
                                  setOrders((prev) =>
                                    prev.map((o) => (o.id === order.id ? { ...o, orderStatus: step } : o))
                                  );
                                  showNotification(`Updated ${order.id} status to: ${step}`);
                                }}
                                className={`text-[10px] font-bold px-2 py-1 rounded-lg transition ${order.orderStatus === step
                                  ? 'bg-[#f57224] text-white'
                                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                                  }`}
                              >
                                {step}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'support' && (
          <div className="max-w-4xl mx-auto space-y-5">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <IconSupport /> Customer Support & Feedback Center
              </h2>
              <p className="text-xs text-slate-500">Inquiry ticketing, order disputes, and ticket resolution desk</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Ticket Submission Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const newTicket = {
                    id: `TCK-${Math.floor(100 + Math.random() * 900)}`,
                    customerName: formData.get('name'),
                    email: formData.get('email'),
                    orderId: formData.get('orderId') || 'N/A',
                    subject: formData.get('subject'),
                    category: formData.get('category'),
                    priority: 'High',
                    status: 'Open',
                    createdAt: 'Just Now',
                    messages: [
                      { sender: 'Customer', text: formData.get('message'), time: 'Just Now' }
                    ]
                  };
                  setTickets([newTicket, ...tickets]);
                  e.target.reset();
                  showNotification(`🎫 Support Ticket ${newTicket.id} created!`);
                }}
                className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3"
              >
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">Submit New Ticket</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-600 block mb-1">Your Name</label>
                  <input required name="name" defaultValue="Bimsara J.T" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-600 block mb-1">Email Address</label>
                  <input required type="email" name="email" defaultValue="bimsara@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-600 block mb-1">Related Order ID</label>
                  <input name="orderId" placeholder="e.g. ORD-88219" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-600 block mb-1">Category</label>
                  <select name="category" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none">
                    <option value="General">General Question</option>
                    <option value="Billing">Billing & Invoice</option>
                    <option value="Delivery">Shipping & Delivery</option>
                    <option value="Return">Returns & Warranty</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-600 block mb-1">Subject</label>
                  <input required name="subject" placeholder="Summary of inquiry" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-600 block mb-1">Message Description</label>
                  <textarea required name="message" rows="3" placeholder="Describe issue..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none" />
                </div>
                <button type="submit" className="w-full bg-[#f57224] hover:bg-[#e05d10] text-white font-bold text-xs py-2.5 rounded-xl transition shadow">
                  SUBMIT TICKET
                </button>
              </form>

              {/* Tickets List */}
              <div className="lg:col-span-2 space-y-3">
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Support Ticket Stream</h3>
                {tickets.map((tck) => (
                  <div key={tck.id} className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-black text-[#f57224] uppercase tracking-wider">{tck.id} • {tck.category}</span>
                        <h4 className="font-bold text-slate-900 text-xs">{tck.subject}</h4>
                        <span className="text-[11px] text-slate-400">By {tck.customerName}</span>
                      </div>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${tck.status === 'Open' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                        {tck.status}
                      </span>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-2xl space-y-1 text-xs">
                      {tck.messages.map((m, i) => (
                        <div key={i}>
                          <span className="font-bold text-slate-700">{m.sender}:</span>
                          <p className="text-slate-600 pl-2">{m.text}</p>
                        </div>
                      ))}
                    </div>

                    {userRole === 'Customer Support Staff' && (
                      <div className="flex gap-2 pt-1">
                        <input
                          id={`reply-${tck.id}`}
                          placeholder="Type support response..."
                          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none"
                        />
                        <button
                          onClick={() => {
                            const input = document.getElementById(`reply-${tck.id}`);
                            if (input && input.value) {
                              setTickets((prev) =>
                                prev.map((t) =>
                                  t.id === tck.id
                                    ? {
                                      ...t,
                                      status: 'Resolved',
                                      messages: [...t.messages, { sender: 'Support Officer', text: input.value, time: 'Just now' }]
                                    }
                                    : t
                                )
                              );
                              input.value = '';
                              showNotification(`Response added to ticket ${tck.id}`);
                            }
                          }}
                          className="bg-[#f57224] text-white font-bold text-xs px-3 py-1.5 rounded-xl hover:bg-[#e05d10]"
                        >
                          Reply
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="max-w-5xl mx-auto space-y-5">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <IconBox /> Warehouse Stock Control Desk
                </h2>
                <p className="text-xs text-slate-500">Warehouse Manager View — Automatic inventory sync & restocking</p>
              </div>
              <button
                onClick={() => showNotification('📦 Stock audit report exported!')}
                className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                Export Stock CSV
              </button>
            </div>

            {/* Inventory Table */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">SKU / Item</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Price</th>
                    <th className="p-3.5">In Stock</th>
                    <th className="p-3.5">Threshold</th>
                    <th className="p-3.5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map((p) => {
                    const isLowStock = p.stock <= p.minStockThreshold;
                    return (
                      <tr key={p.id} className={isLowStock ? 'bg-orange-50/40' : ''}>
                        <td className="p-3.5 font-bold text-slate-900 flex items-center gap-3">
                          <img src={p.image} alt="" className="w-9 h-9 rounded-lg object-cover bg-slate-100" />
                          <div>
                            <span className="line-clamp-1">{p.name}</span>
                            <span className="text-[10px] text-slate-400 block">{p.sku}</span>
                          </div>
                        </td>
                        <td className="p-3.5 font-semibold text-[#f57224] uppercase">{p.category}</td>
                        <td className="p-3.5 font-bold text-slate-800">${p.price.toFixed(2)}</td>
                        <td className="p-3.5">
                          <span className={`font-black px-2.5 py-1 rounded-full text-[10px] ${p.stock === 0 ? 'bg-red-100 text-red-700' : isLowStock ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                            }`}>
                            {p.stock} units
                          </span>
                        </td>
                        <td className="p-3.5 font-semibold">{p.minStockThreshold} units</td>
                        <td className="p-3.5 text-center">
                          <button
                            onClick={() => {
                              setProducts((prev) =>
                                prev.map((item) => (item.id === p.id ? { ...item, stock: item.stock + 10 } : item))
                              );
                              showNotification(`Restocked +10 units for ${p.name.slice(0, 15)}...`);
                            }}
                            className="bg-[#f57224] hover:bg-[#e05d10] text-white font-bold text-[10px] px-3 py-1 rounded-lg transition"
                          >
                            +10 Restock
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="max-w-5xl mx-auto space-y-5">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black text-slate-900">Administrator Console</h2>
                <p className="text-xs text-slate-500">Manage catalog products and view real-time sales reporting</p>
              </div>
              <button
                onClick={() => {
                  const newProd = {
                    id: `PROD-${Math.floor(100 + Math.random() * 900)}`,
                    name: 'New Premium Electronics Product',
                    category: 'electronics',
                    price: 199.00,
                    originalPrice: 249.00,
                    discountPercent: 20,
                    rating: 5.0,
                    reviewsCount: 1,
                    stock: 50,
                    soldCount: 0,
                    minStockThreshold: 10,
                    isFlashSale: false,
                    isExpress: true,
                    brand: 'ShopEase',
                    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
                    description: 'Newly added catalog item from administrator console.',
                    sku: 'SE-ADM-999'
                  };
                  setProducts([newProd, ...products]);
                  showNotification('➕ Added new item to catalog!');
                }}
                className="bg-[#f57224] hover:bg-[#e05d10] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition flex items-center gap-1.5 uppercase tracking-wider"
              >
                <IconPlus /> Add Product
              </button>
            </div>

            {/* Metrics Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Sales Revenue</span>
                <h3 className="text-2xl font-black text-[#f57224]">
                  ${orders.reduce((acc, o) => acc + o.totalAmount, 0).toFixed(2)}
                </h3>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Orders</span>
                <h3 className="text-2xl font-black text-slate-900">{orders.length}</h3>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Catalog Items</span>
                <h3 className="text-2xl font-black text-emerald-600">{products.length}</h3>
              </div>
            </div>

            {/* Product List */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">Catalog Manager</h3>
              <div className="space-y-2">
                {products.map((prod) => (
                  <div key={prod.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <img src={prod.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-white" />
                      <div>
                        <h4 className="font-bold text-xs text-slate-900">{prod.name}</h4>
                        <span className="text-[10px] text-slate-500 uppercase">{prod.category} • ${prod.price} • Stock: {prod.stock}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setProducts((prev) => prev.filter((p) => p.id !== prod.id));
                        showNotification(`Deleted item ${prod.name.slice(0, 15)}...`);
                      }}
                      className="text-red-500 hover:text-red-700 text-xs font-bold p-2"
                    >
                      <IconTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'proposal' && (
          <div className="max-w-4xl mx-auto space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-[#f57224] uppercase tracking-wider">SLIIT Faculty of Computing — Group Y2.S1.WD.IT.03</span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                SE2030 Software Engineering Proposal Specification
              </h2>
              <p className="text-xs text-slate-500">2026-Y2-S1-MLB-B3G1-01 • Web-based E-Shopping Store</p>
            </div>

            {/* Team Roles */}
            <div className="space-y-3">
              <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Project Group Team Members</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                  <thead className="bg-slate-50 font-bold text-slate-700">
                    <tr>
                      <th className="p-3">IT Number</th>
                      <th className="p-3">Name</th>
                      <th className="p-3">Assigned Major Module</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    <tr>
                      <td className="p-3 font-mono font-bold text-[#f57224]">IT25103981</td>
                      <td className="p-3">Anthony K.D.T</td>
                      <td className="p-3">Product & Category Management</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono font-bold text-[#f57224]">IT25101934</td>
                      <td className="p-3">Ruberu T.U.S</td>
                      <td className="p-3">Shopping Cart Management</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono font-bold text-[#f57224]">IT25101951</td>
                      <td className="p-3">Hasaranga R.P.P.D</td>
                      <td className="p-3">Customer / Order & Tracking Management</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono font-bold text-[#f57224]">IT25101034</td>
                      <td className="p-3">Nivesh T</td>
                      <td className="p-3">Payment Management</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono font-bold text-[#f57224]">IT25102879</td>
                      <td className="p-3">Fernando M.M.D</td>
                      <td className="p-3">Inventory & Stock Management</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono font-bold text-[#f57224]">IT25103977</td>
                      <td className="p-3">Bimsara J.T</td>
                      <td className="p-3">Customer Support & Feedback Desk</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="text-center pt-3">
              <button
                onClick={() => setActiveTab('shop')}
                className="bg-[#f57224] hover:bg-[#e05d10] text-white font-bold text-xs px-6 py-2.5 rounded-xl transition shadow"
              >
                RETURN TO WEB E-STORE
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 text-slate-500 text-xs py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
          <p className="font-bold text-slate-800">ShopEase Web-Based E-Shopping Store</p>
          <p>© 2026 SLIIT SE2030 Software Engineering — Group Y2.S1.WD.IT.03</p>
          <div className="flex justify-center gap-4 text-[11px] pt-2 font-semibold">
            <button onClick={() => { setSelectedCategory('all'); setActiveTab('shop'); }} className="hover:text-[#f57224]">Store Catalog</button>
            <button onClick={() => setActiveTab('track')} className="hover:text-[#f57224]">Track Order</button>
            <button onClick={() => setActiveTab('support')} className="hover:text-[#f57224]">Customer Support</button>
            <button onClick={() => setActiveTab('proposal')} className="hover:text-[#f57224]">System Architecture</button>
          </div>
        </div>
      </footer>
    </div>
  );
}