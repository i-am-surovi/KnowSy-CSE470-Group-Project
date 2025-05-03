import React from "react";
import Footer from "../../components/student/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <div className="relative md:px-36 px-8 py-20 text-left">
        <div className="mb-12">
          <h1 className="text-4xl font-semibold text-gray-800">
            Privacy Policy
          </h1>
          <p className="text-gray-500">
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => (window.location.href = "/")}
            >
              Home
            </span>{" "}
            / <span>Privacy Policy</span>
          </p>
        </div>

        <div className="max-w-3xl text-left text-gray-700 leading-relaxed space-y-6">
          <p>
            At Knowsy, we are committed to protecting your privacy. This Privacy
            Policy outlines how we collect, use, and safeguard your information
            when you visit our website or interact with our services.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800">
            1. Information We Collect
          </h2>
          <p>
            We may collect personal information such as your name, email
            address, and usage data when you use our website, sign up for
            updates, or contact us directly.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside">
            <li>To provide and improve our services</li>
            <li>To respond to inquiries and provide support</li>
            <li>To send educational content or updates (if subscribed)</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800">
            3. Sharing Your Information
          </h2>
          <p>
            We do not sell or rent your personal data. Your information may only
            be shared with trusted service providers who assist in operating our
            site or servicing you.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800">
            4. Data Security
          </h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your data against unauthorized access, loss, or misuse.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800">
            5. Your Rights
          </h2>
          <p>
            You have the right to access, update, or delete your personal data
            at any time. You may also opt out of communications by contacting
            us.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800">
            6. Contact Us
          </h2>
          <p>
            If you have any questions about this Privacy Policy, feel free to
            reach out at:{" "}
            <a
              href="mailto:knowsy.online.education@gmail.com"
              className="text-blue-600 underline"
            >
              knowsy.online.education@gmail.com
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;
