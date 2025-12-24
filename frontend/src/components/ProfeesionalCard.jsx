import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import VerifiedBadge from './VerifiedBadge';

export default function ProfessionalCard({ pro }) {
  const titleWithBadge = (
    <div className="flex items-center gap-2">
      {pro.user?.name}
      <VerifiedBadge isVetted={pro.isVetted} size={20} />
    </div>
  );

  const actions = (
    <Link 
      to={`/pro/${pro.user?._id}`}
      className="w-full text-center py-3 bg-gray-50 text-gray-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all"
    >
      View Full Profile
    </Link>
  );

  return (
    <Card 
      title={titleWithBadge} 
      subtitle={pro.category || 'Vetted Professional'}
      variant={pro.isVetted ? "primary" : "default"}
      actions={actions}
    >
      <div className="space-y-4">
        <p className="text-sm font-medium text-gray-500 line-clamp-3 leading-relaxed italic">
          "{pro.bio || 'Professional has not updated their bio yet.'}"
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {pro.skills?.slice(0, 3).map((skill, index) => (
            <span key={index} className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[9px] font-black rounded-lg uppercase tracking-wider">
              {skill}
            </span>
          ))}
          {pro.skills?.length > 3 && (
            <span className="text-[9px] font-bold text-gray-400">+{pro.skills.length - 3} More</span>
          )}
        </div>
      </div>
    </Card>
  );
}