import React, { useState } from "react";
import { Search, MessageSquare, User, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Messages() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [conversations] = useState([
    { id: "1", studentName: "James Lado", lastMsg: "I've completed the first milestone.", time: "2m ago", unread: true, jobTitle: "Frontend Developer", online: true },
    { id: "2", studentName: "Mary John", lastMsg: "Confirming the requirements.", time: "1h ago", unread: false, jobTitle: "UI/UX Designer", online: false }
  ]);

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-160px)] flex flex-col">
      <header className="mb-6">
        <h1 className="text-3xl font-black text-gray-900 italic tracking-tight">Inbox<span className="text-indigo-600">.</span></h1>
        <p className="text-gray-500 font-medium">Communicate with your student talent.</p>
      </header>

      <div className="flex-1 flex bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="w-full md:w-96 border-r border-gray-100 flex flex-col">
          <div className="p-6 border-b border-gray-50">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input 
                type="text" placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-xl text-sm outline-none"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((chat) => (
              <div key={chat.id} onClick={() => navigate(`/client/chats`)} className="p-6 flex items-start gap-4 cursor-pointer hover:bg-gray-50 transition border-b border-gray-50">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-black">{chat.studentName[0]}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center"><h4 className="font-black text-sm text-gray-900">{chat.studentName}</h4><span className="text-[10px] text-gray-400">{chat.time}</span></div>
                  <p className="text-[10px] text-indigo-600 font-black uppercase tracking-tighter">{chat.jobTitle}</p>
                  <p className="text-xs text-gray-500 truncate">{chat.lastMsg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-gray-50/30">
          <MessageSquare size={48} className="text-indigo-100 mb-4" />
          <h3 className="text-lg font-black text-gray-900">Select a Conversation</h3>
          <p className="text-xs text-gray-400 mt-2">Pick a student to start discussing milestones.</p>
        </div>
      </div>
    </div>
  );
}