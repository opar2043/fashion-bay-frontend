import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaShoppingCart, FaHeart } from "react-icons/fa";

const wishlistData = [
  {
    id: "catharine-maxi-brown",
    name: "Catharine Floral Lace Sheer Maxi Dress",
    category: "Women › Dresses › Maxi",
    image: "https://images.unsplash.com/photo-1595777712802-5b5ebfb02615?w=800&q=80",
    price: 109,
  },
  {
    id: "catharine-maxi-black",
    name: "Catharine Floral Lace Sheer Maxi Dress",
    category: "Women › Dresses › Maxi",
    image: "https://images.unsplash.com/photo-1520975922284-6c4b1ba9ed1c?w=800&q=80",
    price: 109,
  },
  {
    id: "catharine-maxi-ivory",
    name: "Catharine Floral Lace Sheer Maxi Dress",
    category: "Women › Dresses › Maxi",
    image: "https://images.unsplash.com/photo-1595777712802-5b5ebfb02615?w=800&q=80",
    price: 109,
  },
  {
    id: "elegant-evening-gown",
    name: "Elegant Evening Gown with Sequins",
    category: "Women › Dresses › Evening",
    image: "https://images.unsplash.com/photo-1566260436045-b6a1e0e5adb0?w=800&q=80",
    price: 189,
  },
  {
    id: "casual-summer-dress",
    name: "Casual Summer Dress with Prints",
    category: "Women › Dresses › Casual",
    image: "https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=800&q=80",
    price: 79,
  },
  {
    id: "vintage-midi-dress",
    name: "Vintage Inspired Midi Dress",
    category: "Women › Dresses › Midi",
    image: "https://images.unsplash.com/photo-1595607774223-ef52624120d2?w=800&q=80",
    price: 129,
  },
  {
    id: "boho-wrap-dress",
    name: "Boho Chic Wrap Dress",
    category: "Women › Dresses › Boho",
    image: "https://images.unsplash.com/photo-1589553694360-90a50e75e4b1?w=800&q=80",
    price: 99,
  },
  {
    id: "party-mini-dress",
    name: "Party Mini Dress with Fringe",
    category: "Women › Dresses › Party",
    image: "https://images.unsplash.com/photo-1612336307429-8a88e8d08dbb?w=800&q=80",
    price: 149,
  },
];

const Wishlist = () => {
  const [items, setItems] = useState(wishlistData);
  const [removed, setRemoved] = useState(new Set());

  const handleRemove = (id) => {
    setRemoved(new Set(removed).add(id));
    setTimeout(() => {
      setItems(items.filter((item) => item.id !== id));
      setRemoved(new Set([...removed].filter((rid) => rid !== id)));
    }, 300);
  };

  const handleClear = () => {
    setRemoved(new Set(items.map((item) => item.id)));
    setTimeout(() => {
      setItems([]);
      setRemoved(new Set());
    }, 300);
  };

  const handleMoveToCart = (item) => {
    alert(`${item.name} moved to cart!`);
  };

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);

  const visibleItems = items.filter((item) => !removed.has(item.id));

  return (
    <section className="min-h-screen w-full" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight" style={{ color: "#1E293B" }}>
              My Wishlist
            </h1>
            <p className="text-base mt-3" style={{ color: "#64748B" }}>
              Login to save your wishlist across devices.{" "}
              <span className="font-semibold cursor-pointer hover:underline" style={{ color: "#0EA5E9" }}>
                Login
              </span>
            </p>
          </div>
          <button
            onClick={handleClear}
            disabled={!visibleItems.length}
            className="px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
            style={{
              backgroundColor: visibleItems.length ? "#EF4444" : "#E2E8F0",
              color: "#FFFFFF",
            }}
          >
            <FaTrashAlt /> Clear All
          </button>
        </div>

        {/* Content */}
        {visibleItems.length === 0 ? (
          <div className="mt-20 text-center py-20">
            <div className="mx-auto w-24 h-24 rounded-full grid place-items-center mb-6" style={{ backgroundColor: "#F1F5F9" }}>
              <FaHeart className="text-4xl" style={{ color: "#CBD5E1" }} />
            </div>
            <h3 className="text-3xl font-bold" style={{ color: "#1E293B" }}>
              Your wishlist is empty
            </h3>
            <p className="mt-3 text-lg" style={{ color: "#64748B" }}>
              Explore our latest arrivals and add your favorites here.
            </p>
            <button
              className="px-8 py-4 rounded-lg font-semibold mt-8 transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: "#0EA5E9", color: "#FFFFFF" }}
            >
              Browse Products
            </button>
          </div>
        ) : (
          <>
            {/* Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {visibleItems.map((product) => (
                <article
                  key={product.id}
                  className="group cursor-pointer transition-all duration-300 transform hover:-translate-y-2"
                  style={{ opacity: removed.has(product.id) ? 0 : 1 }}
                >
                  {/* Image Container */}
                  <div className="relative mb-4 rounded-xl overflow-hidden bg-slate-100 aspect-square">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    
                    {/* Action Buttons */}
                    <div className="absolute bottom-4 left-4 right-4 flex gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <button
                        onClick={() => handleMoveToCart(product)}
                        className="flex-1 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg"
                        style={{ backgroundColor: "#0EA5E9", color: "#FFFFFF" }}
                        title="Move to Cart"
                      >
                        <FaShoppingCart /> Add to Cart
                      </button>
                      <button
                        onClick={() => handleRemove(product.id)}
                        className="py-3 px-4 rounded-lg transition-all duration-200"
                        style={{ backgroundColor: "#F1F5F9", color: "#EF4444" }}
                        title="Remove"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div>
                    <p className="text-sm font-medium" style={{ color: "#94A3B8" }}>
                      {product.category}
                    </p>
                    <h3 className="mt-2 font-semibold leading-tight line-clamp-2 text-lg" style={{ color: "#1E293B" }}>
                      {product.name}
                    </h3>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-2xl font-bold" style={{ color: "#0EA5E9" }}>
                        ${product.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleRemove(product.id)}
                        className="p-2 rounded-full transition-all duration-200 hover:shadow-md"
                        style={{ backgroundColor: "#F1F5F9", color: "#EF4444" }}
                      >
                        <FaHeart />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-16 pt-8 border-t" style={{ borderColor: "#E2E8F0" }}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <p className="text-lg font-semibold" style={{ color: "#475569" }}>
                  {visibleItems.length} item{visibleItems.length !== 1 ? "s" : ""} in your list
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <span className="text-2xl font-bold" style={{ color: "#1E293B" }}>
                    Subtotal: <span style={{ color: "#0EA5E9" }}>${subtotal.toFixed(2)}</span>
                  </span>
                  <button
                    className="px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg"
                    style={{ backgroundColor: "#0EA5E9", color: "#FFFFFF" }}
                  >
                    Proceed to Cart
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Wishlist;