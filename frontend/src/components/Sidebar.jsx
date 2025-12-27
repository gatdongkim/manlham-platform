import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../api/http";
import { 
  LayoutDashboard, Briefcase, Users, Wallet, MessageCircle, Settings, 
  ShieldAlert, FileText, LogOut, ClipboardList, Search, CheckCircle, 
  PlusSquare, Headphones, Calendar, BarChart3, Percent, ShieldCheck, 
  Gavel, UserCheck, History, Wallet as WalletIcon, Star, CreditCard, Zap, Layers,
  Bug // ✅ Added for debugging
} from "lucide-react";

export default function Sidebar({ role, closeMobileMenu }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth(); // ✅ Extract user to verify ID
  
  const [hasNewMessage] = useState(true); 
  const [latestJobId, setLatestJobId] = useState(null);
  const [debugInfo, setDebugInfo] = useState({ count: 0, status: 'idle' });

  useEffect(() => {
    if (role?.toUpperCase() === "MSME") {
      const fetchLatest = async () => {
        setDebugInfo(prev => ({ ...prev, status: 'fetching...' }));
        try {
          const res = await api.get('/client/jobs');
          const jobs = res.data.data || res.data;
          
          if (Array.isArray(jobs) && jobs.length > 0) {
            setLatestJobId(jobs[0]._id);
            setDebugInfo({ count: jobs.length, status: 'Jobs Found' });
          } else {
            setDebugInfo({ count: 0, status: 'No Jobs in DB for this user' });
          }
        } catch (err) {
          console.error("Sidebar link fetch failed:", err);
          setDebugInfo({ count: 0, status: 'API Error' });
        }
      };
      fetchLatest();
    }
  }, [role]);

  // ... (menuConfig remains the same)
  const menuConfig = {
    PRO: [
      { label: "Dashboard", path: "/students/dashboard", icon: LayoutDashboard },
      { label: "Find Jobs", path: "/marketplace", icon: Search },
      { label: "My Bids", path: "/students/applications", icon: ClipboardList },
      { label: "Earnings", path: "/students/wallet", icon: Wallet },
      { label: "Messages", path: "/students/chats", icon: MessageCircle },
      { label: "Profile", path: "/students/profile-setup", icon: Settings },
    ],
    MSME: [
      { label: "Dashboard", path: "/client/dashboard", icon: LayoutDashboard },
      { label: "Post a Job", path: "/client/post-job", icon: PlusSquare },
      { label: "My Projects", path: "/client/jobs", icon: Briefcase },
      { 
        label: "Manage Work", 
        path: latestJobId ? `/client/manage-work/${latestJobId}` : "/client/manage-work", 
        icon: Zap 
      },
      { 
        label: "Applications", 
        path: latestJobId ? `/client/applications/${latestJobId}` : "/client/applications", 
        icon: Layers 
      },
      { label: "Saved Talent", path: "/client/remember-talent", icon: Star },
      { label: "Payments", path: "/client/payments", icon: CreditCard },
      { label: "Messages", path: "/client/chats", icon: MessageCircle },
      { label: "Support", path: "/client/support", icon: Headphones, badge: true },
    ],
    // ... STAFF and ADMIN configs
  };

  const navLinks = menuConfig[role?.toUpperCase()] || [];

  const handleLogoutClick = () => {
    logout();
    navigate("/login");
    if (closeMobileMenu) closeMobileMenu();
  };

  return (
    <div className="flex flex-col h-full p-6 bg-white">
      <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-3 px-2 mb-10 group transition-all duration-200">
        <div className="w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform">
          <img src="/logo.png" alt="Manlham Logo" className="w-full h-full object-contain" />
        </div>
        <span className="text-xl font-black text-gray-900 tracking-tighter italic">
          Manlham<span className="text-indigo-600">.</span>
        </span>
      </Link>

      {/* ✅ DEBUG PANEL: Only visible during testing */}
      {role === "MSME" && (
        <div className="mb-6 p-3 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <Bug size={10} /> Sync Status
          </p>
          <p className="text-[10px] font-bold text-indigo-600 mt-1">{debugInfo.status}</p>
          <p className="text-[10px] text-gray-500 font-medium">Found: {debugInfo.count} projects</p>
        </div>
      )}

      <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2 mb-4 italic">
          {role} Menu
        </p>
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname.startsWith(link.path);

          return (
            <Link
              key={link.path}
              to={link.path}
              onClick={closeMobileMenu}
              className={`flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-xs transition-all duration-200 group
                ${isActive ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "text-gray-500 hover:bg-gray-50 hover:text-indigo-600"}`}
            >
              <div className="flex items-center gap-3">
                <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                {link.label}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-100">
        <button onClick={handleLogoutClick} className="flex items-center gap-3 px-4 py-3 w-full rounded-2xl font-bold text-xs text-red-500 hover:bg-red-50 transition-colors">
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );
}