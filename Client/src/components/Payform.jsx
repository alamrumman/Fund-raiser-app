import React from "react";
import { useEffect, useState } from "react";
import { COLORS } from "../constants/colors";
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
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const amount = yearAmountMap[year];

  const redirectToZaakpay = (paymentData) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://api.zaakpay.com/api/paymentTransact/V8";

    const fields = {
      merchantIdentifier: paymentData.merchantIdentifier,
      orderId: paymentData.orderId,
      amount: paymentData.amount,
      currency: paymentData.currency,
      buyerEmail: paymentData.buyerEmail,
      checksum: paymentData.checksum,
    };

    Object.entries(fields).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      //redirecting for now

      window.location.href = "https://api.zaakpay.com/api/paymentTransact/V8";

      // const res = await fetch(
      //   "https://fund-raiser-app.onrender.com/api/amount/recalculate-amount",
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({
      //       name,
      //       year,
      //       isSW,
      //       email,
      //     }),
      //   },
      // );

      // from the frontend we will be passing username and year only , amount is just a UI view. The amount will be
      // recalculated at the backend hence making the system secure. As blindly sending from the frontend can cause
      // serious issues like user acessing the dev tools and manipulating amounts and causing issues.

      // const data = await res.json();
      // console.log("res.ok:", res.ok);
      // console.log("status:", res.status);
      // console.log("data:", data);

      // if (res.ok && data.success) {
      //   redirectToZaakpay(data);
      // } else {
      //   alert(data.message || "Unable to initiate payment");
      // }
      // console.log("Response:", data);
    } catch (err) {
      console.error("Payment error:", err);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="fixed inset-0 backdrop-blur-sm bg-opacity-30 z-50 "
    >
      <div
        className=" rounded-xl m-3 mt-25 h-130 justify-center "
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
          <label className="flex ml-2 mt-5">Enter email</label>

          <input
            type="email"
            placeholder="example@gmail.com"
            className="border border-black rounded-2xl p-2 w-full bg-gray-100"
            pattern="^[a-zA-Z0-9._%+-]+@gmail\.com$"
            title="Only Gmail addresses are allowed (example@gmail.com)"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <button
            disabled={loading}
            className={`w-full mt-5 p-3 rounded-3xl text-white font-bold
  ${loading ? "bg-gray-400" : "bg-green-500"}`}
          >
            {loading ? "Redirecting..." : "Contribute now !"}
          </button>
        </div>
        <div className="w-full overflow-hidden bg-yellow-100 border-y border-yellow-400">
          <div className="flex w-max animate-[ticker_20s_linear_infinite]">
            <span className="px-8 py-2 text-sm font-semibold text-yellow-900 whitespace-nowrap">
              ⚠️ Payments will fail as merchant onboarding is not complete. Live
              payments will be enabled after approval.
            </span>
            <span className="px-8 py-2 text-sm font-semibold text-yellow-900 whitespace-nowrap">
              ⚠️ Payments will fail as merchant onboarding is not complete. Live
              payments will be enabled after approval.
            </span>
            <span className="px-8 py-2 text-sm font-semibold text-yellow-900 whitespace-nowrap">
              ⚠️ Payments will fail as merchant onboarding is not complete. Live
              payments will be enabled after approval.
            </span>
          </div>

          <style>{`
    @keyframes ticker {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }
  `}</style>
        </div>
      </div>
    </form>
  );
}

export default Payform;
