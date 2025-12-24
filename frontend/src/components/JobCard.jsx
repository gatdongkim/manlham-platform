import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import { ShieldCheck } from "lucide-react";

export default function JobCard({ job }) {
  const actions = (
    <Link
      to={`/jobs/${job._id}`}
      className="bg-gray-900 text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg shadow-gray-200"
    >
      Apply Now
    </Link>
  );

  return (
    <Card
      title={job.title}
      subtitle={job.category || "General Project"}
      actions={actions}
    >
      <div className="space-y-4">
        <p className="line-clamp-2 font-medium text-gray-500">
          {job.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Budget
            </p>
            <p className="text-2xl font-black text-gray-900">
              <span className="text-xs font-bold text-indigo-600 mr-1 uppercase">
                SSP
              </span>
              {job.budget?.toLocaleString()}
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            <ShieldCheck size={12} />
            <span className="text-[9px] font-black uppercase tracking-tighter">
              Escrow Verified
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
