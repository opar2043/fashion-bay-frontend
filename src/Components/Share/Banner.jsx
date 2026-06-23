import React from "react";

const Banner = ({ ban, alt = "Banner image" }) => {
  return (
    <section
      className="
        relative w-full 
        h-[220px]           /* very small devices */
        sm:h-[300px]       /* small screens (mobile landscape / small tab) */
        md:h-[420px]       /* tablets */
        lg:h-[520px]       /* desktops */
        xl:h-[680px]       /* large desktops */
        2xl:h-[760px]
        bg-[#F9F6F2]
        overflow-hidden
      "
    >
      <img
        src={ban}
        alt={alt}
        className="w-full h-full object-cover object-center"
        loading="eager"
      />
    </section>
  );
};

export default Banner;
