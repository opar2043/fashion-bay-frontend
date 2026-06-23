// src/components/Review.jsx
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// ⭐ star helper
const Stars = ({ rating }) => {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, idx) => (
        <FaStar
          key={idx}
          className={
            idx < rating ? "text-pink-400 w-4 h-4" : "text-gray-300 w-4 h-4"
          }
        />
      ))}
    </div>
  );
};

const ReviewCard = ({ item, index }) => {
  // Format date
  const formattedDate = item.createdAt
    ? new Date(item.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
    : "";

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className="bg-white rounded-md shadow-md border border-gray-200 overflow-hidden flex flex-col h-full"
    >
      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* stars */}
        <div className="flex items-center gap-2">
          <Stars rating={item.rating} />
          <span className="text-xs text-gray-400">{item.rating}.0</span>
        </div>

        {/* User info + date */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-semibold text-xs text-gray-900">
              {item.name}
            </span>
            <span className="text-xs text-gray-400">
              {formattedDate} • Verified buyer
            </span>
          </div>

          <span className="text-[10px] uppercase tracking-wide bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            qualified
          </span>
        </div>

        {/* review text */}
        <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">
          {item.review}
        </p>
      </div>
    </motion.article>
  );
};


const Review = () => {
  const [reviews, setReviews] = useState([]);

  // Fetch reviews
  useEffect(() => {
    fetch("https://fashion-bay-server.vercel.app/reviews")
      .then(res => res.json())
      .then(data => setReviews(data));
  }, []);

  return (
    <section className="py-10 px-3 max-w-7xl w-11/12 mx-auto">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-950">
          Customer reviews
        </h2>
        <p className="text-xs md:text-sm text-slate-700">
          Real women. Real fits. Real feedback.
        </p>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={18}
        slidesPerView={1.1}
        centeredSlides={true}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1.3, centeredSlides: true },
          768: { slidesPerView: 2, centeredSlides: false },
          1024: { slidesPerView: 3, centeredSlides: false }
        }}
        className="pb-10"
      >
        {reviews.map((item, index) => (
          <SwiperSlide key={item._id} className="!h-auto">
            <ReviewCard item={item} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Review;
