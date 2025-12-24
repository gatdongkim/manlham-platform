import React from 'react';
import { ShieldCheck, Zap, Wallet, CheckCircle, ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import your custom components
import Navbar from '../components/Navbar';
import BackButton from '../components/BackButton';
import SocialLinks from '../components/SocialLinks';

const HowItWorks = () => {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* 1. Navbar (Floating) */}
            <Navbar />

            <main className="flex-grow pt-32 pb-16">
                <div className="max-w-7xl mx-auto px-6">
                    {/* 2. Back Button Integration */}
                    <div className="mb-10">
                        <BackButton text="Go Back" />
                    </div>

                    {/* Hero Section */}
                    <div className="text-center mb-24">
                        <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter mb-6">
                            Trust-Based Freelancing <br />
                            <span className="text-indigo-600 font-serif italic">Built for South Sudan.</span>
                        </h1>
                        <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
                            Manlham Tech Support ensures students get paid for their skills and businesses get quality results through our secure escrow technology.
                        </p>
                    </div>

                    {/* The Process Flow */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                        <StepCard 
                            number="01"
                            icon={<ShieldCheck className="text-indigo-600" size={36} />}
                            title="Vetted Professionals"
                            desc="Every student undergoes a strict ID and skill verification process to earn the 'Blue Badge' of trust."
                        />
                        <StepCard 
                            number="02"
                            icon={<Zap className="text-amber-500" size={36} />}
                            title="Manlham Escrow"
                            desc="When a job starts, the MSME deposits funds into Escrow. The money is held securely, not by the student."
                        />
                        <StepCard 
                            number="03"
                            icon={<Wallet className="text-emerald-500" size={36} />}
                            title="Guaranteed Payout"
                            desc="Once work is submitted and approved, funds are released instantly to the student's mobile money wallet."
                        />
                    </div>

                    {/* Comparison Card */}
                    <div className="max-w-5xl mx-auto bg-gray-900 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden">
                        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-4xl font-black mb-6 tracking-tight">Why use the Platform?</h2>
                                <ul className="space-y-5">
                                    {[
                                        "No more chasing clients for payment",
                                        "Verified local talent only",
                                        "Direct M-Pesa / M-Gurush integration",
                                        "24/7 Dispute resolution support"
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-4 items-center">
                                            <div className="bg-indigo-500/20 p-1 rounded-full">
                                                <CheckCircle className="text-indigo-400" size={20} />
                                            </div>
                                            <span className="font-bold text-gray-200">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/signup-student" className="inline-flex items-center gap-3 mt-10 bg-indigo-600 px-10 py-5 rounded-2xl font-black hover:bg-indigo-500 transition-all hover:scale-105 shadow-xl shadow-indigo-900/20">
                                    Join the Community <ArrowRight size={20} />
                                </Link>
                            </div>
                            <div className="hidden md:flex justify-end opacity-10">
                                <ShieldCheck size={320} strokeWidth={1} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* 3. Integrated Footer */}
            <footer className="bg-gray-50 border-t border-gray-100 pt-20 pb-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 md:col-span-2">
                            <h3 className="text-xl font-black mb-4 tracking-tighter italic">
                                Manlham Tech Support<span className="text-indigo-600">.</span>
                            </h3>
                            <p className="text-gray-500 font-medium max-w-sm mb-6">
                                Empowering South Sudanese students by connecting them with local businesses through secure digital opportunities.
                            </p>
                            <SocialLinks />
                        </div>
                        <div>
                            <h4 className="font-black text-gray-900 mb-6 uppercase text-xs tracking-widest">Platform</h4>
                            <ul className="space-y-4 text-sm font-bold text-gray-500">
                                <li><Link to="/marketplace" className="hover:text-indigo-600 transition">Browse Gigs</Link></li>
                                <li><Link to="/vetting" className="hover:text-indigo-600 transition">Vetting Process</Link></li>
                                <li><Link to="/safety" className="hover:text-indigo-600 transition">Safety & Trust</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-black text-gray-900 mb-6 uppercase text-xs tracking-widest">Support</h4>
                            <ul className="space-y-4 text-sm font-bold text-gray-500">
                                <li><Link to="/help" className="hover:text-indigo-600 transition">Help Center</Link></li>
                                <li><Link to="/disputes" className="hover:text-indigo-600 transition">Dispute Resolution</Link></li>
                                <li><Link to="/contact" className="hover:text-indigo-600 transition">Contact Us</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs font-bold text-gray-400">
                            © 2025 Manlham Tech Support. All rights reserved.
                        </p>
                        <p className="text-xs font-bold text-gray-400 flex items-center gap-1">
                            Made with <Heart size={12} className="text-red-500 fill-current" /> for Juba.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

// Reusable StepCard component with hover effects
const StepCard = ({ number, icon, title, desc }) => (
    <div className="relative p-10 rounded-[3rem] border border-gray-100 bg-gray-50/30 hover:bg-white hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-500 group overflow-hidden">
        <span className="absolute -top-4 -right-2 text-8xl font-black text-gray-100/50 group-hover:text-indigo-50 transition-colors pointer-events-none">
            {number}
        </span>
        <div className="mb-8 relative z-10 p-4 bg-white rounded-2xl inline-block shadow-sm group-hover:scale-110 transition-transform duration-500">
            {icon}
        </div>
        <h3 className="text-2xl font-black text-gray-900 mb-4 relative z-10">{title}</h3>
        <p className="text-gray-500 font-semibold text-sm leading-relaxed relative z-10">{desc}</p>
    </div>
);

export default HowItWorks;