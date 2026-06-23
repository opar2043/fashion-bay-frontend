// src/Components/Category/CategoryData.jsx  (adjust path as you use)
import React from "react";
import { Link, useParams } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// helper: primary image
const getPrimaryImage = (pro) => {
  if (Array.isArray(pro?.images) && pro.images[0]) return pro.images[0];
  if (Array.isArray(pro?.image) && pro.image[0]) return pro.image[0];
  return pro?.featured_image || "";
};

// helper: display label under circle
const getLabel = (pro) => {
  if (pro?.subcategory) return pro.subcategory;
  if (Array.isArray(pro?.name)) return pro.name[0];
  return pro?.name || "View";
};

const CategoryData = () => {
  const [products] = useProducts();
  const params = useParams();
  const urlCategory = params?.category;

  // Dresses by default if no param
  const targetCategory = urlCategory || "Dresses";

  const categoryProducts = (products || []).filter((p) =>
    (p.category || "").toLowerCase() === targetCategory.toLowerCase()
  );

 const shown = categoryProducts.slice(0, 12); 
//   const shown = urlCategory // limit if you want
 
  return (
    <section className="w-full bg-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* breadcrumb */}
        <div className="text-xs sm:text-sm text-gray-500 mb-2">
          <Link to="/" className="hover:underline">
            Home
          </Link>{" "}
          /{" "}
          <span className="capitalize text-gray-700">
            {targetCategory}
          </span>
        </div>

        {/* title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 capitalize">
          {targetCategory}
        </h1>

        {/* round slider like screenshot */}
        <Swiper
          modules={[Navigation]}
          navigation
          slidesPerView={2.2}
          spaceBetween={16}
          breakpoints={{
            640: { slidesPerView: 3.2, spaceBetween: 20 },
            1024: { slidesPerView: 5, spaceBetween: 28 },
            1280: { slidesPerView: 6, spaceBetween: 32 },
          }}
          className="!pb-10"
        >
          {shown.map((pro) => {
            const img = getPrimaryImage(pro);
            const label = getLabel(pro);
            const id = pro.id || pro._id;

            return (
              <SwiperSlide key={id}>
                <Link
                  to={`/view/${id}`}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full overflow-hidden bg-neutral-100 shadow-sm">
                    {img && (
                      <img
                        src={img}
                        alt={label}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <p className="text-sm sm:text-base font-medium text-gray-800 text-center">
                    {label}
                  </p>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default CategoryData;
