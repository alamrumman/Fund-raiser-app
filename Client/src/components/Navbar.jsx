import React from "react";

function Navbar() {
  return (
    <div className="w-full h-15 py-2">
      <div className="flex justify-between">
        <div className="flex p-2 gap-2">
          <img
            src="\images\ncc logo.jpg"
            className="w-12 h-12 rounded-4xl"
            alt=" Logo"
          />
          <div className="text-lg font-semibold flex items-center">FUND RAISER
          </div>
        </div>

        <div>
          <img src="images\hamburger-menu-svgrepo-com.svg" alt="" className="w-17"/>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
