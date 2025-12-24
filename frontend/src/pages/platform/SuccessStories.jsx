import React from 'react';
import InfoPageLayout from '../../components/InfoPageLayout';
import { Quote, Star, MapPin, Briefcase, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const stories = [
  {
    id: 1,
    title: "Brand Identity for Juba Logistics",
    client: "MSME Founder",
    student: "Deng M.",
    region: "South Sudan",
    category: "Graphic Design",
    payout: "55,000 SSP",
    content: "Through Nexus, I found a student who rebranded our entire fleet in 48 hours. The escrow system gave us total peace of mind.",
    image: "https://images.unsplash.com/photo-1541462608141-ad4d157ee78a?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 2,
    title: "E-commerce Mobile App",
    client: "Tech Start-up",
    student: "Sarah O.",
    region: "Kenya",
    category: "Software Dev",
    payout: "85,000 KES",
    content: "Finding reliable developers used to be a nightmare. We hired Sarah through the platform and the code quality was exceptional.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 3,
    title: "Financial Audit Report",
    client: "Local NGO",
    student: "Emmanuel L.",
    region: "South Sudan",
    category: "Accounting",
    payout: "40,000 SSP",
    content: "The professional matched with us handled our quarterly books with high precision. Payment via m-Gurush was instant.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=200"
  }
];

const SuccessStories = () => (
  <InfoPageLayout title="Success Stories" subtitle="Empowering the Next Generation of Professionals">
    
    {/* Impact Stats Row */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
      <StatBox label="Active Students" value="500+" />
      <StatBox label="Jobs Completed" value="1,200+" />
      <StatBox label="Escrow Secured" value="99.9%" />
      <StatBox label="Avg. Payout" value="24hrs" />
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      {stories.map((story) => (
        <div key={story.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
          <Quote className="absolute right-8 top-8 text-indigo-50 opacity-50 group-hover:text-indigo-100 transition-colors" size={80} />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                {story.category}
              </span>
              <span className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                <MapPin size={12} /> {story.region}
              </span>
            </div>

            <h3 className="text-xl font-black text-gray-900 mb-4">{story.title}</h3>
            
            <p className="text-gray-500 italic leading-relaxed mb-8">
              "{story.content}"
            </p>

            <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={story.image} className="w-12 h-12 rounded-2xl object-cover border-2 border-indigo-50" alt={story.student} />
                <div>
                  <p className="text-sm font-black text-gray-900">{story.student}</p>
                  <p className="text-xs text-gray-400 font-medium">— {story.client}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-[10px] font-black text-emerald-500 uppercase">Payout</p>
                <p className="text-sm font-black text-gray-900">{story.payout}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Call to Action for Students */}
    <div className="mt-16 bg-gray-900 rounded-[3rem] p-12 text-center text-white">
        <TrendingUp className="mx-auto text-indigo-400 mb-4" size={40} />
        <h2 className="text-3xl font-black mb-4">Ready to be our next story?</h2>
        <p className="text-gray-400 max-w-lg mx-auto mb-8 font-medium">Join 500+ students already earning and growing their careers on Manlham Tech Support.</p>
        <Link 
    to="/signup-student" 
    className="inline-block bg-indigo-600 px-10 py-4 rounded-2xl font-black hover:bg-indigo-700 transition shadow-xl shadow-indigo-500/20"
>
    Apply as a Professional
</Link>
    </div>
  </InfoPageLayout>
);

function StatBox({ label, value }) {
  return (
    <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 text-center">
      <p className="text-2xl font-black text-indigo-600">{value}</p>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{label}</p>
    </div>
  )
}

export default SuccessStories;