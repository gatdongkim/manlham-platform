import React from 'react';
import { usePaymentStatus } from '../hooks/usePaymentStatus';
import { 
  Loader2, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  Smartphone,
  ChevronRight
} from 'lucide-react';

const PaymentModal = ({ jobId, isOpen, onClose }) => {
    const status = usePaymentStatus(jobId, isOpen);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop with heavy blur */}
            <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md" onClick={status === 'FAILED' ? onClose : undefined}></div>
            
            <div className="relative bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl overflow-hidden">
                
                {/* Status: PENDING (Waiting for PIN) */}
                {status === 'PENDING' && (
                    <div className="text-center animate-in fade-in zoom-in duration-300">
                        <div className="relative mx-auto w-20 h-20 mb-6">
                            <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center text-indigo-600">
                                <Smartphone size={32} />
                            </div>
                        </div>
                        
                        <h2 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">Check Your Phone</h2>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8">
                            We've sent an **M-Pesa STK Push** to your registered number. Please enter your PIN to authorize the <span className="text-indigo-600 font-bold">Escrow Deposit</span>.
                        </p>

                        <div className="bg-gray-50 rounded-2xl p-4 flex items-start gap-3 text-left">
                            <ShieldCheck className="text-emerald-500 shrink-0" size={20} />
                            <p className="text-[11px] text-gray-500 leading-tight">
                                <span className="font-black text-gray-700 block mb-1 uppercase tracking-widest">Escrow Guarantee</span>
                                Your funds are held by SkillLink Nexus and only released to the student once you approve the final delivery.
                            </p>
                        </div>
                    </div>
                )}

                {/* Status: SUCCESS */}
                {status === 'SUCCESS' && (
                    <div className="text-center animate-in slide-in-from-bottom-4 duration-500">
                        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-50">
                            <CheckCircle2 size={40} strokeWidth={2.5} />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Payment Secured</h2>
                        <p className="text-gray-500 text-sm mb-8">Transaction complete. The project has been officially moved to <span className="font-bold text-gray-900">In Progress</span>.</p>
                        
                        <button 
                            onClick={onClose} 
                            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-indigo-700 transition shadow-lg shadow-indigo-100"
                        >
                            Continue to Dashboard <ChevronRight size={18} />
                        </button>
                    </div>
                )}

                {/* Status: FAILED (New State) */}
                {status === 'FAILED' && (
                    <div className="text-center animate-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <XCircle size={40} />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Transaction Failed</h2>
                        <p className="text-gray-500 text-sm mb-8">The request was cancelled or timed out. Please ensure you have sufficient balance and try again.</p>
                        
                        <div className="grid grid-cols-2 gap-3">
                            <button onClick={onClose} className="py-4 rounded-2xl font-bold text-gray-500 bg-gray-50 hover:bg-gray-100 transition">Cancel</button>
                            <button onClick={() => window.location.reload()} className="py-4 rounded-2xl font-bold text-white bg-gray-900 hover:bg-black transition">Retry Now</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentModal;