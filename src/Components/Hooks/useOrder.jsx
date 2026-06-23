import useAxios from "./useAxios";
import { useQuery } from "@tanstack/react-query";

const useOrder= () => {
  const axiosSecure = useAxios();
  const {
    data: order = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order");
      return res.data;
    },
  });
  return [order, refetch, isLoading];
};

export default useOrder;