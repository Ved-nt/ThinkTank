import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const GRID_SIZE = 6; // 6x6 grid
const WORDS = ["REACT", "NODE", "JAVASCRIPT", "CSS", "HTML"]; // target words
const GAME_DURATION = 60; // seconds

// Generate grid with words
function generateGridWithWords(size, words) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let grid = Array(size)
    .fill(null)
    .map(() => Array(size).fill(""));

  words.forEach((word) => {
    const wordLen = word.length;
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * (size - wordLen + 1));
    for (let i = 0; i < wordLen; i++) {
      grid[row][col + i] = word[i];
    }
  });

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === "") {
        grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }

  return grid;
}

const WordCraze = () => {
  const primaryColor = "#00f7ff";

  const [grid, setGrid] = useState(() => generateGridWithWords(GRID_SIZE, WORDS));
  const [selected, setSelected] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [invalid, setInvalid] = useState(false);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setGameOver(true);
      saveStats();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Handle cell click
  const handleCellClick = (row, col) => {
    if (gameOver) return;
    const key = `${row}-${col}`;
    setSelected(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  // Check selected word
  const checkWord = () => {
    const word = selected
      .map(key => {
        const [r, c] = key.split("-").map(Number);
        return grid[r][c];
      })
      .join("");

    if (WORDS.includes(word) && !foundWords.includes(word)) {
      setFoundWords([...foundWords, word]);
      setScore(score + word.length * 10);
    } else if (word) {
      setInvalid(true);
      setTimeout(() => setInvalid(false), 400);
    }
    setSelected([]);
  };

  // Save stats to localStorage for Dashboard
  const saveStats = () => {
    const prevStats = JSON.parse(localStorage.getItem("wordcrazeStats") || "{}");
    const totalGames = (prevStats.totalGames || 0) + 1;
    const totalScore = (prevStats.totalScore || 0) + score;
    const allFoundWords = [...(prevStats.foundWords || []), ...foundWords];

    localStorage.setItem("wordcrazeStats", JSON.stringify({
      totalGames,
      totalScore,
      foundWords: allFoundWords
    }));
  };

  const resetGame = () => {
    setGrid(generateGridWithWords(GRID_SIZE, WORDS));
    setSelected([]);
    setFoundWords([]);
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGameOver(false);
  };

  return (
    <div className="pt-20 pb-12 px-6 min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center" style={{ color: primaryColor }}>
        Word Craze
      </h1>
      <p className="text-gray-400 mb-6 text-center">Find as many words as you can in 60 seconds!</p>

      <div className="text-center mb-6 text-lg">
        <span className="mr-4">Time: {timeLeft}s</span>
        <span>Score: {score}</span>
      </div>

      <div className={`grid grid-cols-6 gap-2 max-w-md mx-auto mb-6 ${invalid ? "shake-animation" : ""}`}>
        {grid.map((row, rIdx) =>
          row.map((cell, cIdx) => {
            const key = `${rIdx}-${cIdx}`;
            const isSelected = selected.includes(key);
            const isFoundCell = foundWords.some(word => word.includes(cell));
            return (
              <motion.div
                key={key}
                onClick={() => handleCellClick(rIdx, cIdx)}
                whileHover={{ scale: 1.1 }}
                className={`h-12 md:h-16 flex items-center justify-center font-bold text-lg md:text-2xl rounded-lg cursor-pointer transition-all ${
                  isFoundCell ? "bg-green-500 text-black" :
                  isSelected ? "bg-[#00f7ff] text-black" : "bg-gray-900 text-[#00f7ff]"
                }`}
              >
                {cell}
              </motion.div>
            );
          })
        )}
      </div>

      <div className="text-center mb-6">
        <motion.button
          onClick={checkWord}
          className="px-6 py-2 bg-[#00f7ff] text-black rounded-lg mr-4 hover:scale-105 transition"
        >
          Check Word
        </motion.button>
        <motion.button
          onClick={resetGame}
          className="px-6 py-2 bg-gray-700 text-gray-100 rounded-lg hover:scale-105 transition"
        >
          Reset
        </motion.button>
      </div>

      {gameOver && (
        <div className="text-center mt-6">
          <h2 className="text-3xl font-bold text-green-400 mb-2">⏱ Time's up!</h2>
          <p className="text-gray-300">Score: {score}</p>
          <p className="text-gray-400 mt-2">Words Found: {foundWords.join(", ")}</p>
        </div>
      )}

      {/* Add shake animation */}
      <style>{`
        .shake-animation {
          animation: shake 0.4s;
        }
        @keyframes shake {
          0% { transform: translateX(0); }
          20% { transform: translateX(-5px); }
          40% { transform: translateX(5px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default WordCraze;
