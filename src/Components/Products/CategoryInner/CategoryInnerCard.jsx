import React from "react";
import { Link } from "react-router-dom";

const getPrimaryImage = (pro) => {
  if (Array.isArray(pro.images) && pro.images[0]) return pro.images[0];
  if (Array.isArray(pro.image) && pro.image[0]) return pro.image[0];
  return pro.featured_image || "";
};

const CategoryInnerCard = ({ product }) => {
  const img = getPrimaryImage(product);
  const id = product._id || product.id;

  return (
    <Link
      to={`/view/${id}`}
      className="flex flex-col border rounded-lg overflow-hidden hover:shadow-md transition bg-white"
    >
      <div className="w-full h-64 bg-neutral-100">
        {img && (
          <img
            src={img}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
      </div>

      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
          {product.name}
        </h3>

        {product.price && (
          <p className="text-sm text-gray-600 mt-1">
            £{Array.isArray(product.price) ? product.price[0] : product.price}
          </p>
        )}
      </div>
    </Link>
  );
};

export default CategoryInnerCard;
