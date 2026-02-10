import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function PaymentProcessing() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get("order_id");

  const [attempts, setAttempts] = useState(0);

  const POLL_INTERVAL = 3000; // 3 seconds
  const MAX_ATTEMPTS = 10; // ~30 seconds

  useEffect(() => {
    if (!orderId) return;

    let count = 0;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          `https://fund-raiser-app.onrender.com/api/payment-status?orderId=${orderId}`,
        );
        const data = await res.json();

        if (data.status === "SUCCESS") {
          clearInterval(interval);
          navigate(`/thank-you?order_id=${orderId}`);
          return;
        }

        if (data.status === "FAILED") {
          clearInterval(interval);
          navigate(`/payment-failed?order_id=${orderId}`);
          return;
        }

        count++;
        setAttempts(count);

        if (count >= MAX_ATTEMPTS) {
          clearInterval(interval);
        }
      } catch (err) {
        console.error("Status check failed", err);
      }
    }, POLL_INTERVAL);

    return () => clearInterval(interval);
  }, [orderId, navigate]);

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center px-4">
      <h2 className="text-xl font-bold">Verifying your payment…</h2>

      {attempts < MAX_ATTEMPTS ? (
        <p className="mt-2 text-gray-500">
          Please wait while we confirm your payment.
          <br />
          Do not close this page.
        </p>
      ) : (
        <p className="mt-3 text-yellow-600 max-w-md">
          Your payment is under verification.
          <br />
          If money was deducted, it will be confirmed shortly or auto-reversed
          by your bank.
        </p>
      )}
    </div>
  );
}

export default PaymentProcessing;
