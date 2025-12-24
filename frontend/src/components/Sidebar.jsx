import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { 
  LayoutDashboard, Briefcase, Users, Wallet, MessageCircle, Settings, 
  ShieldAlert, FileText, LogOut, ClipboardList, Search, CheckCircle, 
  PlusSquare, Headphones, Calendar, BarChart3, Percent, ShieldCheck, 
  Gavel, UserCheck, History, Wallet as WalletIcon, Star, CreditCard, Zap, Layers
} from "lucide-react";

export default function Sidebar({ role, closeMobileMenu }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const [hasNewMessage] = useState(true); 

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
      { label: "Manage Work", path: "/client/manage-work", icon: Zap },
      { label: "Applications", path: "/client/applications", icon: Layers },
      { label: "Saved Talent", path: "/client/remember-talent", icon: Star },
      { label: "Payments", path: "/client/payments", icon: CreditCard },
      { label: "Messages", path: "/client/chats", icon: MessageCircle },
      { label: "Support", path: "/client/support", icon: Headphones, badge: true },
    ],
    STAFF: [
      { label: "Staff Portal", path: "/staff/dashboard", icon: LayoutDashboard },
      { label: "My Meetings", path: "/staff/meetings", icon: Calendar },
      { label: "Support Tickets", path: "/staff/support", icon: MessageCircle },
      { label: "User Directory", path: "/staff/users", icon: Users },
      { label: "Verification", path: "/staff/verification", icon: ShieldCheck },
      { label: "Disputes", path: "/staff/disputes", icon: Gavel },
    ],
    ADMIN: [
      { label: "Control Panel", path: "/admin/dashboard", icon: LayoutDashboard },
      { label: "Users", path: "/admin/users", icon: Users },
      { label: "Client Analytics", path: "/admin/analytics", icon: BarChart3 },
      { label: "Revenue Model", path: "/admin/revenue", icon: Percent },
      { label: "Verifications", path: "/admin/verification", icon: CheckCircle },
      { label: "Platform Jobs", path: "/admin/applications", icon: Briefcase },
      { label: "Post Manager", path: "/admin/post", icon: PlusSquare },
      { label: "Payments", path: "/admin/payments", icon: Wallet },
      { label: "Help Desk", path: "/admin/support", icon: Headphones },
      { label: "Audit Logs", path: "/admin/audit", icon: FileText },
      { label: "Disputes", path: "/admin/disputes", icon: ShieldAlert },
      { label: "Staff Requests", path: "/admin/staff-review", icon: UserCheck },
      { label: "Staff Activity", path: "/admin/staff-activity", icon: History },
      { label: "Withdrawals", path: "/admin/withdrawals", icon: WalletIcon },
    ]
  };

  const navLinks = menuConfig[role?.toUpperCase()] || [];

  const handleLogoutClick = () => {
    logout();
    navigate("/login");
    if (closeMobileMenu) closeMobileMenu();
  };

  return (
    <div className="flex flex-col h-full p-6 bg-white">
      
            {/* ✅ Logo Linked to Home Page */}
      <Link 
        to="/" 
        onClick={closeMobileMenu}
        className="flex items-center gap-3 px-2 mb-10 group transition-all duration-200"
      >
        {/* Logo Container - Background and shadow removed to show logo.png clearly */}
        <div className="w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform">
          <img 
            src="/logo.png" 
            alt="Manlham Tech Support Logo" 
            className="w-full h-full object-contain" 
          />
        </div>

        <span className="text-xl font-black text-gray-900 tracking-tighter italic">
          Manlham<span className="text-indigo-600">.</span>
        </span>
      </Link>

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
              className={`
                flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-xs transition-all duration-200 group
                ${isActive 
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-indigo-600"}
              `}
            >
              <div className="flex items-center gap-3">
                <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                {link.label}
              </div>

              {link.badge && hasNewMessage && !isActive && (
                <span className="flex items-center gap-1">
                   <span className="text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100 animate-pulse uppercase tracking-tighter">
                     New
                   </span>
                   <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-100">
        <button 
          onClick={handleLogoutClick}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-2xl font-bold text-xs text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );
}