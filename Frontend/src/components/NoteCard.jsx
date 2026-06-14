import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { useContent } from "../Context/ContentProvider";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function NoteCard({ note }) {
    const { setNotes } = useContent();
    const handleDelete = async (e) => {
        e.stopPropagation(); // Stop event bubbling so card click isn't triggered
        
        if (!window.confirm("Are you sure you want to delete this note?")) {
            return;
        }

        try {
            const noteId = note._id || note.id;
            
            // If it's a mock note or doesn't have an ID in the DB, just filter it out locally
            if (!noteId) {
                setNotes((prevNotes) => prevNotes.filter((n) => n !== note));
                return;
            }
            
            const response = await axios.delete(`${BACKEND_URL}/api/content/delete/${noteId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (response.data && response.data.success) {
                // Update local state to remove the note
                setNotes((prevNotes) => prevNotes.filter((n) => (n._id !== noteId && n.id !== noteId)));
            } else {
                alert("Failed to delete the note. Please try again.");
            }
        } catch (error) {
            console.error("Error deleting note:", error);
            alert("An error occurred while deleting the note.");
        }
    };

    return (
        <div key={note._id || note.id} className="bg-[#111114] border border-white/[0.05] hover:border-white/10 rounded-xl p-5 flex flex-col gap-3 transition-all duration-200 cursor-pointer group hover:bg-[#151519] shadow-sm">
            <div className="flex justify-between items-start mb-1 gap-4">
                <h3 className="text-[15px] font-semibold text-slate-100 leading-snug group-hover:text-indigo-300 transition-colors">{note.title}</h3>
                <button
                    onClick={handleDelete}
                    className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-white/5 transition-all duration-200 opacity-0 group-hover:opacity-100 shrink-0"
                    title="Delete note"
                >
                    <FiTrash2 className="w-4 h-4" />
                </button>
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
