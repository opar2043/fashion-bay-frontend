import useAxios from "./useAxios";
import { useQuery } from "@tanstack/react-query";

const useCart = () => {
  const axiosSecure = useAxios();
  const {
    data: cart = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await axiosSecure.get("/cart");
      return res.data;
    },
  });
  return [cart, refetch, isLoading];
};

export default useCart;