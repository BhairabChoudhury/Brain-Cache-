import React, { useState } from "react";
import { NoteCard } from "../../components/NoteCard.jsx"
import {
  FiSearch, FiBell, FiPlus, FiGrid, FiSettings,
  FiFileText, FiTag, FiClock, FiMessageSquare,
  FiUploadCloud, FiUpload, FiSend, FiImage, FiFile
} from "react-icons/fi";
import { BiBrain } from "react-icons/bi";
import { Notes } from "../Notes.jsx";

// Mock Data
const mockStats = {
  totalNotes: 142,
  documents: 28,
  imagesUploaded: 15
};

const mockNotes = [
  {
    id: 1,
    title: "Product Launch Strategy",
    preview: "Focus on early access users first. Send out the beta invitations by Tuesday and gather feedback before...",
    tags: ["Strategy", "Marketing"],
    date: "2h ago"
  },
  {
    id: 2,
    title: "System Architecture V2",
    preview: "Moving towards a microservices approach. Need to evaluate Kubernetes vs. Docker Swarm for the container...",
    tags: ["Engineering"],
    date: "5h ago"
  },
  {
    id: 3,
    title: "Q3 Feature Ideas",
    preview: "1. AI auto-tagging 2. Semantic search 3. PDF text extraction 4. Voice memo transcription...",
    tags: ["Product", "Ideas"],
    date: "1d ago"
  },
  {
    id: 4,
    title: "Meeting with Design Team",
    preview: "Discussed the new dashboard layout. Decisions: minimalist dark mode, accent color primary indigo...",
    tags: ["Meeting"],
    date: "2d ago"
  }
];

const mockUploads = [
  { id: 1, name: "Q2_Financial_Report.pdf", type: "pdf", date: "Today, 10:30 AM" },
  { id: 2, name: "Architecture_Diagram.png", type: "image", date: "Yesterday" },
  { id: 3, name: "User_Research_Notes.docx", type: "doc", date: "Aug 12" },
];

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [captureTitle, setCaptureTitle] = useState("");
  const [captureContent, setCaptureContent] = useState("");

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return <FiFile className="text-red-400" />;
      case 'image': return <FiImage className="text-blue-400" />;
      default: return <FiFileText className="text-indigo-400" />;
    }
  };

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

          <div
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${activeTab === 'dashboard' ? 'bg-indigo-500/10 text-indigo-400' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <FiGrid className="text-lg" />
            <span>Dashboard</span>
          </div>

          <div
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${activeTab === 'notes' ? 'bg-indigo-500/10 text-indigo-400' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
            onClick={() => setActiveTab('notes')}
          >
            <FiFileText className="text-lg" />
            <span>Notes</span>
          </div>

          <div
            className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${activeTab === 'aichat' ? 'bg-[#2a1a4a] text-[#b48cff]' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
            onClick={() => setActiveTab('aichat')}
          >
            <div className="flex items-center gap-3">
              <FiMessageSquare className="text-lg" />
              <span>AI Chat</span>
            </div>
            <span className="text-xs">✨</span>
          </div>
          <div
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${activeTab === 'upload' ? 'bg-indigo-500/10 text-indigo-400' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
            onClick={() => setActiveTab('upload')}
          >
            <FiUploadCloud className="text-lg" />
            <span>Uploads</span>
          </div>

          <div className="text-xs font-semibold text-slate-500 tracking-wider mb-2 mt-8 px-3">TAGS</div>
          <div className="flex flex-col gap-1">
            {['Ideas', 'Project Alpha', 'Reading'].map(tag => (
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

          {/* Right Actions */}
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

        {/* Dashboard Content Scrollable Area */}
        <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
          {activeTab === 'dashboard' && (
            <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8">

            {/* Left Column (Main Focus) */}
            <div className="flex-1 flex flex-col gap-8 min-w-0">

              {/* 1. Quick Capture (Top Priority) */}
              <section>
                <div className="bg-[#111114] border border-white/[0.06] rounded-2xl p-1 shadow-sm transition-all focus-within:border-indigo-500/30 focus-within:shadow-[0_4px_20px_rgba(99,102,241,0.05)] focus-within:bg-[#151519]">
                  <div className="p-4 pl-5">
                    <input
                      type="text"
                      value={captureTitle}
                      onChange={(e) => setCaptureTitle(e.target.value)}
                      placeholder="Note title (optional)"
                      className="bg-transparent border-none text-slate-200 text-lg font-semibold outline-none w-full placeholder-slate-600 mb-2"
                    />
                    <textarea
                      value={captureContent}
                      onChange={(e) => setCaptureContent(e.target.value)}
                      placeholder="Write anything to save to your brain..."
                      className="bg-transparent border-none text-slate-300 text-[15px] outline-none w-full lg:h-20 resize-none placeholder-slate-500 leading-relaxed custom-scrollbar"
                    />
                  </div>
                  <div className="flex items-center justify-between px-4 py-3 bg-[#16161a] rounded-xl border-t border-white/[0.04] mt-2">
                    <div className="flex gap-2">
                      <button className="text-slate-400 hover:text-slate-200 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer" title="Add tags">
                        <FiTag className="text-md" />
                      </button>
                      <button className="text-slate-400 hover:text-slate-200 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer" title="Attach file">
                        <FiUpload className="text-md" />
                      </button>
                    </div>
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-sm">
                      Save Note <div className="hidden sm:inline text-indigo-200 text-xs ml-1">⌘Enter</div>
                    </button>
                  </div>
                </div>
              </section>

              {/* 5. Activity / Insights */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#111114] border border-white/[0.04] rounded-xl p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <FiFileText className="text-lg" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">Total Notes</p>
                    <p className="text-xl font-bold text-slate-100">{mockStats.totalNotes}</p>
                  </div>
                </div>
                <div className="bg-[#111114] border border-white/[0.04] rounded-xl p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                    <FiUploadCloud className="text-lg" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">Documents</p>
                    <p className="text-xl font-bold text-slate-100">{mockStats.documents}</p>
                  </div>
                </div>
                <div className="bg-[#111114] border border-white/[0.04] rounded-xl p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <FiImage className="text-lg" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">Images Upload</p>
                    <p className="text-xl font-bold text-slate-100">{mockStats.imagesUploaded}</p>
                  </div>
                </div>
              </section>

              {/* 2. Recent Notes */}
              <section>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
                    <FiClock className="text-slate-400" />
                    Recent Notes
                  </h2>
                  <button className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer">
                    View all
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockNotes.map(note => (
                    <NoteCard key={note.id} note={note} />
                  ))}
                </div>
              </section>

            </div>

            {/* Right Column (Secondary / AI features) */}
            <div className="lg:w-80 flex flex-col gap-8 shrink-0">



              {/* 4. Uploaded Documents */}
              <section>
                <div className="flex items-center justify-between mb-4 px-1">
                  <h2 className="text-[15px] font-semibold text-slate-100 flex items-center gap-2">
                    <FiUploadCloud className="text-slate-400" />
                    Recent Uploads
                  </h2>
                  <button className="text-slate-400 hover:text-slate-200 transition-colors p-1 rounded cursor-pointer">
                    <FiPlus />
                  </button>
                </div>

                <div className="bg-[#111114] border border-white/[0.05] rounded-xl flex flex-col p-1.5 shadow-sm">
                  {mockUploads.map((file, idx) => (
                    <div key={file.id} className={`flex items-center gap-3 p-3 rounded-lg hover:bg-[#16161a] transition-colors cursor-pointer ${idx !== mockUploads.length - 1 ? 'border-b border-white/[0.02]' : ''}`}>
                      <div className="w-10 h-10 rounded-lg bg-[#0a0a0c] border border-white/5 flex items-center justify-center shrink-0 shadow-inner">
                        {getFileIcon(file.type)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-200 truncate pr-2">{file.name}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{file.date}</p>
                      </div>
                    </div>
                  ))}

                  <div className="p-2 pt-3">
                    <button className="w-full border border-dashed border-white/10 hover:border-white/20 hover:bg-white/[0.02] text-slate-400 text-xs font-medium py-2 rounded-lg transition-colors cursor-pointer text-center">
                      Browse all files →
                    </button>
                  </div>
                </div>
              </section>

            </div>

          </div>
          )}
          {activeTab === 'notes' && <Notes />}
        </div>
      </main>
    </div>
  );
};
