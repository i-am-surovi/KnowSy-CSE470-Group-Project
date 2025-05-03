import React, { useContext, useState } from "react";
import { Mail, Youtube } from "lucide-react"; // Ensure lucide-react is installed
import Footer from "../../components/student/Footer";
import { AppContext } from "../../context/AppContext";

const ContactUs = () => {
  const { backendUrl, getToken } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    try {
      const token = await getToken?.(); // Safe optional chaining
      const response = await fetch(`${backendUrl}/api/newsletter/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("Thank you for subscribing!");
        setEmail("");
      } else {
        setStatus(
          `${result.message || "Something went wrong. Please try again."}`
        );
      }
    } catch (error) {
      console.error("Subscribe error:", error);
      setStatus("Network error. Try again later.");
    }
  };

  return (
    <>
      <div className="relative md:px-36 px-8 py-20 text-left">
        <div className="mb-12">
          <h1 className="text-4xl font-semibold text-gray-800">Contact Us</h1>
          <p className="text-gray-500">
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => (window.location.href = "/")}
            >
              Home
            </span>{" "}
            / <span>Contact Us</span>
          </p>
        </div>

        <div className="mb-8">
          <p className="text-gray-600 text-lg mb-6">
            We'd love to hear from you! Connect with us through the following
            channels:
          </p>

          <div className="flex items-center gap-4 mb-4">
            <Mail className="text-blue-600" />
            <a
              href="mailto:knowsy.online.education@gmail.com"
              className="text-blue-700 hover:underline"
            >
              knowsy.online.education@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-4 mb-12">
            <Youtube className="text-red-600" />
            <a
              href="https://www.youtube.com/@Knowsy-2025"
              target="_blank"
              rel="noreferrer"
              className="text-blue-700 hover:underline"
            >
              youtube.com/@Knowsy-2025
            </a>
          </div>

          <div className="max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Subscribe to our Newsletter
            </h2>
            <p className="text-gray-500 mb-4">
              Stay up-to-date with the latest educational content,
              announcements, and events from Knowsy!
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-2"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Subscribe
              </button>
            </form>
            {status && (
              <p className="mt-3 text-sm text-green-600 font-medium">
                {status}
              </p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactUs;
