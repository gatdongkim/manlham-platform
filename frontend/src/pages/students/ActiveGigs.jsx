import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api/http";
import DashboardLayout from "../../components/DashboardLayout";
import Card from "../../components/Card";
import BackButton from "../../components/BackButton";
import SocialLinks from "../../components/SocialLinks";
import {
  Briefcase,
  Clock,
  ExternalLink,
  AlertCircle,
  Loader2,
  Heart,
  CheckCircle2,
} from "lucide-react";

export default function ActiveGigs() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveGigs = async () => {
      try {
        const { data } = await api.get("/students/dashboard-summary");
        // Filter for accepted applications which represent active contracts
        const activeOnly = data.applications.filter(
          (app) => app.status === "ACCEPTED"
        );
        setGigs(activeOnly);
      } catch (err) {
        console.error("Error fetching active gigs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchActiveGigs();
  }, []);

  return (
    <DashboardLayout role="student">
      <div className="max-w-5xl mx-auto">
        {/* Navigation */}
        <div className="mb-6">
          <BackButton text="Back to Dashboard" />
        </div>

        <div className="mb-10">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight italic">
            Active Gigs<span className="text-indigo-600">.</span>
          </h2>
          <p className="text-gray-500 font-semibold mt-1">
            Manage your ongoing deliverables and milestones.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center p-20 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
            <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
            <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-[10px]">
              Accessing Workspace...
            </p>
          </div>
        ) : gigs.length > 0 ? (
          <div className="grid gap-8">
            {gigs.map((gig) => (
              <Card
                key={gig._id}
                title={gig.job.title}
                subtitle="Project in Progress"
                actions={
                  <Link
                    to={`/workspace/${gig.job._id}`}
                    className="flex items-center gap-2 bg-gray-900 text-white px-8 py-3.5 rounded-2xl font-black text-xs hover:bg-indigo-600 transition shadow-lg shadow-indigo-100 active:scale-95"
                  >
                    Enter Workspace <ExternalLink size={14} />
                  </Link>
                }
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-indigo-50 p-4 rounded-2xl text-indigo-600">
                      <Briefcase size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> Started:{" "}
                          {new Date(gig.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-lg font-black text-emerald-600 mt-1">
                        SSP {gig.bidAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Progress Visualization */}
                  <div className="flex-1 max-w-xs w-full">
                    <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                      <span>Completion</span>
                      <span className="text-indigo-600">50%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div className="bg-indigo-500 h-full rounded-full w-1/2 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          /* Empty State using your Card component */
          <Card variant="default">
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-gray-200">
                <AlertCircle size={40} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">
                No active gigs found
              </h3>
              <p className="text-gray-500 font-medium mb-8 max-w-sm mx-auto">
                You haven't been hired for any projects yet. Start applying to
                verified MSMEs to build your portfolio.
              </p>
              <Link
                to="/marketplace" // ✅ Change this from "/jobs" to "/marketplace"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-indigo-700 transition shadow-xl shadow-indigo-100 active:scale-95"
              >
                Browse Marketplace <ExternalLink size={18} />
              </Link>
            </div>
          </Card>
        )}

        {/* Mini Footer */}
        <footer className="mt-24 pt-10 border-t border-gray-100 pb-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h4 className="font-black text-gray-900 italic tracking-tighter">
                Manlham Tech Support<span className="text-indigo-600">.</span>
              </h4>
              <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
                Digital Escrow Protection
              </p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-4">
              <SocialLinks />
              <p className="text-[10px] font-black text-gray-300 flex items-center gap-1 uppercase tracking-widest">
                © 2025 Handcrafted for Juba{" "}
                <Heart size={10} className="text-red-400 fill-current ml-1" />
              </p>
            </div>
          </div>
        </footer>
      </div>
    </DashboardLayout>
  );
}
