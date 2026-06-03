import React, { useState, useEffect, useRef } from 'react';
import { 
  FiMessageSquare, 
  FiPaperclip, 
  FiSend, 
  FiCopy, 
  FiThumbsUp, 
  FiThumbsDown, 
  FiRefreshCcw, 
  FiBookOpen, 
  FiChevronRight,
  FiTrash2,
  FiPlus,
  FiAlertCircle
} from 'react-icons/fi';
import { BiBrain } from 'react-icons/bi';
import { BsStars } from 'react-icons/bs';
import { useContent } from '../Context/ContentProvider.jsx';
import axios from "axios";
import { BACKEND_URL } from '../config';

export default function AiChat() {
  const { notes } = useContent();
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [currentSession, setCurrentSession] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  
  const chatEndRef = useRef(null);

  // DYNAMIC STATS FROM CONTEXT
  const notesCount = notes ? notes.length : 0;
  const wordCount = notes 
    ? notes.reduce((acc, note) => acc + (note.extractedText?.split(/\s+/).filter(Boolean).length || 0), 0)
    : 0;

  // Format big numbers
  const formatWordCount = (count) => {
    return count.toLocaleString();
  };

  // Fetch all sessions on mount
  useEffect(() => {
    fetchSessions();
  }, []);

  // Fetch specific session detail when active session changes
  useEffect(() => {
    if (activeSessionId) {
      fetchSessionDetails(activeSessionId);
    } else {
      setCurrentSession(null);
    }
  }, [activeSessionId]);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentSession?.messages, loading]);

  const getAuthHeaders = () => {
    return {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
  };

  const fetchSessions = async () => {
    try {
      setError(null);
      const response = await axios.get(`${BACKEND_URL}/api/chat/sessions`, getAuthHeaders());
      if (response.data && response.data.success) {
        const fetchedSessions = response.data.data;
        setSessions(fetchedSessions);
        if (fetchedSessions.length > 0 && !activeSessionId) {
          setActiveSessionId(fetchedSessions[0]._id);
        }
      }
    } catch (err) {
      console.error("Error fetching sessions", err);
      setError("Failed to load chat history. Ensure backend is running.");
    }
  };

  const fetchSessionDetails = async (sessionId) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/chat/session/${sessionId}`, getAuthHeaders());
      if (response.data && response.data.success) {
        setCurrentSession(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching session details", err);
      setError("Failed to retrieve chat conversation details.");
    }
  };

  const handleCreateSession = async () => {
    if (actionLoading) return;
    setActionLoading(true);
    try {
      setError(null);
      const response = await axios.post(`${BACKEND_URL}/api/chat/session`, {}, getAuthHeaders());
      if (response.data && response.data.success) {
        const newSession = response.data.data;
        setSessions(prev => [newSession, ...prev]);
        setActiveSessionId(newSession._id);
      }
    } catch (err) {
      console.error("Error creating session", err);
      setError("Unable to create a new chat session.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteSession = async (e, sessionId) => {
    e.stopPropagation(); // Avoid selecting the chat session being deleted
    if (!window.confirm("Are you sure you want to delete this chat session? This action cannot be undone.")) {
      return;
    }
    
    try {
      setError(null);
      const response = await axios.delete(`${BACKEND_URL}/api/chat/session/${sessionId}`, getAuthHeaders());
      if (response.data && response.data.success) {
        setSessions(prev => prev.filter(s => s._id !== sessionId));
        if (activeSessionId === sessionId) {
          const remaining = sessions.filter(s => s._id !== sessionId);
          if (remaining.length > 0) {
            setActiveSessionId(remaining[0]._id);
          } else {
            setActiveSessionId(null);
            setCurrentSession(null);
          }
        }
      }
    } catch (err) {
      console.error("Error deleting session", err);
      setError("Failed to delete chat session.");
    }
  };

  const handleSendMessage = async (textToSend) => {
    const queryText = textToSend || inputValue;
    if (!queryText.trim()) return;

    let targetSessionId = activeSessionId;

    // If there is no active session, create one first
    if (!targetSessionId) {
      try {
        setLoading(true);
        const newSessionRes = await axios.post(`${BACKEND_URL}/api/chat/session`, {}, getAuthHeaders());
        if (newSessionRes.data && newSessionRes.data.success) {
          const newSession = newSessionRes.data.data;
          targetSessionId = newSession._id;
          // Optimistically update session lists
          setSessions(prev => [newSession, ...prev]);
          setActiveSessionId(newSession._id);
        } else {
          throw new Error("Could not create chat session");
        }
      } catch (err) {
        console.error("Error auto-creating session", err);
        setError("Could not initialize a session to send your message.");
        setLoading(false);
        return;
      }
    }

    // Set UI to loading and append user message optimistically
    setLoading(true);
    setError(null);
    setInputValue('');

    // Prepare optimistic display in the conversation window
    const userMsg = { sender: 'user', text: queryText, createdAt: new Date() };
    setCurrentSession(prev => {
      if (!prev) return { _id: targetSessionId, messages: [userMsg] };
      return { ...prev, messages: [...prev.messages, userMsg] };
    });

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/chat/session/${targetSessionId}/message`,
        { message: queryText },
        getAuthHeaders()
      );

      if (response.data && response.data.success) {
        const { session: updatedSession } = response.data.data;
        setCurrentSession(updatedSession);
        
        // Refresh session list to update titles/timestamp orders
        await fetchSessions();
        // Maintain the active session selection
        setActiveSessionId(targetSessionId);
      }
    } catch (err) {
      console.error("Error sending message", err);
      setError(err.response?.data?.message || "Error submitting message to Cortex AI.");
      // Rollback last optimistic message if error
      fetchSessionDetails(targetSessionId);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Response copied to clipboard!");
  };

  const suggestedPrompts = [
    'Summarize all my notes on AI',
    'What are my main design principles?',
    'Find connections between my research notes',
    'What projects am I working on?'
  ];

  return (
    <div className="h-[calc(100vh-140px)] w-full flex bg-[#0d0d10] border border-white/[0.04] rounded-2xl overflow-hidden shadow-2xl">
      
      {/* LEFT SIDEBAR - CHAT HISTORY SESSIONS */}
      <aside className="w-80 bg-[#121216] border-r border-white/[0.04] flex flex-col shrink-0">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-white/[0.04] flex flex-col gap-3">
          <button 
            onClick={handleCreateSession}
            disabled={actionLoading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer shadow-md hover:shadow-indigo-600/10 hover:shadow-lg active:scale-[0.98]"
          >
            <FiPlus className="text-base" />
            New Chat
          </button>
        </div>

        {/* Sessions Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-1.5 custom-scrollbar">
          <div className="text-[10px] font-bold text-slate-500 tracking-wider mb-2 mt-1 px-2 uppercase">Recent Conversations</div>
          
          {sessions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
              <FiMessageSquare className="text-slate-600 text-3xl mb-2 opacity-50" />
              <p className="text-xs text-slate-500 font-medium">No previous chats yet</p>
              <p className="text-[10px] text-slate-600 mt-1">Start a conversation using the button above</p>
            </div>
          ) : (
            sessions.map((session) => {
              const isActive = session._id === activeSessionId;
              return (
                <div
                  key={session._id}
                  onClick={() => setActiveSessionId(session._id)}
                  className={`group relative flex items-center justify-between p-3.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#2a1a4a]/40 text-[#b48cff] border border-[#b48cff]/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-4">
                    <FiMessageSquare className={`text-base shrink-0 ${isActive ? 'text-[#b48cff]' : 'text-slate-500'}`} />
                    <span className="truncate text-[13.5px] tracking-wide">{session.title}</span>
                  </div>
                  
                  <button
                    onClick={(e) => handleDeleteSession(e, session._id)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                    title="Delete Chat"
                  >
                    <FiTrash2 className="text-sm" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </aside>

      {/* RIGHT WORKSPACE - MAIN AI CHAT WINDOW */}
      <section className="flex-1 flex flex-col bg-[#0d0d10] min-w-0 relative">
        
        {/* Error Bar */}
        {error && (
          <div className="absolute top-0 left-0 right-0 z-30 bg-red-950/90 border-b border-red-500/30 px-6 py-3 text-red-200 text-xs font-semibold flex items-center gap-2.5 backdrop-blur-sm">
            <FiAlertCircle className="text-base text-red-400 shrink-0" />
            <span>{error}</span>
            <button className="ml-auto underline hover:text-white" onClick={() => setError(null)}>Dismiss</button>
          </div>
        )}

        {/* Chat Window Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-white/[0.04] bg-[#0d0d10]/50 backdrop-blur-md">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10.5 h-10.5 rounded-xl bg-gradient-to-br from-[#2a1a4a] to-[#120a2a] border border-[#b48cff]/15 flex items-center justify-center text-[#b48cff] shadow-inner">
              <BiBrain className="text-xl" />
            </div>
            <div className="min-w-0">
              <h1 className="text-base font-bold text-slate-100 flex items-center gap-2 leading-none">
                Cortex AI
              </h1>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Connected to {notesCount} notes · {formatWordCount(wordCount)} words indexed</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="px-3 py-1.5 rounded-lg bg-[#2a1a4a]/40 text-[#b48cff] text-[10px] font-bold border border-[#b48cff]/15 uppercase tracking-wide">
              GPT-4o · RAG Mode
            </div>
          </div>
        </div>

        {/* Chat Messages Log Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          
          {!currentSession || currentSession.messages.length === 0 ? (
            /* WELCOME DISPLAY IF EMPTY CHAT */
            <div className="h-full flex flex-col items-center justify-center text-center max-w-xl mx-auto px-4 py-8">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 animate-pulse">
                <BiBrain className="text-4xl" />
              </div>
              <h2 className="text-xl font-bold text-slate-200">Meet your Personal Cortex Brain</h2>
              <p className="text-sm text-slate-400 mt-2.5 leading-relaxed">
                Ask anything about your uploaded notes, links, documents, and research files. 
                Cortex performs real-time semantic searching to compile context-rich, intelligent summaries tailored to you.
              </p>
              
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mt-10">
                {suggestedPrompts.slice(0, 2).map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(prompt)}
                    className="p-4 text-left rounded-xl bg-[#121216] border border-white/[0.04] hover:bg-white/[0.02] hover:border-[#b48cff]/20 text-slate-300 hover:text-slate-100 text-xs transition-all duration-200 cursor-pointer flex flex-col gap-2 group"
                  >
                    <BsStars className="text-[#b48cff] text-base group-hover:scale-110 transition-transform" />
                    <span className="font-semibold">{prompt}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* LIST ACTIVE SESSION MESSAGES */
            <div className="flex flex-col gap-6">
              {currentSession.messages.map((msg, index) => {
                const isUser = msg.sender === 'user';
                const formattedTime = new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                if (isUser) {
                  return (
                    <div key={index} className="flex flex-col items-end gap-1.5 max-w-[80%] ml-auto">
                      <div className="flex items-end gap-2.5">
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-3.5 rounded-2xl rounded-tr-sm text-[14.5px] leading-relaxed shadow-lg font-medium">
                          {msg.text}
                        </div>
                        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0 shadow-md">
                          BC
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-600 mr-9">{formattedTime}</span>
                    </div>
                  );
                } else {
                  return (
                    <div key={index} className="flex flex-col gap-1.5 max-w-[85%]">
                      {/* AI Action Header */}
                      <div className="flex items-center gap-3.5 ml-11.5 mb-0.5">
                        <button 
                          onClick={() => copyToClipboard(msg.text)}
                          className="text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                        >
                          <FiCopy className="text-xs" /> Copy
                        </button>
                        <button className="text-slate-500 hover:text-[#b48cff] transition-colors cursor-pointer"><FiThumbsUp className="text-xs" /></button>
                        <button className="text-slate-500 hover:text-red-400 transition-colors cursor-pointer"><FiThumbsDown className="text-xs" /></button>
                      </div>

                      {/* AI Chat Bubble */}
                      <div className="flex gap-3">
                        <div className="w-8.5 h-8.5 rounded-full bg-gradient-to-br from-[#2a1a4a] to-[#120a2a] border border-[#b48cff]/15 flex items-center justify-center text-[#b48cff] shrink-0 mt-0.5 shadow-inner">
                          <BiBrain className="text-base" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="font-bold text-slate-200 text-[13.5px]">Cortex AI</span>
                            <span className="text-[10px] text-slate-600">{formattedTime}</span>
                            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[8.5px] font-bold bg-[#2a1a4a] text-[#b48cff] uppercase tracking-wide">
                              <BsStars className="text-[9px]" /> Brain RAG
                            </div>
                          </div>
                          
                          <div className="bg-[#121216] border border-white/[0.04] p-5.5 rounded-2xl rounded-tl-sm text-slate-300 text-[14.5px] leading-relaxed shadow-inner">
                            {msg.text.split('\n').map((paragraph, pIdx) => {
                              if (!paragraph.trim()) return <div key={pIdx} className="h-2" />;
                              
                              // Stylize bold, points, or code
                              if (paragraph.startsWith('### ')) {
                                return <h3 key={pIdx} className="font-bold text-slate-100 text-base mt-4 mb-2 first:mt-0">{paragraph.replace('### ', '')}</h3>;
                              }
                              if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
                                return (
                                  <div key={pIdx} className="flex gap-2 pl-2 my-1.5">
                                    <span className="text-indigo-400 font-bold shrink-0">•</span>
                                    <span>{paragraph.substring(2)}</span>
                                  </div>
                                );
                              }
                              return <p key={pIdx} className="mb-2.5 last:mb-0">{paragraph}</p>;
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}

              {/* PULSING LOADING SKELETON */}
              {loading && (
                <div className="flex flex-col gap-1.5 max-w-[80%] animate-pulse">
                  <div className="flex gap-3">
                    <div className="w-8.5 h-8.5 rounded-full bg-[#2a1a4a]/40 border border-[#b48cff]/10 flex items-center justify-center text-[#b48cff]/50 shrink-0 mt-0.5">
                      <BiBrain className="text-base" />
                    </div>
                    <div className="flex-1 space-y-2 mt-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-400 text-xs">Cortex AI</span>
                        <span className="text-[10px] text-slate-600">typing...</span>
                      </div>
                      <div className="bg-[#121216]/50 border border-white/[0.03] p-5 rounded-2xl rounded-tl-sm space-y-2.5">
                        <div className="h-3.5 bg-slate-800 rounded-md w-3/4"></div>
                        <div className="h-3.5 bg-slate-800/80 rounded-md w-5/6"></div>
                        <div className="h-3.5 bg-slate-800/50 rounded-md w-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Dynamic Suggested Prompts (Visible only if chat exists but history is short) */}
        {currentSession && currentSession.messages.length > 0 && currentSession.messages.length < 5 && (
          <div className="px-6 pb-2.5">
            <div className="flex gap-2.5 overflow-x-auto pb-2 custom-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {suggestedPrompts.map((prompt, i) => (
                <button 
                  key={i} 
                  onClick={() => handleSendMessage(prompt)}
                  disabled={loading}
                  className="whitespace-nowrap flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#121216] border border-white/[0.04] hover:bg-white/[0.02] hover:border-[#b48cff]/20 text-slate-300 text-xs transition-all duration-200 cursor-pointer disabled:opacity-50"
                >
                  <BsStars className="text-[#b48cff]" />
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Text Box Area */}
        <div className="mt-auto p-6 border-t border-white/[0.04] bg-[#0d0d10]/40 backdrop-blur-md">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            className="relative flex items-center bg-[#121216] border border-white/[0.04] rounded-2xl p-2 focus-within:border-indigo-500/30 focus-within:shadow-[0_0_15px_rgba(99,102,241,0.05)] transition-all duration-200 shadow-lg"
          >
            <button 
              type="button" 
              className="p-3 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              title="Attach Note reference (Auto-referenced via RAG)"
            >
              <FiPaperclip className="text-lg" />
            </button>
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={loading}
              placeholder={activeSessionId ? "Ask Cortex anything about your notes..." : "Type your message to start a new chat..."}
              className="flex-1 bg-transparent border-none text-slate-200 placeholder-slate-500 px-2 py-3.5 outline-none text-sm disabled:opacity-50"
            />
            <button  
              type="submit"
              disabled={!inputValue.trim() || loading} 
              className={`p-3 rounded-xl transition-all duration-200 cursor-pointer ${
                inputValue.trim() && !loading 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-md hover:shadow-indigo-600/20 active:scale-95' 
                  : 'bg-white/[0.02] text-slate-500'
              }`}
            >
              <FiSend className="text-base" />
            </button>
          </form>
        </div>

      </section>

    </div>
  );
}
