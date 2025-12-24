import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Send, User, Search, MoreVertical, Paperclip, ArrowLeft, MessageSquare } from "lucide-react";

export default function ClientChat() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [activeChat, setActiveChat] = useState(null);
  const [conversations] = useState([
    { id: 1, studentName: "James Lado", lastMsg: "Wireframes uploaded.", project: "Web App", online: true },
    { id: 2, studentName: "Mary John", lastMsg: "Payment confirmed.", project: "Branding", online: false }
  ]);

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-140px)] flex flex-col">
      <header className="mb-6 flex items-center gap-4">
        <button onClick={() => navigate('/client/dashboard')} className="p-2 bg-white border border-gray-100 rounded-xl shadow-sm hover:bg-gray-50"><ArrowLeft size={20} /></button>
        <h1 className="text-2xl font-black text-gray-900 italic tracking-tight">Messages</h1>
      </header>

      <div className="flex-1 flex bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="w-80 border-r flex flex-col bg-gray-50/20">
          <div className="p-5 border-b bg-white"><input type="text" placeholder="Search..." className="w-full px-4 py-2 bg-gray-100 rounded-xl text-sm border-none focus:ring-2 focus:ring-indigo-500" /></div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((chat) => (
              <div key={chat.id} onClick={() => setActiveChat(chat)} className={`p-5 flex items-center gap-3 cursor-pointer transition ${activeChat?.id === chat.id ? 'bg-white border-l-4 border-indigo-600 shadow-sm' : 'hover:bg-gray-100'}`}>
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 font-bold">{chat.studentName[0]}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-gray-900 truncate">{chat.studentName}</h4>
                  <p className="text-[10px] text-indigo-600 font-black uppercase tracking-tighter">{chat.project}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-white">
          {activeChat ? (
            <>
              <div className="p-5 border-b flex justify-between items-center">
                <div className="flex items-center gap-3"><h3 className="font-black text-gray-900">{activeChat.studentName}</h3></div>
                <MoreVertical size={20} className="text-gray-400" />
              </div>
              <div className="flex-1 p-6 bg-gray-50/30 overflow-y-auto flex flex-col justify-center items-center text-gray-400 italic text-sm">
                Chat History with {activeChat.studentName} would render here.
              </div>
              <form className="p-4 border-t flex gap-2">
                <input placeholder="Type a message..." className="flex-1 bg-gray-50 rounded-2xl px-4 py-3 text-sm outline-none border-none focus:ring-2 focus:ring-indigo-500" />
                <button className="bg-indigo-600 text-white p-3 rounded-2xl shadow-lg"><Send size={20} /></button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-300">
              <MessageSquare size={60} className="mb-4 opacity-20" />
              <p className="font-bold">Select a student to chat</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}