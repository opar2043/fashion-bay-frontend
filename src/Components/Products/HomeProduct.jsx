import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import useProducts from "../Hooks/useProducts";

const HomeProducts = () => {

  const [products , refetch] = useProducts();

  const displayedProducts = products?.slice(0, 8);

  return (
    <div className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl font-bold text-gray-900"
            >
              All Collection
            </motion.h2>
            <p className="text-sm text-gray-600 mt-1">
              Curated picks from our latest pieces.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link
              to="/dresses"
              className="inline-flex items-center text-sm font-semibold text-gray-900 border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-900 hover:text-white transition"
            >
              View all collection
              <span className="ml-2 text-lg leading-none">→</span>
            </Link>
          </motion.div>
        </div>

        {/* Products grid */}
        {displayedProducts?.length > 0 ? (
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {displayedProducts?.map((product, idx) => (
              <ProductCard key={product.id} pro={product} index={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg font-semibold text-gray-700">
              Loading collection...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeProducts;
