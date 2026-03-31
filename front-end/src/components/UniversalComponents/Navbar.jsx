import React from "react";

function Navbar({ setView }) {
  return (
    <>
      {/* ======================================================
          UI COMPONENT: Navbar
          ------------------------------------------------------
          Persistent top bar rendered across ALL views.
          Contains the app brand name and a "Home" button that
          resets the view back to "landing". Does NOT reset
          any state — previously loaded analysis is preserved
          in memory if the user navigates back.
      ====================================================== */}

      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
        <>
          <h1 className="text-xl font-bold">ResumeAI</h1>
          <button
            onClick={() => setView("landing")}
            className="text-sm text-gray-600"
          >
            Home
          </button>
        </>
      </nav>
    </>
  );
}

export default Navbar;
