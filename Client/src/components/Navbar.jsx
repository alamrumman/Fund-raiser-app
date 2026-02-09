import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function Navbar({ onLogsClick }) {
  const navigate = useNavigate();
  return (
    <div className="w-full h-15 py-2">
      <div className="flex justify-between">
        <div className="flex p-2 gap-2">
          <img
            src="\images\ncc logo.jpg"
            className="w-12 h-12 rounded-4xl"
            alt=" Logo"
          />
          <div className="text-lg font-semibold flex items-center">
            FUND RAISER
          </div>
        </div>

        <div className="flex items-center">
          <button
            onClick={() => navigate("/success-view")}
            className="mr-3 p-2 rounded-lg text-sm font-semibold
                     bg-amber-100 text-amber-900
                     hover:bg-amber-200 transition-all
                     shadow-sm border "
          >
            Records
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
