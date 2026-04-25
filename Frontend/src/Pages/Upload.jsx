import React, { useState, useRef } from 'react';
import { FiUpload, FiFileText, FiImage, FiCheckCircle, FiX } from 'react-icons/fi';
import { BsStars } from 'react-icons/bs';

export default function Upload() {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles(prev => [...prev, ...droppedFiles]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (indexToRemove, e) => {
    e.stopPropagation(); // Prevent opening file dialog
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto flex flex-col gap-8 pb-10">
      
      {/* Header */}
      <div className="flex flex-col border-b border-white/[0.04] pb-6">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Upload Files</h1>
        <p className="text-slate-500 text-[15px]">Add PDFs, documents, and images to your knowledge base</p>
      </div>

      {/* Dropzone */}
      <div 
        onClick={openFileDialog}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}   
        className={`border-2 border-dashed rounded-3xl transition-colors flex flex-col items-center justify-center py-16 px-6 relative group cursor-pointer mt-2
          ${isDragging 
            ? 'border-indigo-500 bg-indigo-500/10' 
            : 'border-white/10 bg-[#16161a]/40 hover:bg-[#16161a]'
          }`}
         >
         <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileSelect} 
            className="hidden" 
            multiple 
         />
         
         <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 mb-6 group-hover:scale-110 transition-transform shadow-sm">
            <FiUpload className="text-2xl" />
         </div>

         <h2 className="text-2xl font-bold text-slate-100 mb-3">Drop files here</h2>
         <p className="text-slate-500 mb-8 text-[15px]">Drag & drop files, or click to browse</p>

         <button 
           className="bg-[#9333ea] hover:bg-purple-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors shadow-md mb-10 cursor-pointer pointer-events-none"
         >
            Choose Files
         </button>

         {/* File Types */}
         
      </div>
      {/* Selected Files List */}
      {files.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-200">Selected Files ({files.length})</h3>
            <button 
              onClick={() => setFiles([])} 
              className="text-sm text-slate-400 hover:text-red-400 transition-colors"
            >
              Clear all
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {files.map((file, idx) => (
              <div key={idx} className="bg-[#111114] border border-white/[0.04] p-3 rounded-xl flex items-center justify-between group">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-[#16161a] border border-white/5 flex items-center justify-center shrink-0">
                    <FiFileText className="text-indigo-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-200 truncate pr-2">{file.name}</p>
                    <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <button 
                  onClick={(e) => removeFile(idx, e)}
                  className="text-slate-500 hover:text-red-400 p-2 rounded-lg hover:bg-white/5 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer shrink-0"
                >
                  <FiX />
                </button>
              </div>
            ))}
          </div>
          <button className="mt-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 self-start px-8 cursor-pointer">
            <BsStars />
            Process Files with AI
          </button>
        </div>
      )}

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {/* Card 1 */}
        <div className="bg-[#16161a] border border-white/[0.04] p-6 rounded-2xl flex flex-col shadow-sm">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mb-5">
            <FiUpload className="text-xl" />
          </div>
          <h3 className="text-lg font-bold text-slate-100 mb-3">Upload</h3>
          <p className="text-slate-400 text-[15px] leading-relaxed">
            Drop any file type. We accept PDFs, docs, images, and plaintext.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#16161a] border border-white/[0.04] p-6 rounded-2xl flex flex-col shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#b48cff]/10 flex items-center justify-center text-[#b48cff] mb-5">
                <BsStars className="text-xl" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-3">AI Processes</h3>
            <p className="text-slate-400 text-[15px] leading-relaxed">
            Cortex AI extracts text, generates embeddings, and links related content.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#16161a] border border-white/[0.04] p-6 rounded-2xl flex flex-col shadow-sm">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-5">
            <FiCheckCircle className="text-xl" />
          </div>
          <h3 className="text-lg font-bold text-slate-100 mb-3">Ready to Query</h3>
          <p className="text-slate-400 text-[15px] leading-relaxed">
            Your content is indexed and available in AI Chat and search.
          </p>
        </div>
      </div>

    </div>
  );
}
