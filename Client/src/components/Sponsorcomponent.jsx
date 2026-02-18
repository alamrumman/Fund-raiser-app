import React from "react";

function Sponsorcomponent({ sponsor, setSponsor }) {
  if (!sponsor) return null;
  return (
    <div>
      <form className="fixed inset-0 backdrop-blur-sm bg-opacity-30 z-50 ">
        <div className=" rounded-xl m-3 mt-22 h-140 justify-center bg-white ">
          <div className="py-5 px-2 font-semibold text-lg flex justify-between">
            <div className="w-12"> </div>
            <div>Contribution Form</div>
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
              Name
            </label>
            <input
              type="text"
              placeholder="Enter name"
              className="border border-black rounded-2xl p-2 w-full bg-gray-100"
              required
            />
            <label className="flex ml-2 mt-5">Enter Phone number</label>

            <input
              type="Number"
              className="border border-black rounded-2xl p-2 w-full bg-gray-100"
              required
            />

            <div className=" w-full flex justify-center items-center mt-5 rounded bg-amber-300 h-10">
              Amount:
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Sponsorcomponent;
