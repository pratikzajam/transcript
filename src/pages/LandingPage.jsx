import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function LandingPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleGetStartedClick = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-600 tracking-wide">Transcript.ai</h1>

          <nav className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-6 text-base font-medium">
              <li><a href="#problem" className="hover:text-indigo-600 transition">Why Now</a></li>
              <li><a href="#features" className="hover:text-indigo-600 transition">Solution</a></li>
              <li><a href="#how-it-works" className="hover:text-indigo-600 transition">How It Works</a></li>
              <li><a href="#trust" className="hover:text-indigo-600 transition">Trust</a></li>
              <li><a href="#contact" className="hover:text-indigo-600 transition">Contact</a></li>
            </ul>
            <button
              className="ml-6 px-4 py-2 text-indigo-600 font-semibold border border-indigo-600 rounded-full hover:bg-indigo-100 transition"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </nav>

          <div className="md:hidden">
            <button
              className="text-indigo-600 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden px-6 pb-4">
            <ul className="space-y-3 text-base font-medium">
              <li><a href="#problem" className="block hover:text-indigo-600 transition" onClick={() => setIsMenuOpen(false)}>Why Now</a></li>
              <li><a href="#features" className="block hover:text-indigo-600 transition" onClick={() => setIsMenuOpen(false)}>Solution</a></li>
              <li><a href="#how-it-works" className="block hover:text-indigo-600 transition" onClick={() => setIsMenuOpen(false)}>How It Works</a></li>
              <li><a href="#trust" className="block hover:text-indigo-600 transition" onClick={() => setIsMenuOpen(false)}>Trust</a></li>
              <li><a href="#contact" className="block hover:text-indigo-600 transition" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
            </ul>
            <button
              className="mt-4 w-full text-indigo-600 font-semibold border border-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-100 transition"
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/login");
              }}
            >
              Login
            </button>
          </div>
        )}
      </header>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-28 text-center bg-gradient-to-br from-red-50 to-white"
        id="problem"
      >
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold text-red-600 mb-6 leading-tight">
            Losing hours to manual transcription?
          </h2>
          <p className="text-lg text-gray-700 mb-10">
            Your team is spending 30% of its time transcribing, instead of creating. Worse — errors ruin the output.
          </p>
          <button
            className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-md hover:bg-indigo-500 transition-all"
            onClick={() => navigate("/login")}
          >
            Try Transcript.ai Now
          </button>
        </div>
      </motion.section>

      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 text-center">
          <motion.div whileHover={{ scale: 1.05 }} className="p-8 border rounded-2xl shadow hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-indigo-600 mb-3">AI-Powered Transcription</h3>
            <p className="text-gray-600">Built on Whisper API — our tool turns video to transcript in under 60 seconds, with 95%+ accuracy.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="p-8 border rounded-2xl shadow hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-indigo-600 mb-3">PDF Delivery in Minutes</h3>
            <p className="text-gray-600">Receive clean, editable PDFs — no more formatting hell. Sent straight to your inbox.</p>
          </motion.div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 bg-indigo-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-indigo-700 mb-10">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
              <span className="block text-4xl font-extrabold text-indigo-500 mb-2">1</span>
              <h4 className="text-xl font-semibold mb-2">Upload</h4>
              <p className="text-gray-600">Choose a video file and upload it securely to our platform.</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
              <span className="block text-4xl font-extrabold text-indigo-500 mb-2">2</span>
              <h4 className="text-xl font-semibold mb-2">Transcribe</h4>
              <p className="text-gray-600">Our AI turns audio into accurate text in seconds — no manual cleanup needed.</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
              <span className="block text-4xl font-extrabold text-indigo-500 mb-2">3</span>
              <h4 className="text-xl font-semibold mb-2">Receive</h4>
              <p className="text-gray-600">Instant PDF report emailed to you. Copy, share, and build faster.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="trust" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-indigo-700 mb-6">You're in Good Company</h2>
          <p className="text-gray-600 mb-8">Join 500+ creators, editors, and researchers already using Transcript.ai.</p>
          <div className="flex justify-center gap-6 flex-wrap text-gray-500 text-sm">
            <div>✅ Used by top podcasters</div>
            <div>✅ Editors saving 6+ hours/week</div>
            <div>✅ Built on Whisper by OpenAI</div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-indigo-50">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-indigo-700 mb-6">Let’s Talk</h2>
          <p className="text-gray-600 mb-6">Got a question? Want a team plan? Reach out and we’ll get back within 24 hours.</p>
          <a href="mailto:support@transcript.ai" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-indigo-500 transition">support@transcript.ai</a>
        </div>
      </section>

      <footer className="bg-gray-100 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Transcript.ai — All rights reserved. <br />
        Made with ❤️ by Pratik Zajam
      </footer>
    </div>
  );
}
