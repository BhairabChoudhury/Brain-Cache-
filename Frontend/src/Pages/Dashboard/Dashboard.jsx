import React, { useState  , useContext } from "react";
import { NoteCard } from "../../components/NoteCard.jsx"
import {
  FiFileText, FiTag, FiClock,
  FiUploadCloud, FiUpload, FiImage, FiFile, FiPlus
} from "react-icons/fi";
import axios from "axios" ;   
import { useContent } from "../../Context/ContentProvider.jsx";   
import { BACKEND_URL } from "../../config";

export const Dashboard = () => {
  const [captureTitle, setCaptureTitle] = useState("");
  const [captureContent, setCaptureContent] = useState("");  
   const[loading , setLoading] = useState(false) ; 
  

   const { notes, setNotes } = useContent();

   const recentNotes = [...notes]
     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
     .slice(0, 6);

console.log("Recent Notes:", recentNotes); 
    const totalNote = notes.filter(note=> note.type==="note" ).length;  
    const totalDocument = notes.filter(note => note.type === 'document').length;
    const totalImage = notes.filter(note => note.type === 'image').length;    

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return <FiFile className="text-red-400" />;
      case 'image': return <FiImage className="text-blue-400" />;
      default: return <FiFileText className="text-indigo-400" />;
    }
  };   

  const  handleSaveNote = async () => { 
    if (!captureTitle.trim()) {
      alert("Please give the note a title first.");
      return;
    }
    setLoading(true) ;
    try {
      const response = await axios.post(`${BACKEND_URL}/api/content/create`, {
        title: captureTitle,
        type: 'note',
        content: captureContent
      }, {
        headers: { 
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });    

      if (response.data && response.data.success) {
        alert('Note successfully uploaded to the backend!');
        setCaptureTitle('');
        setCaptureContent('');
        if (response.data.data) {
          setNotes(prevNotes => [response.data.data, ...prevNotes]);
        }
      } else {
        alert('Failed to upload note.');
      }
    } catch(error) {
      console.error('Error uploading to backend:', error);
      alert('Failed to upload note. Please check the backend connection.');
    } finally {
      setLoading(false) ;
    } 
  } 
  return (
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
                placeholder=" * give note title"
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
              
              <button onClick={handleSaveNote} className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-sm">
                {/* Save Note <div className="hidden sm:inline text-indigo-200 text-xs ml-1">⌘Enter</div> */}
                {loading ? "Saving ... " : "Save Note "} 
                {loading && <FiUpload className="animate-bounce" /> }   
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
              <p className="text-xl font-bold text-slate-100">{totalNote}</p>
            </div>    
          </div>
          <div className="bg-[#111114] border border-white/[0.04] rounded-xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
              <FiUploadCloud className="text-lg" />
            </div>
            <div>
               <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">Documents</p>
               <p className="text-xl font-bold text-slate-100">{totalDocument}</p>
            </div>
          </div>
          <div className="bg-[#111114] border border-white/[0.04] rounded-xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <FiImage className="text-lg" />
            </div>
            <div>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">Images Upload</p>
              <p className="text-xl font-bold text-slate-100">{totalImage}</p>
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
            {recentNotes.map(note => (
              <NoteCard key={note._id || note.id} note={note} />
            ))}
          </div>
        </section>

      </div>



    </div>
  );
};
