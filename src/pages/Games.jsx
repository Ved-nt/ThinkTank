import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Cpu, Clock, Puzzle } from "lucide-react"; // icons for games

const Games = () => {
  const primaryColor = "#00f7ff";
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  // Define all available games
  const games = [
    {
      id: 1,
      title: "Memory Match",
      description: "Test your memory skills and match the cards!",
      route: "/games/memory-match",
      icon: <Cpu className="w-10 h-10 text-[#00f7ff]" />,
      difficulty: "Medium",
    },
    {
      id: 2,
      title: "Reaction Time Test",
      description: "How fast can you react? Test your reflexes!",
      route: "/games/reaction-time",
      icon: <Clock className="w-10 h-10 text-[#00f7ff]" />,
      difficulty: "Easy",
    },
    {
      id: 3,
      title: "Puzzle Solver",
      description: "Solve tricky puzzles under time pressure!",
      route: "/games/puzzle-solver",
      icon: <Puzzle className="w-10 h-10 text-[#00f7ff]" />,
      difficulty: "Hard",
    },
    {
      id: 4,
      title: "Word Craze",
      description: "Find hidden words before time runs out!",
      route: "/games/word-craze",
      icon: <Cpu className="w-10 h-10 text-[#00f7ff]" />,
      difficulty: "Medium",
    },
    {
      id: 5,
      title: "Speed Math",
      description: "Solve math problems as fast as you can!",
      route: "/games/speed-math",
      icon: <Clock className="w-10 h-10 text-[#00f7ff]" />,
      difficulty: "Hard",
    },
  ];

  return (
    <div className="pt-20 px-6 pb-12 bg-gradient-to-b from-gray-900 via-black to-gray-800 min-h-screen text-gray-100">
      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl font-bold mb-2" style={{ color: primaryColor }}>
          Games
        </h1>
        <p className="text-gray-400">
          Relax and sharpen your mind with mini-games.
        </p>
      </motion.div>

      {/* Games Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <motion.div
            key={game.id}
            onClick={() => navigate(game.route)}
            onHoverStart={() => setHovered(game.id)}
            onHoverEnd={() => setHovered(null)}
            animate={
              hovered === game.id
                ? { scale: 1.05, opacity: 1 }
                : hovered
                ? { scale: 0.95, opacity: 0.6 }
                : { scale: 1, opacity: 1 }
            }
            transition={{ duration: 0.3 }}
            className="bg-gray-900 border-l-4 border-[#00f7ff] rounded-xl p-6 cursor-pointer shadow-lg hover:shadow-[0_0_20px_#00f7ff60] transition-all flex flex-col justify-between"
          >
            {/* Icon */}
            <div className="mb-4">{game.icon}</div>

            {/* Title */}
            <h2 className="text-2xl font-semibold mb-2" style={{ color: primaryColor }}>
              {game.title}
            </h2>

            {/* Description */}
            <p className="text-gray-300 mb-3">{game.description}</p>

            {/* Difficulty / Tags */}
            <span className="inline-block text-sm px-2 py-1 bg-gray-800 rounded text-gray-400">
              {game.difficulty}
            </span>

            {/* Play Button */}
            <motion.button
              className="mt-4 px-4 py-2 bg-[#00f7ff] text-black rounded-lg font-semibold hover:bg-black hover:text-[#00f7ff] transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                navigate(game.route);
              }}
            >
              Play
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Games;
