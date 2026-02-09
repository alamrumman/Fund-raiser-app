import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../components/ui/navigation-menu";

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
            onClick={() => navigate("/")}
          />
          <div className="text-lg font-semibold flex items-center">
            FUND RAISER
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex items-center mr-3">
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="p-2 rounded-lg border hover:bg-amber-100 transition-all"
                  aria-label="Open menu"
                >
                  {/* Hamburger icon */}
                  <svg
                    className="pointer-events-none"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line
                      x1="3"
                      y1="6"
                      x2="21"
                      y2="6"
                      className="
      origin-center
      transition-all duration-300
      group-aria-expanded:translate-y-1.5
      group-aria-expanded:rotate-45
    "
                    />
                    <line
                      x1="3"
                      y1="12"
                      x2="21"
                      y2="12"
                      className="
      transition-opacity duration-200
      group-aria-expanded:opacity-0
    "
                    />
                    <line
                      x1="3"
                      y1="18"
                      x2="21"
                      y2="18"
                      className="
      origin-center
      transition-all duration-300
      group-aria-expanded:-translate-y-1.5
      group-aria-expanded:-rotate-45
    "
                    />
                  </svg>
                </button>
              </PopoverTrigger>

              <PopoverContent align="end" className="w-40 p-2 bg-white">
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => navigate("/")}
                    className="px-3 py-2 text-left rounded-md text-sm font-semibold
                     hover:bg-amber-100 transition"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => navigate("/success-view")}
                    className="px-3 py-2 text-left rounded-md text-sm font-semibold
                     hover:bg-amber-100 transition"
                  >
                    Records
                  </button>

                  <button
                    onClick={() => navigate("/raise-issue")}
                    className="px-3 py-2 text-left rounded-md text-sm font-semibold
                     hover:bg-amber-100 transition"
                  >
                    Raise ticket
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
