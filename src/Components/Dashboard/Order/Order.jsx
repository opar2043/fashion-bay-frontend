import React, { useState } from "react";
import useOrder from "../../Hooks/useOrder";

const formatDate = (iso) => {
  if (!iso) return "N/A";
  const d = new Date(iso);
  return d.toLocaleString(); // e.g. 02/12/2025, 12:38 PM
};

const formatMoney = (num) => `£${Number(num || 0).toFixed(2)}`;

const statusClasses = (status) => {
  switch ((status || "").toLowerCase()) {
    case "paid":
    case "completed":
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    case "cancelled":
    case "canceled":
      return "bg-rose-50 text-rose-700 border-rose-100";
    default:
      return "bg-amber-50 text-amber-700 border-amber-100"; // pending / default
  }
};

const Order = () => {
  const [orders, refetch, isLoading] = useOrder();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const openModal = (order) => setSelectedOrder(order);
  const closeModal = () => setSelectedOrder(null);

  return (
    <div className="min-h-screen bg-[#f9f7f4] px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
              Orders
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              View and manage your customer orders.
            </p>
          </div>
          <div className="text-sm text-slate-500">
            Total orders:{" "}
            <span className="font-semibold text-slate-900">
              {orders?.length || 0}
            </span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          {/* Loading */}
          {isLoading && (
            <div className="py-10 flex items-center justify-center text-sm text-slate-500">
              Loading orders...
            </div>
          )}

          {/* Empty */}
          {!isLoading && (!orders || orders.length === 0) && (
            <div className="py-10 flex flex-col items-center justify-center text-sm text-slate-500">
              <p className="font-medium text-slate-700">
                No orders have been placed yet.
              </p>
              <p className="mt-1 text-xs text-slate-400">
                When customers complete checkout, their orders will appear here.
              </p>
            </div>
          )}

          {/* Table */}
          {!isLoading && orders && orders.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-[#f7f3ee] text-slate-500 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="px-6 py-3 font-semibold">#</th>
                    <th className="px-6 py-3 font-semibold">Customer</th>
                    <th className="px-6 py-3 font-semibold">City</th>
                    <th className="px-6 py-3 font-semibold">Total</th>
                    <th className="px-6 py-3 font-semibold">Status</th>
                    <th className="px-6 py-3 font-semibold">Date</th>
                    <th className="px-6 py-3 font-semibold text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((order, index) => {
                    const firstItem = order.items?.[0];
                    return (
                      <tr
                        key={order._id}
                        className="hover:bg-slate-50/70 transition-colors"
                      >
                        <td className="px-6 py-3 align-middle text-xs text-slate-500">
                          {index + 1}
                        </td>

                        {/* Customer */}
                        <td className="px-6 py-3 align-middle">
                          <div className="flex flex-col">
                            <span className="font-medium text-slate-900 text-sm">
                              {order.userName || "Customer"}
                            </span>
                            <span className="text-xs text-slate-500 mt-0.5 truncate max-w-[220px]">
                              {order.userEmail || "No email"}
                            </span>
                            {firstItem && (
                              <span className="text-[11px] text-slate-400 mt-0.5">
                                {firstItem.name}{" "}
                                {order.items.length > 1
                                  ? `+${order.items.length - 1} more`
                                  : ""}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* City */}
                        <td className="px-6 py-3 align-middle text-sm text-slate-900">
                          {order.city || "N/A"}
                        </td>

                        {/* Total */}
                        <td className="px-6 py-3 align-middle">
                          <span className="font-semibold text-slate-900">
                            {formatMoney(order.total)}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-3 align-middle">
                          <span
                            className={
                              "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium " +
                              statusClasses(order.status)
                            }
                          >
                            {order.status || "pending"}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-3 align-middle text-xs text-slate-500 whitespace-nowrap">
                          {formatDate(order.date)}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-3 align-middle text-right">
                          <button
                            type="button"
                            onClick={() => openModal(order)}
                            className="inline-flex items-center rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-300"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full mx-4 border border-slate-200">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Order details
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  TRX ID: {selectedOrder.transactionId || "N/A"}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-xs text-slate-500 hover:text-slate-900"
              >
                ✕
              </button>
            </div>

            <div className="px-5 py-4 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Top info grid */}
              <div className="grid gap-4 md:grid-cols-2 text-sm">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                    Customer
                  </h3>
                  <p className="text-slate-900 font-medium">
                    {selectedOrder.userName || "Customer"}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {selectedOrder.userEmail || "No email"}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Phone: {selectedOrder.phone || "N/A"}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                    Shipping
                  </h3>
                  <p className="text-sm text-slate-900">
                    {selectedOrder.city || "N/A"}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 whitespace-pre-line">
                    {selectedOrder.address || "No address provided"}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Date: {formatDate(selectedOrder.date)}
                  </p>
                </div>
              </div>

              {/* Items */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                  Items
                </h3>
                <div className="border border-slate-100 rounded-xl divide-y divide-slate-100">
                  {selectedOrder.items?.map((item, idx) => {
                    const qty = Number(item.quantity) || 1;
                    const price = Number(item.price) || 0;
                    const lineTotal = qty * price;
                    return (
                      <div
                        key={idx}
                        className="flex gap-3 px-3 py-3 bg-slate-50/40"
                      >
                        <div className="h-12 w-12 rounded-md overflow-hidden bg-slate-200 flex-shrink-0">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Size: {item.size || "N/A"} · Color:{" "}
                            {item.color || "N/A"}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            Qty: {qty} × {formatMoney(price)}
                          </p>
                        </div>
                        <div className="text-sm font-semibold text-slate-900">
                          {formatMoney(lineTotal)}
                        </div>
                      </div>
                    );
                  })}
                  {!selectedOrder.items?.length && (
                    <div className="px-3 py-3 text-xs text-slate-400">
                      No items found for this order.
                    </div>
                  )}
                </div>
              </div>

              {/* Payment summary */}
              <div className="border-t border-slate-100 pt-4 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>{formatMoney(selectedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600 mt-1">
                  <span>Tax</span>
                  <span>{formatMoney(selectedOrder.tax)}</span>
                </div>
                <div className="flex justify-between mt-3 pt-2 border-t border-slate-100">
                  <span className="font-semibold text-slate-900">Total</span>
                  <span className="font-semibold text-slate-900">
                    {formatMoney(selectedOrder.total)}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-5 py-3 flex justify-end border-t border-slate-100">
              <button
                onClick={closeModal}
                className="text-xs sm:text-sm px-4 py-1.5 rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
