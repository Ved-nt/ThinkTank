import React from "react";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { Outlet } from "react-router-dom";
import Cursor from "./components/Cursor.jsx";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-gray-100">
      <Navbar />
      <Cursor />
      {/* Make Outlet grow to fill space */}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;

