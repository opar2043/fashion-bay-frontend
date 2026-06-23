// ProductCard.jsx
import React from "react";
import { motion, number } from "framer-motion";
import { FaCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

// Helper: safely get numeric price from different shapes
const getPriceNumber = (price) => {
  if (typeof price === "number") return price;
  if (Array.isArray(price)) return Number(price[0] || 0);
  if (price && typeof price === "object") {
    if (price.$numberInt) return Number(price.$numberInt);
    if (price.$numberDecimal) return Number(price.$numberDecimal);
  }
  return 0;
};



const ProductCard = ({ pro, index }) => {
  console.log(pro.preprice);
  const { handleCart } = useAuth();

  // name can be string or [string]
  const title = Array.isArray(pro?.name) ? pro.name[0] : pro?.name || "";

 

  // image comes from images[] (fallback to image[])
  const img =
    (Array.isArray(pro?.images) && pro.images[0]) ||
    (Array.isArray(pro?.image) && pro.image[0]) ||
    "";

  // price can be number / [number] / { $numberInt: "20" }
  const rawPrice = getPriceNumber(pro?.price);
  const price = Number(rawPrice || 0).toFixed(2);


  // color is always an array (but support string fallback)
  const colors = Array.isArray(pro?.color)
    ? pro.color
    : pro?.color
    ? [pro.color]
    : [];

  const colorMap = {
    Brown: "#8B6F47",
    Black: "#000000",
    Ivory: "#FFFFF0",
    Sage: "#9DC183",
    Burgundy: "#800020",
    Navy: "#001F3F",
    "Dusty Pink": "#D8A5A5",
    Champagne: "#F7E7CE",
    Beige: "#D9C4A3",
    Mocha: "#7B5B44",
    Stone: "#CBC4B3",
    Cream: "#F5F1E6",
    White: "#FFFFFF",
    Emerald: "#006C5B",
  };


  // framer variants for image + overlay
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  const overlayVariants = {
    initial: { opacity: 0, y: 10 },
    hover: { opacity: 1, y: 0 },
  };

  const imageVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
  };

  // ✅ Add to cart handler
  const handleAddToCart = (e) => {
    // prevent the <Link> navigation when clicking the button
    e.preventDefault();
    e.stopPropagation();

    const primaryColor = colors[0] || null;

    const sizesArr = Array.isArray(pro?.size)
      ? pro.size
      : pro?.size
      ? [pro.size]
      : [];
    const primarySize = sizesArr[0] || null;

    const cartItem = {
      // use whichever id you rely on in cart
      id: pro.id || pro._id,
      productId: pro._id || pro.id,
      name: title,
      price: getPriceNumber(pro?.price),
      
      color: primaryColor,
      size: primarySize,
      image: img,
      quantity: 1,
    };

    handleCart(cartItem);

  };

  return (
    <Link to={`/view/${pro?._id}`} className="block">
      <motion.article
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        transition={{ delay: index * 0.05 }}
        className="group"
      >
        {/* Image */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-neutral-100">
          <motion.img
            src={img}
            alt={title}
            variants={imageVariants}
            transition={{ duration: 0.4 }}
            className="h-full w-full object-cover"
            loading="lazy"
          />

          {/* Hover overlay saying VIEW */}
          <motion.div
            variants={overlayVariants}
            transition={{ duration: 0.25 }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/35"
          >
            <span className="px-6 py-2 text-sm font-semibold tracking-wide uppercase rounded bg-white text-[#1D1E20]">
              View
            </span>
          </motion.div>
        </div>

        {/* Info */}
        <div className="mt-3">
          <motion.h3
            animate={{ opacity: [0.9, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[15px] font-medium text-neutral-900 line-clamp-1"
          >
            {title}
          </motion.h3>
 
 {/* Make previous price it will like deleted  */}
          <div className="mt-2 flex items-center gap-3">
            <motion.span
              animate={{ opacity: [0.9, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-[15px] text-slate-900 font-semibold"
            >
                {pro.preprice && (
    <span className="text-[12px] text-red-400 line-through font-semibold">
      £{pro.preprice}
    </span>
  )}
            </motion.span>
            <motion.span
              animate={{ opacity: [0.9, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-[15px] text-slate-900 font-semibold"
            >
              £{price}
            </motion.span>

            {/* color dots */}
            <div className="flex items-center gap-2">
              {colors.map((c, i) => (
                <motion.span
                  key={i}
                  title={c}
                  whileHover={{ scale: 1.2 }}
                  className="inline-grid h-4 w-4 place-items-center rounded-full ring-1 ring-black/10 cursor-pointer"
                  style={{ background: colorMap[c] || c?.toLowerCase() }}
                >
                  <FaCircle className="opacity-0" />
                </motion.span>
              ))}
            </div>
          </div>

          {/* Button */}
          <motion.button
            type="button"
            onClick={handleAddToCart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-3 w-full rounded-md px-4 py-2 text-sm font-medium transition hover:opacity-95"
            style={{ backgroundColor: "#F6E0D9", color: "#2b2b2b" }}
          >
            Add to cart
          </motion.button>
        </div>
      </motion.article>
    </Link>
  );
};

export default ProductCard;
