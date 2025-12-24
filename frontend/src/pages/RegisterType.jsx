import React from "react";
import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  Briefcase, 
  ArrowRight, 
  ShieldCheck,
  Sparkles,
  Users 
} from "lucide-react";
import BackButton from "../components/BackButton";

export default function RegisterType() {
  return (
    <div className="min-h-screen bg-[#F8F9FD] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        
        <div className="mb-8">
          <BackButton text="Back to Home" to="/" />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4 italic">
            Join the <span className="text-indigo-600">Manlham</span> Ecosystem<span className="text-indigo-600">.</span>
          </h1>
          <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.3em]">Select your path to continue</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Student Card */}
          <Link
            to="/signup-student"
            className="group relative bg-white border-2 border-transparent hover:border-indigo-600 rounded-[3rem] p-10 shadow-xl shadow-indigo-100/30 transition-all duration-500 hover:-translate-y-3"
          >
            <div className="w-16 h-16 bg-gray-50 text-indigo-600 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 group-hover:rotate-6">
              <GraduationCap size={36} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-3 tracking-tight italic">I'm a Student</h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-8 font-medium">
              Showcase your technical skills, bid on local gigs, and build your professional portfolio while earning.
            </p>
            <div className="flex items-center gap-3 text-indigo-600 font-black text-[10px] uppercase tracking-widest">
              Launch Career <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </div>
            
            <div className="mt-10 pt-8 border-t border-gray-50 flex flex-wrap gap-2">
              <span className="text-[9px] font-black bg-indigo-50 text-indigo-400 px-3 py-1.5 rounded-xl uppercase tracking-wider">Earn & Learn</span>
              <span className="text-[9px] font-black bg-indigo-50 text-indigo-400 px-3 py-1.5 rounded-xl uppercase tracking-wider">Verified Profile</span>
            </div>
          </Link>

          {/* Client Card */}
          <Link
            to="/signup-client"
            className="group relative bg-white border-2 border-transparent hover:border-indigo-600 rounded-[3rem] p-10 shadow-xl shadow-indigo-100/30 transition-all duration-500 hover:-translate-y-3"
          >
            <div className="w-16 h-16 bg-gray-50 text-indigo-600 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 group-hover:-rotate-6">
              <Briefcase size={32} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-3 tracking-tight italic">I'm a Client</h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-8 font-medium">
              Hire vetted student talent for your projects, manage workflows, and pay securely via Escrow.
            </p>
            <div className="flex items-center gap-3 text-indigo-600 font-black text-[10px] uppercase tracking-widest">
              Post a Project <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </div>

            <div className="mt-10 pt-8 border-t border-gray-50 flex flex-wrap gap-2">
              <span className="text-[9px] font-black bg-indigo-50 text-indigo-400 px-3 py-1.5 rounded-xl uppercase tracking-wider">Secure Escrow</span>
              <span className="text-[9px] font-black bg-indigo-50 text-indigo-400 px-3 py-1.5 rounded-xl uppercase tracking-wider">Verified Talent</span>
            </div>
          </Link>

        </div>

        {/* --- Internal Staff Onboarding Section --- */}
        <div className="mt-10 p-8 bg-white border-gray-100 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm border-dashed border-2 hover:border-indigo-100 transition-colors">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-gray-200">
              <Users size={24} />
            </div>
            <div>
              <h4 className="text-[12px] font-black text-gray-900 leading-none mb-2 uppercase tracking-tight">Support & Management?</h4>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest italic">Internal staff security access only</p>
            </div>
          </div>
          <Link 
            to="/signup-staff" 
            className="w-full md:w-auto text-center text-[10px] font-black uppercase tracking-widest bg-gray-50 text-gray-400 px-8 py-4 rounded-2xl hover:bg-gray-900 hover:text-white transition-all active:scale-95"
          >
            Staff Portal
          </Link>
        </div>

        <div className="mt-16 text-center">
          <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
            Already registered?{" "}
            <Link
              to="/login"
              className="text-indigo-600 hover:underline ml-1"
            >
              Sign In
            </Link>
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-8 opacity-20 grayscale">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} />
              <span className="text-[9px] font-black uppercase tracking-widest">SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles size={18} />
              <span className="text-[9px] font-black uppercase tracking-widest">M-Pesa Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}