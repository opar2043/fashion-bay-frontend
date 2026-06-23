import React, { useState } from "react";
import useUser from "../../Hooks/useUser";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Users = () => {
  const [users = [], refetch, isLoading] = useUser();
  const axiosSecure = useAxios();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  if (isLoading) {
    return (
      <div className="bg-white border border-slate-100 rounded-lg shadow-sm p-6 text-center text-slate-500">
        Loading users...
      </div>
    );
  }

  const filteredUsers = users.filter((user) => {
    const name = user?.name?.toLowerCase() || "";
    const email = user?.email?.toLowerCase() || "";
    const role = user?.role || "";
    const term = searchTerm.toLowerCase();

    const matchesSearch = name.includes(term) || email.includes(term);
    const matchesRole = filterRole === "all" || role === filterRole;

    return matchesSearch && matchesRole;
  });

  const handleRoleUpdate = (id, currentRole) => {
    const newRole = currentRole === "customer" ? "admin" : "customer";

    Swal.fire({
      title: "Are you sure?",
      text: `Change role to ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/${id}`, { role: newRole })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              toast.success(`User role updated to ${newRole}`);
              refetch();
            } else {
              toast.error("No changes made.");
            }
          })
          .catch(() => {
            Swal.fire({
              title: "Something went wrong",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="bg-white border border-slate-100 rounded-lg shadow-sm p-4 md:p-6">
      {/* Header + controls */}
      <div className="flex flex-col gap-3 mb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Users</h2>
          <p className="text-sm text-slate-500">
            Manage user roles and contact details.
          </p>
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 whitespace-nowrap">
              Total users:
            </span>
            <span className="text-xs font-medium text-slate-600">
              {users.length}
            </span>
          </div>

          {/* 🔍 Search (forced white bg) */}
          <input
            type="text"
            placeholder="Search by name or email"
            className="w-full md:w-48 border border-slate-200 rounded px-2 py-1 text-xs outline-none bg-white text-slate-900 placeholder:text-slate-500 focus:border-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* 🎚 Role filter (forced white bg) */}
          <select
            className="w-full md:w-32 border border-slate-200 rounded px-2 py-1 text-xs outline-none bg-white text-slate-900 focus:border-slate-400"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="all">All roles</option>
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-[#F9F6F2] text-slate-600">
              <th className="px-3 py-2 text-left font-medium">#</th>
              <th className="px-3 py-2 text-left font-medium">Name</th>
              <th className="px-3 py-2 text-left font-medium">Number</th>
              <th className="px-3 py-2 text-left font-medium">Email</th>
              <th className="px-3 py-2 text-left font-medium">Role</th>
              <th className="px-3 py-2 text-left font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, idx) => {
              const id = user._id || user.id;
              return (
                <tr
                  key={id}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
                >
                  <td className="px-3 py-2 text-slate-500">{idx + 1}</td>
                  <td className="px-3 py-2 font-medium text-slate-800">
                    {user.name || "-"}
                  </td>
                  <td className="px-3 py-2 text-slate-600">
                    {user.number || "-"}
                  </td>
                  <td className="px-3 py-2 text-slate-600">
                    {user.email || "-"}
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={
                        "inline-flex items-center px-2.5 py-1 text-xs rounded " +
                        (user.role === "admin"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                          : "bg-slate-50 text-slate-700 border border-slate-100")
                      }
                    >
                      {user.role === "admin" ? "Admin" : "Customer"}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <button
                      onClick={() => handleRoleUpdate(id, user.role)}
                      className="inline-flex items-center px-3 py-1.5 text-xs rounded border border-slate-200 text-slate-700 hover:bg-[#F9F6F2] transition-colors"
                    >
                      {user.role === "admin" ? "Make Customer" : "Make Admin"}
                    </button>
                  </td>
                </tr>
              );
            })}

            {filteredUsers.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-3 py-6 text-center text-sm text-slate-400"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
