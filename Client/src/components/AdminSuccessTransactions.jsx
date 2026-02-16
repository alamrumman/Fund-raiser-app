import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { COLORS } from "../constants/colors";
import Navbar from "./Navbar";
function AdminSuccessTransactions() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("SD");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://fund-raiser-app.onrender.com/api/total/success-aggregate",
        );
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to fetch transactions", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="p-4">Loading…</p>;
  if (!data) return <p className="p-4">No data</p>;

  const years = ["third", "second", "first"];

  return (
    <div className=" h-screen ">
      <Navbar />
      {/* Tabs */}
      <div className="flex gap-3 mt-5 mb-4 items-center justify-center ">
        {["SD", "SW"].map((g) => (
          <button
            key={g}
            onClick={() => setTab(g)}
            className={`px-4 py-2 rounded ${
              tab === g ? "bg-black text-white" : "bg-gray-300"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {years.map((year) => {
        const section = data[tab]?.[year];

        if (
          !section ||
          !Array.isArray(section.transactions) ||
          section.transactions.length === 0
        )
          return null;

        return (
          <div key={year} className="mb-6 p-4">
            <h2 className="font-bold text-lg">
              {year.toUpperCase()} YEAR — ₹{section.totalAmount}
            </h2>

            <div className="mt-2 border rounded">
              {section.transactions.map((tx) => (
                <div
                  key={tx.orderId}
                  className="flex justify-between px-3 py-2 border-b text-sm"
                >
                  <span>{tx.name}</span>
                  <span>₹{tx.amount}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
      <div className="mt-6 flex flex-col gap-3">
        <button
          onClick={() => navigate("/")}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold m-4 py-2 rounded-lg transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default AdminSuccessTransactions;
