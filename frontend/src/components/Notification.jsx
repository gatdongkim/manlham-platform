import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bell, CreditCard, UserCheck, MessageSquare, Clock, ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const NotificationPage = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNotifications = async () => {
        try {
            // Updated to use the standard API endpoint
            const { data } = await axios.get('/api/v1/notifications');
            setNotifications(data.data || []);
        } catch (error) {
            console.error("Error fetching notifications", error);
            setNotifications([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchNotifications(); }, []);

    // Helper to assign specific colors/icons based on type
    const getIcon = (type) => {
        const baseClass = "p-4 rounded-2xl shadow-sm";
        switch (type) {
            case 'PAYMENT_RECEIVED': return <div className={`${baseClass} bg-emerald-50 text-emerald-600`}><CreditCard size={20} /></div>;
            case 'NEW_APPLICATION': return <div className={`${baseClass} bg-indigo-50 text-indigo-600`}><UserCheck size={20} /></div>;
            case 'MESSAGE': return <div className={`${baseClass} bg-amber-50 text-amber-600`}><MessageSquare size={20} /></div>;
            default: return <div className={`${baseClass} bg-gray-50 text-gray-400`}><Bell size={20} /></div>;
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="animate-spin text-indigo-600 mb-6" size={40} strokeWidth={3} />
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] animate-pulse">Synchronizing Ledger...</p>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto pb-24">
            <header className="mb-12 flex justify-between items-end">
                <div>
                    <button 
                        onClick={() => navigate(-1)} 
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-indigo-600 mb-6 transition-all group"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
                        Return to Portal
                    </button>
                    <h1 className="text-5xl font-black text-gray-900 italic tracking-tight">
                        Alerts Center<span className="text-indigo-600">.</span>
                    </h1>
                </div>
                
                {notifications.length > 0 && (
                    <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-xl border border-indigo-100">
                        <Sparkles size={14} className="text-indigo-600" />
                        <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                            {notifications.length} Updates Found
                        </span>
                    </div>
                )}
            </header>

            <div className="space-y-6">
                {notifications.length === 0 ? (
                    <div className="text-center py-32 bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-500/5">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-100">
                            <Bell className="text-gray-200" size={32} />
                        </div>
                        <p className="font-black text-gray-400 italic text-2xl tracking-tight">Everything is quiet.</p>
                        <p className="text-gray-300 text-[10px] mt-2 font-black uppercase tracking-[0.2em]">We'll ping you when there's an update</p>
                    </div>
                ) : (
                    notifications.map((note) => (
                        <div 
                            key={note._id} 
                            className={`group p-8 rounded-[2.5rem] bg-white border transition-all duration-500 flex gap-8 items-start hover:shadow-2xl hover:shadow-indigo-500/5 hover:-translate-y-1 ${
                                note.isRead ? 'border-gray-50 opacity-60' : 'border-indigo-100 shadow-lg shadow-indigo-100/5'
                            }`}
                        >
                            {getIcon(note.type)}
                            
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className={`font-black text-sm uppercase tracking-widest transition-colors ${note.isRead ? 'text-gray-500' : 'text-gray-900 group-hover:text-indigo-600'}`}>
                                        {note.title}
                                    </h3>
                                    <span className="text-[10px] font-black text-gray-400 flex items-center gap-1.5 uppercase italic opacity-70">
                                        <Clock size={12} /> {formatDistanceToNow(new Date(note.createdAt))} ago
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-2xl">{note.message}</p>
                                
                                {!note.isRead && (
                                    <div className="mt-4 flex items-center gap-2">
                                        <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
                                        <span className="text-[9px] font-black text-indigo-600 uppercase tracking-tighter">New Alert</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Manual Footer to ensure it displays even if layout constraints vary */}
            <footer className="mt-32 pt-12 border-t border-gray-100 flex flex-col items-center gap-4 text-center">
                 <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black italic shadow-lg shadow-indigo-200">M</div>
                 <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">Manlham Tech Support &copy; 2025</p>
            </footer>
        </div>
    );
};

export default NotificationPage;