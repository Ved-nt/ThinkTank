import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx';
import About from "./pages/About.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Games from "./pages/Games.jsx";
import Notes from "./pages/Notes.jsx";
import Journal from "./pages/Journal.jsx";

// Individual game components
import MemoryMatch from "./games/MemoryMatch.jsx";
import PuzzleSolver from "./games/PuzzleSolver.jsx";
import ReactionTime from "./games/ReactionTime.jsx";
import WordCraze from "./games/WordCraze.jsx";
import SpeedMath from "./games/SpeedMath.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "",
        element: <Dashboard />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "games",
        element: <Games />
      },
      {
        path: "games/memory-match",
        element: <MemoryMatch />
      },
      {
        path:"games/reaction-time",
        element:<ReactionTime />
      },
      {
        path:"games/puzzle-solver",
        element: <PuzzleSolver />
      },
      {
        path:"games/word-craze",
        element: <WordCraze/>
      },
      {
        path:"games/speed-math",
        element: <SpeedMath/>
      },
      {
        path: "journal",
        element: <Journal />
      },
      {
        path: "notes",
        element: <Notes />
      }
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
