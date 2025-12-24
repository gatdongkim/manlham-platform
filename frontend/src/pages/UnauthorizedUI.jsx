import React from 'react';
import { ShieldAlert, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UnauthorizedUI = () => {
    // This hook allows the button to programmatically redirect the user
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="max-w-md w-full text-center bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100">
                {/* Visual indicator of access restriction */}
                <div className="w-20 h-20 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <ShieldAlert size={40} />
                </div>
                
                <h1 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight">Access Denied</h1>
                
                <p className="text-gray-500 font-medium mb-8">
                    You do not have the required permissions to view this portal.
                </p>

                {/* ✅ Programmatic redirect to Home ('/') */}
                <button 
                    onClick={() => navigate('/')}
                    className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition shadow-lg flex items-center justify-center gap-2 active:scale-95"
                >
                    <Home size={16} /> Return Home
                </button>
            </div>
        </div>
    );
};

// ✅ Exporting as default so it can be used in your App routes
export default UnauthorizedUI;