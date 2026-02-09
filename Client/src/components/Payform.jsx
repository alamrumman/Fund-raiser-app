import React from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { COLORS } from "../constants/colors";
import Spinner from "./Spinner";
const yearAmountMap = {
  first: 200,
  second: 250,
  third: 300,
};

function Payform({ popup, setPopup }) {
  if (!popup) return null;
  const [isSW, setIsSW] = useState(false);
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [phone, setPhone] = useState("");
  const [firstCall, setFirstCall] = useState(false);
  const [loading, setLoading] = useState(false);
  const submittingRef = useRef(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const amount = yearAmountMap[year];

  useEffect(() => {
    const backEndhit = async () => {
      try {
        const res = await fetch(
          "https://fund-raiser-app.onrender.com/api/amount/checkBackend",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );

        const data = await res.json();
        console.log(data);
        setFirstCall(true);
      } catch (err) {
        console.error("Backend wake-up failed", err);
      }
    };

    backEndhit();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submittingRef.current) return;
    submittingRef.current = true;

    setLoading(true);
    setShowSpinner(true);

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
            phone,
          }),
        },
      );

      const data = await res.json();

      if (res.ok && data.payment_url) {
        // small delay so spinner is visible (UX polish)
        setTimeout(() => {
          window.location.href = data.payment_url;
        }, 800);
        return;
      }

      // failure path
      submittingRef.current = false;
      setLoading(false);
      setShowSpinner(false);
      alert(data.message || "Unable to initiate payment");
    } catch (err) {
      submittingRef.current = false;
      setLoading(false);
      setShowSpinner(false);
      console.error("Payment error:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed inset-0 backdrop-blur-sm bg-opacity-30 z-50 "
    >
      <div
        className=" rounded-xl m-3 mt-22 h-140 justify-center "
        style={{ background: COLORS.white }}
      >
        <div className="py-5 px-2 font-semibold text-lg flex justify-between">
          <div className="w-12"> </div>
          <div>Contribution Form</div>
          <button onClick={() => setPopup(false)}>
            {" "}
            <img
              src="\images\close-x-svgrepo-com.svg"
              alt=""
              className="w-6 h-6 mr-2"
            />{" "}
          </button>
        </div>
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
          <label className="flex ml-2 mt-5">Enter Phone number</label>

          <input
            type="Number"
            className="border border-black rounded-2xl p-2 w-full bg-gray-100"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="98765432112"
          />
          <div className="mt-5 gap-3">
            <label className="flex ml-2">Select Year</label>

            <div className="flex justify-between h-17 gap-0">
              {/* 3rd year */}
              <button
                type="button"
                onClick={() => setYear("third")}
                className={`
        bg-white rounded w-full m-1 flex justify-center items-center p-2
        transition-all duration-200
        ${year === "third" ? "border-2 border-green-500" : "border border-gray-300"}
      `}
              >
                3rd year ₹300/-
              </button>

              {/* 2nd year */}
              <button
                type="button"
                onClick={() => setYear("second")}
                className={`
        bg-white rounded w-full m-1 flex justify-center items-center p-2
        transition-all duration-200
        ${
          year === "second"
            ? "border-2 border-green-500"
            : "border border-gray-300"
        }
      `}
              >
                2nd year ₹250/-
              </button>

              {/* 1st year */}
              <button
                type="button"
                onClick={() => setYear("first")}
                className={`
        bg-white rounded w-full m-1 flex justify-center items-center p-2
        transition-all duration-200
        ${
          year === "first"
            ? "border-2 border-green-500"
            : "border border-gray-300"
        }
      `}
              >
                1st year ₹200/-
              </button>
            </div>
          </div>

          <div className=" w-full flex justify-center items-center mt-5 rounded bg-amber-300 h-10">
            Amount: ₹{amount}/-
          </div>
          {showSpinner ? (
            <Spinner />
          ) : (
            <button
              disabled={!firstCall}
              className={`w-full mt-5 p-3 rounded-3xl text-white font-bold
    ${!firstCall ? "bg-gray-400" : "bg-green-500"}`}
            >
              {!firstCall ? "Loading Server..." : "Contribute now!"}
            </button>
          )}
        </div>
        <div className="w-full overflow-hidden bg-yellow-100 border-y border-yellow-400">
          <div className="flex w-max animate-[ticker_30s_linear_infinite]">
            <span className="px-8 py-2 text-sm font-semibold text-yellow-900 whitespace-nowrap">
              ✅ Raise a ticket if you feel payment was successfull but the
              browser did not redirect to success page, ✅ Check the success
              screen before closing the page
            </span>
            <span className="px-8 py-2 text-sm font-semibold text-yellow-900 whitespace-nowrap">
              ✅ Keep a screenshot or UPI reference ID until confirmation ✅
              Allow pop-ups / redirects if prompted by your browser
            </span>
            <span className="px-8 py-2 text-sm font-semibold text-yellow-900 whitespace-nowrap">
              ✅ Wait for the submit button to turn green.
            </span>
          </div>

          <style>{`
    @keyframes ticker {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-99%); }
    }
  `}</style>
        </div>
      </div>
    </form>
  );
}

export default Payform;
