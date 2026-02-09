import React from "react";
import Navbar from "./Navbar";
import { COLORS } from "../constants/colors";
function RaiseIssue() {
  return (
    <div style={{ background: COLORS.bg }} className="h-screen">
      <Navbar />
      <div className="bg-white shadow-sm m-4 h-80 mt-7 rounded-md flex items-center justify-center">
        Page under build
      </div>
    </div>
  );
}

export default RaiseIssue;
