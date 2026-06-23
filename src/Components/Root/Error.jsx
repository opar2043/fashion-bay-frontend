import React from "react";
import { Link, useRouteError } from "react-router-dom";
import { FiHome, FiArrowLeftCircle } from "react-icons/fi";

const Error = () => {
  const error = useRouteError();

  const status =
    (error && (error.status || error.statusCode)) ||
    (error && error.response && error.response.status) ||
    404;

  const message =
    (error && (error.statusText || error.message)) ||
    "The page you’re looking for could not be found.";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F6F2] px-4">
      <div className="max-w-lg w-full text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 text-[12px] font-semibold tracking-wide text-slate-700 mb-4">
          OOPS, SOMETHING WENT WRONG
        </div>

        {/* Status code */}
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900">
          {status}
        </h1>

        {/* Title */}
        <h2 className="mt-3 text-2xl md:text-3xl font-semibold text-slate-900">
          This page is out of stock.
        </h2>

        {/* Message */}
        <p className="mt-3 text-sm md:text-base text-slate-600 leading-relaxed">
          {message}
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold shadow-sm hover:bg-black transition-colors duration-150"
          >
            <FiHome size={18} />
            Back to Home
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-slate-300 text-sm font-semibold text-slate-800 hover:bg-white hover:border-slate-400 transition-colors duration-150"
          >
            <FiArrowLeftCircle size={18} />
            Go Back
          </button>
        </div>

        {/* Small helper text */}
        <p className="mt-4 text-[12px] text-slate-500">
          If you typed the address manually, please check the spelling.  
          You can also return home and continue shopping.
        </p>
      </div>
    </div>
  );
};

export default Error;
