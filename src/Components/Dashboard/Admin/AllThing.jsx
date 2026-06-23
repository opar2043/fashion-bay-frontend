import React from "react";
import {
  ShoppingBag,
  Users,
  DollarSign,
  BarChart3,
  TrendingUp,
  Instagram,
  Globe,
  MessageCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";

const AllThing = () => {
  // Dummy data – swap with API / hooks later
  const stats = {
    totalRevenue: 48250,
    monthlyRevenue: 12480,
    totalOrders: 312,
    avgOrderValue: 155,
    customers: 210,
    newCustomersThisMonth: 38,
  };

  const salesByCategory = [
    { name: "Dresses", percent: 38, revenue: 21580 },
    { name: "Abayas", percent: 21, revenue: 9720 },
    { name: "Co-ords", percent: 14, revenue: 6240 },
    { name: "Outerwear", percent: 10, revenue: 3980 },
    { name: "Accessories", percent: 8, revenue: 2710 },
    { name: "Loungewear", percent: 9, revenue: 3020 },
  ];

  const bestSellingProducts = [
    {
      name: "Catharine Floral Lace Maxi Dress",
      category: "Dresses",
      sold: 130,
    },
    {
      name: "Elegant Black Open Abaya",
      category: "Abayas",
      sold: 96,
    },
    {
      name: "Linen Relaxed Co-ord Set",
      category: "Co-ords",
      sold: 72,
    },
    {
      name: "Longline Trench Coat",
      category: "Outerwear",
      sold: 54,
    },
  ];

  const channels = [
    {
      name: "Website",
      icon: <Globe className="w-4 h-4" />,
      sessions: 8200,
      conversion: 2.4,
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-4 h-4" />,
      sessions: 5300,
      conversion: 1.9,
    },
    {
      name: "WhatsApp / DM",
      icon: <MessageCircle className="w-4 h-4" />,
      sessions: 1200,
      conversion: 4.1,
    },
  ];

  const nextActions = [
    "Restock best-selling sizes for Dresses and Abayas.",
    "Create a weekend bundle for Co-ords + Accessories.",
    "Promote limited edition pieces on Instagram Stories.",
    "Review abandoned carts and send reminder messages.",
  ];

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
          Business Overview
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Snapshot of how your clothing brand is performing.
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Total Revenue
            </p>
            <span className="w-8 h-8 rounded-full bg-slate-900/5 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-slate-700" />
            </span>
          </div>
          <p className="text-xl font-semibold text-slate-900">
            {formatCurrency(stats.totalRevenue)}
          </p>
          <p className="text-xs text-slate-500">
            This month:{" "}
            <span className="font-medium text-slate-800">
              {formatCurrency(stats.monthlyRevenue)}
            </span>
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Orders
            </p>
            <span className="w-8 h-8 rounded-full bg-slate-900/5 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-slate-700" />
            </span>
          </div>
          <p className="text-xl font-semibold text-slate-900">
            {stats.totalOrders}
          </p>
          <p className="text-xs text-slate-500">
            Avg order value:{" "}
            <span className="font-medium text-slate-800">
              {formatCurrency(stats.avgOrderValue)}
            </span>
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Customers
            </p>
            <span className="w-8 h-8 rounded-full bg-slate-900/5 flex items-center justify-center">
              <Users className="w-4 h-4 text-slate-700" />
            </span>
          </div>
          <p className="text-xl font-semibold text-slate-900">
            {stats.customers}
          </p>
          <p className="text-xs text-slate-500">
            New this month:{" "}
            <span className="font-medium text-slate-800">
              {stats.newCustomersThisMonth}
            </span>
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Trend
            </p>
            <span className="w-8 h-8 rounded-full bg-slate-900/5 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-slate-700" />
            </span>
          </div>
          <p className="text-xl font-semibold text-slate-900">+14%</p>
          <p className="text-xs text-slate-500">vs last month (revenue)</p>
        </div>
      </div>

      {/* Sales by category + Best sellers + Channels */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Sales by Category */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 xl:col-span-1">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-800">
              Sales by Category
            </h2>
            <BarChart3 className="w-4 h-4 text-slate-500" />
          </div>

          <div className="space-y-3">
            {salesByCategory.map((cat) => (
              <div key={cat.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700">
                    {cat.name}
                  </span>
                  <span className="text-slate-500">{cat.percent}% of sales</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-slate-900 rounded-full transition-all"
                    style={{ width: `${cat.percent}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  {formatCurrency(cat.revenue)} revenue
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Best Selling Products */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 xl:col-span-1">
          <h2 className="text-sm font-semibold text-slate-800 mb-3">
            Best-Selling Products
          </h2>
          <ul className="space-y-3">
            {bestSellingProducts.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start justify-between gap-3 border-b border-slate-100 pb-2 last:border-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-500">{item.category}</p>
                </div>
                <span className="text-xs font-semibold text-slate-800">
                  {item.sold} sold
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Channel Performance */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 xl:col-span-1">
          <h2 className="text-sm font-semibold text-slate-800 mb-3">
            Channel Performance
          </h2>
          <div className="space-y-2">
            {channels.map((ch) => (
              <div
                key={ch.name}
                className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
              >
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-slate-900/5 flex items-center justify-center text-slate-700">
                    {ch.icon}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {ch.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {ch.sessions.toLocaleString()} sessions
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">
                    {ch.conversion}%
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Conversion rate
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Next actions / summary */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-slate-600" />
            <h2 className="text-sm font-semibold text-slate-800">
              Priority Actions
            </h2>
          </div>
          <ul className="space-y-1.5">
            {nextActions.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-xs text-slate-600"
              >
                <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-slate-700" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-4 text-xs text-slate-600 leading-relaxed">
          <h3 className="text-sm font-semibold text-slate-800 mb-1">
            Business Snapshot
          </h3>
          <p>
            Your brand is performing strongly in{" "}
            <span className="font-semibold text-slate-900">Dresses</span> and{" "}
            <span className="font-semibold text-slate-900">Abayas</span>, with a
            healthy mix of new and returning customers. Use this overview to
            decide where to invest next: new drops, restocks, or campaigns on
            Instagram and WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AllThing;
