"use client";
import React, { useEffect, useState } from "react";
import { MessageCircle, ChevronDown, ShieldCheck } from "lucide-react";

const statusStyles = {
  pending: "bg-amber-100 text-amber-700",
  verified: "bg-emerald-100 text-emerald-700",
  resolved: "bg-green-500 text-white",
  rejected: "bg-red-100 text-red-600",
};

const TicketList = ({ refresh }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    fetch("https://fund-raiser-app.onrender.com/api/ticket/all")
      .then((res) => res.json())
      .then((data) => {
        setTickets(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [refresh]);

  if (loading) {
    return (
      <div className="space-y-3 p-4 max-w-xl mx-auto">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="animate-pulse bg-white p-4 rounded-2xl shadow-sm h-20"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-4">
      <div className="max-w-xl mx-auto space-y-3">
        {tickets.map((ticket) => {
          const isOpen = openId === ticket._id;
          return (
            <div
              key={ticket._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              {/* Main Row */}
              <div
                className="flex items-center gap-3 p-3 cursor-pointer"
                onClick={() => setOpenId(isOpen ? null : ticket._id)}
              >
                {/* Thumbnail */}
                <div
                  className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(ticket.image?.url, "_blank");
                  }}
                >
                  <img
                    src={ticket.image?.url}
                    alt="ticket proof"
                    className="w-full h-full object-cover hover:opacity-80 transition-opacity"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <p className="font-semibold text-sm text-gray-800 truncate">
                      {ticket.name}
                    </p>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-medium whitespace-nowrap shrink-0 ${statusStyles[ticket.status]}`}
                    >
                      {ticket.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    UPI: {ticket.upiRef} · #{ticket._id.slice(-6).toUpperCase()}
                  </p>
                </div>

                {/* Chevron */}
                <ChevronDown
                  size={15}
                  className={`text-gray-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
              </div>

              {/* Expandable Section */}
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  isOpen ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-3 pb-3 space-y-2 border-t border-slate-100 pt-3">
                  {/* User Message */}
                  <div className="flex gap-2 items-end">
                    <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                      <MessageCircle size={13} className="text-slate-500" />
                    </div>
                    <div className="max-w-[80%]">
                      <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide mb-1 ml-1">
                        {ticket.name.trim()}
                      </p>
                      <div className="bg-slate-100 rounded-2xl rounded-bl-sm px-3 py-2 text-sm text-gray-700">
                        {ticket.message}
                      </div>
                    </div>
                  </div>

                  {/* Support Reply */}
                  {ticket.comments && (
                    <div className="flex gap-2 items-end justify-end">
                      <div className="max-w-[80%]">
                        <p className="text-[10px] font-medium text-emerald-500 uppercase tracking-wide mb-1 text-right mr-1 flex items-center justify-end gap-1">
                          <ShieldCheck size={11} />
                          Support
                        </p>
                        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl rounded-br-sm px-3 py-2 text-sm text-emerald-800">
                          {ticket.comments}
                        </div>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <ShieldCheck size={13} className="text-emerald-600" />
                      </div>
                    </div>
                  )}

                  {/* Date */}
                  <p className="text-[10px] text-gray-400 text-right pt-1">
                    {new Date(ticket.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {tickets.length === 0 && (
          <div className="text-center text-gray-400 mt-10">
            No tickets found
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketList;
