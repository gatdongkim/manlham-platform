import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Briefcase, Menu, X, ArrowRight, UserPlus } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Don't show this landing navbar if the user is in a dashboard
  if (location.pathname.startsWith("/admin") || 
      location.pathname.startsWith("/students") || // Fixed to match your App.jsx routes
      location.pathname.startsWith("/client") ||
      location.pathname.startsWith("/staff")) {
    return null;
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/80 backdrop-blur-md border-b border-gray-100 py-3" : "bg-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

      <Link to="/" className="flex items-center gap-2.5 group">
  {/* Logo Container - Background and shadow removed */}
  <div className="w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform">
    <img 
      src="/logo.png" 
      alt="Manlham Tech Support Logo" 
      className="w-full h-full object-contain" 
    />
  </div>

  {/* Text Branding */}
  <span className="text-xl font-black text-gray-900 tracking-tighter italic">
    Manlham Tech Support<span className="text-indigo-600">.</span>
  </span>
</Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/how-it-works" className="text-sm font-bold text-gray-600 hover:text-indigo-600 transition">How it Works</Link>
          <Link to="/marketplace" className="text-sm font-bold text-gray-600 hover:text-indigo-600 transition">Browse Gigs</Link>
          
          <div className="h-6 w-[1px] bg-gray-200 mx-2" />
          
          <Link to="/login" className="text-sm font-bold text-gray-600 hover:text-indigo-600 transition">
            Sign In
          </Link>
          
          {/* ✅ UPDATED: Links to RegisterType gateway */}
          <Link 
            to="/register" 
            className="bg-gray-900 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-100 transition-all active:scale-95"
          >
            Create Account <ArrowRight size={16} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-gray-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300 shadow-xl">
          <Link to="/how-it-works" className="text-sm font-black uppercase tracking-widest text-gray-900" onClick={() => setMobileMenuOpen(false)}>How it Works</Link>
          <Link to="/marketplace" className="text-sm font-black uppercase tracking-widest text-gray-900" onClick={() => setMobileMenuOpen(false)}>Browse Gigs</Link>
          <hr className="border-gray-50" />
          <Link to="/login" className="text-sm font-black uppercase tracking-widest text-gray-500" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
          
          {/* ✅ UPDATED: Mobile Link to RegisterType */}
          <Link 
            to="/register" 
            className="bg-indigo-600 text-white p-4 rounded-2xl text-center text-[10px] font-black uppercase tracking-[0.2em]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Join the Network
          </Link>
        </div>
      )}
    </nav>
  );
}