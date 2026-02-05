import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
const yearAmountMap = {
  first: 200,
  second: 250,
  third: 300,
};

function Landingpage() {
  const COLORS = {
    bg: "#f9e8c9",
    white: "#FFFFFF",

    textPrimary: "#1F1F1F",
    textSecondary: "#6B6B6B",

    primary: "#2FBF71",
    primarySoft: "#E6F7ED",

    border: "#E6E6E6",
  };

  const [isSW, setIsSW] = useState(false);
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const amount = yearAmountMap[year];

  // from the frontend we will be passing username and year only , amount is just a UI view. The amount will be
  // recalculated at the backend hence making the system secure. As blindly sending from the frontend can cause
  // serious issues like user acessing the dev tools and manipulating amounts and causing issues.
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://fund-raiser-app.onrender.com/api/amount/recalculate-amount",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            year,
            isSW,
          }),
        },
      );

      const data = await res.json();
      console.log("Response:", data);
    } catch (err) {
      console.error("Payment error:", err);
    }
  };

  return (
    <div style={{ background: COLORS.bg }} className="w-full h-screen">
      <Navbar />
      <div className=" mt-16 flex justify-center ">
        <div className="   px-5 py-3 font-bold bg-[#fff7e9] rounded-md">
          Our Impact
        </div>
      </div>
      <div className=" flex justify-center mt-4 text-2xl font-bold px-7 sm:text-3xl  ">
        Together, Let's Make
      </div>
      <div className="flex justify-center text-2xl font-bold px-10 sm:text-3xl ">
        A Diffrence
      </div>
      <div className=" h-35 rounded-2xl shadow-xl mt-5 m-3 bg-amber-50 p-1">
        <div className="flex justify-center">
          <label className="font-semibold text-lg p-2" htmlFor="">
            Total Funds Raised
          </label>
        </div>
        <div className="w-full h-11  flex items-center justify-center text-2xl font-extrabold underline mb-1 ">
          {" "}
          ₹0.00/-
        </div>
        <div className="flex justify-center">
          powered by
          <img
            src="\images\upi.svg"
            alt=""
            className="h-7 w-10 bg-white ml-1 mr-1"
          />{" "}
          &
          <img
            src="\images\zaakpay+logo.png"
            alt=""
            className="h-6 w-22 bg-white ml-2"
          />
        </div>
      </div>
      <div
        className="mt-5 rounded-4xl m-1 h-full justify-center"
        style={{ background: COLORS.white }}
      >
        <div className="p-5 font-semibold text-lg flex justify-center">
          Contribution Form
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-center gap-3">
            <span className="text-sm font-medium text-gray-600">SD</span>

            <div
              onClick={() => setIsSW(!isSW)}
              className={`relative w-12 h-6 rounded-full cursor-pointer transition
          ${isSW ? "bg-blue-400" : "bg-green-300"}`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition
            ${isSW ? "translate-x-6" : "translate-x-0.5"}`}
              />
            </div>

            <span className="text-sm font-medium text-gray-600">SW</span>
          </div>
          <div className="p-5">
            <label htmlFor="" className="flex ml-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter name"
              className="border border-black rounded-2xl p-2 w-full bg-gray-100"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="mt-5 flex gap-3">
              <label className="flex" htmlFor="">
                Select Year
              </label>
              <select
                name="selected year"
                id=""
                className="bg-gray-200 rounded"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              >
                <option value="">Choose</option>
                <option value="third">3rd</option>
                <option value="second">2nd</option>
                <option value="first">1st</option>
              </select>
            </div>
            <div className=" w-full flex justify-center items-center mt-5 rounded bg-amber-300 h-10">
              Amount: ₹{amount}/-
            </div>
            <button className="w-full mt-5 p-3 bg-green-500 rounded-3xl text-white font-bold">
              Contribute now !
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Landingpage;
