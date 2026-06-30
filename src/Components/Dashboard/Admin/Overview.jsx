import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiTrendingUp,
  FiShoppingBag,
  FiUsers,
  FiBox,
  FiMail,
  FiStar,
  FiMessageSquare,
  FiArrowUpRight,
} from "react-icons/fi";
import useAxios from "../../Hooks/useAxios";

const money = (n) =>
  `£${Number(n || 0).toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const formatDate = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
};

const statusStyle = (status) => {
  switch ((status || "").toLowerCase()) {
    case "delivered":
    case "completed":
    case "paid":
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    case "shipped":
      return "bg-sky-50 text-sky-700 border-sky-100";
    case "cancelled":
    case "canceled":
      return "bg-rose-50 text-rose-700 border-rose-100";
    default:
      return "bg-amber-50 text-amber-700 border-amber-100";
  }
};

const StatCard = ({ icon, label, value, hint, accent }) => (
  <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-slate-500">
        {label}
      </p>
      <span
        className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-base"
        style={{ backgroundColor: accent || "#F6E0D9", color: "#1E1E1E" }}
      >
        {icon}
      </span>
    </div>
    <p className="text-2xl font-semibold text-slate-900">{value}</p>
    {hint && <p className="text-[11px] text-slate-400">{hint}</p>}
  </div>
);

const Overview = () => {
  const axiosSecure = useAxios();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    axiosSecure
      .get("/dashboard-stats")
      .then((res) => setStats(res.data))
      .catch((e) => setErr(e.message || "Something went wrong"))
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  const trend = stats?.revenueTrend || [];
  const maxTrend = Math.max(1, ...trend.map((t) => t.total));
  const statusEntries = Object.entries(stats?.statusBreakdown || {});

  return (
    <div className="min-h-screen bg-[#f9f7f4] px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
              Dashboard Overview
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              A real-time snapshot of your Fashion Bay store.
            </p>
          </div>
          <Link
            to="/dashboard/orders"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#F6E0D9] px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-[#e7c9c0] transition"
          >
            Manage orders <FiArrowUpRight />
          </Link>
        </div>

        {loading && (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm py-12 flex items-center justify-center text-sm text-slate-500">
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
            {/* Primary KPI row */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-4">
              <StatCard
                icon={<FiTrendingUp />}
                label="Total Revenue"
                value={money(stats.totalRevenue)}
                hint={`Avg order ${money(stats.avgOrderValue)}`}
                accent="#dcfce7"
              />
              <StatCard
                icon={<FiShoppingBag />}
                label="Orders"
                value={stats.ordersCount ?? 0}
                hint="Total orders placed"
              />
              <StatCard
                icon={<FiBox />}
                label="Products"
                value={stats.productsCount ?? 0}
                hint="Live in your catalogue"
              />
              <StatCard
                icon={<FiUsers />}
                label="Customers"
                value={stats.usersCount ?? 0}
                hint="Registered accounts"
              />
            </div>

            {/* Secondary KPI row */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
              <StatCard
                icon={<FiMail />}
                label="Subscribers"
                value={stats.newsletterCount ?? 0}
                hint="Newsletter mailing list"
                accent="#e0f2fe"
              />
              <StatCard
                icon={<FiMessageSquare />}
                label="Messages"
                value={stats.messagesCount ?? 0}
                hint="Contact enquiries"
                accent="#fae8ff"
              />
              <StatCard
                icon={<FiStar />}
                label="Reviews"
                value={stats.reviewsCount ?? 0}
                hint="Across all products"
                accent="#fef9c3"
              />
            </div>

            {/* Charts row */}
            <div className="grid gap-4 lg:grid-cols-3 mb-6">
              {/* Revenue trend */}
              <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900">
                      Revenue — last 7 days
                    </h2>
                    <p className="text-xs text-slate-400">Daily order value</p>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600">
                    {money(trend.reduce((s, t) => s + t.total, 0))}
                  </span>
                </div>
                <div className="flex items-end justify-between gap-2 h-40">
                  {trend.map((t) => (
                    <div
                      key={t.date}
                      className="flex flex-1 flex-col items-center gap-2"
                    >
                      <div
                        className="w-full max-w-[40px] rounded-t-md bg-[#F6E0D9] hover:bg-[#e7c9c0] transition-all"
                        style={{
                          height: `${Math.max(4, (t.total / maxTrend) * 130)}px`,
                        }}
                        title={money(t.total)}
                      />
                      <span className="text-[10px] text-slate-400">
                        {formatDate(t.date)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order status breakdown */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
                <h2 className="text-sm font-semibold text-slate-900 mb-4">
                  Order status
                </h2>
                {statusEntries.length === 0 && (
                  <p className="text-xs text-slate-400">No orders yet.</p>
                )}
                <div className="space-y-3">
                  {statusEntries.map(([status, count]) => {
                    const pct = Math.round((count / stats.ordersCount) * 100) || 0;
                    return (
                      <div key={status}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="capitalize text-slate-600">
                            {status}
                          </span>
                          <span className="font-semibold text-slate-900">
                            {count}
                          </span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-100">
                          <div
                            className="h-2 rounded-full bg-[#1E1E1E]"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Recent orders */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <h2 className="text-sm font-semibold text-slate-900">
                  Recent orders
                </h2>
                <Link
                  to="/dashboard/orders"
                  className="text-xs font-medium text-slate-500 hover:text-slate-900"
                >
                  View all →
                </Link>
              </div>
              {(!stats.recentOrders || stats.recentOrders.length === 0) && (
                <div className="py-8 text-center text-sm text-slate-400">
                  No orders yet.
                </div>
              )}
              {stats.recentOrders?.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-left">
                    <thead className="bg-[#f7f3ee] text-slate-500 text-xs uppercase tracking-wide">
                      <tr>
                        <th className="px-5 py-3 font-semibold">Customer</th>
                        <th className="px-5 py-3 font-semibold">Items</th>
                        <th className="px-5 py-3 font-semibold">Total</th>
                        <th className="px-5 py-3 font-semibold">Status</th>
                        <th className="px-5 py-3 font-semibold">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {stats.recentOrders.map((o) => (
                        <tr key={o._id} className="hover:bg-slate-50/70">
                          <td className="px-5 py-3">
                            <div className="font-medium text-slate-900">
                              {o.userName || "Customer"}
                            </div>
                            <div className="text-xs text-slate-400 truncate max-w-[180px]">
                              {o.userEmail}
                            </div>
                          </td>
                          <td className="px-5 py-3 text-slate-600">
                            {o.itemsCount}
                          </td>
                          <td className="px-5 py-3 font-semibold text-slate-900">
                            {money(o.total)}
                          </td>
                          <td className="px-5 py-3">
                            <span
                              className={
                                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize " +
                                statusStyle(o.status)
                              }
                            >
                              {o.status || "pending"}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-xs text-slate-500">
                            {formatDate(o.date)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Overview;
