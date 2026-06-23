// src/Components/About/Contact.jsx
import React from "react";
import { motion } from "framer-motion";
import { FiPhone, FiMapPin, FiMail } from "react-icons/fi";
import Swal from "sweetalert2";

/* ================== ANIMATIONS ================== */
const container = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const fadeUp = (i = 1) => ({
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.45, ease: "easeOut" },
  },
});

/* ================== EMAIL HELPERS ================== */

// Build formatted email message
function buildContactMessage({ name, email, mobile, message }) {
  const now = new Date().toLocaleString();

  return `
📩 NEW CONTACT MESSAGE — Fashion Bay Clothing

👤 CUSTOMER
Name: ${name}
Email: ${email}
Mobile: ${mobile || "N/A"}

💬 MESSAGE
${message}

📅 Sent On: ${now}

──────────────────────────────
🧵 This message was sent from the Fashion Bay Contact Page.
  `.trim();
}

// Send email via Web3Forms
async function sendContactEmail(body) {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return response.json();
}

/* ================== COMPONENT ================== */

const Contact = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const name = formData.get("name");
    const email = formData.get("email");
    const mobile = formData.get("mobile");
    const messageText = formData.get("message");

    const formattedMessage = buildContactMessage({
      name,
      email,
      mobile,
      message: messageText,
    });

    const payload = {
      access_key: "46618204-1151-490c-8adc-91c3e15924bb",
      from_name: "Fashion Bay — Contact Form",
      subject: `New Contact Message from ${name}`,
      replyto: email,
      email,
      message: formattedMessage,
    };

    try {
      const result = await sendContactEmail(payload);

      if (result.success) {
        Swal.fire("Message sent successfully! We will reply shortly.");
        e.target.reset();
      } else {
        alert("Failed to send message. Please try again later.");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      Swal.fire("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="bg-white text-slate-900">
      <motion.section
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        {/* Top Text */}
        <motion.div className="mb-10 md:mb-14 max-w-3xl" variants={fadeUp(1)}>
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-900">
            Contact
          </p>

          <h1 className="mt-4 text-3xl md:text-4xl font-semibold tracking-[0.12em] uppercase text-slate-900">
            Fashion Bay
          </h1>

          <p className="mt-4 text-sm md:text-base text-slate-600 leading-relaxed">
            Fashion Bay is your destination for premium fashion and style.
            Discover quality clothing and accessories that make a statement.
            Designed so the woman wearing them is always the statement.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr,1fr] gap-10 md:gap-16 items-start">
          {/* ================================= FORM ================================= */}
          <motion.div
            className="border-t border-slate-200 pt-6"
            variants={fadeUp(2)}
          >
            <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-6">
              Send us a message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-800 mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-transparent border-b border-slate-300 py-2 text-sm md:text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900"
                  placeholder="Full name"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-800 mb-1.5">
                  Mobile
                </label>
                <input
                  type="tel"
                  name="mobile"
                  className="w-full bg-transparent border-b border-slate-300 py-2 text-sm md:text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900"
                  placeholder="+44 7…"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-800 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-transparent border-b border-slate-300 py-2 text-sm md:text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900"
                  placeholder="you@example.com"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-800 mb-1.5">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  className="w-full bg-transparent border-b border-slate-300 py-2 text-sm md:text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 resize-none"
                  placeholder="Tell us about sizing, an order, or feedback..."
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={{ x: 1, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 inline-flex items-center justify-center px-8 py-2.5 text-sm font-semibold tracking-[0.18em] uppercase border border-slate-900 bg-slate-900 text-white hover:bg-white hover:text-slate-900 transition"
              >
                Send Message
              </motion.button>

              <p className="mt-3 text-[11px] text-slate-800">
                We use your details only to respond. No spam, ever.
              </p>
            </form>
          </motion.div>

          {/* ================================= DETAILS ================================= */}
          <motion.div
            className="border-t border-slate-200 pt-6 space-y-6"
            variants={fadeUp(3)}
          >
            <h2 className="text-lg md:text-xl font-semibold text-slate-900">
              Studio details
            </h2>

            <div className="space-y-5 text-sm md:text-[15px] text-slate-700">
              <div className="flex items-start gap-3">
                <FiMapPin className="mt-0.5 text-slate-500" />
                <div>
                  <p className="font-semibold text-slate-900">Location</p>
                  <p>Leicester, United Kingdom</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Private studio — visits by appointment only.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiPhone className="mt-0.5 text-slate-500" />
                <div>
                  <p className="font-semibold text-slate-900">
                    Phone / WhatsApp
                  </p>
                  <p className="select-all">+8801814482832</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Available during business hours
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiMail className="mt-0.5 text-slate-500" />
                <div>
                  <p className="font-semibold text-slate-900">Email</p>
                  <p className="select-all">rijoanrashidopar@gmail.com</p>
                  <p className="text-xs text-slate-500 mt-1">
                    We respond within one business day.
                  </p>
                </div>
              </div>
            </div>

            <p className="pt-2 text-xs text-slate-500">
              For press, partnerships, or styling requests, mention it in your
              message. It will reach our studio team directly.
            </p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;
