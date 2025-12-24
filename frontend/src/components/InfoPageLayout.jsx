import React from 'react';
import BackButton from './BackButton';
// import Navbar from './Navbar'; // If you have a public navbar, use it here!

const InfoPageLayout = ({ title, subtitle, children }) => (
  <div className="min-h-screen bg-gray-50">
    {/* Optional: <Navbar /> */}
    
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="mb-8">
        <BackButton text="Back to Home" to="/" />
      </div>
      
      <div className="mt-8 mb-12">
        <h1 className="text-5xl font-black text-gray-900 mb-3 italic tracking-tighter">
          {title}<span className="text-indigo-600">.</span>
        </h1>
        <p className="text-indigo-600 font-black uppercase tracking-[0.2em] text-[10px]">
          {subtitle}
        </p>
      </div>

      <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm">
        <div className="prose prose-indigo max-w-none text-gray-600 font-medium leading-relaxed">
          {children}
        </div>
      </div>
    </div>
    
    {/* Simple Footer for Legal Pages */}
    <footer className="text-center py-10 text-[10px] font-black uppercase tracking-widest text-gray-400">
      © 2025 Manlham Tech Support Navigation
    </footer>
  </div>
);

export default InfoPageLayout;