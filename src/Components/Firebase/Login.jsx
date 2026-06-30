import { useNavigate, Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FiMail, FiEye } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { handleLogin, handleGoogle, resetPass } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxios();
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();

  // Sends admins/owners straight to the dashboard, everyone else home.
  const redirectByRole = async (email) => {
    try {
      const res = await axiosSecure.get("/users");
      const me = (res.data || []).find((u) => u.email === email);
      const isAdmin = me?.role === "admin" || me?.role === "owner";
      navigate(isAdmin ? "/dashboard" : "/");
    } catch {
      navigate("/");
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    handleLogin(email, password)
      .then(async () => {
        toast.success("Logged in successfully!");
        await redirectByRole(email);
      })
      .catch((error) => {
        Swal.fire({
          title: "Login Failed",
          text: error.message || "Something went wrong.",
          icon: "error",
          confirmButtonColor: "#EAB308",
        });
      });
  };

  // Optional: inline forget password flow
  function handleForget() {
    const email = emailRef.current.value;
    if (!email) {
      Swal.fire({ title: "Please enter your email address", icon: "warning" });
      return;
    }
    resetPass(email)
      .then(() => {
        Swal.fire({ title: "Please check your email", icon: "success" });
      })
      .catch((error) => {
        Swal.fire({ title: error.message, icon: "error" });
      });
  }

  function handleGoogleAccount() {
    handleGoogle()
      .then((res) => {
        const userInfo = {
          name: res.user.displayName,
          email: res.user.email,
          photo: res.user.photoURL,
          role: "customer",
        };

        axiosSecure.post("/users", userInfo).then(async () => {
          toast.success("Signed in with Google!");
          await redirectByRole(res.user.email);
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Google Sign-In Failed",
          text: err.message || "Something went wrong.",
          icon: "error",
          confirmButtonColor: "#EAB308",
        });
      });
  }

  return (
    <section className="min-h-[75vh] my-12 flex items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-xl px-4"
      >
        <h1 className="text-center text-2xl tracking-wide my-8 text-slate-900">
          SIGN IN
        </h1>

        <form className="space-y-5" onSubmit={handleSignIn}>
          {/* Email */}
          <div className="relative">
            <input
              name="email"
              type="email"
              placeholder="Email address"
              className="w-full border border-slate-300 px-4 py-3 pr-12 outline-none bg-white text-slate-900 placeholder:text-slate-500"
              ref={emailRef}
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

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 font-semibold text-slate-900"
            style={{ backgroundColor: "#F6E0D9" }}
          >
            Sign In
          </button>

          {/* Row: Forgot + Sign up */}
          <div className="flex items-center justify-between text-sm">
            {/* Option 1: route to page */}
            <Link to="/forgot-password" className="underline text-slate-900">
              Forgot password
            </Link>

            {/* Option 2: inline reset (uncomment to use instead) */}
            {/* <button
              type="button"
              onClick={handleForget}
              className="underline text-slate-900"
            >
              Forgot password
            </button> */}

            <Link to="/register" className="underline text-slate-900">
              Sign up
            </Link>
          </div>


        </form>
      </motion.div>
    </section>
  );
};

export default Login;
