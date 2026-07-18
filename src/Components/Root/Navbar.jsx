// src/Components/Root/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiUser,
  FiShoppingBag,
  FiChevronDown,
  FiLogOut,
} from "react-icons/fi";
import useAuth from "../Hooks/useAuth";
import { toast } from "react-toastify";
import CartSidebar from "./CartSidebar";
import useCart from "../Hooks/useCart";
import useProducts from "../Hooks/useProducts";
import Marquee from "react-fast-marquee";
import img from "../../assets/logo2.svg";
import useAdmin from "../Hooks/useAdmin";
import { CiLogin } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
const ICON_COLOR = "#303030";

// Mega-menu config for Dresses
const DRESSES_MEGA = {
  columns: [
    {
      title: "Occasion",
      items: [ "Co Ords", "Best Sellers", "Limited Edition"],
    },
    {
      title: "Color",
      items: ["Tops-Shirts", "Trousers", "Outerwear", "Brights"],
    },
    {
      title: "All Dresses",
      items: ["Accessories", "Lookbook", "Lounge wear", "Outerwear"],
    },
  ],
};

const slugify = (s) =>
  "/" +
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

// Helper: build route for category items
const categoryPath = (name) => {
  if (name === "Dresses") return "/dresses";
  return `/dresses${slugify(name)}`;
};

// Small link component
const NavLink = ({ label, active, to }) => (
  <Link
    to={to}
    className={`relative px-3 py-3 text-[15px] font-semibold ${active ? "text-rose-400" : "text-slate-800"
      }`}
  >
    <span className="after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-0.5 after:h-[2px] after:w-0 hover:after:w-full after:bg-slate-900 after:transition-all after:duration-200">
      {label}
    </span>
  </Link>
);

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMega, setOpenMega] = useState(null);
  const [langOpen, setLangOpen] = useState(false);
  const [regOpen, setRegOpen] = useState(false);
  const [cart, refetch] = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products] = useProducts();
  const { handleLogout, user } = useAuth();
  const { admin } = useAdmin();
  const navigate = useNavigate();
  console.log(user);
  // Build unique categories - normalize "Trousers/Skirts" to "Trousers"
  const uniqueCategoryNames = Array.from(
    new Set(
      (products || [])
        .map((p) => {
          let category = p?.category;
          // if category find Trousers it will show Trousers/Skirt but link will only be Trousers
          if (category === "Trousers") {
            return "";
          };
          return category;
        })
        .filter(
          (c) =>
            c && c.toLowerCase() !== "new in" && c.toLowerCase() !== "dresses"
        )
    )
  ).sort();

  // Final CATEGORIES array - Limited to 8 categories
  const CATEGORIES = [
    { name: "NEW IN", path: categoryPath("NEW IN"), mega: null },
    { name: "Dresses", path: "/dresses", mega: DRESSES_MEGA },

    // Dynamic categories from product data - LIMITED to first 2
    ...uniqueCategoryNames.slice(0, 2).map((name) => ({
      name,
      path: categoryPath(name),
      mega: null,
    })),
    { name: "Best Sellers", path: categoryPath("Best Sellers"), mega: null },
    { name: "Trousers/skirts", path: categoryPath("Trousers"), mega: null },
    { name: "SALE", path: categoryPath("SALE"), mega: null },
    // Always-visible static links
    { name: "About", path: "/about", mega: null },
    // Dashboard link only for admins
    ...(admin ? [{ name: "Dashboard", path: "/dashboard", mega: null }] : []),
  ];

  function logOut() {
    handleLogout()
      .then(() => {
        navigate("/");
        toast.success("Logged Out");
      })
      .catch(() => toast.error("Something went Wrong"));
  }


  // console.log({admin});
  // console.log({user});
  return (
    <header className="w-full bg-[#F9F6F2]">
      <div className="h-[1px] w-full bg-black/60" />
      <Marquee speed={50} gradient={false} pauseOnHover={true} className="py-1">
        <span className="text-slate-900 font-extrabold text-sm tracking-wide">
          FREE SHIPPING OVER £89
        </span>
        <span className="mx-6 text-slate-800">•</span>
        <span className="text-slate-900 font-extrabold text-sm tracking-wide">
          HANDMADE IN THE UK
        </span>
        <span className="mx-6 text-slate-800">•</span>
        <span className="text-slate-800 font-extrabold text-sm tracking-wide">
          PREMIUM QUALITY GUARANTEED
        </span>
        <span className="mx-6 text-slate-800">•</span>
      </Marquee>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 md:mt-2">
        {/* Top row */}
        <div className="flex h-16 md:h-20 items-center justify-between border-b border-slate-200 md:border-none">
          {/* Left (mobile) */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              className="md:hidden p-2 rounded-full hover:bg-black/5"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <FiMenu size={22} color={ICON_COLOR} />
            </button>
          </div>

          {/* Center logo */}
          <div className="flex-1 flex justify-center text-center">
            <Link
              to="/"
              className="flex items-center gap-2 md:gap-3 text-xl md:text-4xl font-extrabold tracking-tight text-[#000000] italic"
            >
              <img
                src={img}
                alt="logo"
                className="rounded-full w-9 h-9 md:w-12 md:h-12"
              />
              <span className="uppercase tracking-[0.25em] md:tracking-[0.35em] text-sm md:text-2xl">
                Fashion Bay {admin ? "(Admin)" : "na"}
              </span>
            </Link>
          </div>

          {/* Right (desktop) */}
          <div className="hidden md:flex items-center gap-2">
            {/* Icons (desktop) */}
            <div className="flex items-center gap-3">
              <Link to="/dresses" aria-label="Search" className="p-2">
                <FiSearch size={22} color={ICON_COLOR} />
              </Link>

              {admin && (
                <Link
                  to="/dashboard"
                  aria-label="Dashboard"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-900 font-semibold text-xs hover:bg-black/5 transition-all duration-200"
                >
                  <FiUser size={18} color={ICON_COLOR} />
                  Dashboard
                </Link>
              )}

              {/* Cart button (opens sidebar) */}
              <button
                type="button"
                aria-label="Cart"
                onClick={() => setIsCartOpen(true)}
                className="relative inline-flex items-center justify-center h-10 w-10 rounded-full shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
              >
                <FiShoppingBag size={20} color={ICON_COLOR} />
                <span className="absolute top-1 right-1 min-w-[14px] h-[14px] rounded-full bg-rose-500 text-[10px] leading-[18px] text-white font-semibold flex items-center justify-center shadow-sm">
                  {cart.length > 9 ? "9+" : cart.length}
                </span>
              </button>

              {/* login / logout */}
              {user ? (
                <button
                  onClick={logOut}
                  className="px-4 py-2 flex justify-center items-center gap-1 rounded bg-[#1E1E1E] text-white font-semibold text-xs hover:bg-[#333] shadow-md hover:shadow-lg transition-all duration-300"
                  aria-label="Logout"
                >
                  <CiLogout /> Log Out
                </button>
              ) : (
                <Link to="/login" aria-label="Account">
                  <button
                    type="submit"
                    className="px-4 py-2 flex justify-center gap-1 items-center rounded-lg bg-[#F6E0D9] text-slate-900 font-semibold text-xs hover:bg-[#e7c9c0] shadow hover:shadow-md transition-all duration-300"
                  >
                    <CiLogin /> Sign In
                  </button>
                </Link>
              )}
            </div>
          </div>

          {/* Right (mobile) */}
          <div className="md:hidden flex items-center gap-1">
            <Link
              to="/dresses"
              aria-label="Search"
              className="p-2 rounded-full hover:bg-black/5"
            >
              <FiSearch size={20} color={ICON_COLOR} />
            </Link>

            {admin ? (
              <Link
                to="/dashboard"
                aria-label="Dashboard"
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-slate-900 font-semibold text-[11px] hover:bg-black/5"
              >
                <FiUser size={18} color={ICON_COLOR} />
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                aria-label="Account"
                className="p-2 rounded-full hover:bg-black/5"
              >
                <FiUser size={20} color={ICON_COLOR} />
              </Link>
            )}

            <button
              type="button"
              aria-label="Cart"
              onClick={() => setIsCartOpen(true)}
              className="relative inline-flex items-center justify-center h-9 w-9 rounded-full shadow-sm hover:bg-slate-50 transition-all duration-200"
            >
              <FiShoppingBag size={18} color={ICON_COLOR} />
              <span className="absolute top-1 right-0 min-w-[14px] h-[14px] rounded-full bg-rose-500 text-[10px] leading-[16px] text-white font-semibold flex items-center justify-center shadow-sm">
                {cart.length > 9 ? "9+" : cart.length}
              </span>
            </button>
          </div>
        </div>

        {/* Category row (desktop) */}
        <div className="hidden md:flex justify-center gap-3 text-sm font-semibold py-3.5 text-[#1E293B] relative">
          {CATEGORIES.map((cat) => {
            const path = cat.path || categoryPath(cat.name);
            const topSlug = slugify(cat.name);

            return (
              <div
                key={cat.name}
                className="group relative"
                onMouseEnter={() => setOpenMega(cat.mega ? cat.name : null)}
                onMouseLeave={() => setOpenMega(null)}
              >
                <NavLink label={cat.name} to={path} />

                {/* Mega dropdown (for Dresses) */}
                {cat.mega && openMega === cat.name && (
                  <div className="absolute left-1/2 -translate-x-2/5 top-full z-50 w-screen max-w-6xl px-4 py-2">
                    <div className="mx-auto rounded-lg border border-slate-200 bg-white shadow-lg">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-8">
                        {cat.mega.columns.map((col) => (
                          <div key={col.title}>
                            <div className="text-[13px] font-bold uppercase text-[#131a25] tracking-wide mb-4">
                              {col.title}
                            </div>
                            <ul className="space-y-2">
                              {col.items.map((item) => (
                                <li key={item}>
                                  <Link
                                    to={`/dresses${slugify("/" + item)}`}
                                    className="text-[#7C7A79] hover:text-rose-500 hover:underline font-normal text-sm transition-colors duration-200"
                                  >
                                    {item}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85%] bg-[#F9F6F2] shadow-xl p-4 overflow-y-auto">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-slate-900">Menu</span>
              <button onClick={() => setMobileOpen(false)} className="p-2">
                <FiX size={22} color={ICON_COLOR} />
              </button>
            </div>

            <div className="mt-4">
              {CATEGORIES.map((cat) => {
                const path = cat.path || categoryPath(cat.name);

                return (
                  <details
                    key={cat.name}
                    className="group border-b border-slate-200"
                  >
                    <summary className="flex list-none items-center justify-between py-3 font-semibold text-slate-900 cursor-pointer">
                      <Link
                        to={path}
                        className="flex-1"
                        onClick={() => setMobileOpen(false)}
                      >
                        {cat.name}
                      </Link>
                      {cat.mega && (
                        <FiChevronDown className="transition group-open:rotate-180" />
                      )}
                    </summary>

                    {/* Mega menu items for mobile */}
                    {cat.mega && (
                      <div className="pb-3 pl-2">
                        {cat.mega.columns.map((col) => (
                          <details key={col.title} className="group">
                            <summary className="flex list-none items-center justify-between py-2 text-[15px] text-slate-800 cursor-pointer">
                              {col.title}
                              <FiChevronDown className="transition group-open:rotate-180" />
                            </summary>
                            <ul className="pl-3 pb-2 space-y-1">
                              {col.items.map((item) => (
                                <li key={item}>
                                  <Link
                                    to={`/dresses${slugify("/" + item)}`}
                                    className="text-[15px] text-slate-800 hover:text-rose-500"
                                    onClick={() => setMobileOpen(false)}
                                  >
                                    {item}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </details>
                        ))}
                      </div>
                    )}
                  </details>
                );
              })}
            </div>

            {/* Company links (mobile) */}
            <div className="py-2 border-t border-slate-200 mt-2 space-y-1">
              {[
                { label: "Contact", to: "/contact" },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 font-semibold text-slate-900 hover:text-rose-500"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* login/logout inside drawer (Dashboard now lives in the nav list) */}
            <div className="py-2 border-t border-slate-200 mt-2 space-y-3">
              {user ? (
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    logOut();
                  }}
                  className="flex items-center gap-2 font-semibold text-sm text-white bg-[#1E1E1E] px-4 py-2 rounded-lg hover:bg-[#333] shadow hover:shadow-lg transition-all duration-300"
                >
                  <FiLogOut size={18} />
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 font-semibold text-sm text-slate-900 bg-[#F6E0D9] px-4 py-2 rounded-lg hover:bg-[#e7c9c0] shadow hover:shadow-md transition-all duration-300"
                >
                  <FiUser size={18} />
                  Login / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;