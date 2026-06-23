import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "./firebase.config";
import useAxios from "../Hooks/useAxios";
import Swal from "sweetalert2";
import useProducts from "../Hooks/useProducts";
import useCart from "../Hooks/useCart";


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  const [quantities, setQuantities] = useState({});
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [cart , refetch] = useCart();




  // Register new user
  const handleRegister = (email, pass) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };


  // * add to cart function

  const axiosSecure = useAxios()
    async function handleCart(item) {
      const res = await axiosSecure.post("/cart", item);
      if (res?.data?.insertedId) {
        Swal.fire({
          title: "Added!",
          text: `${item.name} added to your cart.`,
          icon: "success",
          timer: 1200,
          showConfirmButton: false,
        });
        refetch();
      } else {
        Swal.fire({
          title: "Already in Cart",
          text: `${item.name} is already in your cart.`,
          icon: "info",
          timer: 1200,
          showConfirmButton: false,
        });
      }
    }

  // Login existing user
  const handleLogin = (email, pass) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };

  // Google login
  const handleGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  // Logout
  const handleLogout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Password reset
  const resetPass = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const opar = 'opar'

  // Keep user logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    handleRegister,
    handleLogin,
    handleLogout,
    handleGoogle,
    resetPass,
    setUser,
    quantities, setQuantities
    , opar,
    handleCart,
    isReviewModalOpen, setIsReviewModalOpen
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;