import React from "react";
import Navbar from "./Navbar";
import { COLORS } from "../constants/colors";
import Example from "../../components/file-upload-form-2";
import { Badge } from "../../components/ui/badge";
function RaiseIssue() {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="bg-white shadow-sm border m-3 mt-7 min-h-70  rounded-md flex items-center p-2 py-3">
        <Example />
      </div>
      <div className="p-4 min-h-screen  shadow-sm border m-3 rounded-md  ">
        {" "}
        <label className="font-bold" htmlFor="">
          Ticket History
        </label>
        <div className="mt-3 border rounded p-2 h-30 w-full">
          <div className="font-semibold">Support ticket id</div>
          <div className="flex mt-3 justify-between">
            <div>md rumman alam</div>
            <div>upi339393939</div>
          </div>
          <div className="flex mt-2 justify-between ">
            <div>img link</div>
            <div className="">
              <Badge
                variant="secondary"
                className="bg-green-50 text-green-700 mr-3"
              >
                ACTIVE
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RaiseIssue;
