import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";
import CategoryInnerCard from "./CategoryInnerCard";
import ProductCard from "../ProductCard";


// Convert to slug, similar to your Navbar/CategoryProduct slug logic
const slugify = (s = "") =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const CategoryInner = () => {
  const { cat1, cat2 } = useParams();
  const [products] = useProducts();

  // Title (Occasion → Party)
  const readableCat1 = cat1?.replace(/-/g, " ") || "";
  const readableCat2 = cat2?.replace(/-/g, " ") || "";

  /* ==========================================================
     FILTERING LOGIC:
     Each product can have:
       - p.occasion
       - p.length
       - p.season
       - p.color
     You match cat1 → which field 
              cat2 → which value
  ========================================================== */

const filtered = useMemo(() => {
  if (!cat2) return [];

  const value = slugify(cat2); // normalize → "champagne", "women", "satin"

  return (products || []).filter((p) => {
    const fields = [
      "audience",
      "category",
      "color",
      "materials",
      "size",
      "slug",
      "name"
    ];

    return fields.some((field) => {
      const data = p[field];
      if (!data) return false;

      // Array fields
      if (Array.isArray(data)) {
        return data.map((x) => slugify(x)).includes(value);
      }

      // String fields
      if (typeof data === "string") {
        return slugify(data) === value;
      }

      return false;
    });
  });
}, [products, cat2]);


console.log(products);

console.log("Filtered Products:", filtered);

  return (
    <section className="w-full bg-white py-8">
      <div className="max-w-6xl mx-auto px-4">

        {/* Breadcrumb */}
        <div className="text-xs sm:text-sm text-gray-500 mb-2">
          <Link to="/" className="hover:underline">Home</Link> /
          <Link to="/dresses" className="hover:underline mx-1">Dresses</Link> /
          <span className="capitalize">{readableCat1}</span> /
          <span className="capitalize ml-1 text-gray-700">{readableCat2}</span>
        </div>

        {/* Page Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 capitalize">
          {readableCat2} {readableCat1} Dresses
        </h1>

        {/* Product Grid */}
        {filtered.length > 0 ? (
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {filtered.map((product) => (
            //   <CategoryInnerCard key={product._id || product.id} product={product} />
              <ProductCard key={product._id || product.id} pro={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 py-10">
            No products found for <strong>{readableCat2}</strong> {readableCat1}.
          </p>
        )}
      </div>
    </section>
  );
};

export default CategoryInner;
