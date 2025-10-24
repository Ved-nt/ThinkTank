import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const MemoryMatch = () => {
    const primaryColor = "#00f7ff";
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [gameOver, setGameOver] = useState(false);

    const icons = ["💎","🔥","🍀","⚡","🌙","⭐","🍎","🎵"]; // 8 unique cards

    // Initialize cards
    useEffect(() => {
        shuffleCards();
    }, []);

    const shuffleCards = () => {
        const shuffled = [...icons, ...icons]
            .sort(() => Math.random() - 0.5)
            .map((icon, index) => ({ id: index, icon }));
        setCards(shuffled);
        setFlipped([]);
        setMatched([]);
        setGameOver(false);
    };

    const handleClick = (id) => {
        if (flipped.includes(id) || matched.includes(id) || gameOver) return;
        const newFlipped = [...flipped, id];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            const [first, second] = newFlipped;
            if (cards[first].icon === cards[second].icon) {
                setMatched(prev => [...prev, first, second]);
            }
            setTimeout(() => setFlipped([]), 800);
        }
    };

    // Check for game over
    useEffect(() => {
        if (matched.length === cards.length && cards.length > 0) {
            setGameOver(true);
            saveStats();
        }
    }, [matched, cards]);

    // Save game stats to localStorage for Dashboard
    const saveStats = () => {
        const prevStats = JSON.parse(localStorage.getItem("memoryMatchStats") || "{}");
        const totalGames = (prevStats.totalGames || 0) + 1;
        const totalMatches = (prevStats.totalMatches || 0) + matched.length / 2;

        localStorage.setItem("memoryMatchStats", JSON.stringify({
            totalGames,
            totalMatches
        }));
    };

    return (
        <div className="pt-[100px] pb-12 px-6 min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 text-gray-100">
            <h1 className="text-4xl font-bold mb-8 text-center" style={{color: primaryColor}}>Memory Match</h1>
            
            <div className="grid grid-cols-4 gap-4 max-w-3xl mx-auto mb-6">
                {cards.map((card) => {
                    const isFlipped = flipped.includes(card.id) || matched.includes(card.id);
                    return (
                        <motion.div
                            key={card.id}
                            onClick={() => handleClick(card.id)}
                            whileHover={{ scale: 1.05 }}
                            className={`aspect-square flex items-center justify-center text-3xl rounded-lg cursor-pointer border-2 border-[#00f7ff] bg-gray-900 ${
                                isFlipped ? "bg-[#00f7ff] text-black" : "text-[#00f7ff]"
                            }`}
                        >
                            {isFlipped ? card.icon : "?"}
                        </motion.div>
                    );
                })}
            </div>

            {gameOver && (
                <div className="text-center mt-6">
                    <h2 className="text-3xl font-bold text-green-400 mb-2">🎉 You matched all cards!</h2>
                    <motion.button
                        onClick={shuffleCards}
                        className="mt-4 px-6 py-2 bg-[#00f7ff] text-black rounded-lg hover:scale-105 transition"
                    >
                        Play Again
                    </motion.button>
                </div>
            )}
        </div>
    );
};

export default MemoryMatch;
