import React, { useState } from "react";
import { FiSearch, FiSliders, FiChevronDown, FiGrid, FiList, FiPlus } from "react-icons/fi";
import { NoteCard } from "../components/NoteCard";

const mockNotes = [
  {
    id: 1,
    title: "The Future of AI-Augmented Knowledge Work",
    preview: "As AI systems become more capable, the way we interact with information is fundamentally changing. Knowledge...",
    tags: ["#ai", "#research", "#productivity"],
    date: "2026-04-17",
    words: "847 words",
    icon: "🧠",
    pinned: true
  },
  {
    id: 2,
    title: "Product Roadmap Q2 2026 — Meeting Notes",
    preview: "Attendees: Alex, Sarah, Marcus, Priya Key decisions: - Ship AI chat feature by May 15 - Delay mobile app to Q3 (resource...",
    tags: ["#work"],
    date: "2026-04-16",
    words: "298 words",
    icon: "📋"
  },
  {
    id: 3,
    title: "React Performance Optimization Patterns",
    preview: "Key patterns for high-performance React applications: Memoization: Use React.memo, useMemo, and useCallback...",
    tags: ["#coding", "#learning"],
    date: "2026-04-14",
    words: "634 words",
    icon: "⚡"
  },
  {
    id: 4,
    title: "Personal OKRs — Q2 2026",
    preview: "Objective 1: Ship something I'm proud of - KR1: Launch Second Brain portfolio project ✓ (in progress) - KR2: Write 4...",
    tags: ["#personal"],
    date: "2026-04-14",
    words: "156 words",
    icon: "🎯"
  },
  {
    id: 5,
    title: "Building a Second Brain: Core Principles",
    preview: "The PARA method (Projects, Areas, Resources, Archives) provides a flexible organizational structure that works acros...",
    tags: ["#productivity", "#learning"],
    date: "2026-04-13",
    words: "412 words",
    icon: "📚"
  },
  {
    id: 6,
    title: "Side Project Ideas — Braindump",
    preview: "Things I want to build: 1. AI code reviewer: Upload PRs, get AI feedback that learns your codebase conventions 2. Meeting...",
    tags: ["#ideas", "#coding"],
    date: "2026-04-11",
    words: "178 words",
    icon: "💡"
  }
];

export const Notes = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-200 font-sans p-8">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-6 pb-10">
        {/* Notes Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold text-slate-100 mb-1">
            Notes
          </h2>
          <span className="text-slate-500 text-[15px]">13 notes in your brain</span>
        </div>
        <button className="bg-[#9333ea] hover:bg-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(147,51,234,0.3)] cursor-pointer">
          <FiPlus className="text-lg" />
          New Note
        </button>
      </div>

      {/* Search and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-2">
          <div className="relative flex-grow">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes by title, content, or tag..." 
                className="w-full bg-[#16161a] border border-white/[0.04] text-slate-200 placeholder-slate-500 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-indigo-500/50 transition-colors" 
              />
          </div>
          <div className="flex gap-3">
              <button className="bg-[#16161a] border border-white/[0.04] hover:bg-white/5 text-slate-300 px-5 py-2 rounded-xl font-medium transition-colors flex items-center gap-2 cursor-pointer">
                  <FiSliders />
                  Sort
                  <FiChevronDown className="ml-1" />
              </button>
              <div className="flex bg-[#16161a] border border-white/[0.04] rounded-xl p-1">
                  <button className="p-2.5 rounded-lg bg-white/10 text-slate-200 cursor-pointer">
                      <FiGrid />
                  </button>
                  <button className="p-2.5 rounded-lg text-slate-400 hover:text-slate-200 cursor-pointer">
                      <FiList />
                  </button>
              </div>
          </div>
      </div>

      {/* Tags */}
      <div className="flex gap-3 flex-wrap mb-4">
          {['All', '# ai', '# research', '# productivity', '# design', '# coding', '# ideas', '# personal', '# learning', '# work', '# psychology'].map(tag => (
              <button key={tag} className={`px-5 py-2 rounded-full text-[13px] font-medium transition-colors cursor-pointer ${tag === 'All' ? 'bg-[#9333ea] text-white' : 'bg-[#16161a] border border-white/[0.04] text-slate-400 hover:bg-white/10 hover:text-slate-200'}`}>
                  {tag}
              </button>
          ))}
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockNotes.map(note => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
    </div>
  );
};
