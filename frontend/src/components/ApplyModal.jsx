import React, { useState } from 'react';
// Import your centralized API instance instead of raw axios
import api from '../api/http'; 

const ApplyModal = ({ job, isOpen, onClose }) => {
    const [proposal, setProposal] = useState('');
    const [bid, setBid] = useState(job?.budget || '');

    if (!isOpen) return null;

    const handleApply = async () => {
        try {
            // Using 'api' ensures the skilllink_token is sent in the headers
            await api.post('/applications', {
                jobId: job._id,
                proposal,
                bidAmount: bid
            });
            alert("Application sent successfully!");
            onClose();
        } catch (err) {
            // Error handling tailored to your http.js interceptor
            alert(typeof err === 'string' ? err : "Failed to apply");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-[2rem] p-8 max-w-lg w-full shadow-2xl border border-gray-100">
                <h2 className="text-2xl font-black text-gray-900 mb-2">Apply for Project</h2>
                <p className="text-indigo-600 font-bold mb-6 text-sm uppercase tracking-wider">{job.title}</p>
                
                <div className="space-y-5">
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Your Proposal</label>
                        <textarea 
                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl h-32 focus:ring-2 focus:ring-indigo-500 outline-none transition resize-none font-medium"
                            placeholder="Explain your relevant experience and how you'll help..."
                            value={proposal}
                            onChange={(e) => setProposal(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Your Bid (KES)</label>
                        <input 
                            type="number" 
                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition font-bold text-indigo-600"
                            value={bid}
                            onChange={(e) => setBid(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button 
                            onClick={handleApply} 
                            className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-black hover:bg-indigo-700 transition shadow-lg shadow-indigo-100"
                        >
                            Submit Application
                        </button>
                        <button 
                            onClick={onClose} 
                            className="flex-1 bg-gray-50 text-gray-500 py-4 rounded-2xl font-bold hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ✅ THE MISSING PIECE: This solves your SyntaxError
export default ApplyModal;