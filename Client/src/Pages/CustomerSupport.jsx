import React from "react";
import Navbar from "../components/Navbar";

function CustomerSupport() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="mb-6 text-3xl font-bold">Customer Support</h1>

        <p className="mb-8 text-sm text-gray-600">
          We are here to assist you with any questions, concerns, or support
          requests related to this platform.
        </p>

        <section className="space-y-6 text-sm leading-relaxed">
          <div>
            <h2 className="mb-2 font-semibold">Contact Information</h2>

            <p>
              You may reach our support team using the following contact
              details:
            </p>

            <ul className="mt-3 space-y-2">
              <li>
                <span className="font-medium">Email:</span>{" "}
                <a
                  href="mailto:rummanalam.dev@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  rummanalam.dev@gmail.com
                </a>
              </li>

              <li>
                <span className="font-medium">Phone:</span>{" "}
                <a
                  href="tel:9304780181"
                  className="text-blue-600 hover:underline"
                >
                  9304780181
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-2 font-semibold">Support Hours</h2>

            <p>
              Our customer support team is available during the following hours:
            </p>

            <ul className="mt-3 space-y-1">
              <li>Monday to Friday</li>
              <li>9:00 AM to 5:00 PM</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-2 font-semibold">Response Time</h2>

            <p>
              We aim to respond to all inquiries within a reasonable timeframe
              during business hours. Response times may vary depending on the
              nature of the request and volume of inquiries.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-semibold">
              Payment & Transaction Queries
            </h2>

            <p>
              For payment-related issues such as transaction failures, delays,
              or confirmation concerns, please include relevant details (such as
              date and reference ID) when contacting support to help us assist
              you efficiently.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default CustomerSupport;
