import React from "react";
import { motion } from "framer-motion";
import Faq from "./Faq";

const container = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const lineGrow = {
  hidden: { scaleX: 0, opacity: 0.6 },
  show: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.05 },
  },
};

const MoreDetails = () => {
  return (
    <motion.section
      className="mx-auto w-11/12  bg-white p-3"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      id="about"
    >
      {/* Top Title */}
      <motion.h2
        className="text-2xl sm:text-3xl font-semibold text-[#1D1E20] mb-4"
        variants={item}
      >
        More Details
      </motion.h2>

      <motion.div
        className="h-px w-full bg-gray-200 mb-6"
        variants={lineGrow}
        style={{ transformOrigin: "left" }}
      />

      {/* Brand Intro */}
      <motion.div className="space-y-3" variants={container}>
        <motion.h3
          className="text-lg sm:text-xl font-semibold text-[#1D1E20]"
          variants={item}
        >
          Fashion Bay — Premium Fashion & Style
        </motion.h3>
        <motion.p className="text-gray-700 leading-6  text-sm" variants={item}>
          <span className="font-semibold italic">Fashion Bay</span> is
          your destination for premium fashion and style. We bring you carefully
          curated collections with attention to quality, fit, and design. Our commitment—{" "}
          <span className="font-medium">Style Without Compromise</span>—means
          no trade-offs between quality, fit, ethics, or impact.
        </motion.p>
        <motion.p className="text-gray-700 leading-5 text-sm" variants={item}>
          Crafted in silence. Worn loud. Designed so the woman wearing them is
          always the statement.
        </motion.p>
      </motion.div>

      {/* Two-column narrative */}
      <div className="mt-7 grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Left: Customer Narrative */}
        <motion.div className="space-y-3" variants={container}>
          <motion.h4
            className="text-lg font-semibold text-[#1D1E20]"
            variants={item}
          >
            The Quiet Achiever
          </motion.h4>
          <motion.p className="text-gray-700 leading-6 text-sm" variants={item}>
            She’s defined by her results, not the noise. She values the process
            as much as the outcome, invests in pieces that last, and chooses
            garments that act as both <span className="italic">armor</span> and{" "}
            <span className="italic">amplifier</span>. Her wardrobe is a
            reliable, beautiful armature for an ambitious life.
          </motion.p>
        </motion.div>

        {/* Right: Core Philosophy */}
        <motion.div className="space-y-3" variants={container}>
          <motion.h4
            className="text-lg font-semibold text-[#1D1E20]"
            variants={item}
          >
            The Core Philosophy
          </motion.h4>
          <motion.p className="text-gray-700 leading-6 text-sm" variants={item}>
            <span className="font-medium">Crafted in Silence</span> is the
            unseen strength—precise tailoring, hidden closures, durable
            materials that keep structure and comfort over time.{" "}
            <span className="font-medium">Worn Loud</span> is the external
            impact—clean architecture, decisive drape, presence without
            excess. Together, they deliver{" "}
            <span className="font-medium">Style Without Compromise</span>.
          </motion.p>
        </motion.div>
      </div>

      {/* Collection Focus */}
      <motion.div className="mt-10 space-y-6" variants={container}>
        <motion.h4 className="text-lg font-semibold text-[#1D1E20]" variants={item}>
          Collection Focus: Silent Strength
        </motion.h4>

        <motion.div className="space-y-3" variants={container}>
          <motion.h5 className="font-semibold text-[#1D1E20]" variants={item}>
            Foundation Pieces
          </motion.h5>
          <motion.p className="text-gray-700 leading-6 text-sm" variants={item}>
            Modular layers designed to travel and work hard without losing
            shape—like the <span className="font-medium">Silence Blazer</span>{" "}
            (precise structure, luxurious lining, deep inner pockets) and the{" "}
            <span className="font-medium">Loud Trouser</span> (dramatic drape,
            immaculate crease).
          </motion.p>
        </motion.div>

        <motion.div className="space-y-3" variants={container}>
          <motion.h5 className="font-semibold text-[#1D1E20]" variants={item}>
            Material Story
          </motion.h5>
          <motion.p className="text-gray-700 leading-6 text-sm" variants={item}>
            High-performance, natural textiles—dense silk-wool blends, sculpted
            cottons—chosen to age gracefully and retain silhouette, embodying
            the resilience of the Forge.
          </motion.p>
        </motion.div>

        <motion.div className="space-y-3" variants={container}>
          <motion.h5 className="font-semibold text-[#1D1E20]" variants={item}>
            Design Details
          </motion.h5>
          <motion.ul
            className="list-disc pl-5 text-gray-700 text-sm leading-6 space-y-1"
            variants={container}
          >
            <motion.li variants={item}>Custom, heavy-gauge hardware</motion.li>
            <motion.li variants={item}>Hidden closures for clean lines</motion.li>
            <motion.li variants={item}>Precision-cut hems that frame the body</motion.li>
          </motion.ul>
        </motion.div>
      </motion.div>

      {/* Signature Collections */}
      <motion.div className="mt-10 space-y-3" variants={container}>
        <motion.h4 className="text-lg font-semibold text-[#1D1E20]" variants={item}>
          Signature Collections
        </motion.h4>
        <motion.ul
          className="list-disc pl-5 text-gray-800 leading-6 space-y-1"
          variants={container}
        >
          <motion.li variants={item}>
            <span className="font-medium text-sm">Foundation</span> — elevated everyday
            armor (blazers, trousers, core knits)
          </motion.li>
          <motion.li variants={item}>
            <span className="font-medium text-sm">Occasion</span> — architectural
            silhouettes for decisive entrances
          </motion.li>
          <motion.li variants={item}>
            <span className="font-medium text-sm">Travel</span> — resilient fabrics,
            crease-keeping construction, packable polish
          </motion.li>
          <motion.li variants={item}>
            <span className="font-medium text-sm">New Arrivals</span> — the latest
            expressions of Silent Strength
          </motion.li>
        </motion.ul>
      </motion.div>

      {/* CTA */}
      <motion.div className="mt-10" variants={item}>
        <p className="text-gray-700 leading-6">
          Ready to elevate your style? Follow us on{" "}
          <a
            href="https://www.instagram.com/opar2043"
            className="underline decoration-gray-800 underline-offset-2 hover:decoration-gray-800 transition text-gray-900"
          >
            Instagram
          </a>{" "}
          for behind-the-seams moments and how she wears it—then share your
          look with <span className="font-medium">#CraftedInSilence #WornLoud</span>.
        </p>
      </motion.div>

      {/* FAQ */}
      {/* <motion.div className="mt-10" variants={container}>
        <motion.h4
          className="text-lg font-semibold text-[#1D1E20] mb-3"
          variants={item}
        >
          Frequently Asked Questions
        </motion.h4>
        <div className="space-y-5">
          <motion.div variants={container}>
            <motion.p className="font-medium text-[#1D1E20] " variants={item}>
              Q: What does “Style Without Compromise” mean?
            </motion.p>
            <motion.p className="text-gray-700 leading-6 text-sm" variants={item}>
              It’s our promise to never trade quality, fit, or ethical sourcing
              for speed or trend. You get enduring construction and striking
              presence—every time.
            </motion.p>
          </motion.div>

          <motion.div variants={container}>
            <motion.p className="font-medium text-[#1D1E20]" variants={item}>
              Q: Who is Fashion Bay designed for?
            </motion.p>
            <motion.p className="text-gray-700 leading-6 text-sm" variants={item}>
              The “Quiet Achiever”—professionals and creatives who need reliable
              structure for their day and an effortless, confident frame for
              their presence.
            </motion.p>
          </motion.div>

          <motion.div variants={container}>
            <motion.p className="font-medium text-[#1D1E20]" variants={item}>
              Q: How do the pieces maintain shape and comfort?
            </motion.p>
            <motion.p className="text-gray-700 leading-6 text-sm" variants={item}>
              Through precise tailoring, engineered linings, and resilient,
              high-performance fabrics that hold silhouette while remaining
              comfortable in motion.
            </motion.p>
          </motion.div>
        </div>
      </motion.div> */}

      {/* <Faq></Faq> */}
    </motion.section>
  );
};

export default MoreDetails;
