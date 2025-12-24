import React, { useState, useEffect } from 'react';
import { Send, User, Search, Circle } from 'lucide-react';
import axios from 'axios';

export default function Chats() {
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState([
    { id: 1, name: "John Client", lastMsg: "Can you update the UI?", online: true },
    { id: 2, name: "Sarah Tech", lastMsg: "The logo looks great!", online: false }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    console.log(`Sending to ${activeChat.name}: ${message}`);
    setMessage("");
  };

  return (
    /* ✅ No DashboardLayout wrapper here: App.jsx handles the shell */
    <div className="flex h-[calc(100vh-140px)] bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
      
      {/* Left Sidebar: Contact List */}
      <div className="w-full md:w-80 border-r border-gray-100 flex flex-col bg-white">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-black text-gray-900 italic mb-4">Messages<span className="text-indigo-600">.</span></h2>
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input 
              type="text" placeholder="Search chats..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm outline-none border border-transparent focus:border-indigo-100 focus:bg-white transition-all"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((chat) => (
            <div 
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className={`p-4 mx-2 my-1 rounded-2xl flex items-center gap-3 cursor-pointer transition-all ${activeChat?.id === chat.id ? 'bg-indigo-50 text-indigo-900' : 'hover:bg-gray-50'}`}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
                  <User className="text-gray-400" />
                </div>
                {chat.online && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-white rounded-full" />}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-black text-sm truncate">{chat.name}</h4>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter truncate">{chat.lastMsg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section: Chat Window */}
      <div className="hidden md:flex flex-1 flex-col bg-[#FBFBFF]">
        {activeChat ? (
          <>
            {/* Header */}
            <div className="p-5 bg-white border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                   <User size={20} />
                </div>
                <div>
                  <h3 className="font-black text-gray-900 text-sm italic">{activeChat.name}</h3>
                  <span className="text-[10px] text-green-500 font-black uppercase tracking-widest">Active Now</span>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-8 overflow-y-auto space-y-6">
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm max-w-md border border-gray-100">
                  <p className="text-sm font-medium text-gray-700">Hi there! Can you update the UI with the new brand colors?</p>
                  <span className="text-[9px] font-black text-gray-300 mt-2 block text-right uppercase">10:45 AM</span>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-indigo-600 p-4 rounded-2xl rounded-tr-none shadow-lg shadow-indigo-100 max-w-md text-white">
                  <p className="text-sm font-medium">Sure thing! I'll have that ready by evening.</p>
                  <span className="text-[9px] font-black text-indigo-200 mt-2 block text-right uppercase">10:48 AM</span>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-6 bg-white border-t border-gray-100">
              <div className="flex gap-3">
                <input 
                  type="text" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message..." 
                  className="flex-1 p-4 bg-gray-50 rounded-2xl outline-none text-sm font-bold border border-transparent focus:border-indigo-100 focus:bg-white transition-all"
                />
                <button type="submit" className="bg-gray-900 text-white p-4 rounded-2xl hover:bg-indigo-600 transition-all shadow-lg shadow-gray-200">
                  <Send size={20} />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-300">
            <div className="w-20 h-20 bg-white rounded-[2rem] shadow-sm flex items-center justify-center mb-6">
              <Send size={32} className="text-indigo-100" />
            </div>
            <p className="font-black uppercase text-[10px] tracking-[0.3em]">Encrypted Workspace</p>
            <p className="text-xs font-bold text-gray-400 mt-2">Select a contact to view communications</p>
          </div>
        )}
      </div>

    </div>
  );
}