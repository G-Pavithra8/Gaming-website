import React from "react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-cyan-400">
          Privacy Policy
        </h1>

        <p className="mb-6 text-gray-300">
          At Crazy Game, we value your privacy. This Privacy Policy explains
          how we collect, use, and protect your information when you use our
          website and gaming services.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-purple-400">
          1. Information We Collect
        </h2>
        <p className="text-gray-300 mb-4">
          We may collect basic information such as your name, email address,
          and login details when you register or interact with our platform.
          We also collect anonymous usage data to improve user experience.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-purple-400">
          2. How We Use Your Information
        </h2>
        <p className="text-gray-300 mb-4">
          Your information is used to:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>Provide access to games and features</li>
          <li>Improve website performance</li>
          <li>Enhance security and prevent fraud</li>
          <li>Respond to customer support requests</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-purple-400">
          3. Cookies
        </h2>
        <p className="text-gray-300 mb-4">
          We use cookies to personalize content and analyze traffic. You can
          disable cookies in your browser settings, but some features may not
          function properly.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-purple-400">
          4. Data Security
        </h2>
        <p className="text-gray-300 mb-4">
          We implement industry-standard security measures to protect your
          personal data. However, no system is completely secure.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-purple-400">
          5. Changes to This Policy
        </h2>
        <p className="text-gray-300 mb-4">
          We may update this Privacy Policy from time to time. Updates will be
          posted on this page.
        </p>

        <p className="mt-10 text-gray-500 text-sm">
          Last updated: January 2026
        </p>
      </div>
    </div>
  );
};

export default Privacy;
