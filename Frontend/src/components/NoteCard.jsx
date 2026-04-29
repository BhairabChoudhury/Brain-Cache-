import React from "react";
export function NoteCard({ note }) {
    return (
        <div key={note._id || note.id} className="bg-[#111114] border border-white/[0.05] hover:border-white/10 rounded-xl p-5 flex flex-col gap-3 transition-all duration-200 cursor-pointer group hover:bg-[#151519] shadow-sm">
            <div className="flex justify-between items-start mb-1">
                <h3 className="text-[15px] font-semibold text-slate-100 leading-snug group-hover:text-indigo-300 transition-colors">{note.title}</h3>
            </div>

            <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/[0.04]">
                <div className="flex gap-1.5 flex-wrap">
                    {(note.tags || []).map(tag => (
                        <span key={tag} className="bg-white/5 text-slate-300 text-[11px] px-2 py-0.5 rounded-md font-medium">
                            {tag}
                        </span>  
                    ))}
                </div>
                <span className="text-slate-500 text-[11px] font-medium shrink-0">
                    {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : (note.date || "")}
                </span>
            </div>
        </div>
    );
}
//  do,t need show  content in note card 
