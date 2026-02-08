import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

function Thanks() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get("order_id");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9e8c9] px-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircle size={64} className="text-green-500" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900">
          Thank you for your contribution!
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 mt-2 text-sm">
          Your payment has been received successfully.
        </p>

        {/* Order ID */}
        <div className="mt-5 bg-gray-100 rounded-lg p-3">
          <p className="text-xs text-gray-500">Order ID</p>
          <p className="font-mono text-sm text-gray-800 break-all">
            {orderId || "—"}
          </p>
        </div>

        {/* Message */}
        <p className="text-sm text-gray-600 mt-5">
          Your support helps us make <strong>Kartavya 2026</strong> a meaningful
          and memorable event.
        </p>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => navigate("/")}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Back to Home
          </button>

          <button
            onClick={() => window.print()}
            className="border border-gray-300 text-gray-700 py-2 rounded-lg text-sm"
          >
            Download receipt
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-gray-400 mt-4">
          For any queries, please keep your Order ID handy.
        </p>
      </div>
    </div>
  );
}

export default Thanks;
