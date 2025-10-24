import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti"; // npm install react-confetti

const PuzzleSolver = () => {
  const primaryColor = "#00f7ff";
  const initialPuzzle = [1, 2, 3, 4, 5, 6, 7, 8, ""];
  const [puzzle, setPuzzle] = useState(shuffleArray(initialPuzzle));
  const [completed, setCompleted] = useState(false);

  function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  // Check puzzle completion
  useEffect(() => {
    const isComplete =
      puzzle.slice(0, 8).every((val, i) => val === i + 1) && puzzle[8] === "";
    setCompleted(isComplete);

    if (isComplete) saveStats();
  }, [puzzle]);

  const moveTile = (index) => {
    if (completed) return;
    const emptyIndex = puzzle.indexOf("");
    const validMoves = [
      emptyIndex - 1,
      emptyIndex + 1,
      emptyIndex - 3,
      emptyIndex + 3,
    ];
    if (validMoves.includes(index)) {
      const newPuzzle = [...puzzle];
      [newPuzzle[emptyIndex], newPuzzle[index]] = [
        newPuzzle[index],
        newPuzzle[emptyIndex],
      ];
      setPuzzle(newPuzzle);
    }
  };

  const restartPuzzle = () => {
    setPuzzle(shuffleArray(initialPuzzle));
    setCompleted(false);
  };

  // Save completion stats in localStorage
  const saveStats = () => {
    const prevStats = JSON.parse(localStorage.getItem("puzzleStats") || "{}");
    const totalGames = (prevStats.totalGames || 0) + 1;
    localStorage.setItem(
      "puzzleStats",
      JSON.stringify({ totalGames })
    );
  };

  return (
    <div className="pt-[100px] pb-12 px-6 min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 text-gray-100 flex flex-col items-center">
      {completed && <Confetti />}

      <h1
        className="text-4xl font-bold mb-8 text-center"
        style={{ color: primaryColor }}
      >
        {completed ? "🎉 Puzzle Completed! 🎉" : "Puzzle Solver"}
      </h1>

      <div className="grid grid-cols-3 gap-4 w-full max-w-xl">
        {puzzle.map((tile, index) => (
          <motion.div
            key={index}
            onClick={() => moveTile(index)}
            whileHover={{ scale: completed ? 1 : 1.05 }}
            className={`aspect-square flex items-center justify-center text-3xl font-bold rounded-lg cursor-pointer border-2 border-[#00f7ff] transition-all duration-300
              ${tile === "" ? "bg-gray-800" : completed ? "bg-green-500 text-black shadow-lg" : "bg-gray-900 text-[#00f7ff] hover:shadow-[0_0_15px_#00f7ff]"}`}
          >
            {tile}
          </motion.div>
        ))}
      </div>

      {completed && (
        <motion.button
          className="mt-6 px-6 py-2 bg-[#00f7ff] text-black rounded-lg font-semibold hover:bg-black hover:text-[#00f7ff] transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={restartPuzzle}
        >
          Restart
        </motion.button>
      )}
    </div>
  );
};

export default PuzzleSolver;
