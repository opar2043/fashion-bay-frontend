import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiTruck,
  FiAward,
  FiRefreshCw,
  FiHeart,
  FiArrowRight,
} from "react-icons/fi";
import banner from "../../assets/banner2.jpg";

const fadeUp = (i = 1) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.5, ease: "easeOut" },
  },
});

const values = [
  {
    icon: <FiAward />,
    title: "Premium Quality",
    text: "Every piece is crafted from carefully sourced fabrics, made to last beyond the season.",
  },
  {
    icon: <FiTruck />,
    title: "Fast UK Delivery",
    text: "Free shipping on orders over £89, with reliable tracked delivery across the UK.",
  },
  {
    icon: <FiRefreshCw />,
    title: "Easy Returns",
    text: "Changed your mind? Enjoy a hassle-free 14-day return policy on every order.",
  },
  {
    icon: <FiHeart />,
    title: "Made With Care",
    text: "Thoughtfully designed so the woman wearing our pieces is always the statement.",
  },
];

const stats = [
  { value: "5,000+", label: "Happy customers" },
  { value: "300+", label: "Curated styles" },
  { value: "4.8/5", label: "Average rating" },
  { value: "UK", label: "Designed & shipped" },
];

const About = () => {
  return (
    <div className="bg-white text-slate-900">
      {/* HERO */}
      <section className="bg-[#F9F6F2]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp(1)}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
              Our Story
            </p>
            <h1 className="mt-4 text-3xl font-semibold uppercase tracking-[0.12em] text-slate-900 md:text-4xl">
              About Fashion Bay
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-600 md:text-base">
              Fashion Bay is your destination for premium fashion and modest
              style. We blend timeless silhouettes with everyday comfort —
              creating quality clothing and accessories that make a statement,
              wherever life takes you.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/dresses"
                className="inline-flex items-center gap-2 rounded-lg bg-[#1E1E1E] px-6 py-3 text-sm font-semibold text-white hover:bg-[#333] transition"
              >
                Shop Collection <FiArrowRight />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-[#F6E0D9] px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-[#e7c9c0] transition"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp(2)}
            className="overflow-hidden rounded-2xl shadow-sm"
          >
            <img
              src={banner}
              alt="Fashion Bay collection"
              className="h-64 w-full object-cover md:h-[420px]"
            />
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp(i)}
              className="rounded-2xl border border-slate-200 bg-[#F9F6F2] px-4 py-6 text-center"
            >
              <p className="text-2xl font-bold text-slate-900 md:text-3xl">
                {s.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MISSION */}
      <section className="bg-[#F9F6F2]">
        <div className="max-w-4xl mx-auto px-4 py-14 text-center sm:px-6 md:py-20 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp(1)}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
              Our Mission
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-wide text-slate-900 md:text-3xl">
              Style that feels as good as it looks
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
              We believe great fashion shouldn't cost the earth or compromise on
              comfort. From elegant abayas to everyday essentials, each Fashion
              Bay piece is designed to empower you to look and feel your best —
              effortlessly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* VALUES */}
      <section className="max-w-6xl mx-auto px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
            Why Fashion Bay
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-wide text-slate-900 md:text-3xl">
            What we stand for
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp(i)}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#F6E0D9] text-xl text-slate-900">
                {v.icon}
              </span>
              <h3 className="mt-4 text-base font-semibold text-slate-900">
                {v.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {v.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1E1E1E]">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-5 px-4 py-14 text-center sm:px-6 md:flex-row md:justify-between md:text-left lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-wide text-white md:text-3xl">
              Ready to find your next favourite piece?
            </h2>
            <p className="mt-2 text-sm text-white/70">
              Explore our latest arrivals and timeless essentials.
            </p>
          </div>
          <Link
            to="/dresses"
            className="inline-flex items-center gap-2 rounded-lg bg-[#F6E0D9] px-7 py-3 text-sm font-semibold text-slate-900 hover:bg-[#e7c9c0] transition"
          >
            Shop Now <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
