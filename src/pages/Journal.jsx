import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

const Journal = () => {
  const primaryColor = "#00f7ff";
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [hovered, setHovered] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleAddEntry = () => {
    if (title.trim() === "" || description.trim() === "" || date.trim() === "") return;

    const newJournal = {
      id: Date.now(),
      title,
      date,
      content: description,
    };

    setEntries([newJournal, ...entries]);
    setTitle("");
    setDescription("");
    setDate("");
    setShowForm(false);
  };

  const handleDeleteEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  return (
    <div className="pt-20 pb-12 px-6 bg-gradient-to-b from-gray-900 via-black to-gray-800 min-h-screen text-gray-100">
      
      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl font-bold mb-2" style={{ color: primaryColor }}>
          Journal
        </h1>
        <p className="text-gray-400">
          Capture your thoughts, reflections, and experiences daily.
        </p>
      </motion.div>

      {/* Add Entry Button */}
      {!showForm && (
        <motion.button
          onClick={() => setShowForm(true)}
          className="mb-8 bg-black border border-[#00f7ff] px-6 py-2 rounded-lg text-[#00f7ff] hover:bg-[#00f7ff] hover:text-black transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          + Add Entry
        </motion.button>
      )}

      {/* Entry Form */}
      {showForm && (
        <motion.div
          className="mb-8 max-w-2xl mx-auto bg-gray-900 p-6 rounded-xl shadow-lg border border-[#00f7ff]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 mb-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00f7ff]"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full p-3 mb-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00f7ff]"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 mb-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00f7ff]"
          />

          <div className="flex gap-3">
            <motion.button
              onClick={handleAddEntry}
              className="px-5 py-2 bg-[#00f7ff] text-black rounded-lg shadow-md hover:scale-105 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Save Entry
            </motion.button>
            <motion.button
              onClick={() => setShowForm(false)}
              className="px-5 py-2 bg-gray-700 text-gray-200 rounded-lg shadow-md hover:scale-105 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Entries List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {entries.length === 0 ? (
          <p className="text-gray-400 col-span-full text-center">
            No journal entries yet. Start writing your thoughts above ✍️
          </p>
        ) : (
          entries.map((entry) => (
            <motion.div
              key={entry.id}
              onHoverStart={() => setHovered(entry.id)}
              onHoverEnd={() => setHovered(null)}
              animate={
                hovered === entry.id
                  ? { scale: 1.05, opacity: 1 }
                  : hovered
                  ? { scale: 0.95, opacity: 0.6 }
                  : { scale: 1, opacity: 1 }
              }
              transition={{ duration: 0.3 }}
              className="relative bg-gray-900 border-l-4 border-[#00f7ff] rounded-lg p-4 shadow-lg cursor-pointer hover:shadow-[0_0_20px_#00f7ff60]"
            >
              {/* Delete Button */}
              <motion.button
                onClick={() => handleDeleteEntry(entry.id)}
                className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-gray-800 border border-[#00f7ff] text-[#00f7ff] hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors shadow-md"
                whileHover={{ scale: 1.3, rotate: 20 }}
                whileTap={{ scale: 0.9 }}
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>

              <h3 className="text-xl font-semibold" style={{ color: primaryColor }}>
                {entry.title}
              </h3>
              <p className="text-gray-500 text-sm">{entry.date}</p>
              <p className="text-gray-300 mt-2 whitespace-pre-line">{entry.content}</p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Journal;
