import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit3, Save } from "lucide-react";

const Notes = () => {
  const primaryColor = "#00f7ff";

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", content: "" });

  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingNoteData, setEditingNoteData] = useState({ title: "", content: "" });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!newNote.title.trim() && !newNote.content.trim()) return;
    setNotes([...notes, { id: Date.now(), ...newNote }]);
    setNewNote({ title: "", content: "" });
    setIsAdding(false);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const startEditing = (note) => {
    setEditingNoteId(note.id);
    setEditingNoteData({ title: note.title, content: note.content });
  };

  const saveEdit = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, ...editingNoteData } : note
      )
    );
    setEditingNoteId(null);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-20 px-6 pb-12 bg-gradient-to-b from-gray-900 via-black to-gray-800 min-h-screen text-gray-100">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2" style={{ color: primaryColor }}>
          Notes
        </h1>
        <p className="text-gray-400">Capture your thoughts and ideas 📝</p>
      </div>

      {/* Search and Add */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-[#00f7ff]"
        />
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2 bg-[#00f7ff] text-black rounded-lg font-semibold hover:scale-105 transition"
        >
          <Plus size={18} />
          Add Note
        </button>
      </div>

      {/* Add Note Form */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 bg-gray-900 p-4 rounded-lg border border-gray-700"
          >
            <input
              type="text"
              placeholder="Title"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              className="w-full mb-3 px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-[#00f7ff]"
            />
            <textarea
              placeholder="Write your note..."
              value={newNote.content}
              onChange={(e) =>
                setNewNote({ ...newNote, content: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 h-24 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-[#00f7ff]"
            ></textarea>
            <button
              onClick={addNote}
              className="px-4 py-2 bg-[#00f7ff] text-black rounded-lg font-semibold hover:scale-105 transition"
            >
              Save
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notes List */}
      {filteredNotes.length === 0 ? (
        <p className="text-center text-gray-400 mt-10">No notes found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900 p-4 rounded-lg border border-gray-700 relative"
            >
              {editingNoteId === note.id ? (
                <>
                  <input
                    type="text"
                    value={editingNoteData.title}
                    onChange={(e) =>
                      setEditingNoteData({ ...editingNoteData, title: e.target.value })
                    }
                    className="w-full mb-2 px-2 py-1 rounded bg-gray-800 border border-gray-700"
                  />
                  <textarea
                    value={editingNoteData.content}
                    onChange={(e) =>
                      setEditingNoteData({
                        ...editingNoteData,
                        content: e.target.value,
                      })
                    }
                    className="w-full mb-2 px-2 py-1 h-24 rounded bg-gray-800 border border-gray-700"
                  />
                  <button
                    onClick={() => saveEdit(note.id)}
                    className="flex items-center gap-1 text-sm px-3 py-1 bg-[#00f7ff] text-black rounded hover:scale-105 transition"
                  >
                    <Save size={14} /> Save
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-2 text-[#00f7ff]">
                    {note.title || "Untitled"}
                  </h2>
                  <p className="text-gray-300 whitespace-pre-wrap mb-4">
                    {note.content}
                  </p>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => startEditing(note)}
                      className="text-gray-400 hover:text-[#00f7ff] transition"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="text-gray-400 hover:text-red-500 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes;
