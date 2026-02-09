import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import PaymentProcessing from "./components/Redirect.jsx";
import Thanks from "./components/Thanks.jsx";
import "@fontsource/inter";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import PaymentFailed from "./components/PaymentFailed.jsx";
import AdminSuccessTransactions from "./components/AdminSuccessTransactions.jsx";
import RaiseIssue from "./components/RaiseIssue.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/payment-processing" element={<PaymentProcessing />} />
        <Route path="/thank-you" element={<Thanks />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        <Route path="/success-view" element={<AdminSuccessTransactions />} />
        <Route path="/raise-issue" element={<RaiseIssue />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
