import { useSearchParams, useNavigate } from "react-router-dom";

function PaymentFailed() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get("order_id");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9e8c9] px-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full text-center">
        {/* Icon */}
        <div className="text-5xl mb-4">⚠️</div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900">
          Payment not completed
        </h1>

        {/* Message */}
        <p className="text-gray-600 mt-2 text-sm">
          Don’t worry — no amount has been deducted from your account. If it was
          deducted, it will be automatically refunded by your bank.
        </p>

        {/* Order ID */}
        <div className="mt-5 bg-gray-100 rounded-lg p-3">
          <p className="text-xs text-gray-500">Order ID</p>
          <p className="font-mono text-sm text-gray-800 break-all">
            {orderId || "—"}
          </p>
        </div>

        {/* What to do next */}
        <div className="mt-5 text-sm text-gray-600 text-left">
          <p className="font-semibold mb-2">What you can do:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Retry the payment after a few minutes</li>
            <li>Ensure sufficient balance</li>
            <li>Use a different UPI app if needed</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => navigate("/")}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Try again
          </button>

          <button
            onClick={() => navigate("/")}
            className="border border-gray-300 text-gray-700 py-2 rounded-lg text-sm"
          >
            Back to home
          </button>
        </div>

        {/* Footer note */}
        <p className="text-xs text-gray-400 mt-4">
          If you need help, please keep your Order ID handy.
        </p>
      </div>
    </div>
  );
}

export default PaymentFailed;
