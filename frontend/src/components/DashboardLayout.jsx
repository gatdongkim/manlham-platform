import React, { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom"; 
import Sidebar from "./Sidebar";
import { Menu, Bell, UserCircle, LogOut, Settings, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext"; 

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); 
  const { user, role, logout } = useAuth(); 
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const getSettingsPath = () => {
    switch(role?.toUpperCase()) {
      case 'MSME': return '/client/settings';
      case 'PRO': return '/students/settings';
      default: return '/settings';
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar Container */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <Sidebar role={role} closeMobileMenu={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 lg:hidden hover:bg-gray-50 rounded-xl">
              <Menu size={20} className="text-gray-600" />
            </button>
            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${role?.toUpperCase() === 'ADMIN' ? "bg-red-50 text-red-600" : "bg-indigo-50 text-indigo-600"}`}>
              {role || 'User'} Portal
            </span>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            {/* ✅ FIXED NOTIFICATION BELL: Changed to Link for instant, correct navigation */}
            <Link 
              to="/notification" 
              className="relative p-2 text-gray-400 hover:text-indigo-600 transition-all hover:bg-gray-50 rounded-xl"
            >
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
            </Link>
            
            <div className="h-8 w-[1px] bg-gray-100 hidden md:block"></div>
            
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 group focus:outline-none"
              >
                <div className="text-right hidden md:block">
                  <p className="text-xs font-black text-gray-900 leading-none mb-1">{user?.name || "User"}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Verified {role}</p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-indigo-600 font-black border border-gray-100 overflow-hidden group-hover:border-indigo-200 transition-all">
                  {user?.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : user?.name?.charAt(0).toUpperCase()}
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                  <button 
                    onClick={() => { navigate(getSettingsPath()); setIsProfileOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  >
                    <Settings size={16} /> Settings
                  </button>

                  <button 
                    onClick={() => { logout(); setIsProfileOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors border-t border-gray-50"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Main Section */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 scroll-smooth">
          <div className="max-w-7xl mx-auto min-h-full flex flex-col">
            <div className="flex-1">
              <Outlet />
            </div>
            
            {/* ✅ INTEGRATED FOOTER: Always appears at the bottom of the content */}
            <footer className="mt-20 py-8 border-t border-gray-100">
               <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-300">
                  <p>&copy; 2025 Manlham Tech Support. All Rights Reserved.</p>
                  <div className="flex gap-6">
                    <Link to="/terms" className="hover:text-indigo-600">Terms</Link>
                    <Link to="/privacy-policy" className="hover:text-indigo-600">Privacy</Link>
                  </div>
               </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}