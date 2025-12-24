import React, { useState, useEffect } from 'react';
import api from '../../api/http';
import Card from '../../components/Card';
import BackButton from '../../components/BackButton';
import { 
    Wallet as WalletIcon, 
    ArrowUpRight, 
    ArrowDownLeft, 
    Clock, 
    Smartphone,
    CreditCard,
    X,
    ShieldCheck,
    ChevronRight,
    Loader2
} from 'lucide-react';

const Wallet = () => {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [withdrawing, setWithdrawing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [method, setMethod] = useState('M_GURUSH');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        const fetchWalletData = async () => {
            try {
                const { data } = await api.get('/payments/my-history');
                const total = data.reduce((sum, tx) => tx.status === 'SUCCESSFUL' ? sum + tx.amount : sum, 0);
                setBalance(total);
                setTransactions(data);
            } catch (err) {
                console.error("Wallet Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchWalletData();
    }, []);

    const handleWithdrawSubmit = async (e) => {
        e.preventDefault();
        if (!amount || amount > balance) return;

        setWithdrawing(true);
        try {
            await api.post('/payments/withdraw', { amount, method });
            alert(`Withdrawal of SSP ${amount} via ${method} initiated!`);
            setShowModal(false);
            window.location.reload();
        } catch (err) {
            alert("Transaction failed. Contact Staff Support.");
        } finally {
            setWithdrawing(false);
        }
    };

    if (loading) return <div className="p-20 text-center font-black text-indigo-600 animate-pulse uppercase tracking-widest text-xs">Synchronizing Ledger...</div>;

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            <BackButton text="Back to Dashboard" to="/dashboard" />
            
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight italic">Wallet Core<span className="text-indigo-600">.</span></h1>
                    <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px] mt-1">Unified Regional Payments</p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Balance Card */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-gray-900 p-10 rounded-[3rem] shadow-2xl shadow-indigo-100 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 rounded-full blur-3xl group-hover:bg-indigo-600/40 transition-all"></div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-indigo-400">Total Net Earnings</p>
                        <h2 className="text-5xl font-black mb-1 tracking-tighter">
                            <span className="text-xs font-bold mr-2 text-gray-500 uppercase">SSP</span>
                            {balance.toLocaleString()}
                        </h2>
                        <p className="text-[9px] font-bold text-gray-500 mb-8 italic">≈ KSh {(balance * 0.8).toLocaleString()} KES</p>
                        
                        <button 
                            onClick={() => setShowModal(true)}
                            disabled={balance <= 0}
                            className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-900/20 disabled:opacity-30 active:scale-95"
                        >
                            Request Payout
                        </button>
                    </div>

                    <div className="bg-white border border-gray-100 p-6 rounded-[2.5rem] space-y-4 shadow-sm">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                            <ShieldCheck size={14} className="text-emerald-500" /> Security Status
                        </h4>
                        <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                            Your funds are protected by Manlham Escrow. Payouts to <span className="text-gray-900 font-bold">M-Gurush</span> and <span className="text-gray-900 font-bold">MTN</span> are priority.
                        </p>
                    </div>
                </div>

                {/* Transaction History */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                            <h3 className="font-black text-gray-900 italic uppercase text-sm tracking-widest">Activity Feed</h3>
                            <button className="text-[10px] font-black text-indigo-600 uppercase border-b-2 border-indigo-600">Download Statement</button>
                        </div>
                        <div className="p-4 space-y-2">
                            {transactions.length > 0 ? transactions.map((tx) => (
                                <div key={tx._id} className="flex items-center justify-between p-5 hover:bg-gray-50 rounded-[2rem] transition-all group border border-transparent hover:border-gray-100">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                                            tx.type === 'WITHDRAWAL' ? 'bg-gray-900 text-white' : 'bg-indigo-50 text-indigo-600'
                                        }`}>
                                            {tx.type === 'WITHDRAWAL' ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
                                        </div>
                                        <div>
                                            <p className="font-black text-gray-900 text-sm tracking-tight">{tx.job?.title || 'External Payout'}</p>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest flex items-center gap-1">
                                                    <Clock size={10} /> {new Date(tx.createdAt).toLocaleDateString()}
                                                </span>
                                                <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                                                <span className={`text-[9px] font-black uppercase ${tx.status === 'SUCCESSFUL' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                                    {tx.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-black text-lg italic ${tx.type === 'WITHDRAWAL' ? 'text-gray-900' : 'text-indigo-600'}`}>
                                            {tx.type === 'WITHDRAWAL' ? '-' : '+'} {tx.amount.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-20 bg-gray-50/50 rounded-[2rem] m-4 border-2 border-dashed border-gray-100">
                                    <p className="text-xs text-gray-400 font-black uppercase tracking-widest italic">No financial activity yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- WITHDRAWAL MODAL --- */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md z-50 flex items-center justify-center p-6">
                    <div className="bg-white w-full max-w-lg rounded-[3.5rem] overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-300">
                        <button onClick={() => setShowModal(false)} className="absolute top-8 right-8 text-gray-400 hover:text-gray-900 transition-colors">
                            <X size={24} />
                        </button>

                        <form onSubmit={handleWithdrawSubmit} className="p-10 space-y-8">
                            <header className="text-center">
                                <h2 className="text-2xl font-black text-gray-900 italic">Withdraw Funds</h2>
                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Select your preferred destination</p>
                            </header>

                            {/* Method Selection */}
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { id: 'M_GURUSH', label: 'M-Gurush', icon: Smartphone, color: 'text-emerald-600' },
                                    { id: 'MTN_MOMO', label: 'MTN MoMo', icon: Smartphone, color: 'text-yellow-500' },
                                    { id: 'M_PESA', label: 'M-Pesa', icon: Smartphone, color: 'text-red-600' },
                                    { id: 'CARD', label: 'Bank Card', icon: CreditCard, color: 'text-indigo-600' }
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => setMethod(item.id)}
                                        className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                                            method === item.id ? 'border-indigo-600 bg-indigo-50/50 shadow-inner' : 'border-gray-100 hover:border-gray-200'
                                        }`}
                                    >
                                        <item.icon className={item.color} size={20} />
                                        <span className="text-[10px] font-black uppercase tracking-tighter">{item.label}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Amount to Transfer (SSP)</label>
                                <div className="relative">
                                    <input 
                                        type="number" 
                                        value={amount}
                                        max={balance}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0.00"
                                        className="w-full p-6 bg-gray-50 border-none rounded-[2rem] font-black text-2xl text-center outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                        required
                                    />
                                </div>
                                <p className="text-center text-[9px] font-bold text-gray-400 uppercase italic">Max available: SSP {balance.toLocaleString()}</p>
                            </div>

                            <button 
                                type="submit"
                                disabled={withdrawing || !amount || amount > balance}
                                className="w-full py-5 bg-gray-900 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {withdrawing ? <Loader2 className="animate-spin" /> : <ShieldCheck size={18} />}
                                {withdrawing ? 'Verifying Gateway...' : 'Confirm Withdrawal'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Wallet;