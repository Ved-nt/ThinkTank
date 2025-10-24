import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Cursor = () => {
    const [positions, setPositions] = useState([]);
    const maxTrail = 15;
    const neonColor = "#00f7ff"; // consistent neon cyan

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPositions((prev) => {
                const newPos = [...prev, { x: e.clientX, y: e.clientY }];
                if (newPos.length > maxTrail) newPos.shift();
                return newPos;
            });
        };

        const decayInterval = setInterval(() => {
            setPositions((prev) => {
                if (prev.length > 1) {
                    const newTrail = [...prev];
                    newTrail.shift();
                    return newTrail;
                }
                return prev;
            });
        }, 50);

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            clearInterval(decayInterval);
        };
    }, []);

    return (
        <>
        {positions.map((pos, index) => {
            const opacity = 0.1 + 0.7 * ((index + 1) / positions.length);

            const size = 6 * (index + 1) / positions.length;

            return (
                <motion.div
                    key={index}
                    className="fixed pointer-events-none rounded-full z-50"
                    style={{
                        left: pos.x - size / 2,
                        top: pos.y - size / 2,
                        width: size,
                        height: size,
                        background: neonColor,
                        opacity: opacity,
                        filter: `drop-shadow(0 0 6px ${neonColor}) drop-shadow(0 0 6px ${neonColor})`,
                    }}
                    animate={{ left: pos.x - size / 2, top: pos.y - size / 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 28 }}
                />
            );
        })}
        </>
    );
};

export default Cursor;
