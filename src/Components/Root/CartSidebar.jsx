// src/Components/CartSidebar.jsx
import React, { useState } from "react";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import useCart from "../Hooks/useCart";
import useAxios from "../Hooks/useAxios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const CartSidebar = ({ isOpen = false, onClose = () => {} }) => {
  const [cart=[], refetch] = useCart();
  const [quantities, setQuantities] = useState({});
  const axiosSecure = useAxios();

  // 🔹 delete single cart item
  const handleDeleteCart = async (id) => {
    try {
      const res = await axiosSecure.delete(`/cart/${id}`);
      if (res?.data?.deletedCount > 0) {
        toast.success("Item removed from cart");
        refetch();
      } else {
        toast.error("Could not remove item");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  // 🔹 change quantity local state
  const handleQuantityChange = (id, value) => {
    const num = Number(value);
    const qty = !num || num < 1 ? 1 : num;
    setQuantities((prev) => ({
      ...prev,
      [id]: qty,
    }));
  };

  // subtotal with local quantities
  const subtotal =
    cart?.reduce((sum, item) => {
      const qty = quantities[item._id] ?? 1;
      return sum + Number(item.price || 0) * qty;
    }, 0) || 0;

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white text-slate-900 shadow-2xl z-[60] transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header - softer colors */}
        <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaShoppingCart className="text-xl text-slate-700" />
            <h2 className="text-lg font-semibold tracking-wide text-slate-900">
              Your Cart
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded hover:bg-slate-100 transition"
          >
            <MdClose className="text-2xl text-slate-600" />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col h-[calc(100%-theme(spacing.16)-theme(spacing.32))] overflow-y-auto p-4">
          {cart && cart.length > 0 ? (
            <div className="space-y-3">
              {cart.map((item) => {
                const qty = quantities[item._id] ?? 1;
                const lineTotal = (Number(item.price || 0) * qty).toFixed(2);

                const imageSrc =
                  item.image || item.featured_image || item.images?.[0] || "";

                return (
                  <div
                    key={item._id}
                    className="flex gap-3 p-3 border border-slate-200 rounded-xl bg-slate-50/60 hover:bg-white hover:shadow-sm transition"
                  >
                    {/* Image */}
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover border border-slate-200 bg-white"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-slate-100 border border-slate-200" />
                    )}

                    {/* Info */}
                    <div className="flex-1 flex flex-col">
                      <h4 className="text-sm font-semibold line-clamp-2 text-slate-900">
                        {item.name}
                      </h4>

                      <div className="mt-1 text-xs text-slate-500 flex gap-2">
                        {item.size && <span>Size: {item.size}</span>}
                        {item.color && <span>Color: {item.color}</span>}
                      </div>

                      {/* Qty */}
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs text-slate-500">Qty</span>
                        <input
                          type="number"
                          min="1"
                          value={qty}
                          onChange={(e) =>
                            handleQuantityChange(item._id, e.target.value)
                          }
                          className="w-16 border border-slate-300 rounded px-2 py-1 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-slate-500"
                        />
                      </div>

                      {/* Prices */}
                      <div className="mt-2 flex justify-between items-center text-xs text-slate-600">
                        <span>£{Number(item.price || 0).toFixed(2)} each</span>
                        <span className="font-semibold text-slate-900">
                          £{lineTotal}
                        </span>
                      </div>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => handleDeleteCart(item._id)}
                      className="self-start p-2 rounded-lg hover:bg-red-50 text-red-500 transition"
                    >
                      <FaTrash />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <FaShoppingCart className="text-slate-200 text-6xl mb-4" />
              <p className="text-slate-800 text-lg font-medium">
                Your cart is empty
              </p>
              <p className="text-slate-400 text-sm mt-1">
                Add something you love.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2 border border-slate-800 text-slate-800 rounded-full text-sm font-semibold hover:bg-slate-800 hover:text-white transition"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {cart && cart.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 border-t border-slate-200 bg-slate-50 p-4 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-700">Subtotal</span>
              <span className="text-lg font-bold text-slate-900">
                £{subtotal.toFixed(2)}
              </span>
            </div>

            <Link to={'/payment'}>
              <button className="w-full bg-[#fcd0c3] shadow  py-3 rounded text-sm font-semibold tracking-wide hover:bg-slate-800 hover:text-white transition">
                Go to Checkout
              </button>
            </Link>

            <button
              onClick={onClose}
              className="w-full text-center text-xs text-slate-600 py-1 hover:text-slate-900 transition"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/35 z-[55]" onClick={onClose} />
      )}
    </>
  );
};

export default CartSidebar;
