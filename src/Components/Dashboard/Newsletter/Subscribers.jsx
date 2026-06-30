import React, { useState } from "react";
import { FiMail, FiTrash2, FiDownload, FiSearch } from "react-icons/fi";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useNewsletter from "../../Hooks/useNewsletter";
import useAxios from "../../Hooks/useAxios";

const formatDate = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const Subscribers = () => {
  const [subscribers = [], refetch, isLoading] = useNewsletter();
  const axiosSecure = useAxios();
  const [search, setSearch] = useState("");

  const filtered = subscribers.filter((s) =>
    (s.email || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    Swal.fire({
      title: "Remove subscriber?",
      text: "This email will be removed from your mailing list.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1E1E1E",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/newsletter/${id}`).then((res) => {
          if (res.data?.deletedCount > 0) {
            toast.success("Subscriber removed");
            refetch();
          }
        });
      }
    });
  };

  const exportCsv = () => {
    if (!subscribers.length) return;
    const rows = [
      ["Email", "Subscribed On"],
      ...subscribers.map((s) => [s.email, s.date || ""]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#f9f7f4] px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
              Newsletter Subscribers
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Everyone who signed up for Fashion Bay updates.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#F6E0D9] px-4 py-1.5 text-sm font-semibold text-slate-900">
              <FiMail /> {subscribers.length} total
            </span>
            <button
              onClick={exportCsv}
              disabled={!subscribers.length}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              <FiDownload /> Export
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4 max-w-sm">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by email"
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-400"
          />
        </div>

        {/* Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          {isLoading && (
            <div className="py-10 text-center text-sm text-slate-500">
              Loading subscribers…
            </div>
          )}

          {!isLoading && filtered.length === 0 && (
            <div className="py-12 text-center">
              <p className="font-medium text-slate-700">No subscribers yet.</p>
              <p className="mt-1 text-xs text-slate-400">
                Signups from the footer form will appear here.
              </p>
            </div>
          )}

          {!isLoading && filtered.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-[#f7f3ee] text-slate-500 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="px-6 py-3 font-semibold">#</th>
                    <th className="px-6 py-3 font-semibold">Email</th>
                    <th className="px-6 py-3 font-semibold">Subscribed</th>
                    <th className="px-6 py-3 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((s, i) => (
                    <tr key={s._id} className="hover:bg-slate-50/70">
                      <td className="px-6 py-3 text-xs text-slate-500">{i + 1}</td>
                      <td className="px-6 py-3 font-medium text-slate-900">
                        {s.email}
                      </td>
                      <td className="px-6 py-3 text-slate-500">
                        {formatDate(s.date)}
                      </td>
                      <td className="px-6 py-3 text-right">
                        <button
                          onClick={() => handleDelete(s._id)}
                          className="inline-flex items-center gap-1 rounded-md border border-rose-100 bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-100"
                        >
                          <FiTrash2 /> Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Subscribers;
