import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  {
    category: "Orders & Products",
    list: [
      {
        q: "What sizes do you offer?",
        a: "We offer a range of sizes from 8 to 14, including selected plus-size options. Size availability may vary depending on the item.",
      },
      {
        q: "How do I know which size will fit me?",
        a: "Please refer to our size guide on each product page. If you need extra help, feel free to message us—our team is happy to advise.",
      },
      {
        q: "Are your products true to size?",
        a: "Most items fit true to size, but some styles may vary. We include fit notes where needed.",
      },
      {
        q: "Will an item be restocked?",
        a: "Some popular items may be restocked. If something you love is sold out, you can join our restock notifications on the product page.",
      },
    ],
  },
  {
    category: "Ordering & Payment",
    list: [
      {
        q: "How do I place an order?",
        a: "Choose your item, select your size, and add it to your basket. Checkout securely using your preferred payment method.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept Debit/Credit Card, PayPal, Klarna, Clearpay, Apple Pay, and more.",
      },
      {
        q: "Can I change or cancel my order after placing it?",
        a: "We process orders quickly. If you want to cancel or change something, contact us immediately. After shipping, we cannot amend it.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    list: [
      {
        q: "How long does delivery take?",
        a: "Standard UK delivery takes 3–5 working days. Express or next-day delivery may be available at checkout.",
      },
      {
        q: "Do you offer international shipping?",
        a: "Yes, we ship worldwide. Delivery times and costs vary by destination.",
      },
      {
        q: "How can I track my order?",
        a: "Once dispatched, you will receive a tracking number via email or SMS.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    list: [
      {
        q: "What is your return policy?",
        a: "You can return items within 14 days of delivery. Items must be unused, unworn, and with tags.",
      },
      {
        q: "Do you offer free returns?",
        a: "Customers are responsible for return postage unless the product is faulty.",
      },
      {
        q: "How long does it take to receive my refund?",
        a: "Refunds take 5–10 working days after we receive your return.",
      },
      {
        q: "Can I exchange an item?",
        a: "Yes, exchanges are possible depending on availability. If unavailable, we issue a refund.",
      },
    ],
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div id="faq" className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-2xl text-[#1D1E20] font-bold mb-10 md:mb-14 tracking-wide text-left">
        Frequently Asked Questions (FAQ)
      </h2>

      {/* GRID WRAPPER ADDED HERE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {faqs.map((group, groupIndex) => (
          <div key={groupIndex}>
            {/* Category Title */}
            <h3 className="text-xl font-semibold mb-4 border-l-4 border-black text-gray-900 pl-3">
              {group.category}
            </h3>

            {/* FAQ Items */}
            {group.list.map((item, i) => {
              const index = `${groupIndex}-${i}`;
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="border-b border-gray-300 py-3 cursor-pointer"
                >
                  <div
                    className="flex justify-between items-center"
                    onClick={() => toggle(index)}
                  >
                    <p className="font-medium text-[#1D1E20]">{item.q}</p>

                    {isOpen ? (
                      <FaMinus className="text-sm text-[#1D1E20]" />
                    ) : (
                      <FaPlus className="text-sm text-[#1D1E20]" />
                    )}
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-[#374151] text-sm mt-2 pb-3 leading-relaxed">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
