import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ text = "Back", className = "" }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`
        group flex items-center gap-2 px-3 py-1.5 -ml-3
        text-gray-500 font-bold text-sm
        hover:text-indigo-600 hover:bg-indigo-50/50 
        rounded-xl transition-all duration-200
        ${className}
      `}
    >
      <div className="p-1 rounded-lg bg-white border border-gray-100 shadow-sm group-hover:border-indigo-100 group-hover:shadow-indigo-50 transition-all">
        <ArrowLeft size={16} strokeWidth={3} />
      </div>
      <span className="tracking-tight">{text}</span>
    </button>
  );
}