import React from 'react';
import { motion } from "framer-motion";

const About = () => {
  const primaryColor = "#00f7ff";

  return (
    <div className='pt-20 pb-2 px-6 bg-gradient-to-b from-gray-900 via-black to-gray-800 min-h-screen text-gray-100'>

      {/* About ThinkTank */}
      <motion.div
        className='bg-gradient-to-b from-gray-900 via-black to-gray-800 rounded-xl shadow-lg p-6 mb-6'
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className='text-2xl font-semibold mb-3' style={{ color: primaryColor }}>
          About ThinkTank
        </h2>
        <ul className='list-disc text-base list-inside text-gray-300 space-y-2'>
          <li>
            <span>Your personal space to think, learn, and grow.</span>
          </li>
          <li>
            <span>ThinkTank is more than just a productivity tool—it’s your digital companion for learning, reflection, and creativity.</span>
          </li>
          <li>
            <span>In today’s world of endless distractions, ThinkTank gives you a calm space to:</span>
            <ul className='list-disc list-inside ml-6 mt-2 text-gray-400 text-sm space-y-1'>
              <li>Capture and organize your thoughts clearly.</li>
              <li>Reflect daily with guided journaling prompts.</li>
              <li>Track meditation and mindfulness habits effortlessly.</li>
              <li>Revisit insights to notice patterns and personal growth.</li>
            </ul>
          </li>
          <li>
            <span>It’s built to help you stay consistent, motivated, and balanced.</span>
          </li>
        </ul>
      </motion.div>

      {/* Our Mission */}
      <motion.div
        className='bg-gradient-to-b from-gray-900 via-black to-gray-800 rounded-xl shadow-lg p-6 mb-6'
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <h2 className='text-2xl font-semibold mb-3' style={{ color: primaryColor }}>
          Our Mission
        </h2>
        <h3 className='text-lg font-medium mb-3 text-gray-200'>
          Why ThinkTank exists:
        </h3>
        <ul className='list-disc text-base list-inside text-gray-300 space-y-2'>
          <li>
            <span>To combine productivity, mindfulness, and creativity in one place.</span>
          </li>
          <li>
            <span>Unlike rigid task managers or purely entertainment platforms, ThinkTank:</span>
            <ul className='list-disc list-inside ml-6 mt-2 text-gray-400 text-sm space-y-1'>
              <li>Bridges the gap between planning and relaxation</li>
              <li>Keeps you organized without overwhelming you</li>
              <li>Encourages both personal and academic growth</li>
            </ul>
          </li>
          <li>
            <span className='text-white font-semibold'>Goal: </span>
            A platform that inspires you to keep building, keep learning, and keep enjoying the process.
          </li>
        </ul>
      </motion.div>

      {/* What Can You Do Here */}
      <motion.div
        className='bg-gradient-to-b from-gray-900 via-black to-gray-800 rounded-xl shadow-lg p-6 mb-6'
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <h2 className='text-2xl font-semibold mb-3' style={{ color: primaryColor }}>
          What Can You Do Here?
        </h2>
        <ul className='list-disc text-base list-inside text-gray-300 space-y-2'>
          <li>
            <span>📖 Journal your thoughts with ease — no pressure, just clarity.</span>
          </li>
          <li>
            <span>🧘 Track your meditation and mindfulness journey daily.</span>
          </li>
          <li>
            <span>📝 Save inspiring ideas, quotes, and reflections in one place.</span>
          </li>
          <li>
            <span>🎯 Set personal goals and track your progress without feeling overwhelmed.</span>
          </li>
          <li>
            <span>🔄 Revisit past entries to notice growth, progress, and patterns in your life.</span>
          </li>
        </ul>
      </motion.div>

    </div>
  );
}

export default About;
