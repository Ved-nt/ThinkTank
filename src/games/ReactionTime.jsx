import React, { useState, useEffect, useRef } from "react";

export default function ReactionTime() {
  const [lights, setLights] = useState(Array(3).fill(Array(5).fill(false)));
  const [gameState, setGameState] = useState("start"); // start | lights | ready | result
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [bestTime, setBestTime] = useState(null);
  const lightTimers = useRef([]);
  const readyTimeoutRef = useRef(null);

  const startLightSequence = () => {
    setGameState("lights");

    const delays = [1200, 1500, 1800]; // delays before each row lights up in ms

    const lightUpRow = (row = 0) => {
      if (row >= 3) {
        const randomDelay = Math.random() * 2000 + 1500;
        readyTimeoutRef.current = setTimeout(() => {
          setLights(Array(3).fill(Array(5).fill(false)));
          setGameState("ready");
          setStartTime(Date.now());
        }, randomDelay);
        return;
      }

      setLights((prev) =>
        prev.map((r, i) => (i <= row ? r.map(() => true) : r.map(() => false)))
      );

      const timer = setTimeout(() => lightUpRow(row + 1), delays[row]);
      lightTimers.current.push(timer);
    };

    const firstTimer = setTimeout(() => lightUpRow(0), 800);
    lightTimers.current.push(firstTimer);
  };

  const handleClick = () => {
    if (gameState === "start") {
      setReactionTime(null);
      startLightSequence();
    } else if (gameState === "lights") {
      clearAllTimers();
      setGameState("result");
      setReactionTime("Jump Start 🚫");
      recordGamePlayed(); // count as played
    } else if (gameState === "ready") {
      const rt = Date.now() - startTime;
      setReactionTime(rt);
      setBestTime((prev) => (prev === null || rt < prev ? rt : prev));
      setGameState("result");
      recordGamePlayed();
    } else if (gameState === "result") {
      resetGame();
    }
  };

  const recordGamePlayed = () => {
    try {
      const stats = JSON.parse(localStorage.getItem("gameStats")) || {};
      stats.reactionTime = (stats.reactionTime || 0) + 1; // track how many times played
      localStorage.setItem("gameStats", JSON.stringify(stats));
    } catch (err) {
      console.error("Failed to record game play", err);
    }
  };

  const clearAllTimers = () => {
    lightTimers.current.forEach((t) => clearTimeout(t));
    lightTimers.current = [];
    clearTimeout(readyTimeoutRef.current);
  };

  const resetGame = () => {
    clearAllTimers();
    setLights(Array(3).fill(Array(5).fill(false)));
    setGameState("start");
  };

  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  return (
    <div
      onClick={handleClick}
      className="h-screen w-full bg-black flex flex-col justify-center items-center text-white cursor-pointer select-none"
    >
      {gameState === "start" && (
        <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center">
          🏁 Click anywhere to start
        </h1>
      )}

      {(gameState === "lights" || gameState === "ready" || gameState === "result") && (
        <div className="grid grid-rows-3 gap-4 mb-10">
          {lights.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-4 justify-center">
              {row.map((light, colIndex) => (
                <div
                  key={colIndex}
                  className={`w-10 h-10 md:w-14 md:h-14 rounded-full transition-all duration-300 ${
                    light
                      ? "bg-red-600 shadow-red-500 shadow-2xl"
                      : gameState === "ready"
                      ? "bg-green-500 shadow-green-400 shadow-2xl"
                      : "bg-gray-700"
                  }`}
                ></div>
              ))}
            </div>
          ))}
        </div>
      )}

      {gameState === "result" && (
        <div className="text-center">
          {typeof reactionTime === "number" ? (
            <h2 className="text-4xl md:text-5xl font-bold text-green-400">
              ⏱️ {reactionTime} ms
            </h2>
          ) : (
            <h2 className="text-3xl font-bold text-red-500">{reactionTime}</h2>
          )}
          {bestTime !== null && typeof bestTime === "number" && (
            <p className="text-lg mt-4 text-yellow-300">🏆 Best: {bestTime} ms</p>
          )}
          <p className="mt-4 text-gray-400">(Click to restart)</p>
        </div>
      )}
    </div>
  );
}
