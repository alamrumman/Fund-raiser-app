import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function PaymentProcessing() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    if (!orderId) return;

    const interval = setInterval(async () => {
      const res = await fetch(
        `https://fund-raiser-app.onrender.com/api/payment-status?orderId=${orderId}`,
      );
      const data = await res.json();

      if (data.status === "SUCCESS") {
        clearInterval(interval);
        navigate("/thank-you");
      }

      if (data.status === "FAILED") {
        clearInterval(interval);
        navigate("/payment-failed");
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [orderId, navigate]);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h2 className="text-xl font-bold">Verifying your payment…</h2>
      <p className="mt-2 text-gray-500">Please do not close this page</p>
    </div>
  );
}

export default PaymentProcessing;
