import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Home, Book, Gamepad, FileText, Info } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = ({ onHomeClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar on Esc key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    closeSidebar();
    if (onHomeClick) onHomeClick();
  };

  const primaryColor = "#00f7ff"; // cyan
  const secondaryColor = "#3e89fbff"; // subtle magenta accent

  return (
    <>
      {/* Navbar Top Bar */}
      <nav className="fixed top-0 left-0 w-full h-16 bg-black z-50 flex items-center px-6 shadow-md">
        {/* Menu toggle icon */}
        <button onClick={toggleSidebar} className="mr-4">
          <Menu
            className="w-8 h-8 text-[#00f7ff] hover:text-[#3e89fbff] transition-colors"
          />
        </button>

        {/* Website name */}
        <span
          className="font-orbitron text-2xl"
          style={{
            color: primaryColor,
            textShadow: `0 0 6px ${primaryColor}`,
          }}
        >
          ThinkTank
        </span>
      </nav>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-64 bg-black bg-gradient-to-b from-black via-gray-900 to-black shadow-lg z-50 overflow-y-auto p-6 flex flex-col justify-between"
            >
              {/* Sidebar links */}
              <div className="mt-16 flex flex-col gap-5">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-2 rounded transition-all duration-300 ${
                      isActive
                        ? `text-[#00f7ff] drop-shadow-[0_0_8px_#00f7ff] scale-105`
                        : "text-gray-300 hover:text-[#3e89fbff] hover:drop-shadow-[0_0_6px_#3e89fbff] hover:scale-105"
                    }`
                  }
                  onClick={scrollToTop}
                >
                  <Home className="w-6 h-6" /> Dashboard
                </NavLink>

                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-2 rounded transition-all duration-300 ${
                      isActive
                        ? `text-[#00f7ff] drop-shadow-[0_0_8px_#00f7ff] scale-105`
                        : "text-gray-300 hover:text-[#3e89fbff] hover:drop-shadow-[0_0_6px_#3e89fbff] hover:scale-105"
                    }`
                  }
                  onClick={closeSidebar}
                >
                  <Info className="w-6 h-6" /> About
                </NavLink>

                <NavLink
                  to="/games"
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-2 rounded transition-all duration-300 ${
                      isActive
                        ? `text-[#00f7ff] drop-shadow-[0_0_8px_#00f7ff] scale-105`
                        : "text-gray-300 hover:text-[#3e89fbff] hover:drop-shadow-[0_0_6px_#3e89fbff] hover:scale-105"
                    }`
                  }
                  onClick={closeSidebar}
                >
                  <Gamepad className="w-6 h-6" /> Games
                </NavLink>

                <NavLink
                  to="/journal"
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-2 rounded transition-all duration-300 ${
                      isActive
                        ? `text-[#00f7ff] drop-shadow-[0_0_8px_#00f7ff] scale-105`
                        : "text-gray-300 hover:text-[#3e89fbff] hover:drop-shadow-[0_0_6px_#3e89fbff] hover:scale-105"
                    }`
                  }
                  onClick={closeSidebar}
                >
                  <FileText className="w-6 h-6" /> Journal
                </NavLink>

                <NavLink
                  to="/notes"
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-2 rounded transition-all duration-300 ${
                      isActive
                        ? `text-[#00f7ff] drop-shadow-[0_0_8px_#00f7ff] scale-105`
                        : "text-gray-300 hover:text-[#3e89fbff] hover:drop-shadow-[0_0_6px_#3e89fbff] hover:scale-105"
                    }`
                  }
                  onClick={closeSidebar}
                >
                  <Book className="w-6 h-6" /> Notes
                </NavLink>
              </div>

              {/* Bottom section */}
              <div className="text-gray-400 text-sm mt-8">
                <p className="mb-2">⚡ Daily Tip:</p>
                <p className="text-[#00f7ff] drop-shadow-[0_0_6px_#00f7ff]">
                  “Keep building, keep glowing.”
                </p>
                <p className="mt-4 text-gray-500 text-xs">© 2025 ThinkTank</p>
              </div>
            </motion.div>

            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
              onClick={closeSidebar}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
