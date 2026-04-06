import { useState } from "react";
export default function Footer() {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <footer className="mt-32 bg-black/30 backdrop-blur-lg border-t border-white/10 text-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-white">ResumeAI</h2>
          <p className="mt-3 text-sm">
            Helping you build better resumes and land more interviews using AI.
          </p>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-white font-semibold mb-3">Product</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Features</li>
            <li className="hover:text-white cursor-pointer">Pricing</li>
            <li className="hover:text-white cursor-pointer">How It Works</li>
          </ul>
        </div>
        {showDialog && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white text-black p-6 rounded-xl shadow-xl text-center max-w-sm">
              <p className="text-lg font-semibold">
                Smile... this is your support for me
              </p>

              <button
                onClick={() => setShowDialog(false)}
                className="mt-4 px-4 py-2 bg-purple-700 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Company */}
        <div>
          <h3 className="text-white font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/alihassan4587",
                  "_blank",
                )
              }
              className="hover:text-white cursor-pointer"
            >
              About
            </li>

            {/* Contact → Email */}
            <li
              onClick={() =>
                (window.location.href = "mailto:alihere4587@gmail.com")
              }
              className="hover:text-white cursor-pointer"
            >
              Contact
            </li>

            {/* Support → Dialog */}
            <li
              onClick={() => setShowDialog(true)}
              className="hover:text-white cursor-pointer"
            >
              Support
            </li>
          </ul>
        </div>

        {/* Contact / Info */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: alihere4587@gmail.com</li>
            <li>Location: Pakistan</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} ResumeAI. All rights reserved.
      </div>
    </footer>
  );
}
