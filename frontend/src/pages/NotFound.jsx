import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MoveLeft, Home, Compass, Ghost } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex flex-col items-center justify-center p-6 text-center">
      {/* Visual Element */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-indigo-200 blur-3xl opacity-20 rounded-full animate-pulse"></div>
        <div className="relative flex items-center justify-center w-32 h-32 bg-white rounded-[2.5rem] shadow-xl border border-gray-100">
          <Ghost size={64} className="text-indigo-600" strokeWidth={1.5} />
        </div>
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">
          ERROR 404
        </div>
      </div>

      {/* Text Content */}
      <div className="max-w-md space-y-4 mb-12">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">
          Lost in the Manlham Tech Support?
        </h1>
        <p className="text-gray-500 font-medium leading-relaxed">
          The page you're looking for has moved to another dimension or never existed. Let's get you back to familiar territory.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-gray-100 text-gray-900 rounded-2xl font-black hover:border-indigo-600 transition-all group"
        >
          <MoveLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Go Back
        </button>

        <Link
          to="/"
          className="flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all"
        >
          <Home size={18} />
          Return Home
        </Link>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-8 flex items-center gap-2 text-gray-300">
        <Compass size={16} />
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">
          Manlham Tech Support Navigation
        </span>
      </div>
    </div>
  );
}