import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Payform from "../components/Payform";
import Footer from "../components/Footer";
import { Badge } from "../../components/ui/badge";
import { COLORS } from "../constants/colors";
import Sponsorcomponent from "../components/Sponsorcomponent";
function Landingpage() {
  const [popup, setPopup] = useState(false);
  const [sponsor, setSponsor] = useState(false);
  const [totalAmount, setTotalAmount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [animatedAmount, setAnimatedAmount] = useState(0);

  useEffect(() => {
    const fetchFundStats = async () => {
      try {
        const res = await fetch(
          "https://fund-raiser-app.onrender.com/api/fund-stats",
        );
        const data = await res.json();
        setTotalAmount(data.totalAmount);
      } catch (err) {
        console.error("Failed to fetch fund stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFundStats();
  }, []);
  const formattedAmount = new Intl.NumberFormat("en-IN").format(totalAmount);
  useEffect(() => {
    if (totalAmount == null) return;

    let startTime = performance.now();
    const duration = 1000; // ms
    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * totalAmount);

      setAnimatedAmount(value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [totalAmount]);

  return (
    <div
      style={{ background: COLORS.bg }}
      className="w-full h-screen md:px-30 lg:px-60"
    >
      <Navbar />
      <div className=" mt-16 flex justify-center ">
        <div className="   px-5 py-3 font-bold bg-amber-50 rounded-md">
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
        <div className="w- h-11  flex items-center justify-center text-2xl font-extrabold mb-1 ">
          {" "}
          {loading
            ? ""
            : `₹${new Intl.NumberFormat("en-IN").format(animatedAmount)}/-`}
        </div>
        <div className="flex justify-center">
          powered by
          <img
            src="\images\upi.svg"
            alt=""
            className="h-7 w-12 bg-white ml-1 mr-1"
          />{" "}
          &
          <img
            src="\images\logo-dark.png"
            alt=""
            className="h-6 w-33 bg-white ml-2"
          />
        </div>
      </div>
      <div className=" h-27 rounded-2xl shadow-xl mt-5 m-3 bg-amber-50 p-1 flex justify-between gap-0  ">
        <div className="w-65 py-2 px-2 ">
          <label htmlFor="" className="font-bold text-md">
            Kartavya 2026
          </label>
          <h1 htmlFor="" className="text-xs ">
            Join hands in making Kartavya 2026 a successful celebration of
            culture, sports, and talent.
          </h1>
        </div>
        <div className=" text-white flex justify-center items-center p-1">
          <button
            onClick={() => setPopup(true)}
            className="bg-black rounded p-1 w-32 h-12 font-bold text-sm"
          >
            Contribute now!
          </button>
        </div>
      </div>

      {popup && <Payform popup={popup} setPopup={setPopup} />}
      <div className="flex">
        <div className="w-48 bg-amber-50 border h-40 m-3 rounded-xl shadow-xl p-2 mt-2">
          <div className="flex justify-center">
            <h1 className="flex w-full items-center justify-center font-bold ">
              Hello Sponsors!
            </h1>
            <img
              src="\images\waving-hand-medium-light-skin-tone-svgrepo-com.svg"
              alt=""
              className="w-10"
            />{" "}
          </div>
          <div className="text-xs -tracking-normal ">
            Showcase your brand to about 4000+ driven youth leaders from 40+
            colleges of Delhi
          </div>
          <div className="flex justify-center p-1">
            <button
              className="bg-green-500 rounded p-2 mt-2  h-7 font-bold text-sm text-white flex items-center"
              onClick={() => {
                setSponsor(true);
              }}
            >
              Become a Sponsor!
            </button>
          </div>
        </div>
      </div>

      {setSponsor && (
        <Sponsorcomponent sponsor={sponsor} setSponsor={setSponsor} />
      )}

      <Footer />
    </div>
  );
}

export default Landingpage;
