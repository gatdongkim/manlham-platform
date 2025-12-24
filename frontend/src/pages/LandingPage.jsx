import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SocialFeed from "../components/SocialFeed"; // Added this import
import { 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  MessageSquare, 
  ArrowRight,
  MousePointer2,
  Rocket
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Blur Decor */}
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-1/2 bg-indigo-50 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/4" />
        
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-indigo-600 text-xs font-black uppercase tracking-widest">
              <Rocket size={14} /> The Future of Work in South Sudan
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 tracking-tighter leading-[1.1]">
              Connect Skills <br />
              <span className="text-indigo-600 italic">With Opportunity.</span>
            </h1>
            
            <p className="text-lg text-gray-500 leading-relaxed max-w-lg">
              Manlham Tech Support empowers students to find high-impact gigs while providing clients with verified, top-tier talent. Secure, fast, and built for growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup-student" className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-indigo-700 transition shadow-xl shadow-indigo-100">
                Join as Student <ArrowRight size={18} />
              </Link>
              <Link to="/signup-client" className="flex items-center justify-center gap-2 bg-white border-2 border-gray-100 text-gray-900 px-8 py-4 rounded-2xl font-black hover:border-indigo-600 transition">
                Hire Talent
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200" />
                ))}
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Trusted by 500+ Students
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                alt="Students collaborating"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Floating Trust Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border border-gray-50 animate-bounce-slow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <p className="text-sm font-black text-gray-900">M-Pesa Escrow</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">100% Secure Payments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 bg-[#F8F9FD]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Why Manlham Tech Support?</h2>
            <p className="text-gray-500 font-medium">We've built a ecosystem designed specifically for the modern workforce.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<CheckCircle2 className="text-indigo-600" />}
              title="Verified Talent"
              desc="Every profile is vetted by our admins to maintain a high standard of quality."
            />
            <FeatureCard 
              icon={<Zap className="text-amber-500" />}
              title="Real Gigs"
              desc="From short-term tasks to long-term internships, find work that fits your schedule."
            />
            <FeatureCard 
              icon={<ShieldCheck className="text-emerald-500" />}
              title="Escrow Protection"
              desc="Funds are held safely and only released once you approve the delivered work."
            />
            <FeatureCard 
              icon={<MessageSquare className="text-blue-500" />}
              title="Seamless Chat"
              desc="Communicate, share files, and manage projects through our integrated chat."
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-indigo-600 rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden">
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-black mb-8 leading-tight">Your journey to <br/> professional growth.</h2>
                <div className="space-y-8">
                  <Step num="01" title="Create your identity" desc="Sign up and build a portfolio that showcases your unique skills." />
                  <Step num="02" title="Match & Collaborate" desc="Apply for jobs or post listings to find the perfect collaborator." />
                  <Step num="03" title="Secure Payout" desc="Get paid instantly via M-Pesa once the milestone is achieved." />
                </div>
              </div>
              <div className="hidden lg:flex justify-center">
                <MousePointer2 size={300} className="text-white/10 -rotate-12" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL FEED - Added here */}
      <SocialFeed />

      {/* CALL TO ACTION */}
      <section className="py-24 text-center">
        <div className="max-w-3xl mx-auto px-6 space-y-8">
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">Ready to bridge the gap?</h2>
          <p className="text-gray-500 text-lg">Join the fastest growing talent network in South Sudan today.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup-student" className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-black transition">
              Get Started Now
            </Link>
            <Link to="/login" className="bg-gray-50 text-gray-900 px-10 py-4 rounded-2xl font-black hover:bg-gray-100 transition">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Sub-components (No changes made here)
function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
      <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="font-black text-gray-900 mb-3 tracking-tight">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function Step({ num, title, desc }) {
  return (
    <div className="flex gap-6">
      <span className="text-4xl font-black text-indigo-300/40 italic">{num}</span>
      <div>
        <h4 className="text-xl font-bold mb-1">{title}</h4>
        <p className="text-indigo-100/70 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}