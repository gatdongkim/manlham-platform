import React from "react";
import { Briefcase } from "lucide-react";

export default function Loader({ 
  label = "Processing...", 
  fullPage = false, 
  variant = "indigo" 
}) {
  const colors = {
    indigo: "border-indigo-600",
    emerald: "border-emerald-500", // Good for payment processing
    white: "border-white"
  };

  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative flex items-center justify-center">
        {/* Outer Spinning Ring */}
        <div className={`w-14 h-14 border-4 ${colors[variant] || colors.indigo} border-t-transparent rounded-full animate-spin`} />
        
        {/* Inner Pulsing Icon */}
        <div className="absolute flex items-center justify-center">
          <div className="animate-pulse text-indigo-600/50">
            <Briefcase size={20} />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <p className="text-sm font-black text-gray-900 tracking-tight">
          {label}
        </p>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">
          Manlham Tech Support
        </p>
      </div>
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-[9999] bg-white/80 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-300">
        {content}
      </div>
    );
  }

  return <div className="py-12 w-full">{content}</div>;
}