import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function LandingPage() {
  const navigate = useNavigate();

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
          <h1 className="text-3xl font-bold text-indigo-600 tracking-wide">Transcript.ai</h1>
          <nav className="flex items-center space-x-6">
            <ul className="flex space-x-6 text-base font-medium">
              <li><a href="#features" className="hover:text-indigo-600 transition">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-indigo-600 transition">How It Works</a></li>
              <li><a href="#contact" className="hover:text-indigo-600 transition">Contact</a></li>
            </ul>
            <div className="ml-6 space-x-3">
              <button
                className="px-4 py-2 text-indigo-600 font-semibold border border-indigo-600 rounded-full hover:bg-indigo-100 transition"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          </nav>
        </div>
      </header>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-28 text-center bg-gradient-to-br from-indigo-100 to-white"
      >
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold text-indigo-700 mb-6 leading-tight">
            Transform Your Videos into Accurate Transcripts
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Transcript.ai helps you extract precise transcripts from your videos — fast, simple, and AI-powered.
          </p>
          <button
            className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-md hover:bg-indigo-500 transition-all"
            onClick={handleGetStartedClick}
          >
            Get Started
          </button>
        </div>
      </motion.section>

      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 text-center">
          <motion.div whileHover={{ scale: 1.05 }} className="p-8 border rounded-2xl shadow hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-indigo-600 mb-3">AI-Powered Transcription</h3>
            <p className="text-gray-600">Advanced speech recognition powered by Whisper API delivers highly accurate transcriptions in moments.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="p-8 border rounded-2xl shadow hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-indigo-600 mb-3">Export as PDF</h3>
            <p className="text-gray-600">You will receive your transcript via email in a well-formatted PDF document.</p>
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
              <p className="text-gray-600">Our AI powered by Whisper API processes your video to generate accurate transcripts.</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
              <span className="block text-4xl font-extrabold text-indigo-500 mb-2">3</span>
              <h4 className="text-xl font-semibold mb-2">Email Delivery</h4>
              <p className="text-gray-600">Your transcript will be emailed to you in a ready-to-share PDF format.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-white">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-indigo-700 mb-6">Let's Connect</h2>
          <p className="text-gray-600 mb-6">Questions or feedback? Drop us a line anytime and we'll get back to you soon.</p>
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
