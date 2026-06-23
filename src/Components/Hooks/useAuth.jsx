// useAuth.js
import React, { useContext } from "react";
import { AuthContext } from "../Firebase/AuthProvider"; // ✅ use named export

const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export default useAuth;
