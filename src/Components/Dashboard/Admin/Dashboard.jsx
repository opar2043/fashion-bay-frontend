import React, { useState } from "react";
import { NavLink, Outlet, useOutlet, Link } from "react-router-dom";
import {
  FiHome,
  FiPlusCircle,
  FiBox,
  FiUsers,
  FiShoppingBag,
  FiMail,
  FiMessageSquare,
  FiMenu,
  FiX,
  FiExternalLink,
} from "react-icons/fi";
import AllThing from "./AllThing";
import img from "../../../assets/logo2.svg";

const links = [
  { label: "Overview", to: "/dashboard", icon: <FiHome />, end: true },
  { label: "Add Product", to: "/dashboard/add-product", icon: <FiPlusCircle /> },
  { label: "All Products", to: "/dashboard/all-product", icon: <FiBox /> },
  { label: "Orders", to: "/dashboard/orders", icon: <FiShoppingBag /> },
  { label: "Users", to: "/dashboard/users", icon: <FiUsers /> },
  { label: "Subscribers", to: "/dashboard/subscribers", icon: <FiMail /> },
  { label: "Messages", to: "/dashboard/messages", icon: <FiMessageSquare /> },
];

const NavItem = ({ link, onClick }) => (
  <NavLink
    to={link.to}
    end={link.end}
    onClick={onClick}
    className={({ isActive }) =>
      [
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition",
        isActive
          ? "bg-[#F6E0D9] text-slate-900 shadow-sm"
          : "text-slate-600 hover:bg-[#F6E0D9]/60 hover:text-slate-900",
      ].join(" ")
    }
  >
    <span className="text-base">{link.icon}</span>
    <span>{link.label}</span>
  </NavLink>
);

const Dashboard = () => {
  const outlet = useOutlet();
  const [mobileOpen, setMobileOpen] = useState(false);

  const Sidebar = ({ onNavigate }) => (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-slate-100">
        <img src={img} alt="Fashion Bay" className="h-10 w-10 rounded-full" />
        <div>
          <h1 className="text-base font-bold uppercase tracking-[0.2em] text-slate-900">
            Fashion Bay
          </h1>
          <p className="text-[11px] text-slate-400">Admin Dashboard</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-1.5 overflow-y-auto">
        {links.map((link) => (
          <NavItem key={link.to} link={link} onClick={onNavigate} />
        ))}
      </nav>

      {/* Back to store */}
      <div className="px-3 pb-5">
        <Link
          to="/"
          onClick={onNavigate}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#1E1E1E] px-3 py-2.5 text-sm font-semibold text-white hover:bg-[#333] transition"
        >
          <FiExternalLink /> Back to Store
        </Link>
        <p className="mt-4 text-center text-[11px] text-slate-400">
          © {new Date().getFullYear()} Fashion Bay
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#f9f7f4]">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col border-r border-slate-200 bg-white">
        <Sidebar />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 max-w-[85%] bg-white shadow-xl">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-4 p-1 text-slate-500"
              aria-label="Close menu"
            >
              <FiX size={22} />
            </button>
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-100"
            aria-label="Open menu"
          >
            <FiMenu size={22} />
          </button>
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900">
            Fashion Bay
          </span>
          <img src={img} alt="" className="h-8 w-8 rounded-full" />
        </div>

        <main className="flex-1 overflow-y-auto">
          {outlet ? outlet : <AllThing />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
