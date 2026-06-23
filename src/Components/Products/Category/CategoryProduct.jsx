import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import ProductCard from "../ProductCard";
import useProducts from "../../Hooks/useProducts";


// Helpers: safely handle Mongo-style numbers
const getPriceNumber = (price) => {
  if (typeof price === "number") return price;
  if (Array.isArray(price)) return Number(price[0] || 0);
  if (price && typeof price === "object") {
    if (price.$numberInt) return Number(price.$numberInt);
    if (price.$numberDecimal) return Number(price.$numberDecimal);
  }
  return 0;
};

const getRatingNumber = (rating) => {
  if (typeof rating === "number") return rating;
  if (rating && typeof rating === "object" && rating.$numberInt) {
    return Number(rating.$numberInt);
  }
  return 0;
};

const getPrimaryColor = (product) => {
  if (Array.isArray(product.color) && product.color.length > 0)
    return product.color[0];
  if (typeof product.color === "string") return product.color;
  return null;
};

// same slug logic as your Navbar (but without leading "/")
const slugifyCategory = (s = "") =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const CategoryProduct = () => {
  const [expandedFilter, setExpandedFilter] = useState(null);
  const [activeFilters, setActiveFilters] = useState({});
  const [sortBy, setSortBy] = useState("recommended");
  // const [products, setProducts] = useState([]);
  const { category } = useParams(); // e.g. "dresses", "trousers"
  const [products , refetch] = useProducts()


  console.log(products);

  // ✅ First, scope products by category slug from URL
  const categoryProducts = useMemo(() => {
    if (!category) return products;

    const param = category.toLowerCase();
    return products.filter((p) => {
      const catName = (p.category || "").toString();
      const catSlug = slugifyCategory(catName);
      // match either by slug ("dresses") or raw name ("Dresses")
      return catSlug === param || catName.toLowerCase() === param;
    });
  }, [products, category]);

  console.log(categoryProducts);

  const colorMap = {
    Brown: "#8B6F47",
    Black: "#000000",
    Ivory: "#FFFFF0",
    Sage: "#9DC183",
    Burgundy: "#800020",
    Navy: "#001F3F",
    "Dusty Pink": "#D8A5A5",
    Champagne: "#F7E7CE",
    Beige: "#D9C4A3",
    Mocha: "#7B5B44",
    Stone: "#CBC4B3",
    Cream: "#F5F1E6",
    White: "#FFFFFF",
    Emerald: "#006C5B",
  };

  // ✅ Build filters based on categoryProducts (not all products)
  const filterData = useMemo(() => {
    const allColors = [
      ...new Set(
        categoryProducts
          .map((p) => getPrimaryColor(p))
          .filter((c) => c && typeof c === "string")
      ),
    ];

    return {
      availability: {
        label: "Availability",
        items: [
          { name: "In Stock", count: categoryProducts.length },
          { name: "Out of Stock", count: 0 },
        ],
      },
      price: {
        label: "Price",
        items: [
          {
            name: "£0 - £80",
            count: categoryProducts.filter(
              (p) => getPriceNumber(p.price) < 80
            ).length,
          },
          {
            name: "£80 - £120",
            count: categoryProducts.filter((p) => {
              const val = getPriceNumber(p.price);
              return val >= 80 && val <= 120;
            }).length,
          },
          {
            name: "£120+",
            count: categoryProducts.filter(
              (p) => getPriceNumber(p.price) > 120
            ).length,
          },
        ],
      },
      color: {
        label: "Color",
        items: allColors.map((color) => ({
          name: color,
          count: categoryProducts.filter(
            (p) => getPrimaryColor(p) === color
          ).length,
          colorCode: colorMap[color],
        })),
      },
      size: {
        label: "Size",
        items: ["XS", "S", "M", "L", "XL"].map((size) => ({
          name: size,
          count: categoryProducts.filter((p) => {
            const sizesArr = Array.isArray(p.size)
              ? p.size
              : p.size
              ? [p.size]
              : [];
            return sizesArr.includes(size);
          }).length,
        })),
      },
    };
  }, [categoryProducts, colorMap]);

  // ✅ Apply filters & sorting on top of categoryProducts
  const filteredProducts = useMemo(() => {
    let result = [...categoryProducts];

    // Color filter
    if (activeFilters.color && activeFilters.color.length > 0) {
      result = result.filter((p) =>
        activeFilters.color.includes(getPrimaryColor(p))
      );
    }

    // Size filter
    if (activeFilters.size && activeFilters.size.length > 0) {
      result = result.filter((p) => {
        const sizesArr = Array.isArray(p.size)
          ? p.size
          : p.size
          ? [p.size]
          : [];
        return activeFilters.size.some((size) =>
          sizesArr.includes(size)
        );
      });
    }

    // Availability (for now, “In Stock” = all)
    if (activeFilters.availability && activeFilters.availability.length > 0) {
      if (activeFilters.availability.includes("In Stock")) {
        result = result.filter(() => true);
      }
    }

    // Price filter (simple ranges matching labels)
    if (activeFilters.price && activeFilters.price.length > 0) {
      result = result.filter((p) => {
        const val = getPriceNumber(p.price);
        return activeFilters.price.some((label) => {
          if (label === "£0 - £80") return val < 80;
          if (label === "£80 - £120") return val >= 80 && val <= 120;
          if (label === "£120+") return val > 120;
          return true;
        });
      });
    }

    // Sort
    if (sortBy === "price-low") {
      result.sort(
        (a, b) => getPriceNumber(a.price) - getPriceNumber(b.price)
      );
    } else if (sortBy === "price-high") {
      result.sort(
        (a, b) => getPriceNumber(b.price) - getPriceNumber(a.price)
      );
    } else if (sortBy === "rating") {
      result.sort(
        (a, b) => getRatingNumber(b.rating) - getRatingNumber(a.rating)
      );
    }

    return result;
  }, [categoryProducts, activeFilters, sortBy]);

  const handleFilterChange = (filterKey, itemName) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterKey]: prev[filterKey]?.includes(itemName)
        ? prev[filterKey].filter((i) => i !== itemName)
        : [...(prev[filterKey] || []), itemName],
    }));
  };

  const handleReset = () => {
    setActiveFilters({});
    setSortBy("recommended");
  };

  // 🔤 Display title: use category name or default
  const displayCategoryName =
    categoryProducts[0]?.category ||
    (category ? category.replace(/-/g, " ") : "Our Collection");

  // Small dropdown component for the top bar
  const TopFilterDropdown = ({ filterKey, data }) => {
    const isOpen = expandedFilter === filterKey;

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() =>
            setExpandedFilter(isOpen ? null : filterKey)
          }
          className="flex items-center gap-1 text-sm font-semibold text-gray-800 border border-gray-200 rounded-full px-3 py-1.5 hover:border-black hover:bg-gray-50 transition"
        >
          <span>{data.label}</span>
          <ChevronDown
            size={16}
            className={`transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-30 p-3"
          >
            <div className="space-y-2">
              {data.items.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() =>
                    handleFilterChange(filterKey, item.name)
                  }
                  className="flex items-center justify-between w-full text-left text-sm text-gray-800 hover:bg-gray-50 rounded-md px-2 py-1.5"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      readOnly
                      checked={
                        activeFilters[filterKey]?.includes(
                          item.name
                        ) || false
                      }
                      className="w-4 h-4 accent-black"
                    />
                    <span>{item.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {filterKey === "color" && item.colorCode && (
                      <span
                        className="inline-block w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: item.colorCode }}
                      />
                    )}
                    <span className="text-xs text-gray-500">
                      ({item.count})
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Top title / count */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 capitalize">
            {displayCategoryName
              ? `Shop ${displayCategoryName}`
              : "Shop Our Collection"}
          </h1>
          <p className="text-sm text-gray-600">
            {Object.values(activeFilters).flat().length > 0
              ? `Showing ${filteredProducts.length} of ${categoryProducts.length} items`
              : `Showing all ${categoryProducts.length} items`}
          </p>
        </div>

        {/* FILTER BAR */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-8 border-b border-gray-200 pb-4">
          {/* Left: filters */}
          <div className="flex flex-wrap gap-3">
            {Object.entries(filterData).map(([key, data]) => (
              <TopFilterDropdown
                key={key}
                filterKey={key}
                data={data}
              />
            ))}
          </div>

          {/* Right: sort + reset */}
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm font-semibold border border-gray-200 rounded-full px-3 py-1.5 bg-white text-gray-800"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">
                Price: High to Low
              </option>
              <option value="rating">Highest Rated</option>
            </select>

            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-gray-500 underline underline-offset-2 hover:text-gray-800"
            >
              Reset all
            </button>
          </div>
        </div>

        {/* Cards grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                pro={product}
                index={idx}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg font-semibold text-gray-700">
              No products found in  <span className="text-red-500">{category}</span> category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProduct;
