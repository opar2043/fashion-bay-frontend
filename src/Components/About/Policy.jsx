import React from "react";
import { motion } from "framer-motion";
import {
  FaRegFileAlt,
  FaUndo,
  FaExclamationTriangle,
  FaShippingFast,
  FaExchangeAlt,
  FaEnvelope,
} from "react-icons/fa";

const mergedSections = [
  {
    title: "Your Rights (UK Law) + Returns",
    content: (
      <>
        <div className="flex items-center gap-2 mb-2">
          <FaRegFileAlt className="text-gray-800" />
          <h3 className="font-semibold text-gray-900">Your Rights (UK Law)</h3>
        </div>
        <ul className="list-disc ml-4 mb-4 text-sm text-gray-700">
          <li>Full refund for faulty or incorrect items.</li>
          <li>14-day cooling-off period for online orders.</li>
        </ul>

        <div className="flex items-center gap-2 mb-2">
          <FaUndo className="text-gray-800" />
          <h3 className="font-semibold text-gray-800">Returns (Online Orders)</h3>
        </div>
        <ul className="list-disc ml-4 text-sm text-gray-700">
          <li>Notify within 14 days; return within 14 days after that.</li>
          <li>Must be unused, unworn, tags intact.</li>
          <li>Not accepted: underwear, swimwear, earrings, bodysuits, clearance items.</li>
        </ul>
      </>
    ),
  },

  {
    title: "Faulty Items + How to Return",
    content: (
      <>
        <div className="flex items-center gap-2 mb-2">
          <FaExclamationTriangle className="text-gray-800" />
          <h3 className="font-semibold text-gray-900">Faulty / Incorrect Items</h3>
        </div>
        <ul className="list-disc ml-4 mb-4 text-sm text-gray-700">
          <li>Report within 30 days for refund or replacement.</li>
          <li>Up to 6 months: repair or replacement offered.</li>
        </ul>

        <div className="flex items-center gap-2 mb-2">
          <FaShippingFast className="text-gray-800" />
          <h3 className="font-semibold text-gray-900 ">How to Return</h3>
        </div>
        <p className="text-sm text-gray-700">
          Email us with name, order number, reason & photos.
        </p>

        <p className="mt-2 text-sm text-gray-700">
          <strong>Return Address:</strong> <br />
          FNC Clothing LTD <br />
          57 Brettell Road <br />
          Leicester <br />
          LE2 9AB
        </p>

        <p className="mt-2 text-sm text-gray-700">
          Customer pays postage unless faulty. Use tracked delivery.
        </p>
      </>
    ),
  },

  {
    title: "Refunds + Exchanges",
    content: (
      <>
        <div className="flex items-center gap-2 mb-2">
          <FaRegFileAlt className="text-gray-800" />
          <h3 className="font-semibold text-gray-800">Refunds</h3>
        </div>
        <ul className="list-disc ml-4 mb-4 text-sm text-gray-700">
          <li>Processed in 5–10 working days.</li>
          <li>Delivery fees refunded only for faulty items.</li>
        </ul>

        <div className="flex items-center gap-2 mb-2">
          <FaExchangeAlt className="text-gray-800" />
          <h3 className="font-semibold text-gray-800">Exchanges</h3>
        </div>
        <p className="text-sm text-gray-700 mb-1">
          Based on stock availability. If unavailable, refund issued.
        </p>

        <strong className="flex items-center gap-2 text-sm mt-2 text-gray-800">
          <FaEnvelope /> rijoanrashidopar@gmail.com
        </strong>
      </>
    ),
  },
];

const Policy = () => {
  return (
    <div id="policy" className="max-w-7xl mx-auto px-4 py-16">

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-[#1D1E20] text-left mb-10"
      >
        Return & Refund Policy (UK)
      </motion.h2>

      {/* GRID - THREE LARGE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mergedSections.map((sec, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="bg-white border border-gray-200 shadow-md rounded-xl p-6 hover:shadow-xl transition duration-300"
          >
            {sec.content}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Policy;
