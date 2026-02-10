import React from "react";
import Navbar from "../components/Navbar";

function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="mb-6 text-3xl font-bold">Terms and Conditions</h1>

        <p className="mb-6 text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="space-y-6 text-sm leading-relaxed">
          <p>
            By accessing or contributing through this platform, you agree to the
            following Terms and Conditions. Please read them carefully before
            making any contribution.
          </p>

          <div>
            <h2 className="mb-2 font-semibold">1. Nature of the Platform</h2>
            <p>
              This platform operates as a non-profit crowdfunding initiative
              created to facilitate community-driven financial support for
              public-interest activities. The platform does not operate for
              commercial gain and does not offer any financial return, equity,
              or profit-sharing to contributors.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-semibold">2. Use of Funds</h2>
            <p>
              All contributions received through this platform are used solely
              for non-commercial, public-interest purposes, including program
              execution, logistics, operational expenses, and related activities
              necessary to achieve the stated objectives of the initiative.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-semibold">3. Voluntary Contributions</h2>
            <p>
              All contributions made on this platform are voluntary.
              Contributors acknowledge that donations are made without
              expectation of any goods, services, or benefits in return.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-semibold">4. Payment Processing</h2>
            <p>
              Payments are processed through third-party payment service
              providers. The platform does not store sensitive payment
              information such as card details, UPI credentials, or banking
              data.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-semibold">
              5. Transparency and Accountability
            </h2>
            <p>
              The platform is committed to maintaining transparency in fund
              utilization. Reasonable efforts will be made to ensure ethical and
              responsible use of funds.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-semibold">
              6. Cancellation and Refund Policy
            </h2>
            <p>
              Contributions are generally non-refundable except in cases of
              duplicate transactions or technical errors, subject to payment
              gateway policies.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-semibold">7. User Conduct</h2>
            <p>
              Users agree not to misuse the platform, engage in unlawful
              activities, or attempt unauthorized access to platform systems.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-semibold">8. Limitation of Liability</h2>
            <p>
              The platform and its organizers shall not be liable for indirect
              or consequential damages arising from participation in this
              initiative, except as required under applicable law.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-semibold">9. Changes to Terms</h2>
            <p>
              These Terms and Conditions may be updated at any time without
              prior notice. Continued use of the platform constitutes acceptance
              of the revised terms.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-semibold">10. Governing Law</h2>
            <p>
              These Terms and Conditions shall be governed by and interpreted in
              accordance with the laws of India.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-semibold">11. Contact Information</h2>
            <p>
              For any questions regarding these Terms and Conditions, please
              contact the platform administrators through the official channels
              provided on the website.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default TermsAndConditions;
