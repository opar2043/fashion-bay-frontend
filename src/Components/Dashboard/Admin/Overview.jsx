import React, { useEffect, useState } from "react";

const Overview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("https://fashion-bay-server.vercel.app/dashboard-stats");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error(error);
        setErr(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#f9f7f4] px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Top heading */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
            Overview
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Quick snapshot of your Fashion Bay store.
          </p>
        </div>

        {/* Loading / error states */}
        {loading && (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm py-10 flex items-center justify-center text-sm text-slate-500">
            Loading dashboard…
          </div>
        )}

        {!loading && err && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl shadow-sm px-4 py-3 text-sm text-rose-700">
            {err}
          </div>
        )}

        {!loading && stats && (
          <>
            {/* Stat cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
              {/* Users */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm px-4 py-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium tracking-[0.18em] uppercase text-slate-500">
                    Users
                  </p>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-white text-xs">
                    👤
                  </span>
                </div>
                <p className="text-2xl font-semibold text-slate-900">
                  {stats.usersCount ?? 0}
                </p>
                <p className="text-[11px] text-slate-400">
                  Registered accounts in your store.
                </p>
              </div>

              {/* Products */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm px-4 py-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium tracking-[0.18em] uppercase text-slate-500">
                    Products
                  </p>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-white text-xs">
                    🧵
                  </span>
                </div>
                <p className="text-2xl font-semibold text-slate-900">
                  {stats.productsCount ?? 0}
                </p>
                <p className="text-[11px] text-slate-400">
                  Items currently live in your catalogue.
                </p>
              </div>

              {/* Reviews */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm px-4 py-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium tracking-[0.18em] uppercase text-slate-500">
                    Reviews
                  </p>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-white text-xs">
                    ⭐
                  </span>
                </div>
                <p className="text-2xl font-semibold text-slate-900">
                  {stats.reviewsCount ?? 0}
                </p>
                <p className="text-[11px] text-slate-400">
                  Customer reviews across all products.
                </p>
              </div>

              {/* Orders */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm px-4 py-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium tracking-[0.18em] uppercase text-slate-500">
                    Orders
                  </p>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-white text-xs">
                    🧺
                  </span>
                </div>
                <p className="text-2xl font-semibold text-slate-900">
                  {stats.ordersCount ?? 0}
                </p>
                <p className="text-[11px] text-slate-400">
                  Total orders placed through the store.
                </p>
              </div>
            </div>

            {/* Small “activity” panel */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm px-5 py-4 text-sm text-slate-600">
              <p className="font-medium text-slate-900 mb-1">
                Store health snapshot
              </p>
              <p className="text-xs text-slate-500">
                You currently have{" "}
                <span className="font-semibold text-slate-900">
                  {stats.productsCount ?? 0} products
                </span>{" "}
                available,{" "}
                <span className="font-semibold text-slate-900">
                  {stats.ordersCount ?? 0} orders
                </span>{" "}
                placed, and{" "}
                <span className="font-semibold text-slate-900">
                  {stats.reviewsCount ?? 0} reviews
                </span>{" "}
                from{" "}
                <span className="font-semibold text-slate-900">
                  {stats.usersCount ?? 0} users
                </span>
                .
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Overview;
