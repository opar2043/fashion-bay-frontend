import useAxios from "./useAxios";
import { useQuery } from "@tanstack/react-query";

const useNewsletter = () => {
  const axiosSecure = useAxios();
  const {
    data: subscribers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["newsletter"],
    queryFn: async () => {
      const res = await axiosSecure.get("/newsletter");
      return res.data;
    },
  });
  return [subscribers, refetch, isLoading];
};

export default useNewsletter;
