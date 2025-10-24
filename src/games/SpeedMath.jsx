import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const operators = ["+", "-", "*"];

const generateQuestion = () => {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  const op = operators[Math.floor(Math.random() * operators.length)];
  let answer;
  if (op === "+") answer = a + b;
  if (op === "-") answer = a - b;
  if (op === "*") answer = a * b;
  return { text: `${a} ${op} ${b}`, answer };
};

const SpeedMath = () => {
  const primaryColor = "#00f7ff";
  const [question, setQuestion] = useState(generateQuestion());
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [question]);

  useEffect(() => {
    if (timer <= 0) {
      setGameOver(true);
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const checkAnswer = () => {
    if (!gameOver) {
      if (parseInt(userAnswer) === question.answer) {
        setScore((prev) => prev + 10);
      }
      setQuestion(generateQuestion());
      setUserAnswer("");
    }
  };

  const resetGame = () => {
    setScore(0);
    setTimer(60);
    setQuestion(generateQuestion());
    setUserAnswer("");
    setGameOver(false);
  };

  return (
    <div className="pt-24 pb-12 px-6 min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 text-gray-100 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6" style={{ color: primaryColor }}>
        Speed Math
      </h1>

      {!gameOver ? (
        <div className="flex flex-col items-center gap-6">
          <p className="text-gray-300 text-lg">
            Time Left: <span className="text-yellow-300">{timer}s</span> | Score: <span className="text-green-400">{score}</span>
          </p>

          <motion.div className="flex flex-col items-center gap-4">
            <h2 className="text-4xl font-bold text-[#00f7ff]">{question.text}</h2>
            <input
              ref={inputRef}
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
              className="w-32 p-3 text-center rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#00f7ff] bg-gray-200"
            />
          </motion.div>

          <motion.button
            onClick={checkAnswer}
            className="px-6 py-2 bg-[#00f7ff] text-black rounded-lg hover:scale-105 transition"
          >
            Submit
          </motion.button>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-400">⏱ Time's up!</h2>
          <p className="text-gray-300 mt-2">Final Score: <span className="text-yellow-300">{score}</span></p>
          <motion.button
            onClick={resetGame}
            className="mt-4 px-6 py-2 bg-[#00f7ff] text-black rounded-lg hover:scale-105 transition"
          >
            Restart
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default SpeedMath;
