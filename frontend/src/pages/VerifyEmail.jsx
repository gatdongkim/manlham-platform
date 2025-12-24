import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle, XCircle, Loader2, ArrowRight } from "lucide-react";
import api from "../api/http";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying"); // verifying, success, error
  const token = searchParams.get("token");

  useEffect(() => {
    const verify = async () => {
      try {
        // Targets the verifyEmail controller in the backend
        await api.get(`/auth/verify-email?token=${token}`);
        setStatus("success");
      } catch (err) {
        setStatus("error");
      }
    };
    if (token) verify();
    else setStatus("error");
  }, [token]);

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-indigo-100 max-w-md w-full border border-gray-50">
        
        {/* State: Initial Loading */}
        {status === "verifying" && (
          <>
            <Loader2 className="mx-auto text-indigo-600 animate-spin mb-6" size={48} />
            <h2 className="text-2xl font-black text-gray-900 italic tracking-tighter">Securing your account...</h2>
            <p className="text-gray-400 mt-2 font-medium">Validating your credentials with our servers.</p>
          </>
        )}

        {/* State: Success - Account is now isVerified: true */}
        {status === "success" && (
          <>
            <div className="w-16 h-16 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={32} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 italic tracking-tighter">Email Verified!</h2>
            <p className="text-gray-500 mt-2 font-medium mb-8">Your Manlham account is now fully activated.</p>
            <Link to="/login" className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all">
              Sign In to Portal <ArrowRight size={16} />
            </Link>
          </>
        )}

        {/* State: Error - Token invalid, expired, or missing */}
        {status === "error" && (
          <>
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <XCircle size={32} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 italic tracking-tighter">Verification Failed</h2>
            <p className="text-gray-500 mt-2 font-medium mb-8">The link is invalid or has expired.</p>
            
            <div className="space-y-4">
              {/* Encourages using the Resend Link feature on the Login page */}
              <Link to="/login" className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all">
                Try Logging In <ArrowRight size={16} />
              </Link>
              
              <Link to="/register" className="block text-gray-400 font-black uppercase tracking-widest text-[10px] hover:underline">
                Back to Registration
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}