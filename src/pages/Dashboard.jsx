import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const primaryColor = "#00f7ff";

  const [notesCount, setNotesCount] = useState(0);
  const [journalCount, setJournalCount] = useState(0);
  const [gamesCount, setGamesCount] = useState(0);
  const [recentEntries, setRecentEntries] = useState([]);

  useEffect(() => {
    // 📝 Load Notes
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotesCount(notes.length);

    // 📔 Load Journal
    const journals = JSON.parse(localStorage.getItem("journalEntries")) || [];
    setJournalCount(journals.length);

    // 🕹️ Load Games Stats (optional, for now use static or fetched)
    const gamesPlayed = JSON.parse(localStorage.getItem("gamesPlayed")) || 0;
    setGamesCount(gamesPlayed);

    // 🕓 Recent Activity — combine notes + journal
    const allEntries = [
      ...notes.map((n) => ({ title: n.title, date: n.date || n.createdAt })),
      ...journals.map((j) => ({ title: j.title, date: j.date })),
    ]
      .sort((a, b) => new Date(b.date) - new Date(a.date)) // newest first
      .slice(0, 5);

    setRecentEntries(allEntries);
  }, []);

  const stats = [
    { title: "Notes", count: notesCount, path: "/notes" },
    { title: "Journal", count: journalCount, path: "/journal" },
    { title: "Games Played", count: gamesCount, path: "/games" },
    { title: "Tasks Completed", count: 0, path: "/tasks" }, // can link with task feature later
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="pt-20 pb-2 px-6 bg-gradient-to-b from-gray-900 via-black to-gray-800 min-h-screen text-gray-100">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ color: primaryColor }}>
          Welcome back, Vedant!
        </h1>
        <p className="text-gray-400 mt-1">Today: {today}</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            onClick={() => handleCardClick(stat.path)}
            whileHover={{ scale: 1.05, boxShadow: `0 0 15px ${primaryColor}` }}
            className="bg-gray-900 border border-[#00f7ff] rounded-lg p-6 cursor-pointer transition-transform duration-300"
          >
            <h3 className="text-[#00f7ff] font-bold text-lg">{stat.title}</h3>
            <p className="text-gray-300 mt-2 text-2xl">{stat.count}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <QuickActionButton text="Add Note" onClick={() => navigate("/notes")} />
        <QuickActionButton text="Write Journal" onClick={() => navigate("/journal")} />
        <QuickActionButton text="Play Game" onClick={() => navigate("/games")} />
        <QuickActionButton text="View Notes" onClick={() => navigate("/notes")} />
      </div>

      {/* Recent Activity */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4" style={{ color: primaryColor }}>
          Recent Activity
        </h2>
        {recentEntries.length === 0 ? (
          <p className="text-gray-500 italic">No recent activity yet...</p>
        ) : (
          <ul className="space-y-3">
            {recentEntries.map((entry, idx) => (
              <motion.li
                key={idx}
                whileHover={{ scale: 1.02, boxShadow: `0 0 10px ${primaryColor}` }}
                className="bg-gray-900 border-l-4 border-[#00f7ff] p-4 rounded cursor-pointer transition-all duration-300"
              >
                <p className="text-gray-300">{entry.title}</p>
                <span className="text-gray-500 text-sm">{entry.date}</span>
              </motion.li>
            ))}
          </ul>
        )}
      </div>

      {/* Daily Tip Widget */}
      <div className="mb-8">
        <div className="bg-gray-900 p-6 rounded-lg border border-[#00f7ff] shadow-sm">
          <p className="text-[#00f7ff] font-semibold mb-2">💡 Tip of the Day:</p>
          <p className="text-gray-300">“Keep building, keep learning, keep experimenting.”</p>
        </div>
      </div>
    </div>
  );
};

// ⏺️ Reusable Button
const QuickActionButton = ({ text, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-gray-900 border border-[#00f7ff] text-[#00f7ff] font-bold py-3 rounded-lg transition-shadow shadow-sm hover:shadow-md"
      onClick={onClick}
    >
      {text}
    </motion.button>
  );
};

export default Dashboard;
