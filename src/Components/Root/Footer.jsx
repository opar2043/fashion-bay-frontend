// src/Components/Root/Footer.jsx
import { useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { FiSend } from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import img from "../../assets/logo2.svg";
import useAxios from "../Hooks/useAxios";

const shopLinks = [
  { label: "New In", to: "/dresses/new-in" },
  { label: "Dresses", to: "/dresses" },
  { label: "Abayas", to: "/dresses/abayas" },
  { label: "Best Sellers", to: "/dresses/best-sellers" },
  { label: "Sale", to: "/dresses/sale" },
];

const companyLinks = [
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "FAQ", to: "/faq" },
  { label: "Refund Policy", to: "/policy" },
  { label: "Lookbook", to: "/dresses/lookbook" },
];

const Footer = () => {
  const axiosSecure = useAxios();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await axiosSecure.post("/newsletter", { email });
      if (res.data?.already) {
        toast.info("You're already subscribed 💌");
      } else {
        toast.success("Thanks for subscribing!");
      }
      setEmail("");
    } catch {
      toast.error("Subscription failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const socialBtn =
    "h-9 w-9 flex items-center justify-center rounded-full border border-[#303030] hover:bg-[#303030] hover:text-white transition-colors";

  return (
    <footer className="bg-[#F9F6F2] mt-16 border-t border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-3">
              <img src={img} alt="Fashion Bay" className="h-11 w-11 rounded-full" />
              <span className="text-xl font-extrabold uppercase tracking-[0.3em] text-[#1D1E20]">
                Fashion Bay
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-600">
              Today's trusted UK clothing brand — delivering quality, comfort,
              and style tailored for everyday life.
            </p>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-[#1D1E20]">
                Join our newsletter
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Get early access to drops & exclusive offers.
              </p>
              <form
                onSubmit={handleSubscribe}
                className="mt-3 flex w-full max-w-sm overflow-hidden rounded-lg border border-slate-300 bg-white"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-1 bg-[#F6E0D9] px-4 text-sm font-semibold text-slate-900 hover:bg-[#e7c9c0] transition-colors disabled:opacity-60"
                >
                  <FiSend />
                  <span className="hidden sm:inline">
                    {loading ? "…" : "Subscribe"}
                  </span>
                </button>
              </form>
            </div>
          </div>

          {/* Shop links */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#1D1E20]">
              Shop
            </h3>
            <ul className="mt-4 space-y-2.5">
              {shopLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-gray-600 hover:text-rose-500 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#1D1E20]">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-gray-600 hover:text-rose-500 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + contact */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#1D1E20]">
              Follow us
            </h3>
            <div className="mt-4 flex items-center gap-3 text-[#303030]">
              <a href="mailto:rijoanrashidopar@gmail.com" className={socialBtn}>
                <SiGmail size={14} />
              </a>
              <a
                href="https://www.instagram.com/opar2043"
                target="_blank"
                rel="noopener noreferrer"
                className={socialBtn}
              >
                <FaInstagram size={14} />
              </a>
              <a
                href="https://www.tiktok.com/@opar2043"
                target="_blank"
                rel="noopener noreferrer"
                className={socialBtn}
              >
                <FaTiktok size={14} />
              </a>
            </div>
            <Link
              to="/contact"
              className="mt-5 inline-block rounded-lg bg-[#F6E0D9] px-4 py-2 text-xs font-semibold text-slate-900 hover:bg-[#e7c9c0] shadow hover:shadow-md transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Company registration info */}
        <div className="mt-10 grid grid-cols-1 gap-2 border-t border-black/10 pt-6 text-xs text-gray-500 sm:grid-cols-3">
          <p>
            Company Registration No:{" "}
            <span className="font-medium text-gray-600">16811123</span>
          </p>
          <p>
            Email:{" "}
            <span className="font-medium text-gray-600">
              rijoanrashidopar@gmail.com
            </span>
          </p>
          <p className="sm:text-right">Registered in England &amp; Wales.</p>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-black/10 py-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-slate-900">Fashion Bay</span>. All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
