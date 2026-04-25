import React, { useState } from 'react';
import { FiMessageSquare, FiPaperclip, FiSend, FiCopy, FiThumbsUp, FiThumbsDown, FiRefreshCcw, FiBookOpen, FiChevronRight } from 'react-icons/fi';
import { BiBrain } from 'react-icons/bi';
import { BsStars } from 'react-icons/bs';

export default function AiChat() {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="h-full w-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-white/[0.04] mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#2a1a4a] flex items-center justify-center text-[#b48cff] shadow-inner">
            <BiBrain className="text-2xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              Cortex AI
            </h1>
            <div className="flex items-center gap-2 text-sm text-slate-500 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Connected to 10 notes · 4,425 words indexed
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors text-sm font-medium">
            <FiMessageSquare />
            New chat
          </button>
          <div className="px-3 py-1.5 rounded-lg bg-[#2a1a4a]/50 text-[#b48cff] text-xs font-semibold border border-[#b48cff]/20">
            GPT-4o · RAG Mode
          </div>
        </div>
      </div>
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-8 pb-8 pr-2">
        
        {/* User Message */}
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-3">
             <div className="bg-[#9333ea] text-white px-5 py-3.5 rounded-2xl rounded-tr-sm max-w-[80%] text-[15px] leading-relaxed shadow-md">
               Summarize all my notes on AI
             </div>
             <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
               AL
             </div>
          </div>
          <span className="text-xs text-slate-500 mr-11">11:02 PM</span>
        </div>

        {/* AI Response Block */}
        <div>
          {/* AI Response Header (Actions) */}
          <div className="flex items-center gap-3 ml-12 mb-2">
            <button className="text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1.5 text-xs font-medium"><FiCopy /> Copy</button>
            <button className="text-slate-500 hover:text-slate-300 transition-colors"><FiThumbsUp className="text-sm" /></button>
            <button className="text-slate-500 hover:text-slate-300 transition-colors"><FiThumbsDown className="text-sm" /></button>
            <button className="text-slate-500 hover:text-slate-300 transition-colors"><FiRefreshCcw className="text-sm" /></button>
          </div>

          {/* AI Response Sources */}
          <div className="flex items-center gap-2 ml-12 mb-4">
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#16161a] border border-white/5 text-slate-300 text-xs font-medium hover:bg-white/5 transition-colors cursor-pointer shadow-sm">
                  <FiBookOpen className="text-indigo-400" />
                  3 source notes referenced
                  <FiChevronRight className="text-slate-500 ml-1" />
              </button>
          </div>

          {/* AI Message Content */}
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-[#1a1030] border border-[#2a1a4a] flex items-center justify-center text-[#b48cff] shrink-0 mt-1 shadow-inner">
              <BiBrain className="text-lg" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                  <span className="font-semibold text-slate-200">Cortex AI</span>
                  <span className="text-xs text-slate-500">11:02 PM</span>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-[#2a1a4a] text-[#b48cff]">
                    <BsStars /> Latest
                  </div>
              </div>
              <div className="bg-[#16161a] border border-white/[0.04] p-6 rounded-2xl rounded-tl-sm text-slate-300 text-[15px] leading-relaxed shadow-sm">
                  <p className="mb-4">I've searched through your 10 notes and here's what I found related to your question about "Summarize all my notes on AI":</p>
                  <p className="mb-4">Your knowledge base contains several relevant entries on this topic. Based on what you've captured, there are interesting patterns and connections I can help you explore.</p>
                  
                  <h3 className="font-semibold text-slate-200 mb-3 mt-6">Key findings:</h3>
                  <ul className="list-disc pl-5 space-y-2 mb-6">
                      <li><span className="text-slate-300">Your notes show depth in AI and research areas with 2 dedicated notes</span></li>
                      <li><span className="text-slate-300">There are cross-topic connections between your productivity and design notes</span></li>
                      <li><span className="text-slate-300">Several notes haven't been revisited recently and may need updating</span></li>
                  </ul>
                  <p>Would you like me to go deeper on any specific aspect? I can also help you draft new insights or find gaps in your knowledge.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Input Area */}
      <div className="mt-auto pt-4 border-t border-white/[0.04]">
        {/* Suggested Prompts */}
        <div className="flex gap-3 mb-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {[
              'Summarize all my notes on AI', 
              'What are my main design principles?', 
              'Find connections between my research notes', 
              'What projects am I working on?'
            ].map((prompt, i) => (
                <button key={i} className="whitespace-nowrap flex items-center gap-2 px-4 py-2 rounded-xl bg-[#16161a] border border-white/[0.06] hover:bg-white/5 hover:border-white/10 text-slate-300 text-sm transition-all cursor-pointer">
                    <BsStars className="text-[#b48cff]" />
                    {prompt}
                </button>
            ))}
        </div>

        {/* Input Box */}
        <div className="relative flex items-center bg-[#16161a] border border-white/[0.06] rounded-2xl p-2 focus-within:border-[#9333ea]/50 focus-within:ring-1 focus-within:ring-[#9333ea]/50 transition-all shadow-sm">
            <button className="p-3 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer">
                <FiPaperclip className="text-lg" />
            </button>
            <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Cortex anything about your notes..." 
                className="flex-1 bg-transparent border-none text-slate-200 placeholder-slate-500 px-2 py-3 outline-none text-[15px]"
            />
            <button className={`p-3 rounded-xl transition-all cursor-pointer ${inputValue ? 'bg-[#9333ea] text-white hover:bg-purple-500 shadow-md' : 'bg-white/5 text-slate-500'}`}>
                <FiSend className="text-lg" />
            </button>
        </div>
      </div>
    </div>
  );
}
