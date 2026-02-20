"use client";
import React, { useEffect, useState } from "react";

const statusStyles = {
  pending: "bg-amber-100 text-amber-700",
  verified: "bg-emerald-100 text-emerald-700",
  resolved: "bg-green-500 text-white",
  rejected: "bg-red-100 text-red-600",
};

const TicketList = () => {
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
  }, []);

  if (loading) {
    return (
      <div className="space-y-4 p-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="animate-pulse bg-white p-4 rounded-2xl shadow-sm h-24"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-4 space-y-4">
      {tickets.map((ticket) => (
        <div
          key={ticket._id}
          className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-3 flex gap-4 items-center"
          onClick={() => {
            setOpenId(openId === ticket._id ? null : ticket._id);
          }}
        >
          {/* Thumbnail */}
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
            <img
              src={ticket.image?.url}
              alt="ticket proof"
              className="w-full h-full object-cover"
              onClick={() => {
                window.open(ticket.image?.url, "_blank");
              }}
            />
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Top Row */}
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-sm text-gray-800">
                Ticket #{ticket._id.slice(-6).toUpperCase()}
              </h3>

              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${
                  statusStyles[ticket.status]
                }`}
              >
                {ticket.status}
              </span>
            </div>

            {/* Name */}
            <p className="text-sm font-medium text-gray-700 mt-1">
              {ticket.name}
            </p>

            {/* UPI Ref */}
            <p className="text-xs text-gray-500">UPI Ref: {ticket.upiRef}</p>
            <div
              className={`transition-all duration-300 overflow-hidden ${
                openId === ticket._id
                  ? "max-h-40 opacity-100 mt-2"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-sm text-gray-600">{ticket.message}</p>
            </div>
            {/* Date */}
            <p className="text-[11px] text-gray-400 mt-1">
              {new Date(ticket.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}

      {tickets.length === 0 && (
        <div className="text-center text-gray-400 mt-10">No tickets found</div>
      )}
    </div>
  );
};

export default TicketList;
