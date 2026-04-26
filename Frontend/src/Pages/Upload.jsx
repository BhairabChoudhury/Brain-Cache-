import React, { useState, useRef } from 'react';
import { FiUpload, FiFileText, FiImage, FiCheckCircle, FiX } from 'react-icons/fi';
import { BsStars } from 'react-icons/bs';
import axios from 'axios'; 
export default function Upload() {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('pdf');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  
  const handleDrop = (e) => {  // drop the file in the dropzone
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles([e.dataTransfer.files[0]]);
    }
  };

  const handleFileSelect = (e) => {  // select the file from the file system   , first user click on the browse button   , the folder section open  then user select file from the folder 
    if (e.target.files && e.target.files.length > 0) {
      setFiles([e.target.files[0]]);
    }
  };

  const removeFile = (indexToRemove, e) => {
    e.stopPropagation(); // Prevent opening file dialog
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  const openFileDialog = () => {
    fileInputRef.current?.click(); 
  };

  const handleSubmit = async () => {
    if (!title.trim() || files.length === 0) return;
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();// create form data which will send to the backend 
      formData.append('title', title);
      formData.append('type', type);
      
      // Append all selected files
      files.forEach((file) => {
        formData.append('file', file);
      });

      const response = await axios.post('http://localhost:8000/api/content/create', formData, {
        withCredentials: true,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      console.log('Upload successful:', data);
      
      // Reset form after successful upload  (autometically deleted after submission)
      setFiles([]);
      setTitle('');
      alert('File successfully uploaded to the backend!');
    } catch (error) {
      console.error('Error uploading to backend:', error);
      alert('Failed to upload file. Please check the console for details or update the API endpoint.');
    } finally {
      setIsSubmitting(false);
    }
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
        className={`border-2 border-dashed rounded-3xl transition-all duration-300 flex flex-col items-center justify-center py-16 px-6 relative group cursor-pointer mt-2
          ${isDragging 
            ? 'border-indigo-500 bg-indigo-500/10' 
            : files.length > 0 
              ? 'border-emerald-500/50 bg-emerald-500/5 hover:bg-emerald-500/10' 
              : 'border-white/10 bg-[#16161a]/40 hover:bg-[#16161a]'
          }`}
         >
         <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileSelect} 
            className="hidden" 
         />
         <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-sm
            ${files.length > 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 border border-white/10 text-slate-300 group-hover:scale-110 transition-transform'}`}>
            {files.length > 0 ? <FiCheckCircle className="text-3xl" /> : <FiUpload className="text-2xl" />}
         </div>

         {files.length > 0 ? (
           <div className="flex flex-col items-center">
             <h2 className="text-xl font-bold text-slate-100 mb-1">{files[0].name}</h2>
             <p className="text-emerald-400 text-[15px] mb-4">Ready for analysis</p>
             <button
               onClick={(e) => {
                 e.stopPropagation();
                 setFiles([]);
               }}
               className="text-red-400 hover:text-red-300 font-medium text-sm transition-colors cursor-pointer px-4 py-2"
             >
               Remove file
             </button>
           </div>
         ) : (
           <>
             <h2 className="text-2xl font-bold text-slate-100 mb-3">Drop files here</h2>
             <p className="mb-8 text-[15px] text-slate-500">Drag & drop files, or click to browse</p>
             <button 
               className="bg-[#9333ea] hover:bg-purple-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors shadow-md mb-2 cursor-pointer pointer-events-none"
             >
                Choose Files
             </button>
           </>
         )}

         {/* File Types */}
         
      </div>

      {/* Title and Submit Section */}
      {files.length > 0 && (
        <div className="flex flex-col gap-5 mt-2 bg-[#16161a] border border-white/[0.04] p-6 rounded-2xl shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div>
            <h3 className="text-lg font-bold text-slate-100 mb-1">Document Details</h3>
            <p className="text-slate-500 text-sm mb-5">Provide a title and type for your document before submitting.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                <input 
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder=" like finance report  2025 ieee event report "
                  className="w-full bg-[#111114] border border-white/10 rounded-xl px-4 py-3.5 text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Document Type</label>
                <div className="relative">
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-[#111114] border border-white/10 rounded-xl px-4 py-3.5 text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
                  >
                    <option value="pdf">PDF Document</option>
                    <option value="image">Image File</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
            <div className="text-sm text-slate-400 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
              <span className="font-medium text-slate-300">Selected:</span> <span className="text-slate-200 ml-1">{files[0].name}</span>
            </div>
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting || !title.trim()}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-8 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? 'Submitting...' : 'Submit to Backend'}
              {!isSubmitting && <FiUpload />}
            </button>
          </div>
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
