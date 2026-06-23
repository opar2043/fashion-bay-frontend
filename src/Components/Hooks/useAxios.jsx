import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://fashionbay-eight.vercel.app/",
  // baseURL: "http://localhost:5001/",
});

const useAxios = () => {
  return axiosInstance;
};
export default useAxios;