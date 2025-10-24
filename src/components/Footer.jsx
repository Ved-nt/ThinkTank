import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Book, Gamepad, FileText, Info, Instagram, Github } from "lucide-react";

const Footer = () => {
  const neonColor = "#00f7ff"; // main cyan
  const neonText = "text-[#00f7ff]";

  return (
    <footer className="bg-black border-t border-gray-800 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">

        {/* Left section: Quick Links */}
        <div className="flex flex-wrap gap-6 mb-4 md:mb-0">
          <NavLink
            to="/"
            className={`transition-colors flex items-center gap-1 hover:text-[#00f7ff]`}
          >
            <Home className={`${neonText} w-5 h-5`} /> Dashboard
          </NavLink>
          <NavLink
            to="/about"
            className={`transition-colors flex items-center gap-1 hover:text-[#00f7ff]`}
          >
            <Info className={`${neonText} w-5 h-5`} /> About
          </NavLink>
          <NavLink
            to="/games"
            className={`transition-colors flex items-center gap-1 hover:text-[#00f7ff]`}
          >
            <Gamepad className={`${neonText} w-5 h-5`} /> Games
          </NavLink>
          <NavLink
            to="/journal"
            className={`transition-colors flex items-center gap-1 hover:text-[#00f7ff]`}
          >
            <FileText className={`${neonText} w-5 h-5`} /> Journal
          </NavLink>
          <NavLink
            to="/notes"
            className={`transition-colors flex items-center gap-1 hover:text-[#00f7ff]`}
          >
            <Book className={`${neonText} w-5 h-5`} /> Notes
          </NavLink>
        </div>

        {/* Right section: Social / small message */}
        <div className="flex flex-col md:flex-row items-center gap-4 text-gray-400 text-sm">
          <div>© 2025 ThinkTank</div>
          <div className="flex gap-3">
            <a
              href="https://github.com/Ved-nt"
              target="_blank"
              rel="noreferrer"
              className="hover:drop-shadow-[0_0_8px_#00f7ff] transition-shadow"
            >
              <Github className={`${neonText} w-5 h-5`} />
            </a>
            <a
              href="https://www.instagram.com/ve_dant05/"
              target="_blank"
              rel="noreferrer"
              className="hover:drop-shadow-[0_0_8px_#00f7ff] transition-shadow"
            >
              <Instagram className={`${neonText} w-5 h-5`} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
