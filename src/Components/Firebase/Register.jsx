import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiEye, FiCalendar, FiChevronDown } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Register = () => {
  const { handleRegister } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxios();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const name = `${firstName} ${lastName}`.trim();
    const email = form.email.value;
    const password = form.password.value;
    const mobile = form.mobile.value;

    const userObj = {
      name,
      email,
      role: "customer",
      mobile,
    };

    handleRegister(email, password)
      .then(() => axiosSecure.post("/users", userObj))
      .then(() => {
        toast.success("Account created successfully!");
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          title: "Registration Failed",
          text: error.message || "Something went wrong.",
          icon: "error",
          confirmButtonColor: "#EAB308",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section className="min-h-[85vh] my-12 md:my-20 flex items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-xl px-6 md:px-12"
      >
        <h1 className="text-center text-2xl tracking-wide mb-8 text-slate-900">
          REGISTER
        </h1>

        <form className="space-y-5" onSubmit={handleSignUp}>
          {/* First / Last */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="firstName"
              type="text"
              placeholder="First Name"
              className="w-full border border-slate-300 px-4 py-3 outline-none bg-white text-slate-900 placeholder:text-slate-500"
            />
            <input
              name="lastName"
              type="text"
              placeholder="Last Name"
              className="w-full border border-slate-300 px-4 py-3 outline-none bg-white text-slate-900 placeholder:text-slate-500"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <input
              name="email"
              type="email"
              placeholder="Email address"
              className="w-full border border-slate-300 px-4 py-3 pr-12 outline-none bg-white text-slate-900 placeholder:text-slate-500"
              required
            />
            <FiMail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" />
          </div>
          {/* Email */}
          <div className="relative">
            <input
              name="mobile"
              type="text"
              placeholder="Mobile number"
              className="w-full border border-slate-300 px-4 py-3 pr-12 outline-none bg-white text-slate-900 placeholder:text-slate-500"
              required
            />
            <FiMail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border border-slate-300 px-4 py-3 pr-12 outline-none bg-white text-slate-900 placeholder:text-slate-500"
              required
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <FiEye className="text-slate-600" />
              <span className="block h-[2px] w-6 bg-slate-600 translate-y-[6px]" />
            </button>
          </div>

          {/* Birthday */}
          {/* <div className="relative">
            <input
              name="birthday"
              type="date"
              placeholder="Birthday"
              className="w-full border border-slate-300 px-4 py-3 pr-12 outline-none bg-white text-slate-900 placeholder:text-slate-500"
            />
            <FiCalendar className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" />
          </div> */}

          {/* Gender */}
          <div className="relative">
            <select
              name="gender"
              className="w-full appearance-none border border-slate-300 px-4 py-3 pr-10 outline-none bg-white text-slate-900"
              defaultValue="prefer-not"
            >
              <option value="prefer-not" className="text-slate-500">
                Gender
              </option>
              <option value="female" className="text-slate-900">
                Female
              </option>
              <option value="male" className="text-slate-900">
                Male
              </option>
              <option value="other" className="text-slate-900">
                Other
              </option>
            </select>
            <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" />
          </div>

          {/* Register button */}
          <button
            type="submit"
            className="w-full py-3 font-semibold text-slate-900"
            style={{ backgroundColor: "#F6E0D9" }}
            disabled={isLoading}
          >
            Register
          </button>

          {/* Terms */}
          <label className="flex items-start gap-2 text-sm text-slate-800">
            <input type="checkbox" name="agree" className="mt-1" />
            <span className="leading-6">
              I agree to the <span className="underline">Privacy Policy</span>{" "}
              and <span className="underline">Terms of Service</span>
            </span>
          </label>

          {/* Divider */}
          <div className="flex items-center gap-4 pt-2">
            <span className="h-[1px] flex-1 bg-slate-200" />
            <span className="text-sm text-slate-600">
              Al Ready Have an Account ?
            </span>
            <span className="h-[1px] flex-1 bg-slate-200" />
          </div>

          {/* Log in button */}
          <Link to="/login" className="font-semibold">
            <button
              type="button"
              className="w-full py-3 mt-4 font-semibold text-slate-900"
              style={{ backgroundColor: "#F6E0D9" }}
            >
              Log In
            </button>
          </Link>
        </form>
      </motion.div>
    </section>
  );
};

export default Register;
