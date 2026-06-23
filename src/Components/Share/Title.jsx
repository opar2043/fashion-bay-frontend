import React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const Title = ({ head, head2, para }) => {
  return (
    <motion.div
      className="flex justify-center flex-col items-center  my-5 md:my-10 md:mt-10"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.div className="flex items-center mb-3" variants={item}>
        <motion.h2
          className="text-2xl md:text-4xl text-black font-bold"
          variants={item}
        >
          {head} <span className="text-[#37475f]">{head2}</span>
        </motion.h2>

        {/* Animated accent line */}
        <motion.div
          className="h-0.5 bg-gray-800 ml-2 rounded"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
          style={{ width: 30, transformOrigin: "left" }} // ~w-16
        />
      </motion.div>

      <motion.p
        className="text-gray-700 text-center"
        variants={item}
      >

        {para}
      </motion.p>
    </motion.div>
  );
};

export default Title;
