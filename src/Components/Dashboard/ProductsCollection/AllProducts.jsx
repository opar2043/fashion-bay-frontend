import React, { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";

const getPriceNumber = (price) => {
  if (typeof price === "number") return price;
  if (Array.isArray(price)) return Number(price[0] || 0);
  if (price && typeof price === "object") {
    if (price.$numberInt) return Number(price.$numberInt);
    if (price.$numberDecimal) return Number(price.$numberDecimal);
  }
  return 0;
};

const AllProducts = () => {
  // const [products, setProducts] = useState([]);
  const [products, refetch] = useProducts();
  const axiosSecure = useAxios();

  // useEffect(() => {
  //   fetch("/products.json")
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data || []));
  // }, []);



  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Delete this product?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e11d48",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, delete it",
      });

      if (!result.isConfirmed) return;

      const res = await axiosSecure.delete(`/products/${id}`);

      // ✅ typical pattern: res.data.deletedCount
      if (res?.data?.deletedCount > 0) {
        // remove from UI

        Swal.fire({
          title: "Deleted!",
          text: "Product has been removed.",
          icon: "success",
          timer: 1200,
          showConfirmButton: false,
        });

        refetch();
      } else {
        Swal.fire({
          title: "Error",
          text: "Could not delete the product.",
          icon: "error",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Something went wrong.",
        icon: "error",
      });
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-lg shadow-sm p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">All Products</h2>
          <p className="text-sm text-slate-500">
            Manage your clothing catalog: edit details or remove items.
          </p>
        </div>
        <p className="text-xs text-slate-400">
          Total products:{" "}
          <span className="font-medium text-slate-600">{products?.length}</span>
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-[#F9F6F2] text-slate-600">
              <th className="text-left px-3 py-2 font-medium">#</th>
              <th className="text-left px-3 py-2 font-medium">Product</th>
              <th className="text-left px-3 py-2 font-medium">Category</th>
              <th className="text-left px-3 py-2 font-medium">Price</th>
              <th className="text-left px-3 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products?.map((product, idx) => {
                const img =
                  Array.isArray(product.images) && product.images.length > 0
                    ? product.images[0]
                    : "";

                const priceNumber = getPriceNumber(product.price);

                return (
                  <tr
                    key={product.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
                  >
                    <td className="px-3 py-2 text-slate-500 align-middle">
                      {idx + 1}
                    </td>

                    {/* Product cell (image + name) */}
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-3">
                        {img && (
                          <img
                            src={img}
                            alt={product.name}
                            className="w-12 h-16 object-cover rounded-md border border-slate-100 bg-slate-50"
                          />
                        )}
                        <div>
                          <p className="font-medium text-slate-900 line-clamp-2">
                            {product.name}
                          </p>
                          {product.id && (
                            <p className="text-xs text-slate-400 mt-0.5">
                              ID: {product.id}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-3 py-2 align-middle">
                      <span className="inline-flex items-center px-2.5 py-1 text-xs rounded bg-slate-50 text-slate-700 border border-slate-100">
                        {product.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-3 py-2 align-middle text-slate-800">
                      {product.currency === "USD" ? "$" : "£"}
                      {priceNumber.toFixed(2)}
                    </td>

                    {/* Actions */}
                    <td className="px-3 py-2 align-middle">
                      <div className="flex items-center gap-2">
                        <Link to={`/dashboard/edit-product/${product._id}`}>
                          <button
                            
                            className="px-3 py-1.5 text-xs rounded border border-slate-200 text-slate-700 hover:bg-[#F9F6F2] transition-colors"
                          >
                            Edit
                          </button>
                        </Link>

                        

                        <button
                          onClick={() => handleDelete(product._id)}
                          className="px-3 py-1.5 text-xs rounded border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

            {products?.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-3 py-6 text-center text-sm text-slate-400"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
