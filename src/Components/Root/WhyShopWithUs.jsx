// src/Components/Root/WhyShopWithUs.jsx
import React from "react";
import { motion } from "framer-motion";
import { FiTruck, FiRefreshCw, FiShield, FiHeadphones } from "react-icons/fi";

const features = [
  {
    icon: FiTruck,
    title: "Free UK Shipping",
    desc: "Complimentary delivery on every order over £89, dispatched within 24 hours.",
  },
  {
    icon: FiRefreshCw,
    title: "Easy 14-Day Returns",
    desc: "Changed your mind? Return any unworn item within 14 days, hassle-free.",
  },
  {
    icon: FiShield,
    title: "Secure Checkout",
    desc: "Shop with confidence using Card, PayPal, Klarna, Clearpay & Apple Pay.",
  },
  {
    icon: FiHeadphones,
    title: "Here to Help",
    desc: "Our UK-based team is on hand for sizing advice and order support.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const card = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const WhyShopWithUs = () => {
  return (
    <section className="bg-[#F9F6F2] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-400">
            The Fashion Bay Promise
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-[#1D1E20]">
            Why Shop With Us
          </h2>
          <p className="mt-3 text-sm text-gray-600 max-w-xl mx-auto">
            Style without compromise — premium, handmade pieces backed by
            service you can rely on.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={card}
              className="bg-white rounded-xl border border-black/5 shadow-sm hover:shadow-md transition-shadow duration-300 p-6 flex flex-col items-center text-center"
            >
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-[#F6E0D9] text-[#1D1E20] mb-4">
                <Icon size={22} />
              </div>
              <h3 className="text-base font-semibold text-[#1D1E20]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyShopWithUs;
