import React from "react";
import { NavLink, Outlet, useOutlet, Link } from "react-router-dom";
import {
  FiHome,
  FiPlusCircle,
  FiEdit3,
  FiBox,
  FiUsers,
  FiShoppingBag,
  FiLayers,
} from "react-icons/fi";
import AllThing from "./AllThing";

const links = [
  { label: "Overview", to: "/dashboard", icon: <FiHome /> },
  { label: "Add Product", to: "/dashboard/add-product", icon: <FiPlusCircle /> },
  { label: "All Products", to: "/dashboard/all-product", icon: <FiBox /> },
  { label: "Users", to: "/dashboard/users", icon: <FiUsers /> },
  { label: "Orders", to: "/dashboard/orders", icon: <FiShoppingBag /> },
  // { label: "All Thing", to: "/dashboard/all-thing", icon: <FiLayers /> },
];

const Dashboard = () => {
  const outlet = useOutlet();

  return (
    <div className="flex flex-col md:flex-row gap-5 min-h-screen bg-[#F9F6F2]">
      {/* Sidebar */}
      <aside className="md:w-64 w-full bg-white border-r border-slate-200 flex flex-col">
        {/* Logo / Brand */}
        <div className="flex items-center justify-center py-6 border-b">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded bg-slate-900 flex items-center justify-center text-white text-sm font-semibold">
              FF
            </div>
            <h1 className="text-xl font-semibold text-slate-800">
              Forge N Frame
            </h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 text-slate-700 text-sm">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 p-2 rounded-lg transition",
                  isActive
                    ? "bg-[#F6E0D9] text-slate-900"
                    : "text-slate-600 hover:bg-[#F6E0D9]/70 hover:text-slate-900",
                ].join(" ")
              }
            >
              <span className="text-base">{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          ))}

          {/* Home button (like meals dashboard) */}
          <Link
            to="/"
            className="flex items-center gap-3 p-2 rounded text-white bg-red-500 hover:bg-red-600 transition text-sm mt-2"
          >
            <FiHome />
            <span>Home</span>
          </Link>
        </nav>

        {/* Footer */}
        <div className="text-center py-4 border-t text-xs text-slate-500">
          © {new Date().getFullYear()} Couture Studio
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {outlet ? outlet : <AllThing></AllThing>}
      </main>
    </div>
  );
};

export default Dashboard;
