import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/http';
import { 
  UploadCloud, ShieldCheck, User, Briefcase, 
  Link as LinkIcon, CheckCircle2, Loader2, PartyPopper, ArrowRight 
} from 'lucide-react';

const ProfileSetup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false); 
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        about: '',
        skills: '',
        category: 'Software Development',
        github: '',
        linkedin: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await api.get('/students/me');
                const profile = data?.data || data;
                if (profile) {
                    setFormData({
                        about: profile.about || '',
                        skills: profile.skills ? profile.skills.join(', ') : '',
                        category: profile.category || 'Software Development',
                        github: profile.github || '',
                        linkedin: profile.linkedin || ''
                    });
                }
            } catch (err) {
                console.log("No existing profile found.");
            } finally {
                setFetching(false);
            }
        };
        fetchProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const dataToSend = new FormData();
        dataToSend.append('about', formData.about);
        dataToSend.append('category', formData.category);
        dataToSend.append('github', formData.github);
        dataToSend.append('linkedin', formData.linkedin);
        
        const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s !== "");
        dataToSend.append('skills', JSON.stringify(skillsArray));

        if (file) {
            dataToSend.append('verificationDoc', file);
        }

        try {
            await api.put('/students/profile', dataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setShowSuccess(true); 
        } catch (err) {
            alert(err.response?.data?.message || "Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Loading Credentials...</p>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto pb-20 p-4 relative">
            
            {/* --- Success Modal Overlay --- */}
            {showSuccess && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-gray-900/60 backdrop-blur-md p-4">
                    <div className="bg-white w-full max-w-md rounded-[3rem] p-10 text-center shadow-2xl border border-indigo-100 animate-in fade-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <PartyPopper size={40} />
                        </div>
                        <h3 className="text-3xl font-black text-gray-900 italic tracking-tight">Profile Sent!</h3>
                        <p className="text-gray-500 text-sm font-medium mt-4 leading-relaxed">
                            Your credentials have been submitted for vetting. You'll receive your <span className="text-indigo-600 font-bold">Verification Badge</span> once approved.
                        </p>
                        
                        <div className="mt-10 space-y-3">
                            <button 
                                onClick={() => navigate('/marketplace')}
                                className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all"
                            >
                                Browse Marketplace <ArrowRight size={16} />
                            </button>
                            <button 
                                onClick={() => navigate('/students/dashboard')}
                                className="w-full bg-white text-gray-400 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:text-gray-600 transition-all"
                            >
                                Go to Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className={`bg-white shadow-sm rounded-[3rem] overflow-hidden border border-gray-100 transition-all ${showSuccess ? 'blur-sm grayscale' : ''}`}>
                {/* Header Banner */}
                <div className="bg-gray-900 p-10 text-white relative overflow-hidden">
                    <div className="absolute right-[-20px] top-[-20px] w-40 h-40 bg-indigo-600 rounded-full blur-[80px] opacity-40"></div>
                    <div className="relative flex justify-between items-center">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Identity Vetting</span>
                            <h2 className="text-4xl font-black italic tracking-tight mt-2">Professional Setup<span className="text-indigo-500">.</span></h2>
                            <p className="text-gray-400 text-xs font-bold mt-2 uppercase tracking-widest">Complete to earn your verification badge</p>
                        </div>
                        <ShieldCheck size={56} className="text-indigo-500 opacity-80" />
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-10 space-y-10">
                    {/* Bio Section */}
                    <div className="space-y-4">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                            <User size={14} className="text-indigo-600" /> Professional Summary
                        </label>
                        <textarea 
                            className="w-full p-6 bg-gray-50 border-none rounded-[2rem] focus:ring-4 focus:ring-indigo-600/5 outline-none transition text-gray-700 font-medium"
                            rows="4"
                            placeholder="Briefly describe your expertise..."
                            value={formData.about}
                            onChange={(e) => setFormData({...formData, about: e.target.value})}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                                <Briefcase size={14} className="text-indigo-600" /> Industry Vertical
                            </label>
                            <select 
                                className="w-full p-5 bg-gray-50 border-none rounded-2xl outline-none font-bold text-gray-700 appearance-none"
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                            >
                                <option>Software Development</option>
                                <option>Graphic Design</option>
                                <option>Writing & Translation</option>
                                <option>Digital Marketing</option>
                            </select>
                        </div>

                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                                <CheckCircle2 size={14} className="text-indigo-600" /> Expertise (Comma separated)
                            </label>
                            <input 
                                type="text" 
                                className="w-full p-5 bg-gray-50 border-none rounded-2xl outline-none font-bold text-gray-700"
                                placeholder="React, Node.js, UI/UX"
                                value={formData.skills}
                                onChange={(e) => setFormData({...formData, skills: e.target.value})}
                                required
                            />
                        </div>
                    </div>

                    {/* Verification Section */}
                    <div className="bg-indigo-50/50 p-8 rounded-[2.5rem] border-2 border-dashed border-indigo-100 group hover:border-indigo-300 transition-colors">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase text-indigo-600 tracking-widest mb-6">
                            <UploadCloud size={16} /> KYC Verification Documents
                        </label>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex-1">
                                <p className="text-sm font-black text-gray-900 italic">Student ID or Passport</p>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight mt-1">Required for secure payments.</p>
                            </div>
                            <input type="file" id="file-upload" className="hidden" onChange={(e) => setFile(e.target.files[0])} accept=".pdf,.jpg,.jpeg,.png" />
                            <label htmlFor="file-upload" className="cursor-pointer bg-gray-900 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all">
                                {file ? 'File Loaded' : 'Upload Document'}
                            </label>
                        </div>
                        {file && (
                            <div className="mt-4 flex items-center gap-2 bg-white w-fit px-4 py-2 rounded-xl border border-indigo-100">
                                <span className="text-[10px] font-black text-indigo-600 uppercase">{file.name}</span>
                            </div>
                        )}
                    </div>

                    {/* Links Section - RESTORED PART */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                                <LinkIcon size={14} className="text-gray-400" /> GitHub URL (Optional)
                            </label>
                            <input 
                                type="url" 
                                className="w-full p-5 bg-gray-50 border-none rounded-2xl outline-none font-medium"
                                placeholder="https://github.com/username"
                                value={formData.github}
                                onChange={(e) => setFormData({...formData, github: e.target.value})}
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                                <LinkIcon size={14} className="text-gray-400" /> LinkedIn URL (Optional)
                            </label>
                            <input 
                                type="url" 
                                className="w-full p-5 bg-gray-50 border-none rounded-2xl outline-none font-medium"
                                placeholder="https://linkedin.com/in/username"
                                value={formData.linkedin}
                                onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-6 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.3em] hover:bg-indigo-500 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3"
                    >
                        {loading ? <Loader2 className="animate-spin" size={18} /> : null}
                        {loading ? 'Transmitting Data...' : 'Submit Profile for Vetting'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfileSetup;