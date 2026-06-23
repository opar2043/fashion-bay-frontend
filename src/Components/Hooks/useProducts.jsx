import useAxios from "./useAxios";
import { useQuery } from "@tanstack/react-query";

const useProducts= () => {
  const axiosSecure = useAxios();
  const {
    data: products,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    },
  });
  return [products, refetch, isLoading];
};

export default useProducts;