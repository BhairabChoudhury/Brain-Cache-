import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FiBell, FiGrid, FiSettings, FiFileText, FiMessageSquare, FiUploadCloud } from 'react-icons/fi';
import { BiBrain } from 'react-icons/bi';

export const Layout = () => {
  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
      isActive
        ? 'bg-indigo-500/10 text-indigo-400'
        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
    }`;

  // Special class for AI Chat
  const aiChatClasses = ({ isActive }) =>
    `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
      isActive
        ? 'bg-[#2a1a4a] text-[#b48cff]'
        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
    }`;

  return (
    <div className="flex h-screen w-screen bg-[#0a0a0c] text-slate-200 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111114] border-r border-white/5 flex flex-col p-5 transition-all duration-300 z-20">
        <div className="flex items-center gap-3 text-xl font-bold text-slate-100 mb-8 px-2">
          <BiBrain className="text-indigo-500 text-2xl" />
          <span> Brain Cache</span>
        </div>

        <nav className="flex flex-col gap-1 grow">
          <div className="text-xs font-semibold text-slate-500 tracking-wider mb-2 mt-2 px-3">LIBRARY</div>

          <NavLink to="/" className={navLinkClasses}>
            <FiGrid className="text-lg" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/notes" className={navLinkClasses}>
            <FiFileText className="text-lg" />
            <span>Notes</span>
          </NavLink>

          <NavLink to="/aichat" className={aiChatClasses}>
            <div className="flex items-center gap-3">
              <FiMessageSquare className="text-lg" />
              <span>AI Chat</span>
            </div>
            <span className="text-xs">✨</span>
          </NavLink>

          <NavLink to="/upload" className={navLinkClasses}>
            <FiUploadCloud className="text-lg" />
            <span>Uploads</span>
          </NavLink>

          <div className="text-xs font-semibold text-slate-500 tracking-wider mb-2 mt-8 px-3">TAGS</div>
          <div className="flex flex-col gap-1">
            {['Ideas','Project Alpha', 'Reading'].map(tag => (
              <div key={tag} className="flex items-center gap-3 px-3 py-1.5 rounded-lg text-sm text-slate-400 font-medium cursor-pointer hover:text-slate-200 hover:bg-white/5">
                <span className="w-2 h-2 rounded-full bg-slate-700"></span>
                {tag}
              </div>
            ))}
          </div>
        </nav>

        <div className="flex flex-col gap-2 mt-auto border-t border-white/5 pt-4">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 font-medium cursor-pointer hover:text-slate-200 hover:bg-white/5">
            <FiSettings className="text-lg" />
            <span>Settings</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-[72px] px-8 flex items-center justify-end border-b border-white/5 bg-[#0a0a0c]/80 backdrop-blur-md z-10 sticky top-0">
          <div className="flex items-center gap-5 ml-4">
            <button className="relative text-slate-400 hover:text-slate-200 transition-colors p-2 rounded-full hover:bg-white/5 cursor-pointer">
              <FiBell className="text-xl" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#0a0a0c]"></span>
            </button>
            <div className="h-8 w-px bg-white/10"></div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:shadow-lg transition-all duration-200">
                BC
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Area for Pages */}
        <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
           <Outlet />
        </div>
      </main>
    </div>
  );
};
