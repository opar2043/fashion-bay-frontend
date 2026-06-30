import React, { useState } from "react";
import { FiMail, FiTrash2, FiCheckCircle, FiPhone } from "react-icons/fi";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useMessages from "../../Hooks/useMessages";
import useAxios from "../../Hooks/useAxios";

const formatDate = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Messages = () => {
  const [messages = [], refetch, isLoading] = useMessages();
  const axiosSecure = useAxios();
  const [filter, setFilter] = useState("all"); // all | unread

  const unreadCount = messages.filter((m) => !m.read).length;

  const filtered = messages.filter((m) =>
    filter === "unread" ? !m.read : true
  );

  const toggleRead = (msg) => {
    axiosSecure
      .patch(`/messages/${msg._id}`, { read: !msg.read })
      .then(() => refetch());
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete message?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1E1E1E",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/messages/${id}`).then((res) => {
          if (res.data?.deletedCount > 0) {
            toast.success("Message deleted");
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#f9f7f4] px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
              Customer Messages
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Enquiries sent through the contact page.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                filter === "all"
                  ? "bg-[#1E1E1E] text-white"
                  : "bg-white border border-slate-200 text-slate-600"
              }`}
            >
              All ({messages.length})
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                filter === "unread"
                  ? "bg-[#1E1E1E] text-white"
                  : "bg-white border border-slate-200 text-slate-600"
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="bg-white border border-slate-200 rounded-2xl py-10 text-center text-sm text-slate-500">
            Loading messages…
          </div>
        )}

        {!isLoading && filtered.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl py-12 text-center">
            <p className="font-medium text-slate-700">No messages here.</p>
            <p className="mt-1 text-xs text-slate-400">
              Messages from the contact form will land in this inbox.
            </p>
          </div>
        )}

        {/* Message cards */}
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((msg) => (
            <div
              key={msg._id}
              className={`rounded-2xl border bg-white p-5 shadow-sm transition ${
                msg.read ? "border-slate-200" : "border-[#F6E0D9] ring-1 ring-[#F6E0D9]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#F6E0D9] text-sm font-semibold text-slate-900">
                      {(msg.name || "?").charAt(0).toUpperCase()}
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900 leading-tight">
                        {msg.name}
                      </p>
                      <p className="text-xs text-slate-500">{formatDate(msg.date)}</p>
                    </div>
                  </div>
                </div>
                {!msg.read && (
                  <span className="rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-semibold uppercase text-white">
                    New
                  </span>
                )}
              </div>

              <div className="mt-3 space-y-1 text-sm">
                <a
                  href={`mailto:${msg.email}`}
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
                >
                  <FiMail className="text-slate-400" /> {msg.email}
                </a>
                {msg.mobile && (
                  <p className="flex items-center gap-2 text-slate-600">
                    <FiPhone className="text-slate-400" /> {msg.mobile}
                  </p>
                )}
              </div>

              <p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-700 whitespace-pre-line">
                {msg.message}
              </p>

              <div className="mt-4 flex items-center justify-end gap-2">
                <button
                  onClick={() => toggleRead(msg)}
                  className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  <FiCheckCircle />
                  {msg.read ? "Mark unread" : "Mark read"}
                </button>
                <button
                  onClick={() => handleDelete(msg._id)}
                  className="inline-flex items-center gap-1 rounded-md border border-rose-100 bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-100"
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messages;
