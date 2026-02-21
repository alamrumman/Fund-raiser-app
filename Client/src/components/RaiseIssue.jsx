import React from "react";
import Navbar from "./Navbar";
import { useState } from "react";
import { COLORS } from "../constants/colors";
import Example from "../../components/file-upload-form-2";
import { Badge } from "../../components/ui/badge";
import TicketList from "./TicketList";
function RaiseIssue() {
  const [refresh, setRefresh] = useState(false);
  return (
    <div className="h-screen">
      <Navbar />
      <div className="bg-white shadow-sm border m-3 mt-7 min-h-70  rounded-md flex items-center p-2 py-3">
        <Example setRefresh={setRefresh} />
      </div>
      <div className="p-4 min-h-screen  shadow-sm border m-3 rounded-md  ">
        {" "}
        <label className="font-bold" htmlFor="">
          Ticket History
        </label>
        <TicketList refresh={refresh} />
      </div>
    </div>
  );
}

export default RaiseIssue;
