import React from "react";
import { useState, useEffect } from "react";
import { useRef } from "react";
import Spinner from "./Spinner";
function Sponsorcomponent({ sponsor, setSponsor }) {
  if (!sponsor) return null;

  const [amount, setamount] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstCall, setFirstCall] = useState(false);
  const submittingRef = useRef(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

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

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (submittingRef.current) return;
    submittingRef.current = true;
    setLoading(true);
    setShowSpinner(true);

    try {
      const res = await fetch(
        "https://fund-raiser-app.onrender.com/api/amount/sponsorAmount",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            amount,
            phone,
          }),
        },
      );

      const data = await res.json();
      //now we will extract the link that comes from backend and redirect user to payment gateway
      if (res.ok && data.payment_url) {
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
    } catch (error) {
      submittingRef.current = false;
      setLoading(false);
      setShowSpinner(false);
      console.error("Payment error:", error);
    }
  };
  return (
    <div>
      <form
        className="fixed inset-0 backdrop-blur-sm bg-opacity-30 z-50 "
        onSubmit={handlesubmit}
      >
        <div className=" rounded-xl m-3 mt-22 min-h-120 justify-center bg-white ">
          <div className="py-5 px-2 font-semibold text-lg flex justify-between">
            <div className="w-12"> </div>
            <div>Sponsorship Form</div>
            <button>
              {" "}
              <img
                src="\images\close-x-svgrepo-com.svg"
                alt=""
                className="w-6 h-6 mr-2"
                onClick={() => {
                  setSponsor(false);
                }}
              />{" "}
            </button>
          </div>

          <div className="p-5">
            <label htmlFor="" className="flex ml-2">
              Brand/Company name
            </label>
            <div>
              <input
                type="text"
                placeholder="Enter Name"
                className="outline-none  border-black border rounded-2xl p-2 w-full bg-gray-100 mb-4"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <label htmlFor="" className="flex ml-2">
              Amount
            </label>
            <div className="flex border border-black rounded-2xl p-2 w-full bg-gray-100 justify-between">
              <div>
                <input
                  type="text"
                  placeholder="Enter Amount"
                  className="outline-none ml-1"
                  value={amount}
                  required
                  onChange={(e) => setamount(e.target.value)}
                ></input>
              </div>
              <div className="bg-white w-15 rounded-2xl font-serif text-sm flex items-center justify-center ">
                INR
              </div>
            </div>
            <label className="flex ml-2 mt-5"> Phone number</label>

            <input
              type="Number"
              className="border border-black rounded-2xl p-2 w-full bg-gray-100"
              required
              placeholder="eg 9876987600"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />

            <div className=" w-full flex justify-center items-center mt-5 rounded bg-amber-300 h-10">
              Amount: ₹{amount}/-
            </div>
            <div>
              {showSpinner ? (
                <Spinner />
              ) : (
                <button
                  className={`w-full mt-5 p-3 rounded-3xl text-white font-bold ${firstCall ? "bg-green-500" : "bg-gray-400"}`}
                >
                  {firstCall ? "Sponsor now!" : "Loading server"}
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Sponsorcomponent;
