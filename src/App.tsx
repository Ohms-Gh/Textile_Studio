/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
const { useState, useMemo, useEffect } = React;
import Fuse from 'fuse.js';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ShoppingBag, 
  Home, 
  Heart, 
  User, 
  ChevronLeft, 
  Share2, 
  MoreHorizontal, 
  Plus, 
  Minus, 
  ShoppingCart, 
  ArrowRight, 
  Check, 
  Truck, 
  MapPin, 
  Headphones, 
  MessageSquare,
  Filter,
  Grid,
  Download,
  Users,
  Sparkles,
  Calculator,
  Leaf,
  Weight,
  Ruler,
  Play,
  Trash2,
  Info,
  Settings,
  CreditCard,
  LogOut,
  Bell,
  Globe,
  Moon,
  Sun
} from 'lucide-react';
import { FABRICS, MOODBOARDS } from './constants';
import { Fabric, Screen, CartItem } from './types';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedFabric, setSelectedFabric] = useState<Fabric | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [history, setHistory] = useState<Screen[]>([]);

  const navigate = (screen: Screen, fabric?: Fabric) => {
    setHistory(prev => [...prev, currentScreen]);
    setCurrentScreen(screen);
    if (fabric) setSelectedFabric(fabric);
  };

  const goBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory(prev => prev.slice(0, -1));
      setCurrentScreen(prev);
    } else {
      setCurrentScreen('home');
    }
  };

  const addToCart = (fabric: Fabric, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.fabric.id === fabric.id);
      if (existing) {
        return prev.map(item => 
          item.fabric.id === fabric.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { fabric, quantity }];
    });
    navigate('cart');
  };

  const removeFromCart = (fabricId: string) => {
    setCart(prev => prev.filter(item => item.fabric.id !== fabricId));
  };

  const updateQuantity = (fabricId: string, delta: number) => {
    setCart(prev => prev.map(item => 
      item.fabric.id === fabricId 
        ? { ...item, quantity: Math.max(0.5, item.quantity + delta) } 
        : item
    ));
  };

  const subtotal = useMemo(() => 
    cart.reduce((acc, item) => acc + (item.fabric.price * item.quantity), 0), 
  [cart]);

  const shipping = 120.00;
  const vat = subtotal * 0.15;
  const total = subtotal + shipping + vat;

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`max-w-md mx-auto min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white relative overflow-hidden flex flex-col font-sans ${darkMode ? 'dark' : ''}`}>
      <AnimatePresence mode="wait">
        {currentScreen === 'home' && (
          <HomeScreen key="home" onNavigate={navigate} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
        )}
        {currentScreen === 'browse' && (
          <BrowseScreen key="browse" onNavigate={navigate} onBack={goBack} />
        )}
        {currentScreen === 'details' && selectedFabric && (
          <DetailsScreen 
            key="details" 
            fabric={selectedFabric} 
            onBack={goBack} 
            onAddToCart={addToCart} 
          />
        )}
        {currentScreen === 'cart' && (
          <CartScreen 
            key="cart" 
            cart={cart} 
            subtotal={subtotal}
            shipping={shipping}
            vat={vat}
            total={total}
            onBack={goBack} 
            onNavigate={navigate}
            onRemove={removeFromCart}
            onUpdateQuantity={updateQuantity}
          />
        )}
        {currentScreen === 'checkout' && (
          <CheckoutScreen 
            key="checkout" 
            total={total}
            onBack={goBack} 
            onConfirm={() => navigate('confirmation')} 
          />
        )}
        {currentScreen === 'confirmation' && (
          <ConfirmationScreen 
            key="confirmation" 
            total={total}
            onNavigate={navigate} 
          />
        )}
        {currentScreen === 'tracking' && (
          <TrackingScreen 
            key="tracking" 
            onBack={goBack} 
          />
        )}
        {currentScreen === 'moodboards' && (
          <MoodboardsScreen 
            key="moodboards" 
            onBack={goBack} 
          />
        )}
        {currentScreen === 'profile' && (
          <ProfileScreen 
            key="profile" 
            onBack={goBack} 
            onNavigate={navigate}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        )}
      </AnimatePresence>

      {/* Bottom Nav */}
      {['home', 'browse', 'moodboards', 'profile'].includes(currentScreen) && (
        <nav className="fixed bottom-0 w-full max-w-md bg-white/95 dark:bg-background-dark/95 border-t border-slate-200 dark:border-white/10 backdrop-blur-lg pb-6 pt-3 px-8 z-50 flex justify-between items-center">
          <button 
            onClick={() => navigate('home')}
            className={`flex flex-col items-center gap-1 ${currentScreen === 'home' ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}
          >
            <Home size={24} fill={currentScreen === 'home' ? 'currentColor' : 'none'} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
          </button>
          <button 
            onClick={() => navigate('browse')}
            className={`flex flex-col items-center gap-1 ${currentScreen === 'browse' ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}
          >
            <Grid size={24} fill={currentScreen === 'browse' ? 'currentColor' : 'none'} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Shop</span>
          </button>
          <button 
            onClick={() => navigate('moodboards')}
            className={`flex flex-col items-center gap-1 ${currentScreen === 'moodboards' ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}
          >
            <Heart size={24} fill={currentScreen === 'moodboards' ? 'currentColor' : 'none'} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Saved</span>
          </button>
          <button 
            onClick={() => navigate('profile')}
            className={`flex flex-col items-center gap-1 ${currentScreen === 'profile' ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}
          >
            <User size={24} fill={currentScreen === 'profile' ? 'currentColor' : 'none'} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Profile</span>
          </button>
        </nav>
      )}
    </div>
  );
}

const HomeScreen: React.FC<{ onNavigate: (s: Screen, f?: Fabric) => void, darkMode: boolean, onToggleDarkMode: () => void }> = ({ onNavigate, darkMode, onToggleDarkMode }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="flex-1 overflow-y-auto no-scrollbar pb-24"
    >
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="p-1"><Plus size={24} className="rotate-45" /></div>
          <h1 className="text-lg font-bold tracking-tight">Fabric Store</h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={onToggleDarkMode}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-500 dark:text-primary"
          >
            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>
          <button onClick={() => onNavigate('cart')} className="relative p-1">
            <ShoppingBag size={24} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
          </button>
        </div>
      </header>

      <section className="px-4 py-4">
        <div className="relative flex items-center group">
          <div className="absolute left-4 text-gray-400">
            <Search size={20} />
          </div>
          <input 
            className="w-full h-12 pl-12 pr-4 bg-white dark:bg-[#1c2624] border-none rounded-xl text-sm focus:ring-2 focus:ring-primary placeholder-gray-400 shadow-sm" 
            placeholder="Search premium silk, linen, wool..." 
            type="text"
          />
        </div>
      </section>

      <section className="px-4 py-2">
        <div className="relative h-72 w-full rounded-xl overflow-hidden group">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `linear-gradient(to top, rgba(17, 33, 29, 0.9), transparent), url('https://lh3.googleusercontent.com/aida-public/AB6AXuA7T21Ivvd6D-TOSGnuMlZERodnmRE_0qgnBmGmuK4x7Hi1b-_CyFiDd6QEKyNEm3h-hZcWY5qbRk1X6Bd56CdFgUicQ3CHeCJqickYmdjQnKKOxEqALS1NZv-xUgymmFGC-L-js2zlZld7vdGv-Up5gGQBNg-vYMm-AJ551DHlNEXI0hSmy10FUWuDJOyMHYhpWvDqAF8reT-Ysk8gostVvRsz_tQ75XtTrwdPvGMeMogCwFHt3kjxwn8iq0x4tRNj8XJ3kvzAzAmc')` }}
          />
          <div className="absolute bottom-0 left-0 p-6 w-full">
            <span className="text-primary text-xs font-bold uppercase tracking-widest mb-2 block">New Collection</span>
            <h2 className="text-3xl font-bold text-white mb-4">Sustainable Linens</h2>
            <button 
              onClick={() => onNavigate('browse')}
              className="bg-primary hover:bg-primary/90 text-background-dark px-6 py-2.5 rounded-lg text-sm font-bold transition-all"
            >
              Shop Collection
            </button>
          </div>
        </div>
      </section>

      <section className="px-4 py-6">
        <div className="grid grid-cols-4 gap-3">
          {[
            { name: 'Silk', icon: <Sparkles size={24} /> },
            { name: 'Cotton', icon: <Leaf size={24} /> },
            { name: 'Wool', icon: <Info size={24} /> },
            { name: 'Linen', icon: <Info size={24} /> }
          ].map((cat) => (
            <div key={cat.name} className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-white dark:bg-[#1c2624] rounded-full flex items-center justify-center border border-gray-100 dark:border-gray-800">
                {cat.icon}
              </div>
              <span className="text-xs font-medium">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-4">
        <div className="px-4 flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Trending Patterns</h3>
          <button className="text-primary text-sm font-medium">View all</button>
        </div>
        <div className="flex overflow-x-auto no-scrollbar gap-4 px-4 pb-2">
          {FABRICS.slice(0, 3).map(fabric => (
            <div key={fabric.id} className="min-w-[160px] w-[160px] flex flex-col gap-2 cursor-pointer" onClick={() => onNavigate('details', fabric)}>
              <div className="h-44 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden relative">
                <img className="w-full h-full object-cover" src={fabric.image} alt={fabric.name} />
                <button className="absolute top-2 right-2 p-1.5 bg-white/20 backdrop-blur-md rounded-full">
                  <Heart size={18} className="text-white" />
                </button>
              </div>
              <div>
                <p className="text-sm font-bold truncate">{fabric.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{fabric.category}</p>
                <p className="text-sm font-bold text-primary mt-1">GH₵ {fabric.price.toFixed(2)}/yd</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-4">
        <div className="px-4 flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">New Arrivals</h3>
          <button className="text-primary text-sm font-medium">Explore</button>
        </div>
        <div className="px-4 grid grid-cols-2 gap-4">
          {FABRICS.slice(3, 5).map(fabric => (
            <div key={fabric.id} className="bg-white dark:bg-[#1c2624] p-3 rounded-xl border border-gray-100 dark:border-gray-800">
              <div className="h-40 rounded-lg overflow-hidden mb-3 cursor-pointer" onClick={() => onNavigate('details', fabric)}>
                <img className="w-full h-full object-cover" src={fabric.image} alt={fabric.name} />
              </div>
              <p className="text-sm font-bold truncate">{fabric.name}</p>
              <p className="text-xs text-primary font-medium mt-1">GH₵ {fabric.price.toFixed(2)}/yd</p>
              <button 
                onClick={() => onNavigate('details', fabric)}
                className="w-full mt-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs font-bold uppercase tracking-wider"
              >
                Add to Bag
              </button>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

const BrowseScreen: React.FC<{ onNavigate: (s: Screen, f?: Fabric) => void, onBack: () => void }> = ({ onNavigate, onBack }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [suggestions, setSuggestions] = React.useState<{ type: 'fabric' | 'category', text: string, item?: Fabric }[]>([]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [activeFilters, setActiveFilters] = React.useState<{
    category: string[];
    color: string[];
    weight: string[];
    drape: string[];
  }>({
    category: [],
    color: [],
    weight: [],
    drape: [],
  });
  const [showFilterSheet, setShowFilterSheet] = React.useState(false);

  const categories = Array.from(new Set(FABRICS.map(f => f.category)));
  const weights = ['Lightweight', 'Medium', 'Heavyweight'];
  const drapes = Array.from(new Set(FABRICS.map(f => f.drape).filter(Boolean)));
  const commonColors = [
    { name: 'Cream', value: '#E5D3B3' },
    { name: 'Navy', value: '#000080' },
    { name: 'Slate', value: '#708090' },
    { name: 'Forest', value: '#043927' },
    { name: 'White', value: '#FFFFFF' },
  ];

  const fuse = useMemo(() => new Fuse(FABRICS, {
    keys: ['name', 'category', 'description', 'material'],
    threshold: 0.3,
    includeScore: true
  }), []);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const results = fuse.search(searchQuery);
      const fabricSuggestions = results.slice(0, 3).map(r => ({ type: 'fabric' as const, text: r.item.name, item: r.item }));
      
      const categorySuggestions = categories
        .filter(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 2)
        .map(cat => ({ type: 'category' as const, text: cat }));

      setSuggestions([...categorySuggestions, ...fabricSuggestions]);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, fuse, categories]);

  const filteredFabrics = useMemo(() => {
    let baseResults = FABRICS;

    if (searchQuery.trim()) {
      const results = fuse.search(searchQuery);
      baseResults = results.map(r => r.item);
    }

    return baseResults.filter(fabric => {
      const matchesCategory = activeFilters.category.length === 0 || activeFilters.category.includes(fabric.category);
      
      const matchesColor = activeFilters.color.length === 0 || 
                          fabric.colors.some(c => activeFilters.color.includes(c));

      const matchesDrape = activeFilters.drape.length === 0 || (fabric.drape && activeFilters.drape.includes(fabric.drape));

      // Simple weight mapping for demo
      const fabricWeight = parseInt(fabric.weight) || 0;
      const weightCategory = fabricWeight < 150 ? 'Lightweight' : fabricWeight < 300 ? 'Medium' : 'Heavyweight';
      const matchesWeight = activeFilters.weight.length === 0 || activeFilters.weight.includes(weightCategory);

      return matchesCategory && matchesColor && matchesWeight && matchesDrape;
    });
  }, [searchQuery, activeFilters, fuse]);

  const toggleFilter = (type: keyof typeof activeFilters, value: string) => {
    setActiveFilters(prev => {
      const current = prev[type];
      const next = current.includes(value) 
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [type]: next };
    });
  };

  const clearFilters = () => {
    setActiveFilters({ category: [], color: [], weight: [], drape: [] });
  };

  const totalActiveFilters = Object.values(activeFilters).flat().length;

  return (
    <motion.div 
      initial={{ x: 300, opacity: 0 }} 
      animate={{ x: 0, opacity: 1 }} 
      exit={{ x: -300, opacity: 0 }}
      className="flex-1 flex flex-col overflow-hidden bg-background-light dark:bg-background-dark"
    >
      <header className="sticky top-0 z-30 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5">
        <div className="flex items-center p-4 pb-2 justify-between">
          <button onClick={onBack} className="flex size-12 shrink-0 items-center justify-start">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center">Browse All Fabrics</h2>
          <div className="flex w-12 items-center justify-end">
            <button onClick={() => onNavigate('cart')} className="flex items-center justify-center rounded-lg h-12 bg-transparent gap-2 p-0 relative">
              <ShoppingBag size={24} />
              <span className="absolute top-2 right-2 size-2 bg-primary rounded-full"></span>
            </button>
          </div>
        </div>
        <div className="px-4 py-2 relative">
          <div className="flex w-full items-stretch rounded-xl h-12 overflow-hidden bg-slate-100 dark:bg-[#293834]">
            <div className="text-slate-400 dark:text-[#9db8b2] flex items-center justify-center pl-4">
              <Search size={20} />
            </div>
            <input 
              className="flex-1 bg-transparent border-none text-slate-900 dark:text-white focus:ring-0 px-3 text-base" 
              placeholder="Search premium fabrics..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
            />
            {searchQuery && (
              <button onClick={() => { setSearchQuery(''); setShowSuggestions(false); }} className="px-3 text-slate-400">
                <Plus size={20} className="rotate-45" />
              </button>
            )}
          </div>

          {/* Auto-suggestions Dropdown */}
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-4 right-4 top-14 bg-white dark:bg-[#1c2624] rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 z-[100] overflow-hidden"
              >
                {suggestions.map((s, i) => (
                  <button 
                    key={`${s.type}-${s.text}-${i}`}
                    onClick={() => {
                      if (s.type === 'fabric' && s.item) {
                        onNavigate('details', s.item);
                      } else {
                        setSearchQuery(s.text);
                      }
                      setShowSuggestions(false);
                    }}
                    className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors border-b border-slate-100 dark:border-white/5 last:border-none"
                  >
                    <div className={`size-8 rounded-lg flex items-center justify-center ${s.type === 'category' ? 'bg-primary/10 text-primary' : 'bg-slate-100 dark:bg-white/10 text-slate-400'}`}>
                      {s.type === 'category' ? <Grid size={16} /> : <Leaf size={16} />}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-bold">{s.text}</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{s.type}</p>
                    </div>
                    <ChevronLeft size={14} className="rotate-180 text-slate-300" />
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Quick Filter Pill Row */}
        <div className="flex gap-3 px-4 py-3 overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setShowFilterSheet(true)}
            className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 border ${totalActiveFilters > 0 ? 'bg-primary/10 border-primary text-primary' : 'bg-white dark:bg-[#293834] border-slate-200 dark:border-white/10'}`}
          >
            <Filter size={16} />
            <p className="text-sm font-bold">Filters {totalActiveFilters > 0 && `(${totalActiveFilters})`}</p>
          </button>
          {categories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => toggleFilter('category', cat)}
              className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition-all ${activeFilters.category.includes(cat) ? 'bg-primary text-background-dark' : 'bg-slate-100 dark:bg-[#293834]'}`}
            >
              <p className="text-sm font-bold">{cat}</p>
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-4 pb-32">
        {filteredFabrics.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Search size={48} className="mb-4 opacity-20" />
            <p className="text-lg font-medium">No fabrics found</p>
            <button onClick={clearFilters} className="mt-2 text-primary font-bold">Clear all filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            {filteredFabrics.map(fabric => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                key={fabric.id} 
                className="flex flex-col gap-3"
              >
                <div className="relative group cursor-pointer" onClick={() => onNavigate('details', fabric)}>
                  <div className="w-full aspect-[4/5] bg-cover rounded-2xl shadow-sm border border-slate-100 dark:border-white/5" style={{ backgroundImage: `url(${fabric.image})` }} />
                  {fabric.isPremium && (
                    <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-md px-2 py-1 rounded-md">
                      <p className="text-[8px] font-black uppercase tracking-tighter text-background-dark">Premium</p>
                    </div>
                  )}
                  <button className="absolute top-3 right-3 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/40 transition-colors">
                    <Heart size={18} className="text-white" />
                  </button>
                </div>
                <div className="px-1">
                  <p className="text-slate-900 dark:text-white text-sm font-bold leading-tight line-clamp-1">{fabric.name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-primary text-sm font-extrabold">GH₵ {fabric.price.toFixed(2)}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{fabric.category}</p>
                  </div>
                  <div className="flex gap-1.5 mt-3">
                    {fabric.colors.slice(0, 3).map(color => (
                      <div key={color} className="size-3.5 rounded-full border border-slate-200 dark:border-white/10 shadow-inner" style={{ backgroundColor: color }} />
                    ))}
                    {fabric.colors.length > 3 && (
                      <p className="text-[9px] text-slate-400 font-bold ml-0.5 self-center">+{fabric.colors.length - 3}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Filter Bottom Sheet Overlay */}
      <AnimatePresence>
        {showFilterSheet && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilterSheet(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white dark:bg-background-dark rounded-t-[32px] z-[70] overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="p-6 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <Filter size={24} className="text-primary" />
                  <h3 className="text-xl font-bold">Advanced Filters</h3>
                </div>
                <button onClick={clearFilters} className="text-sm font-bold text-primary">Reset All</button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
                {/* Categories */}
                <section>
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Material Type</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <button 
                        key={cat}
                        onClick={() => toggleFilter('category', cat)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${activeFilters.category.includes(cat) ? 'bg-primary border-primary text-background-dark' : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </section>

                {/* Colors */}
                <section>
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Color Palette</h4>
                  <div className="grid grid-cols-5 gap-4">
                    {commonColors.map(color => (
                      <button 
                        key={color.value}
                        onClick={() => toggleFilter('color', color.value)}
                        className="flex flex-col items-center gap-2 group"
                      >
                        <div 
                          className={`size-12 rounded-full border-2 transition-all flex items-center justify-center ${activeFilters.color.includes(color.value) ? 'border-primary scale-110 shadow-lg shadow-primary/20' : 'border-transparent'}`}
                          style={{ backgroundColor: color.value }}
                        >
                          {activeFilters.color.includes(color.value) && <Check size={20} className={color.name === 'White' ? 'text-black' : 'text-white'} />}
                        </div>
                        <span className="text-[10px] font-bold text-slate-500">{color.name}</span>
                      </button>
                    ))}
                  </div>
                </section>

                {/* Weight */}
                <section>
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Fabric Weight</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {weights.map(w => (
                      <button 
                        key={w}
                        onClick={() => toggleFilter('weight', w)}
                        className={`py-3 rounded-xl text-xs font-bold border transition-all ${activeFilters.weight.includes(w) ? 'bg-primary border-primary text-background-dark' : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10'}`}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </section>

                {/* Drape */}
                <section>
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Drape & Feel</h4>
                  <div className="flex flex-wrap gap-2">
                    {drapes.map(d => (
                      <button 
                        key={d}
                        onClick={() => toggleFilter('drape', d)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${activeFilters.drape.includes(d) ? 'bg-primary border-primary text-background-dark' : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10'}`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </section>
              </div>

              <div className="p-6 bg-slate-50 dark:bg-white/5 border-t border-slate-100 dark:border-white/5">
                <button 
                  onClick={() => setShowFilterSheet(false)}
                  className="w-full bg-primary text-background-dark font-black py-4 rounded-2xl shadow-xl shadow-primary/20 active:scale-[0.98] transition-all"
                >
                  Show {filteredFabrics.length} Results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40">
        <button 
          onClick={() => setShowFilterSheet(true)}
          className="flex items-center justify-center rounded-full h-14 px-8 bg-primary text-background-dark text-base font-black shadow-2xl gap-3 active:scale-95 transition-transform"
        >
          <Filter size={20} />
          <span className="truncate">Refine Search</span>
        </button>
      </div>
    </motion.div>
  );
};

const DetailsScreen: React.FC<{ fabric: Fabric, onBack: () => void, onAddToCart: (f: Fabric, q: number) => void }> = ({ fabric, onBack, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [projectType, setProjectType] = useState('Full-Length Curtains');
  const [customWidth, setCustomWidth] = useState('');
  const [customHeight, setCustomHeight] = useState('');

  const yardageMap: Record<string, number> = {
    'Full-Length Curtains': 6.5,
    'Upholstered Armchair': 5.0,
    'Dining Table Runner': 1.5,
    'Tailored Blazer': 3.0,
    'Standard Sofa (3-Seater)': 14.0,
    'Accent Pillow (20x20)': 0.75,
    'Evening Gown': 5.5,
    'Custom Dimensions': 0,
  };

  const calculateCustomYardage = () => {
    const w = parseFloat(customWidth) || 0;
    const h = parseFloat(customHeight) || 0;
    if (w === 0 || h === 0) return 0;
    // Basic calculation: (Width * Height) / (Fabric Width * 36 inches per yard)
    // Assuming fabric width is roughly 54-60 inches
    const fabricWidthInches = parseInt(fabric.width) || 54;
    return Math.ceil(((w * h) / (fabricWidthInches * 36)) * 10) / 10;
  };

  const estimatedYardage = projectType === 'Custom Dimensions' 
    ? calculateCustomYardage() 
    : yardageMap[projectType] || 1;
  
  const estimatedCost = estimatedYardage * fabric.price;

  return (
    <motion.div 
      initial={{ y: 300, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      exit={{ y: 300, opacity: 0 }}
      className="flex-1 flex flex-col overflow-y-auto no-scrollbar pb-48"
    >
      <nav className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-3 justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="flex items-center justify-center"><ChevronLeft size={24} /></button>
          <h2 className="text-lg font-bold leading-tight tracking-tight">Fabric Details</h2>
        </div>
        <div className="flex gap-4">
          <Share2 size={24} className="cursor-pointer" />
          <Heart size={24} className="cursor-pointer" />
        </div>
      </nav>

      <div className="px-0 sm:px-4 py-2">
        <div 
          className="relative bg-cover bg-center flex flex-col justify-end overflow-hidden bg-slate-200 dark:bg-slate-800 sm:rounded-xl min-h-[400px]" 
          style={{ backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 40%), url("${fabric.image}")` }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full border border-white/30">
              <Play size={36} className="text-white fill-white" />
            </div>
          </div>
          <div className="flex justify-center gap-2 p-5">
            <div className="h-1.5 w-6 rounded-full bg-primary"></div>
            <div className="size-1.5 rounded-full bg-white/50"></div>
            <div className="size-1.5 rounded-full bg-white/50"></div>
            <div className="size-1.5 rounded-full bg-white/50"></div>
          </div>
        </div>
      </div>

      <div className="px-4 pt-6">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-primary text-xs font-bold uppercase tracking-widest">Premium Collection</span>
            <h1 className="text-2xl font-bold leading-tight mt-1">{fabric.name}</h1>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">GH₵ {fabric.price.toFixed(2)}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">per {fabric.unit}</p>
          </div>
        </div>
        <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed">
          {fabric.description}
        </p>
      </div>

      <div className="px-4 py-6">
        <div className="grid grid-cols-3 gap-4 border-y border-slate-200 dark:border-slate-800 py-6">
          <div className="text-center">
            <Leaf size={24} className="text-primary mx-auto mb-1" />
            <p className="text-[10px] uppercase text-slate-500 font-bold">Fiber</p>
            <p className="text-sm font-semibold">{fabric.fiber}</p>
          </div>
          <div className="text-center">
            <Weight size={24} className="text-primary mx-auto mb-1" />
            <p className="text-[10px] uppercase text-slate-500 font-bold">Weight</p>
            <p className="text-sm font-semibold">{fabric.weight}</p>
          </div>
          <div className="text-center">
            <Ruler size={24} className="text-primary mx-auto mb-1" />
            <p className="text-[10px] uppercase text-slate-500 font-bold">Width</p>
            <p className="text-sm font-semibold">{fabric.width}</p>
          </div>
        </div>
      </div>

      <div className="px-4 pb-6">
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calculator size={24} className="text-primary" />
              <h3 className="font-bold text-lg">Yardage Calculator</h3>
            </div>
            <div className="bg-primary/10 px-2 py-1 rounded text-[10px] font-bold text-primary uppercase">Pro Tool</div>
          </div>
          
          <div className="space-y-5">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Project Type</label>
              <div className="relative">
                <select 
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-sm font-bold focus:ring-2 focus:ring-primary appearance-none transition-all"
                >
                  {Object.keys(yardageMap).map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <ChevronLeft size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none -rotate-90" />
              </div>
            </div>

            {projectType === 'Custom Dimensions' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="grid grid-cols-2 gap-4 pt-1"
              >
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Width (Inches)</label>
                  <input 
                    type="number"
                    value={customWidth}
                    onChange={(e) => setCustomWidth(e.target.value)}
                    placeholder="e.g. 120"
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Height (Inches)</label>
                  <input 
                    type="number"
                    value={customHeight}
                    onChange={(e) => setCustomHeight(e.target.value)}
                    placeholder="e.g. 96"
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary"
                  />
                </div>
              </motion.div>
            )}

            <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 block">Estimated Cost</span>
                <span className="text-xl font-black text-primary">GH₵ {estimatedCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="text-right space-y-1">
                <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 block">Required Yardage</span>
                <span className="text-base font-bold">{estimatedYardage > 0 ? estimatedYardage : '--'} Yards</span>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 italic text-center">
              *Estimates include a 10% allowance for seams and pattern matching.
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-4 pb-12">
        <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-800">
          <span className="text-sm font-medium">Care Instructions</span>
          <span className="text-sm text-slate-500">{fabric.care}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-800">
          <span className="text-sm font-medium">Opacity</span>
          <span className="text-sm text-slate-500">{fabric.opacity}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-800">
          <span className="text-sm font-medium">Drape</span>
          <span className="text-sm text-slate-500">{fabric.drape}</span>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-background-dark/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 px-4 pt-4 pb-8 z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
            <button 
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="size-10 flex items-center justify-center hover:bg-white dark:hover:bg-slate-700 rounded-md transition-colors"
            >
              <Minus size={20} />
            </button>
            <span className="w-8 text-center font-bold">{quantity}</span>
            <button 
              onClick={() => setQuantity(q => q + 1)}
              className="size-10 flex items-center justify-center hover:bg-white dark:hover:bg-slate-700 rounded-md transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
          <button 
            onClick={() => onAddToCart(fabric, quantity)}
            className="flex-1 bg-primary text-background-dark font-bold h-12 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
        <button className="w-full border-2 border-primary/30 text-primary font-bold h-12 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors">
          <Grid size={20} />
          Order Swatch Kit (GH₵ 75.00)
        </button>
      </div>
    </motion.div>
  );
}

const CartScreen: React.FC<{ 
  cart: CartItem[], 
  subtotal: number,
  shipping: number,
  vat: number,
  total: number,
  onBack: () => void, 
  onNavigate: (s: Screen, f?: Fabric) => void,
  onRemove: (id: string) => void,
  onUpdateQuantity: (id: string, d: number) => void
}> = ({ cart, subtotal, shipping, vat, total, onBack, onNavigate, onRemove, onUpdateQuantity }) => {
  return (
    <motion.div 
      initial={{ x: 300, opacity: 0 }} 
      animate={{ x: 0, opacity: 1 }} 
      exit={{ x: -300, opacity: 0 }}
      className="flex-1 flex flex-col overflow-hidden"
    >
      <header className="sticky top-0 z-20 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-4 justify-between border-b border-gray-200 dark:border-white/10">
        <button onClick={onBack} className="text-gray-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Your Shopping Cart</h2>
        <div className="flex w-10 items-center justify-end">
          <p className="text-primary text-base font-bold leading-normal tracking-[0.015em] shrink-0 cursor-pointer">Edit</p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-40">
        <div className="flex flex-col gap-1 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-500">
              <ShoppingBag size={64} className="mb-4 opacity-20" />
              <p>Your cart is empty</p>
              <button onClick={() => onNavigate('browse')} className="mt-4 text-primary font-bold">Browse Fabrics</button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.fabric.id} className="flex gap-4 bg-white dark:bg-white/5 mx-4 p-3 rounded-xl border border-gray-200 dark:border-white/5 justify-between mt-2">
                <div className="flex items-start gap-4">
                  <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-[80px]" style={{ backgroundImage: `url(${item.fabric.image})` }} />
                  <div className="flex flex-1 flex-col justify-center">
                    <p className="text-gray-900 dark:text-white text-base font-semibold leading-tight">{item.fabric.name}</p>
                    <p className="text-gray-500 dark:text-[#9db8b2] text-xs font-normal mt-1">{item.fabric.fiber}</p>
                    <p className="text-primary text-sm font-bold mt-2">GH₵ {item.fabric.price.toFixed(2)} / yard</p>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => onRemove(item.fabric.id)} className="text-gray-400 hover:text-red-400 transition-colors">
                    <Trash2 size={18} />
                  </button>
                  <div className="flex items-center gap-3 text-gray-900 dark:text-white bg-gray-100 dark:bg-[#293834] p-1.5 rounded-full">
                    <button onClick={() => onUpdateQuantity(item.fabric.id, -0.5)} className="flex h-6 w-6 items-center justify-center rounded-full bg-white dark:bg-background-dark shadow-sm cursor-pointer hover:bg-primary hover:text-white transition-all text-xs">-</button>
                    <span className="text-sm font-bold min-w-[20px] text-center">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.fabric.id, 0.5)} className="flex h-6 w-6 items-center justify-center rounded-full bg-white dark:bg-background-dark shadow-sm cursor-pointer hover:bg-primary hover:text-white transition-all text-xs">+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <>
            <div className="mt-4 px-4">
              <div className="bg-gray-100 dark:bg-[#1a2e29] rounded-2xl p-5">
                <h3 className="text-gray-900 dark:text-white font-bold mb-4 text-sm uppercase tracking-wider">Order Summary</h3>
                <div className="flex justify-between gap-x-6 py-2">
                  <p className="text-gray-600 dark:text-[#9db8b2] text-sm font-medium">Subtotal</p>
                  <p className="text-gray-900 dark:text-white text-sm font-bold">GH₵ {subtotal.toLocaleString()}</p>
                </div>
                <div className="flex justify-between gap-x-6 py-2">
                  <p className="text-gray-600 dark:text-[#9db8b2] text-sm font-medium">Estimated Shipping</p>
                  <p className="text-gray-900 dark:text-white text-sm font-bold">GH₵ {shipping.toLocaleString()}</p>
                </div>
                <div className="flex justify-between gap-x-6 py-2 border-b border-gray-300 dark:border-white/10 pb-4">
                  <p className="text-gray-600 dark:text-[#9db8b2] text-sm font-medium">VAT (15%)</p>
                  <p className="text-gray-900 dark:text-white text-sm font-bold">GH₵ {vat.toLocaleString()}</p>
                </div>
                <div className="flex justify-between gap-x-6 pt-4">
                  <p className="text-gray-900 dark:text-white text-lg font-bold">Total</p>
                  <p className="text-primary text-xl font-extrabold">GH₵ {total.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 px-4 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900 dark:text-white font-bold text-base">Recommended for your project</h3>
                <Sparkles size={20} className="text-primary" />
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {[
                  { name: 'Matching Silk Thread', price: 104, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlmWr-3G2pO5fND6jJmbPw7s34yo6HI1zg9wv3SoXBeORfy6tGV_FwhnmnE0vfO-xwnMqxxKyoPz-4LSX57tTqCo8mxOEjetTWZd-mdsSPdi45fQvWAF4VaNs9rEtwG3s1422H1d4pPnOQsWu52-sEtDd3Nl9koe1KV75B1Kre0AtteS0HTFcEJsahGiGXDNTU6QZhBtEhohSbBMN3azADKug6GW0GGUOC3qoGm0HmWa1VYGS2FCTYFRGpP3urRpxp0pti1Ddpy5fM' },
                  { name: 'Silk Finish Needles', price: 64, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnlEzBDJLt31cpLnltBnOGwunHjz0EEtbrBiEOh86kgmUdB4ilT8tITE4hlFM834aGd1O9-0pXHeOl4nRNT3P7n9RUejq3YQPDkiUv0s8xLcjQW0BiYJpmsT149DNtN6Mi0FsWlx3v-8Ep4aNTqKUFXmGp2BuWQwxp4AZC_lUAhfRK2L7SUS_Lg4r2B_eHiIhlhgO4SlGCrJHbhpo4e62SIAy-9OQu-_sWNevdBA8O5x1-rO0W5o2DJ9KvWxhpOX8eJA2pgHY-Mhh6' }
                ].map(rec => (
                  <div key={rec.name} className="min-w-[140px] flex-shrink-0 bg-white/5 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-3">
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg mb-2" style={{ backgroundImage: `url(${rec.image})` }} />
                    <p className="text-gray-900 dark:text-white text-[11px] font-bold leading-tight">{rec.name}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-primary text-xs font-bold">GH₵ {rec.price}</p>
                      <button className="bg-primary/20 p-1 rounded text-primary"><Plus size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      {cart.length > 0 && (
        <footer className="fixed bottom-0 left-0 right-0 z-30 mx-auto max-w-[430px] bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-white/10 p-4 pb-8">
          <button 
            onClick={() => onNavigate('checkout')}
            className="w-full bg-primary hover:bg-primary/90 text-background-dark font-extrabold text-base py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-3"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={20} />
          </button>
        </footer>
      )}
    </motion.div>
  );
}

const CheckoutScreen: React.FC<{ total: number, onBack: () => void, onConfirm: () => void }> = ({ total, onBack, onConfirm }) => {
  const [network, setNetwork] = useState('MTN');

  const networks = [
    { id: 'MTN', name: 'MTN MoMo', color: 'bg-[#FFCC00]', textColor: 'text-black' },
    { id: 'Telecel', name: 'Telecel Cash', color: 'bg-[#E60000]', textColor: 'text-white' },
    { id: 'AT', name: 'AT Money', color: 'bg-[#003399]', textColor: 'text-white' }
  ];

  return (
    <motion.div 
      initial={{ y: 300, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      exit={{ y: 300, opacity: 0 }}
      className="flex-1 flex flex-col overflow-y-auto no-scrollbar pb-48"
    >
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5">
        <div className="flex items-center p-4 justify-between max-w-md mx-auto">
          <button onClick={onBack} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center">Checkout</h2>
          <div className="size-10"></div>
        </div>
      </header>

      <main className="flex-1 px-4 pt-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex-1 h-1.5 bg-primary rounded-full"></div>
          <div className="flex-1 h-1.5 bg-primary rounded-full"></div>
          <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
        </div>

        <h1 className="text-2xl font-black tracking-tight">Secure Payment</h1>
        <p className="text-slate-500 dark:text-[#9db8b2] text-sm mt-1">Choose your preferred Mobile Money network.</p>

        <section className="mt-8">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4 ml-1">Select Network</h3>
          <div className="grid grid-cols-1 gap-3">
            {networks.map(net => (
              <button 
                key={net.id}
                onClick={() => setNetwork(net.id)}
                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${network === net.id ? 'border-primary bg-primary/5 shadow-lg shadow-primary/5' : 'border-slate-100 dark:border-white/5 bg-white dark:bg-white/5'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`size-10 rounded-lg ${net.color} flex items-center justify-center font-black text-[10px] ${net.textColor} shadow-sm`}>
                    {net.id}
                  </div>
                  <p className={`font-bold ${network === net.id ? 'text-primary' : ''}`}>{net.name}</p>
                </div>
                <div className={`size-6 rounded-full border-2 flex items-center justify-center ${network === net.id ? 'border-primary bg-primary' : 'border-slate-200 dark:border-white/10'}`}>
                  {network === net.id && <Check size={14} className="text-background-dark" strokeWidth={4} />}
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <label className="flex flex-col w-full">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-3 ml-1">MoMo Number</h3>
            <div className="flex w-full items-stretch rounded-2xl overflow-hidden border-2 border-slate-100 dark:border-white/5 bg-white dark:bg-white/5 focus-within:border-primary transition-all shadow-sm">
              <div className="flex items-center pl-5 pr-3 text-slate-400 font-black text-sm">+233</div>
              <input 
                className="flex-1 h-16 bg-transparent border-none text-slate-900 dark:text-white p-0 text-lg font-black focus:ring-0" 
                placeholder="2X XXX XXXX" 
                type="tel" 
              />
              <div className="flex items-center px-5 text-slate-300"><User size={20} /></div>
            </div>
          </label>
        </section>

        <section className="mt-8">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-3 ml-1">Delivery Summary</h3>
          <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-4 border border-slate-100 dark:border-white/5">
            <div className="flex items-start gap-4">
              <div className="size-10 rounded-xl bg-white dark:bg-background-dark flex items-center justify-center text-primary shadow-sm border border-slate-100 dark:border-white/5">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-sm font-bold">East Legon, Accra</p>
                <p className="text-xs text-slate-500 mt-0.5">Plot 24, Near Shell Filling Station</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-5">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Order Total</span>
              <span className="text-2xl font-black text-primary">GH₵ {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex items-center gap-3 text-primary/80">
              <Check size={16} strokeWidth={3} />
              <p className="text-[10px] font-bold uppercase tracking-widest">Secure SSL Encrypted Payment</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-xl border-t border-slate-200 dark:border-white/10 p-4 pb-10">
        <div className="max-w-md mx-auto">
          <button 
            onClick={onConfirm}
            className="w-full bg-primary hover:bg-primary/90 text-background-dark font-black text-lg py-5 rounded-2xl shadow-xl shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            <span>Confirm & Pay Now</span>
            <ArrowRight size={20} strokeWidth={3} />
          </button>
          <p className="text-center text-[10px] text-slate-400 dark:text-slate-500 mt-4 font-bold uppercase tracking-widest leading-relaxed">
            By tapping Pay Now, you agree to our <span className="text-primary">Terms of Service</span>
          </p>
        </div>
      </footer>
    </motion.div>
  );
}

const ConfirmationScreen: React.FC<{ total: number, onNavigate: (s: Screen, f?: Fabric) => void }> = ({ total, onNavigate }) => {
  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }} 
      animate={{ scale: 1, opacity: 1 }} 
      className="flex-1 flex flex-col items-center justify-center px-6 text-center pb-20"
    >
      <div className="mb-10 relative flex items-center justify-center">
        {/* Confetti-like particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, x: 0, y: 0 }}
            animate={{ 
              scale: [0, 1, 0], 
              x: (Math.random() - 0.5) * 200, 
              y: (Math.random() - 0.5) * 200,
              rotate: Math.random() * 360
            }}
            transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
            className={`absolute size-3 rounded-sm ${['bg-primary', 'bg-blue-400', 'bg-pink-400', 'bg-yellow-400'][i % 4]}`}
          />
        ))}
        
        <div className="absolute w-32 h-32 bg-primary/20 rounded-full animate-ping"></div>
        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 relative z-10">
          <Check size={56} className="text-background-dark font-black" strokeWidth={4} />
        </div>
      </div>

      <h1 className="text-white tracking-tight text-4xl font-black leading-tight pb-3">Order Confirmed!</h1>
      <p className="text-slate-400 text-base font-medium leading-relaxed pb-10 max-w-[300px]">
        Your exquisite selection is being prepared. We've sent a receipt to your email.
      </p>

      <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 mb-12 shadow-2xl">
        <div className="flex justify-between items-center pb-4 border-b border-white/5">
          <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Order Number</p>
          <p className="text-white text-sm font-black tracking-wider">#GHT-88291</p>
        </div>
        <div className="flex justify-between items-center pt-6">
          <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Total Amount</p>
          <p className="text-primary text-2xl font-black">GH₵ {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4">
        <button 
          onClick={() => onNavigate('tracking')}
          className="w-full h-16 bg-primary text-background-dark font-black rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-95 transition-transform"
        >
          <Truck size={24} strokeWidth={3} />
          Track Your Delivery
        </button>
        <button 
          onClick={() => onNavigate('home')}
          className="w-full h-16 bg-white/5 text-white font-black rounded-2xl border-2 border-white/10 hover:bg-white/10 transition-colors"
        >
          Continue Exploring
        </button>
      </div>
    </motion.div>
  );
}

const TrackingScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <motion.div 
      initial={{ x: 300, opacity: 0 }} 
      animate={{ x: 0, opacity: 1 }} 
      exit={{ x: -300, opacity: 0 }}
      className="flex-1 flex flex-col overflow-y-auto no-scrollbar pb-48"
    >
      <div className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-4 justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="flex size-10 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-lg font-bold leading-tight tracking-tight">Order #GH-7702</h2>
        </div>
        <button className="size-10 flex items-center justify-center">
          <MoreHorizontal size={24} />
        </button>
      </div>

      {/* Map View Section */}
      <div className="relative h-64 w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
        <img 
          src="https://picsum.photos/seed/map-accra/800/600" 
          alt="Delivery Map" 
          className="w-full h-full object-cover opacity-60 grayscale dark:invert"
          referrerPolicy="no-referrer"
        />
        {/* Stylized Map Overlay */}
        <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
        
        {/* Animated Truck on Map */}
        <motion.div 
          initial={{ x: "20%", y: "40%" }}
          animate={{ x: "60%", y: "50%" }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="absolute z-10"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/30 rounded-full animate-ping"></div>
            <div className="bg-primary p-2 rounded-full shadow-lg border-2 border-white dark:border-background-dark">
              <Truck size={20} className="text-white" />
            </div>
          </div>
        </motion.div>

        {/* Destination Marker */}
        <div className="absolute top-1/2 right-[20%] z-10">
          <div className="bg-red-500 p-2 rounded-full shadow-lg border-2 border-white dark:border-background-dark">
            <MapPin size={20} className="text-white" />
          </div>
        </div>

        {/* Floating Carrier Info Card */}
        <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md p-3 rounded-xl shadow-xl border border-white/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Sparkles size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Carrier</p>
              <p className="text-sm font-bold">DHL Express Premium</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Est. Arrival</p>
            <p className="text-sm font-bold text-primary">5:45 PM Today</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-sm uppercase tracking-widest font-bold text-primary">Live Tracking</h3>
          <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-full">
            <div className="size-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold text-green-500 uppercase">On Schedule</span>
          </div>
        </div>

        <div className="grid grid-cols-[40px_1fr] gap-x-2">
          {[
            { title: 'Order Placed', time: '10:30 AM, Oct 12', desc: 'Your order has been confirmed and sent to the warehouse.', done: true },
            { title: 'Processing & Quality Check', time: '02:15 PM, Oct 12', desc: 'Fabric inspected for flaws and yardage verified.', done: true },
            { title: 'Out for Delivery', time: '04:30 PM, Oct 12', desc: 'Package handed over to DHL courier in Accra Central.', current: true },
            { title: 'Delivered', time: 'Expected by 6:00 PM', desc: 'Courier will call upon arrival at East Legon.', pending: true }
          ].map((step, i, arr) => (
            <div key={step.title} className="contents">
              <div className="flex flex-col items-center gap-1">
                <div className={step.done || step.current ? 'text-primary' : 'text-slate-400 dark:text-[#3c534d]'}>
                  {step.done ? (
                    <div className="bg-primary text-white rounded-full p-1.5">
                      <Check size={16} strokeWidth={3} />
                    </div>
                  ) : step.current ? (
                    <div className="bg-primary/20 p-1.5 rounded-full">
                      <Truck size={20} className="text-primary animate-pulse" />
                    </div>
                  ) : (
                    <div className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full">
                      <Info size={20} className="text-slate-400" />
                    </div>
                  )}
                </div>
                {i < arr.length - 1 && (
                  <div className={`w-[2px] h-16 ${step.done ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-800'}`} />
                )}
              </div>
              <div className="flex flex-1 flex-col pb-8">
                <div className="flex justify-between items-start">
                  <p className={`text-base font-bold ${step.current ? 'text-primary' : step.pending ? 'text-slate-400' : ''}`}>{step.title}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{step.time.split(',')[0]}</p>
                </div>
                <p className="text-slate-500 dark:text-[#9db8b2] text-xs mt-1 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-bold mb-4">Delivery Address</h3>
          <div className="flex items-center gap-4 bg-slate-100 dark:bg-primary/10 border border-slate-200 dark:border-primary/20 p-4 rounded-xl">
            <div className="text-primary flex items-center justify-center rounded-lg bg-white dark:bg-background-dark border border-slate-200 dark:border-primary/20 shrink-0 size-12 shadow-sm">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-base font-bold leading-normal">East Legon, Accra</p>
              <p className="text-slate-600 dark:text-[#9db8b2] text-sm leading-normal">Plot 24, Near Shell Filling Station, GA-182-9012</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Order Items</h3>
            <span className="text-xs font-bold text-slate-400 uppercase">2 Items</span>
          </div>
          <div className="space-y-3">
            {FABRICS.slice(0, 2).map(fabric => (
              <div key={fabric.id} className="flex items-center gap-4 bg-white dark:bg-white/5 p-3 rounded-xl border border-slate-100 dark:border-white/10">
                <div className="size-16 rounded-lg overflow-hidden shrink-0 bg-slate-200">
                  <img src={fabric.image} alt={fabric.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold line-clamp-1">{fabric.name}</p>
                  <p className="text-xs text-slate-500 dark:text-[#9db8b2]">6 Yards • Premium Mix</p>
                  <p className="text-sm font-bold text-primary mt-1">GH₵ {fabric.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background-light dark:from-background-dark via-background-light/95 dark:via-background-dark/95 to-transparent z-50">
        <div className="max-w-md mx-auto flex flex-col gap-3">
          <button className="w-full bg-primary hover:bg-primary/90 text-background-dark font-extrabold py-4 px-6 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">
            <Headphones size={20} />
            Contact Support
          </button>
          <button className="w-full border-2 border-primary/30 hover:border-primary text-primary font-extrabold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98]">
            <MessageSquare size={20} />
            Live Chat with Support
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ProfileScreen: React.FC<{ onBack: () => void, onNavigate: (s: Screen, f?: Fabric) => void, darkMode: boolean, onToggleDarkMode: () => void }> = ({ onBack, onNavigate, darkMode, onToggleDarkMode }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col overflow-y-auto no-scrollbar pb-32"
    >
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10">
        <div className="flex items-center p-4 pb-3 justify-between">
          <button onClick={onBack} className="flex size-10 shrink-0 items-center justify-start"><ChevronLeft size={24} /></button>
          <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center">My Profile</h2>
          <button className="flex size-10 items-center justify-end">
            <Settings size={24} className="text-slate-500" />
          </button>
        </div>
      </header>

      <div className="p-6 flex flex-col items-center text-center">
        <div className="relative mb-4">
          <div className="size-24 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
            <img 
              src="https://picsum.photos/seed/profile/200/200" 
              alt="Profile" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <button className="absolute bottom-0 right-0 bg-primary p-2 rounded-full border-2 border-white dark:border-background-dark shadow-lg">
            <Plus size={16} className="text-background-dark" />
          </button>
        </div>
        <h3 className="text-xl font-black">Nhanha Asare</h3>
        <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mt-1">Premium Member</p>
      </div>

      <div className="px-4 space-y-6">
        {/* Account Section */}
        <section>
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 ml-2">Account Details</h4>
          <div className="bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/10 overflow-hidden">
            {[
              { icon: <User size={20} />, label: 'Personal Information', value: 'Nhanha Asare' },
              { icon: <Bell size={20} />, label: 'Notifications', value: 'Enabled' },
              { icon: <CreditCard size={20} />, label: 'Payment Methods', value: 'Visa ending in 4242' },
              { icon: <MapPin size={20} />, label: 'Shipping Address', value: 'East Legon, Accra' }
            ].map((item, i, arr) => (
              <button 
                key={item.label} 
                className={`w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors ${i < arr.length - 1 ? 'border-b border-slate-100 dark:border-white/5' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-primary">{item.icon}</div>
                  <div className="text-left">
                    <p className="text-sm font-bold">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.value}</p>
                  </div>
                </div>
                <ChevronLeft size={16} className="rotate-180 text-slate-300" />
              </button>
            ))}
          </div>
        </section>

        {/* Orders Section */}
        <section>
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 ml-2">Orders & Activity</h4>
          <div className="bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/10 overflow-hidden">
            {[
              { icon: <Truck size={20} />, label: 'Active Orders', value: '1 in transit', action: () => onNavigate('tracking') },
              { icon: <ShoppingBag size={20} />, label: 'Order History', value: '12 completed orders' },
              { icon: <Heart size={20} />, label: 'Wishlist', value: '24 items saved', action: () => onNavigate('moodboards') }
            ].map((item, i, arr) => (
              <button 
                key={item.label} 
                onClick={item.action}
                className={`w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors ${i < arr.length - 1 ? 'border-b border-slate-100 dark:border-white/5' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-primary">{item.icon}</div>
                  <div className="text-left">
                    <p className="text-sm font-bold">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.value}</p>
                  </div>
                </div>
                <ChevronLeft size={16} className="rotate-180 text-slate-300" />
              </button>
            ))}
          </div>
        </section>

        {/* Preferences Section */}
        <section>
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 ml-2">Preferences</h4>
          <div className="bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/10 overflow-hidden">
            {[
              { icon: <Globe size={20} />, label: 'Language', value: 'English (UK)' },
              { icon: <CreditCard size={20} />, label: 'Currency', value: 'GHS (GH₵)' },
              { 
                icon: darkMode ? <Sun size={20} /> : <Moon size={20} />, 
                label: 'Dark Mode', 
                value: darkMode ? 'On' : 'Off',
                action: onToggleDarkMode,
                isToggle: true
              }
            ].map((item, i, arr) => (
              <button 
                key={item.label} 
                onClick={item.action}
                className={`w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors ${i < arr.length - 1 ? 'border-b border-slate-100 dark:border-white/5' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-primary">{item.icon}</div>
                  <div className="text-left">
                    <p className="text-sm font-bold">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.value}</p>
                  </div>
                </div>
                {item.isToggle ? (
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${darkMode ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`}>
                    <motion.div 
                      animate={{ x: darkMode ? 20 : 2 }}
                      className="absolute top-1 left-0 size-3 bg-white rounded-full shadow-sm"
                    />
                  </div>
                ) : (
                  <ChevronLeft size={16} className="rotate-180 text-slate-300" />
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Logout */}
        <button className="w-full flex items-center justify-center gap-3 p-4 bg-red-500/10 text-red-500 rounded-2xl border border-red-500/20 font-bold hover:bg-red-500/20 transition-colors">
          <LogOut size={20} />
          Sign Out
        </button>

        <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest py-4">
          Textile Studio v1.2.4
        </p>
      </div>
    </motion.div>
  );
};

const MoodboardsScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col overflow-hidden"
    >
      <nav className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10">
        <div className="flex items-center p-4 pb-3 justify-between">
          <button onClick={onBack} className="flex size-10 shrink-0 items-center justify-start"><ChevronLeft size={24} /></button>
          <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center">My Moodboards</h2>
          <div className="flex size-10 items-center justify-end">
            <Search size={24} className="text-primary" />
          </div>
        </div>
      </nav>

      <div className="bg-background-light dark:bg-background-dark">
        <div className="flex border-b border-slate-200 dark:border-white/10 px-4 gap-8">
          <button className="border-b-[3px] border-primary text-slate-900 dark:text-white pb-[13px] pt-4 text-sm font-bold">All Projects</button>
          <button className="border-b-[3px] border-transparent text-slate-500 dark:text-[#9db8b2] pb-[13px] pt-4 text-sm font-bold">Personal</button>
          <button className="border-b-[3px] border-transparent text-slate-500 dark:text-[#9db8b2] pb-[13px] pt-4 text-sm font-bold flex items-center gap-1.5">
            Shared <span className="size-2 rounded-full bg-primary"></span>
          </button>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto no-scrollbar p-4 pb-32">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-[#9db8b2]">8 Active Boards</p>
          <div className="flex gap-2">
            <Filter size={20} />
            <Grid size={20} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Create New Board Card */}
          <div className="flex flex-col gap-2 group cursor-pointer">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-slate-100 dark:bg-white/5 border-2 border-dashed border-slate-300 dark:border-white/10 flex flex-col items-center justify-center gap-3 group-hover:border-primary transition-colors">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background-dark transition-all">
                <Plus size={28} strokeWidth={3} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-primary transition-colors">New Board</p>
            </div>
          </div>

          {MOODBOARDS.map(board => (
            <div key={board.id} className="flex flex-col gap-2 group cursor-pointer">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-slate-200 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm group-hover:shadow-md transition-all">
                <div className={`grid ${board.images.length > 1 ? 'grid-cols-2 grid-rows-2' : 'grid-cols-1'} h-full gap-0.5`}>
                  {board.images.map((img, i) => (
                    <div key={i} className="bg-cover bg-center" style={{ backgroundImage: `url(${img})` }} />
                  ))}
                  {board.images.length === 3 && (
                    <div className="bg-primary/20 flex items-center justify-center text-xs font-black text-primary backdrop-blur-sm">+9</div>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                {board.isShared && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white border border-white/20">Shared</span>
                  </div>
                )}
              </div>
              <div className="px-1">
                <h3 className="text-sm font-black leading-tight group-hover:text-primary transition-colors">{board.name}</h3>
                <p className="text-[11px] text-slate-500 dark:text-[#9db8b2] mt-0.5 font-medium">Modified {board.modified} • {board.itemCount} Items</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-slate-200 dark:border-white/10">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 px-2">Board Management</h4>
          <div className="grid grid-cols-4 gap-4">
            {[
              { name: 'Share All', icon: <Share2 size={24} /> },
              { name: 'Export PDF', icon: <Download size={24} /> },
              { name: 'Collab', icon: <Users size={24} /> },
              { name: 'AI Ideas', icon: <Sparkles size={24} /> }
            ].map(action => (
              <div key={action.name} className="flex flex-col items-center gap-3 text-center cursor-pointer group">
                <div className="size-14 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-all border border-transparent group-hover:border-primary/20">
                  {action.icon}
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-primary transition-colors">{action.name.split(' ')[0]}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <div className="fixed bottom-24 right-6 z-50">
        <button className="flex items-center justify-center rounded-2xl h-16 w-16 bg-primary text-background-dark shadow-2xl shadow-primary/40 active:scale-95 transition-transform">
          <Plus size={32} strokeWidth={3} />
        </button>
      </div>
    </motion.div>
  );
}
